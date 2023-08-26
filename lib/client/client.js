// Client.js - main client file that does most of the processing
'use strict';

const {constants} = require('node:crypto');
const fs = require('node:fs');
const process = require('node:process');
const stream = require('node:stream');
const request = require('request');
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

  // Helper methods

  ensureOptionsGetFunction() {
    this.options.get = this.options.get || ((key) => this.options[key]);
  }

  setSideLoad(array) {
    this.sideLoad = array;
  }

  generateUserAgent() {
    const {version} = pjson;
    return `node-zendesk/${version} (node/${process.versions.node})`;
  }

  createDefaultRequest() {
    return request.defaults(this.getDefaultRequestOptions());
  }

  getDefaultRequestOptions() {
    const jar = this.options['no-cookies'] ? false : request.jar();
    return {
      jar,
      encoding: this.options.get('encoding') || null,
      timeout: this.options.get('timeout') || 240_000,
      proxy: this.options.get('proxy') || null,
      // eslint-disable-next-line no-bitwise
      secureOptions: constants.SSL_OP_NO_TLSv1 | constants.SSL_OP_NO_TLSv1_1,
      forever: true,
      pool: {maxSockets: 100},
      secureProtocol: 'TLSv1_2_method',
    };
  }

  initializeJsonAPINames() {
    this.jsonAPINames = this.jsonAPINames || [];
  }

  // Request logic

  async makeRequest(method, uri, body = null) {
    const options = this.prepareOptionsForRequest(method, uri, body);
    return this.sendRequest(options);
  }

  prepareOptionsForRequest(method, uri, body) {
    const url = assembleUrl(this, uri);
    const headers = this.getHeadersForRequest(body);

    return {
      ...this.options,
      headers,
      uri: url,
      method: method || 'GET',
      body,
    };
  }

  getHeadersForRequest(body) {
    const headers = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      'User-Agent': this.userAgent,
    };

    if (body) {
      headers['Content-Length'] = body.length;
    }

    const auth = this.options.get('password')
      ? ':' + this.options.get('password')
      : '/token:' + this.options.get('token');
    const encoded = require('node:buffer')
      .Buffer.from(this.options.get('username') + auth)
      .toString('base64');

    const useOAuth = this.options.get('oauth');
    const token = this.options.get('token');
    const asUser = this.options.get('asUser');
    const customHeaders = this.options.get('customHeaders');

    headers.Authorization = useOAuth ? 'Bearer ' + token : 'Basic ' + encoded;

    if (asUser) {
      headers['X-On-Behalf-Of'] = asUser;
    }

    if (customHeaders) {
      return {
        ...headers,
        ...customHeaders,
      };
    }

    return headers;
  }

  sendRequest(options) {
    return new Promise((resolve, reject) => {
      this._request(options, (error, response, result) => {
        if (error) {
          reject(error);
        } else {
          resolve({response, result});
        }
      });
    });
  }

  // Client methods

  emit(eventType, eventData) {
    const event = {type: eventType, detail: eventData};
    this.eventTarget.dispatchEvent(event);
  }

  on(eventType, callback) {
    this.eventTarget.addEventListener(eventType, callback);
  }

  async get(resource) {
    return this.makeRequest('GET', resource);
  }

  async put(resource, body) {
    return this.makeRequest('PUT', resource, body);
  }

  async post(resource, body) {
    return this.makeRequest('POST', resource, body);
  }

  async delete(resource) {
    return this.makeRequest('DELETE', resource);
  }

  async getAll(resource) {
    return this.requestAll('GET', resource);
  }

  prepareRequestOptions(method, uri, body) {
    const headers = this.getHeadersForRequest(body);
    const url = assembleUrl(this, uri);

    return {
      ...this.options,
      headers,
      uri: url,
      method: method || 'GET',
      body,
    };
  }

  // Request method that handles various HTTP methods
  async request(method, uri, ...args) {
    const body =
      typeof args.at(-1) === 'object' &&
      !Array.isArray(args.at(-1)) &&
      args.pop();
    const options = this.prepareRequestOptions(method, uri, body);
    this.emit('debug::request', options);

    try {
      const {response, result} = await this.sendRequest(options);
      const checkResult = checkRequestResponse(response, result);
      const responseBody = processResponseBody(checkResult, this);
      return {response, body: responseBody};
    } catch (error) {
      throw new Error(`Request failed: ${error.message}`);
    }
  }

  // Request method for fetching multiple pages of results
  async requestAll(method, uri, ...args) {
    const bodyList = [];
    const throttle = this.options.get('throttle');
    let __request = this.request;

    if (throttle) {
      __request = throttler(this, this.request, throttle);
    }

    const processPage = ({body, response}) => {
      bodyList.push(body);

      // Determining the next page
      if (response && response.links && response.links.next) {
        return response.links.next;
      }

      if (response) {
        return response.next_page;
      }

      return null;
    };

    const fetchPagesRecursively = async (pageUri) => {
      const isIncremental = pageUri[0] === 'incremental';

      try {
        const responseData = await __request.call(
          this,
          method,
          pageUri,
          ...args,
        );
        const nextPage = processPage(responseData);
        if (
          nextPage &&
          (!isIncremental ||
            (responseData.response && responseData.response.count >= 1000))
        ) {
          return fetchPagesRecursively(nextPage);
        }
      } catch (error) {
        throw new Error(`Request all failed: ${error.message}`);
      }
    };

    await fetchPagesRecursively(uri);

    return flatten(bodyList);
  }

  // Request method for uploading files
  async requestUpload(uri, file) {
    const options = this.prepareRequestOptions('POST', uri, null);
    // Const uploadOptions = this.options;
    const binary = uri[1]
      ? uri[1].binary || file instanceof stream.Stream
      : false;

    // Fixes ERR_STREAM_WRITE_AFTER_END after new ticket creation
    if (options.body) delete options.body;

    options.headers['Content-Type'] = 'application/binary';

    this.emit('debug::request', this.options);

    try {
      let response;
      if (binary) {
        response = await this._request(this.options);
      } else {
        response = await new Promise((resolve, reject) => {
          const outStream = this._request(
            options,
            (error, response_ /* , result */) => {
              if (error) reject(error);
              else resolve(response_);
            },
          );
          fs.createReadStream(file).pipe(outStream);
        });
      }

      return checkRequestResponse(response, response.body);
    } catch (error) {
      throw new Error(`Upload failed: ${error.message}`);
    }
  }
}

exports.Client = Client;
