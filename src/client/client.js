// Client.js - main client file that does most of the processing
'use strict';

const {CustomEventTarget} = require('./custom-event-target');
const {Transporter} = require('./transporter');
const throttler = require('./throttle');
const {
  flatten,
  checkRequestResponse,
  processResponseBody,
  generateUserAgent,
} = require('./helpers');

/**
 * Represents a client to interact with the Zendesk API, providing functionalities to make various types of requests.
 * This client handles request construction, response processing, event emission, and more.
 *
 * @class
 * @property {object} options - Configuration options for the client.
 * @property {string} [options.password] - Password for authentication.
 * @property {string} [options.token] - Token for authentication.
 * @property {boolean} [options.useOAuth] - Flag to indicate if OAuth is used.
 * @property {string} [options.username] - Username for authentication.
 * @property {string} [options.asUser] - Optional header for making requests on behalf of a user.
 * @property {object} [options.customHeaders] - Any additional custom headers for the request.
 * @property {boolean} [options.throttle] - Flag to enable throttling of requests.
 * @property {CustomEventTarget} eventTarget - Event target to handle custom events.
 * @property {array} sideLoad - Array to handle side-loaded resources.
 * @property {array} jsonAPINames - Array to hold names used in the JSON API.
 *
 */
class Client {
  constructor(options) {
    this.options = options;
    this.ensureOptionsGetFunction();
    this.sideLoad = [];
    this.userAgent = generateUserAgent();
    this.initializeJsonAPINames();
    this.transporter = new Transporter(this.options);
    this.eventTarget = new CustomEventTarget();

    // Listen to transporter's debug events and re-emit them on the Client
    this.transporter.on('debug::request', (eventData) => {
      this.emit('debug::request', eventData.detail);
    });

    this.transporter.on('debug::response', (eventData) => {
      this.emit('debug::response', eventData.detail);
    });
  }

  emit(eventType, eventData) {
    const event = {type: eventType, detail: eventData};
    this.eventTarget.dispatchEvent(event);
  }

  on(eventType, callback) {
    this.eventTarget.addEventListener(eventType, callback);
  }

  // Helper methods
  ensureOptionsGetFunction() {
    this.options.get = this.options.get || ((key) => this.options[key]);
  }

  setSideLoad(array) {
    this.sideLoad = array;
  }

  initializeJsonAPINames() {
    this.jsonAPINames = this.jsonAPINames || [];
  }

  // Client methods

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

  // Request method that handles various HTTP methods
  async request(method, uri, ...args) {
    const body =
      typeof args.at(-1) === 'object' &&
      !Array.isArray(args.at(-1)) &&
      args.pop();

    try {
      const {response, result} = await this.transporter.request(
        method,
        uri,
        body,
      );

      // Post-process the result
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
    try {
      const {response, result} = await this.transporter.upload(uri, file);
      return checkRequestResponse(response, result);
    } catch (error) {
      throw new Error(`Upload failed: ${error.message}`);
    }
  }
}

exports.Client = Client;
