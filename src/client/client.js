// Client.js - main client file that does most of the processing
'use strict';

const {Buffer} = require('node:buffer');
const {constants} = require('node:crypto');
const fs = require('node:fs');
const process = require('node:process');
const stream = require('node:stream');
const pjson = require('../../package.json');
const {CustomEventTarget} = require('./custom-event-target');
const throttler = require('./throttle');
const {
  flatten,
  assembleUrl,
  checkRequestResponse,
  processResponseBody,
} = require('./helpers');

/**
 * Represents a client to interact with the Zendesk API, providing functionalities to make various types of requests.
 * This client handles request construction, response processing, event emission, and more.
 *
 * @class
 * @property {object} options - Configuration options for the client.
 * @property {string|Buffer} [options.encoding=null] - Encoding type for the request.
 * @property {number} [options.timeout=240000] - Timeout for the request in milliseconds.
 * @property {string} [options.proxy=null] - Proxy URL if needed for the request.
 * @property {boolean} [options['no-cookies']=false] - Flag to disable cookies.
 * @property {string} [options.password] - Password for authentication.
 * @property {string} [options.token] - Token for authentication.
 * @property {boolean} [options.useOAuth] - Flag to indicate if OAuth is used.
 * @property {string} [options.username] - Username for authentication.
 * @property {string} [options.asUser] - Optional header for making requests on behalf of a user.
 * @property {object} [options.customHeaders] - Any additional custom headers for the request.
 * @property {boolean} [options.throttle] - Flag to enable throttling of requests.
 * @property {CustomEventTarget} eventTarget - Event target to handle custom events.
 * @property {array} sideLoad - Array to handle side-loaded resources.
 * @property {string} userAgent - User agent string for the request header.
 * @property {array} jsonAPINames - Array to hold names used in the JSON API.
 *
 */
class Client {
  constructor(options) {
    this.options = options;
    this.ensureOptionsGetFunction();
    this.eventTarget = new CustomEventTarget();
    this.sideLoad = [];
    this.userAgent = this.generateUserAgent();
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

  getDefaultRequestOptions() {
    return {
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

  prepareOptionsForRequest(method = 'GET', uri, body) {
    const url = assembleUrl(this, uri);
    const bodyContent = this.getBodyForRequest(method, body);
    const headers = this.getHeadersForRequest(bodyContent);

    return {
      ...this.options,
      headers,
      uri: url,
      method,
      body: bodyContent,
    };
  }

  getBodyForRequest(method, body) {
    if (method === 'GET') return undefined;

    if (!body && this.getContentType() === 'application/json') return '{}';

    if (body) {
      try {
        return JSON.stringify(body);
      } catch (error) {
        throw new Error(
          `Failed to stringify the request body: ${error.message}`,
        );
      }
    }

    return undefined;
  }

  getHeadersForRequest(body) {
    const headers = {
      'Content-Type': this.getContentType(),
      Accept: 'application/json',
      'User-Agent': this.userAgent,
      ...this.options.get('customHeaders'),
    };

    // headers['Content-Length'] = body
    //   ? Buffer.byteLength(body, 'utf8')
    //   : undefined;

    headers.Authorization = this.createAuthorizationHeader();

    const asUser = this.options.get('asUser');
    if (asUser) {
      headers['X-On-Behalf-Of'] = asUser;
    }

    return headers;
  }

  getContentType() {
    return 'application/json';
  }

  createAuthorizationHeader() {
    const useOAuth = this.options.get('useOAuth');
    if (useOAuth) {
      const token = this.options.get('token');
      if (!token) throw new Error('OAuth is enabled, but token is missing.');
      return `Bearer ${token}`;
    }

    const username = this.options.get('username');
    const passwordOrToken = this.options.get('password')
      ? `:${this.options.get('password')}`
      : `/token:${this.options.get('token')}`;
    if (!username || !passwordOrToken)
      throw new Error('Missing credentials for Basic Authentication.');

    const encoded = Buffer.from(`${username}${passwordOrToken}`).toString(
      'base64',
    );
    return `Basic ${encoded}`;
  }

  fetchWithOptions(uri, options) {
    return fetch(options.uri, {...this.getDefaultRequestOptions(), ...options});
  }

  async sendRequest(options) {
    const response = await this.fetchWithOptions(options.uri, options);
    let result;
    if (response.json) {
      result = await response.json();
    }
    return { response, result };
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
    return this.request('GET', resource);
  }

  async put(resource, body) {
    return this.request('PUT', resource, body);
  }

  async post(resource, body) {
    return this.request('POST', resource, body);
  }

  async delete(resource) {
    return this.request('DELETE', resource);
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
    const options = this.prepareOptionsForRequest(method, uri, body);
    this.emit('debug::request', options);

    try {
      const {response, result} = await this.sendRequest(options);
      this.emit('debug::response', response);
      const checkResult = checkRequestResponse(response, result);
      const responseBody = processResponseBody(checkResult, this);
      return {response, result: responseBody};
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

    const processPage = ({result, response}) => {
      bodyList.push(result);

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
        response = await this.fetchWithOptions(this.options.uri, this.options);
      } else {
        const fileStream = fs.createReadStream(file);
        response = await this.fetchWithOptions(this.options.uri, { ...this.options, body: fileStream });
      }

      const result = await response.json();
      return checkRequestResponse(response, result);
    } catch (error) {
      throw new Error(`Upload failed: ${error.message}`);
    }
  }
}

exports.Client = Client;
