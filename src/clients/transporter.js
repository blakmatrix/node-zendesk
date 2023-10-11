'use strict';

const {fetch} = require('cross-fetch');
const {AuthorizationHandler} = require('./authorization-handler');
const {CustomEventTarget} = require('./custom-event-target');
const {EndpointChecker} = require('./endpoint-checker');
const {assembleUrl} = require('./helpers');

// Default transport config using fetch
const defaultTransportConfig = {
  transportFn(uri, options) {
    return fetch(uri, options);
  },

  responseAdapter(response) {
    return {
      json: () => response.json(),
      status: response.status,
      headers: {
        get: (headerName) => response.headers.get(headerName),
      },
      statusText: response.statusText,
    };
  },
};
class Transporter {
  constructor(options, sideLoad = [], useDotJson = true) {
    this.options = options;
    this.sideLoad = sideLoad;
    this.useDotJson = useDotJson;
    this.authHandler = new AuthorizationHandler(this.options);
    this.eventTarget = new CustomEventTarget();
    this.endpointChecker = new EndpointChecker();
    const transportConfig =
      this.options.transportConfig ?? defaultTransportConfig;
    this.transportFn = transportConfig.transportFn;
    this.responseAdapter = transportConfig.responseAdapter;
  }

  // Transporter methods
  emit(eventType, eventData) {
    const event = {type: eventType, detail: eventData};
    this.eventTarget.dispatchEvent(event);
  }

  on(eventType, callback) {
    this.eventTarget.addEventListener(eventType, callback);
  }

  async request(method, uri, body = null) {
    const options = this.prepareOptionsForRequest(method, uri, body);
    return this.sendRequest(options);
  }

  async upload(uri, file) {
    const method = 'POST';
    const isBinary = file instanceof require('node:stream').Stream;
    const headers = this.getHeadersForRequest();

    if (isBinary) {
      headers['Content-Type'] = 'application/binary';
    }

    const options = {
      ...this.options,
      headers,
      uri: assembleUrl(this, method, uri),
      method,
      body: isBinary ? file : require('node:fs').createReadStream(file),
    };
    return this.sendRequest(options);
  }

  async sendRequest(options) {
    this.emit('debug::request', options); // Emit before the request

    const rawResponse = await this.transportFn(options.uri, options);
    const response = this.responseAdapter(rawResponse);

    this.emit('debug::response', response); // Emit after the request
    let result = {};
    if (
      response.status !== 204 &&
      response.headers.get('content-type')?.includes('application/json')
    ) {
      result = await response.json();
    }

    this.emit('debug::result', result);
    return {response, result};
  }

  prepareOptionsForRequest(method = 'GET', uri, body, isBinary = false) {
    const url = assembleUrl(this, method, uri);
    const bodyContent = isBinary ? body : this.getBodyForRequest(method, body);

    const headers = this.getHeadersForRequest();
    if (isBinary) {
      headers['Content-Type'] = 'application/binary';
    }

    return {
      ...this.options,
      headers,
      uri: url,
      method,
      body: bodyContent,
    };
  }

  getHeadersForRequest() {
    const headers = {
      Authorization: this.authHandler.createAuthorizationHeader(),
      'Content-Type': 'application/json',
      Accept: 'application/json',
      'User-Agent': this.options.get('userAgent'),
      ...this.options.get('customHeaders'),
    };

    const asUser = this.options.get('asUser');
    if (asUser) {
      headers['X-On-Behalf-Of'] = asUser;
    }

    return headers;
  }

  getBodyForRequest(method, body) {
    if (method === 'GET') return undefined;

    return body ? this.getJSONBody(body) : undefined;
  }

  getJSONBody(body) {
    if (!body) return '{}';

    try {
      return JSON.stringify(body);
    } catch (error) {
      throw new Error(`Failed to stringify the request body: ${error.message}`);
    }
  }

  setSideLoad(array) {
    this.sideLoad = array;
  }
}

exports.Transporter = Transporter;
