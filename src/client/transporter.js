'use strict';

const {AuthorizationHandler} = require('./authorization-handler');
const {CustomEventTarget} = require('./custom-event-target');
const {EndpointChecker} = require('./endpoint-checker');
const {assembleUrl, responseHeaderRetrieve, responseBodyJSON, responseGetStatus} = require('./helpers');
const {MOCK_API} = require('../constants');

let requestApi = null;
if(MOCK_API) {
  requestApi = require("request");
}

class Transporter {
  constructor(options) {
    this.options = options;
    this.authHandler = new AuthorizationHandler(this.options);
    this.eventTarget = new CustomEventTarget();
    this.endpointChecker = new EndpointChecker();
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
    const response = await this.fetchWithOptions(options.uri, options);
    this.emit('debug::response', response); // Emit after the request
    let result = {};
    if (

      responseGetStatus(response) !== 204 &&
        responseHeaderRetrieve(response, 'content-type')?.includes('application/json')
    ) {
      result = await responseBodyJSON(response);
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

  async fetchWithOptions(uri, options) {
    if(['development', 'test'].includes(process.env.NODE_ENV)) {
      /*
      ** This development code facilitates nock.
      ** This should only be used in Test/Dev mode.
       */
      let p = new Promise(function (myResolve, myReject) {
        requestApi(options, function(error, response, body) {
          if (error == null && (response)) {
            myResolve(response);
          } else {
            myReject(error)
          }
        });
      })
      return await p;
    }
    return fetch(options.uri, options);
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
}

exports.Transporter = Transporter;
