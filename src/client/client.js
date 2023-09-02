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

    this.transporter.on('debug::result', (eventData) => {
      this.emit('debug::result', eventData.detail);
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

  async _rawRequest(method, uri, ...args) {
    const body =
      typeof args.at(-1) === 'object' &&
      !Array.isArray(args.at(-1)) &&
      args.pop();

    try {
      return await this.transporter.request(method, uri, body);
    } catch (error) {
      throw new Error(`Raw request failed: ${error.message}`);
    }
  }

  // Request method that handles various HTTP methods
  async request(method, uri, ...args) {
    try {
      const {response, result} = await this._rawRequest(method, uri, ...args);
      const responseBody = processResponseBody(
        checkRequestResponse(response, result),
        this,
      );
      return {response, result: responseBody};
    } catch (error) {
      throw new Error(`Request processing failed: ${error.message}`);
    }
  }

  // Request method for fetching multiple pages of results
  async requestAll(method, uri, ...args) {
    const bodyList = [];
    const throttle = this.options.get('throttle');
    let __request = this._rawRequest; // Use _rawRequest directly

    if (throttle) {
      __request = throttler(this, this._rawRequest, throttle);
    }

    const processPage = ({result, response}) => {
      const currentPage = checkRequestResponse(response, result);
      const hasCursorPagination = (page) =>
        page && page.links && page.links.next;
      const hasOffsetPagination = (page) => page && page.next_page;
      const getNextPage = (page) =>
        hasCursorPagination(page)
          ? page.links.next
          : hasOffsetPagination(page)
          ? page.next_page
          : null;
      const item = processResponseBody(currentPage, this);

      bodyList.push(item);

      return getNextPage(currentPage);
    };

    const fetchPagesRecursively = async (pageUri) => {
      const isIncremental = pageUri.includes('incremental');

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
        throw new Error(`Request all failed during fetching: ${error.message}`);
      }
    };

    try {
      await fetchPagesRecursively(uri);
      return flatten(bodyList);
    } catch (error) {
      throw new Error(`RequestAll processing failed: ${error.message}`);
    }
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
