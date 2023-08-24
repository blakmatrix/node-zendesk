/* eslint-disable max-params */
/* eslint-disable prefer-rest-params */
/* eslint-disable no-promise-executor-return */
/* eslint-disable unicorn/no-this-assignment */
// Client.js - main client file that does most of the processing
'use strict';

const {constants} = require('node:crypto');
const {EventEmitter} = require('node:events');
const fs = require('node:fs');
const process = require('node:process');
const qs = require('node:querystring');
const stream = require('node:stream');
const util = require('node:util');
const request = require('request');
const async = require('async');
const throttler = require('./throttle');
const pjson = require('./../../package.json');
const {flatten, populateFields} = require('./helpers');

const failCodes = {
  400: 'Bad Request',
  401: 'Not Authorized',
  403: 'Forbidden',
  404: 'Item not found',
  405: 'Method not Allowed',
  409: 'Conflict',
  422: 'Unprocessable Entity', // Zendesk sends this one back when you re-use an organization name
  429: 'Too Many Requests',
  500: 'Internal Server Error',
  503: 'Service Unavailable',
};

const Client = (exports.Client = function (options) {
  this.options = options;
  this.sideLoad = [];
  this.userAgent =
    'node-zendesk/' + pjson.version + ' (node/' + process.versions.node + ')';
  // Each client has its own cookies to isolate authentication between clients
  this._request = request.defaults({
    jar: this.options.get('no-cookies') ? false : request.jar(),
    encoding: this.options.get('encoding') || null,
    timeout: this.options.get('timeout') || 240_000,
    proxy: this.options.get('proxy') || null,
    // eslint-disable-next-line no-bitwise
    secureOptions: constants.SSL_OP_NO_TLSv1 | constants.SSL_OP_NO_TLSv1_1,
    forever: true,
    pool: {maxSockets: 100},
    secureProtocol: 'TLSv1_2_method',
  });

  if (!this.jsonAPINames) {
    this.jsonAPINames = [];
  }

  if (typeof this.options.get !== 'function') {
    this.options.get = function (key) {
      return this[key];
    };
  }
});

util.inherits(Client, EventEmitter);

Client.prototype.request = function (method, uri) {
  const self = this;
  const args = Array.prototype.slice.call(arguments);
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

  const url = assembleUrl(self, uri);

  self.options.headers = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    'User-Agent': self.userAgent,
    'Content-Length': body.length,
  };

  if (asUser) {
    self.options.headers['X-On-Behalf-Of'] = asUser;
  }

  self.options.headers.Authorization = useOAuth
    ? 'Bearer ' + token
    : 'Basic ' + encoded;

  if (customHeaders) {
    self.options.headers = {...self.options.headers, ...customHeaders};
  }

  self.options.uri = url;
  self.options.method = method || 'GET';

  if (method === 'GET') {
    self.options.body = undefined;
  } else if (body) {
    self.options.body = JSON.stringify(body);
  } else if (
    method !== 'GET' &&
    self.options.headers['Content-Type'] === 'application/json'
  ) {
    self.options.body = '{}';
  }

  if (proxy) {
    self.options.proxy = proxy;
  }

  self.emit('debug::request', self.options);

  return new Promise(function (resolve, reject) {
    self._request(self.options, function (error, response, result) {
      const stdCb = function (error, statusCode, body /* , response */) {
        if (error) return reject(error);
        return resolve(body);
      };

      return requestCallback(self, error, response, result, callback || stdCb);
    });
  });
};

Client.prototype.requestAll = function (method, uri) {
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
};

Client.prototype.requestUpload = function (uri, file, callback) {
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
  const binary = uri[1] ? uri[1].binary || file instanceof stream : false;

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
};

Client.prototype.setSideLoad = function (array) {
  const self = this;
  self.sideLoad = array;
};

function checkRequestResponse(self, response, result, callback) {
  let statusCode;
  let error;
  let result_;

  if (!result) {
    // Should this really be an error?
    error = new Error('Zendesk returned an empty result');
    error.statusCode = 204;
    return callback(error);
  }

  try {
    statusCode = response.statusCode;
    result_ = JSON.parse(result);
  } catch (error_) {
    // Emit Errors
    self.emit('debug::error', {
      exception: error_,
      code: statusCode,
      request: self.options,
      result,
    });
  }

  self.emit('debug::response', {statusCode, result});

  const retryAfter = response.headers['retry-after'];
  if (retryAfter) {
    error = new Error('Zendesk rate limits 200 requests per minute');
    error.statusCode = 429;
    error.result = result;
    error.retryAfter = retryAfter;
    return callback(error);
  }

  if (failCodes[statusCode]) {
    error = new Error(
      'Zendesk Error (' + statusCode + '): ' + failCodes[statusCode],
    );
    error.statusCode = statusCode;
    error.result = result;
    error.retryAfter = null;
    return callback(error);
  }

  return callback(null, result_);
}

function requestCallback(self, error, response, result, callback) {
  if (error) {
    return callback(error);
  }

  checkRequestResponse(self, response, result, function (error, result_) {
    if (error) {
      return callback(error);
    }

    let body = null;
    if (result_) {
      if (self.jsonAPINames) {
        for (let i = 0; i < self.jsonAPINames.length; i++) {
          if (Object.hasOwn(result_, self.jsonAPINames[i].toString())) {
            body = result_[self.jsonAPINames[i].toString()];
            break;
          }
        }
      }

      if (!body) {
        body = result_;
      }

      if (Object.hasOwn(self, 'sideLoadMap')) {
        body = populateFields(body, result_, self.sideLoadMap);
      }
    } else {
      body = '';
    }

    return callback(null, response.statusCode, body, response, result_);
  });
}

function assembleUrl(self, uri) {
  let lastElement;
  let parameters = '';

  if (typeof uri === 'object' && Array.isArray(uri)) {
    lastElement = uri.pop();
    if (lastElement) {
      // We have received an object ex. {"sort_by":"id","sort_order":"desc"}
      if (typeof lastElement === 'object') {
        if (self.sideLoad.length > 0) {
          lastElement.include = self.sideLoad.join(',');
        }

        parameters = '?' + qs.stringify(lastElement);
      }
      // We have received a query string ex. '?sort_by=id&sort_order=desc'
      else if (lastElement.toString().indexOf('?') === 0) {
        if (self.sideLoad.length > 0) {
          lastElement += '&include=' + self.sideLoad.join(',');
        }

        parameters = lastElement;
      } else {
        if (self.sideLoad.length > 0) {
          parameters = '?include=' + self.sideLoad.join(',');
        }

        uri.push(lastElement);
      }
    }

    return (
      self.options.get('remoteUri') + '/' + uri.join('/') + '.json' + parameters
    );
  }

  if (typeof uri === 'string' && !uri.includes(self.options.get('remoteUri'))) {
    return self.options.get('remoteUri') + uri;
  }

  return uri;
}
