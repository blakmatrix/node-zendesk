/* eslint-disable max-params */
/* eslint-disable prefer-rest-params */
/* eslint-disable no-promise-executor-return */
/* eslint-disable unicorn/no-this-assignment */
// Client.js - main client file that does most of the processing
'use strict';

const {constants} = require('node:crypto');
const fs = require('node:fs');
const process = require('node:process');
const stream = require('node:stream');
const request = require('request');
const async = require('async');
const {CustomEventTarget} = require('../custom-event-target');
const throttler = require('./throttle');
const pjson = require('./../../package.json');
const {
  flatten,
  assembleUrl,
  checkRequestResponse,
  processResponseBody,
} = require('./helpers');

class Client {
  constructor(options) {
    this.options = options;
    this.ensureOptionsGetFunction();
    this.eventTarget = new CustomEventTarget();
    this.sideLoad = [];
    this.userAgent = this.generateUserAgent();
    this._request = this.createDefaultRequest();
    this.initializeJsonAPINames();
  }

  // Client methods
  get(resource, callback) {
    return this.request('GET', resource, callback);
  }

  getAll(resource, callback) {
    return this.requestAll('GET', resource, callback);
  }

  put(resource, callback) {
    return this.request('PUT', resource, callback);
  }

  post(resource, callback) {
    return this.request('POST', resource, callback);
  }

  delete(resource, callback) {
    return this.request('DELETE', resource, callback);
  }

  // Use the event target for emitting events
  emit(eventType, eventData) {
    const event = {type: eventType, detail: eventData};
    this.eventTarget.dispatchEvent(event);
  }

  // Use the event target for listening to events
  on(eventType, callback) {
    this.eventTarget.addEventListener(eventType, callback);
  }

  ensureOptionsGetFunction() {
    this.options.get = this.options.get || ((key) => this.options[key]);
  }

  generateUserAgent() {
    const {version} = pjson;
    return `node-zendesk/${version} (node/${process.versions.node})`;
  }

  createDefaultRequest() {
    const jar = this.options['no-cookies'] ? false : request.jar();
    return request.defaults({
      jar,
      encoding: this.options.get('encoding') || null,
      timeout: this.options.get('timeout') || 240_000,
      proxy: this.options.get('proxy') || null,
      // eslint-disable-next-line no-bitwise
      secureOptions: constants.SSL_OP_NO_TLSv1 | constants.SSL_OP_NO_TLSv1_1,
      forever: true,
      pool: {maxSockets: 100},
      secureProtocol: 'TLSv1_2_method',
    });
  }

  initializeJsonAPINames() {
    this.jsonAPINames = this.jsonAPINames || [];
  }

  // Request method that handles various HTTP methods
  request(method, uri, ...args) {
    const callback = args.pop();
    const body =
      typeof args.at(-1) === 'object' &&
      !Array.isArray(args.at(-1)) &&
      args.pop();

    const auth = this.options.get('password')
      ? ':' + this.options.get('password')
      : '/token:' + this.options.get('token');
    const encoded = require('node:buffer')
      .Buffer.from(this.options.get('username') + auth)
      .toString('base64');
    const proxy = this.options.get('proxy');
    const useOAuth = this.options.get('oauth');
    const token = this.options.get('token');
    const asUser = this.options.get('asUser');
    const customHeaders = this.options.get('customHeaders');

    const url = assembleUrl(this, uri);

    this.options.headers = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      'User-Agent': this.userAgent,
      'Content-Length': body.length,
    };

    if (asUser) {
      this.options.headers['X-On-Behalf-Of'] = asUser;
    }

    this.options.headers.Authorization = useOAuth
      ? 'Bearer ' + token
      : 'Basic ' + encoded;

    if (customHeaders) {
      this.options.headers = {...this.options.headers, ...customHeaders};
    }

    this.options.uri = url;
    this.options.method = method || 'GET';

    if (method === 'GET') {
      this.options.body = undefined;
    } else if (body) {
      this.options.body = JSON.stringify(body);
    } else if (
      method !== 'GET' &&
      this.options.headers['Content-Type'] === 'application/json'
    ) {
      this.options.body = '{}';
    }

    if (proxy) {
      this.options.proxy = proxy;
    }

    this.emit('debug::request', this.options);

    return new Promise((resolve, reject) => {
      this._request(this.options, (error, response, result) => {
        // Use a standard callback if none is provided
        const stdCb = (error, body) => (error ? reject(error) : resolve(body));
        return requestCallback(
          this,
          error,
          response,
          result,
          callback || stdCb,
        );
      });
    });
  }

  // Request method for fetching multiple pages of results
  requestAll(method, uri) {
    const args = Array.prototype.slice.call(arguments);
    let callbackOpt = args.pop();
    let nextPage = 'Not Null!';
    let count = -1;
    const bodyList = [];
    const statusList = [];
    const responseList = [];
    const resultList = [];
    const self = this;
    const throttle = this.options.get('throttle');
    const isIncremental = uri[0] === 'incremental';
    let __request = Client.prototype.request;

    return new Promise(function (resolve, reject) {
      let errorCb;
      let nextCb;
      let completeCb;
      if (typeof callbackOpt === 'function') {
        errorCb = callbackOpt;
        nextCb = function () {};
        completeCb = function (sl, bl, rl, rsl) {
          // Avoids scope collision
          callbackOpt(null, sl, bl, rl, rsl);
        };
      } else {
        callbackOpt = callbackOpt || {};
        errorCb = callbackOpt.error || reject;
        nextCb = callbackOpt.next || function () {};
        completeCb =
          callbackOpt.complete ||
          function (sl, scopedBodyList /* , rl, rsl */) {
            resolve(scopedBodyList);
          }; // Avoids scope collision
      }

      if (throttle) {
        __request = throttler(self, Client.prototype.request, throttle);
      }

      function processPage(status, body, response, result) {
        if (completeCb) {
          // Only accumulate pages if a completeCb is provided
          statusList.push(status);
          bodyList.push(body);
          responseList.push(response);
          resultList.push(result);
        }

        if (result && result.links && result.links.next) {
          nextPage = result.links.next;
        } else {
          nextPage = result ? result.next_page : null;
        }

        count = result ? result.count : 0;
        nextCb(status, body, response, result, nextPage);
      }

      return __request.apply(
        self,
        // eslint-disable-next-line unicorn/prefer-spread
        args.concat(function (error, status, body, response, result) {
          if (error) {
            return errorCb(error);
          }

          processPage(status, body, response, result);
          async.whilst(
            function (cb) {
              if (nextPage === null || (isIncremental && count < 1000)) {
                nextPage = '';
              }

              cb(null, nextPage);
            },
            function (cb) {
              __request.apply(self, [
                'GET',
                nextPage,
                function (error, status, body, response, result) {
                  if (error) {
                    return cb(error);
                  }

                  processPage(status, body, response, result);
                  cb(null);
                },
              ]);
            },
            function (error_) {
              if (error_) {
                return errorCb(error_);
              }

              if (completeCb) {
                return completeCb(
                  statusList,
                  flatten(bodyList),
                  responseList,
                  resultList,
                );
              }
            },
          );
        }),
      );
    });
  }

  // Request method for uploading files
  requestUpload(uri, file, callback) {
    const self = this;
    let out;
    const auth = this.options.get('password')
      ? ':' + this.options.get('password')
      : '/token:' + this.options.get('token');
    const encoded = require('node:buffer')
      .Buffer.from(this.options.get('username') + auth)
      .toString('base64');
    const useOAuth = this.options.get('oauth');
    const token = this.options.get('token');
    // Const uploadOptions = self.options;
    const binary = uri[1]
      ? uri[1].binary || file instanceof stream.Stream
      : false;

    self.options.uri = assembleUrl(self, uri);
    self.options.method = 'POST';
    // Fixes ERR_STREAM_WRITE_AFTER_END after new ticket creation
    if (self.options.body) delete self.options.body;

    self.options.headers = {'Content-Type': 'application/binary'};

    self.options.headers.Authorization = useOAuth
      ? 'Bearer ' + token
      : 'Basic ' + encoded;

    self.emit('debug::request', self.options);

    return new Promise(function (resolve, reject) {
      const stdCallback = function (error, statusCode, body /* , response */) {
        if (error) return reject(error);
        return resolve(body);
      };

      // Assumes a binary file is passed in instead of a path
      if (binary) {
        self.options.body = file;
        return self._request(self.options, function (error, response, result) {
          if (!callback) callback = stdCallback;
          return requestCallback(self, error, response, result, callback);
        });
      }

      out = self._request(self.options, function (error, response, result) {
        if (!callback) callback = stdCallback;
        return requestCallback(self, error, response, result, callback);
      });
      fs.createReadStream(file).pipe(out); // Pipe the file!
    });
  }

  // Set the list of side-loaded resources
  setSideLoad(array) {
    this.sideLoad = array;
  }
}

exports.Client = Client;

function requestCallback(self, error, response, result, callback) {
  if (error) return callback(error);

  try {
    const checkResult = checkRequestResponse(response, result);
    const body = processResponseBody(checkResult, self);
    callback(null, response.statusCode, body, response, checkResult);
  } catch (error) {
    callback(error);
  }
}
