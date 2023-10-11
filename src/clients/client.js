// Client.js - main client file that does most of the processing
'use strict';

const {ApiTypes, Endpoints} = require('../constants');
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
 * @typedef {object} ClientOptions
 * @property {string} subdomain - Subdomain for the Zendesk instance.
 * @property {string} [password] - Password for authentication.
 * @property {string} [token] - Token for authentication.
 * @property {boolean} [useOAuth] - Flag to indicate if OAuth is used.
 * @property {string} [username] - Username for authentication.
 * @property {string} [asUser] - Optional header for making requests on behalf of a user.
 * @property {object} [customHeaders] - Any additional custom headers for the request.
 * @property {boolean} [throttle] - Flag to enable throttling of requests.
 * @property {CustomEventTarget} eventTarget - Event target to handle custom events.
 * @property {Array} sideLoad - Array to handle side-loaded resources.
 * @property {Array} jsonAPINames - Array to hold names used in the JSON API.
 */

/**
 * Represents a client to interact with the Zendesk API, providing functionalities to make various types of requests.
 * This client handles request construction, response processing, event emission, and more.
 * @class
 * @property {ClientOptions} options - Configuration options for the client.
 * @property {Array} sideLoad - Array to handle side-loaded resources.
 * @property {string} userAgent - User agent for the client.
 * @property {Array} jsonAPINames - Array to hold names used in the JSON API.
 * @property {boolean} useDotJson - Flag to indicate if the API endpoint should use '.json' ending.
 * @property {ApiTypes} apiType - Type of Zendesk API to initialize (e.g., 'core', 'helpcenter').
 * @property {CustomEventTarget} eventTarget - Event target to handle custom events.
 * @property {Transporter} transporter - Transporter for making requests.
 */
class Client {
  /**
   * @constructs Client
   * @param {ClientOptions} options - Configuration options for the client.
   * @param {ApiTypes} apiType - Type of Zendesk API to initialize (e.g., 'core', 'helpcenter').
   */
  constructor(options, apiType) {
    this.options = this._buildOptions(options, apiType);
    this.sideLoad = [];
    this.jsonAPINames = [];
    this.useDotJson = true;
    this.userAgent = generateUserAgent();
    this.eventTarget = new CustomEventTarget();
  }

  // We only create the transporter one demand
  get transporter() {
    if (this._transporter) return this._transporter;

    this._transporter = new Transporter(
      this.options,
      this.sideLoad,
      this.useDotJson,
    );
    // Listen to transporter's debug events and re-emit them on the Client
    this._transporter.on('debug::request', (eventData) => {
      this.emit('debug::request', eventData.detail);
    });
    this._transporter.on('debug::response', (eventData) => {
      this.emit('debug::response', eventData.detail);
    });
    this._transporter.on('debug::result', (eventData) => {
      this.emit('debug::result', eventData.detail);
    });

    return this._transporter;
  }

  emit(eventType, eventData) {
    const event = {type: eventType, detail: eventData};
    this.eventTarget.dispatchEvent(event);
  }

  on(eventType, callback) {
    this.eventTarget.addEventListener(eventType, callback);
  }

  /**
   * Helper method to build client options.
   * @param {ClientOptions} options - Client configuration options.
   * @param {ApiTypes} apiType - Type of Zendesk API.
   * @returns {ClientOptions & {get: (key: string) => any}} - Built client options.
   * @private
   */
  _buildOptions(options, apiType = ApiTypes.core) {
    const endpointUri = this._getEndpointUri(options.subdomain, apiType);
    const data = {...options, endpointUri};
    return {
      ...data,
      get: (key) => data[key],
    };
  }

  /**
   * Helper method to get the endpoint URI.
   * @param {string} subdomain - The subdomain for the Zendesk instance.
   * @param {ApiTypes} apiType - Type of Zendesk API.
   * @returns {string} - The endpoint URI.
   * @private
   */
  _getEndpointUri(subdomain, apiType) {
    const endpoint = Endpoints[apiType];
    return `https://${subdomain}${endpoint}`;
  }

  setSideLoad(array) {
    this.sideLoad = array;
    this.transporter.setSideLoad(array);
  }

  // Client methods

  async get(resource) {
    return this.request('GET', resource);
  }

  /**
   * Patches a resource.
   * @param {...any} args - The resources or parts of the resource path followed by the body.
   * @returns {Promise<void|object>} - Either void or response object
   */
  async patch(...args) {
    const body = args.pop();
    const resource = Array.isArray(args[0]) ? args[0] : args;

    return this.request('PATCH', resource, body);
  }

  async put(resource, body) {
    return this.request('PUT', resource, body);
  }

  async post(resource, body) {
    return this.request('POST', resource, body);
  }

  /**
   * Deletes a resource.
   * @param {...any} args - The resources or parts of the resource path.
   * @returns {Promise<void|object>} - Either void or response object
   */
  async delete(...args) {
    // Check if the first argument is an array
    const resource = Array.isArray(args[0]) ? args[0] : args;
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

  /**
   * @template T
   * @type {object} ApiResponse<T>
   * @property {object} response - Response object from the request.
   * @property {T} result - Result object from the request.
   */

  /**
   * Request method that handles various HTTP methods.
   * @template T
   * @param {string} method - HTTP method (e.g., 'GET', 'POST').
   * @param {string} uri - The URI for the request.
   * @param {...any} args - Additional arguments for the request.
   * @returns {Promise<module:client.ApiResponse<T>>} - The API response.
   */
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
