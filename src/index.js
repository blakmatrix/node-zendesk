// Index.js - node-zendesk client initialization
'use strict';

const {MODULES, ENDPOINTS} = require('./constants');

/**
 * Represents the main client to interface with the Zendesk API.
 * This class acts as a high-level interface, making it easier to interact with specific Zendesk APIs.
 *
 * @class
 * @property {object} options - Configuration options for the client.
 * @property {string} options.username - The username used for authentication.
 * @property {string} options.token - The authentication token.
 * @property {string} [options.subdomain] - The subdomain for the Zendesk account (e.g., 'mycompany' for 'mycompany.zendesk.com').
 *                                        If the `endpointUri` option is provided, `subdomain` will be ignored and the logic
 *                                        to manage multi-type endpoints will be disabled.
 * @property {string[]} [options.apiType=['core']] - Type of Zendesk API to initialize (e.g., 'core', 'helpcenter').
 *                                       Determines which sub-client to use.
 * @property {string} [options.endpointUri] - The base URI for the Zendesk API. Overrides and ignores `subdomain` if provided.
 * @property {function} [options.get] - Function to get specific options. By default, accesses property from the options.
 * @property {boolean} [options.oauth] - Flag to indicate if OAuth is used.
 * @property {string} [options.asUser] - Optional header for making requests on behalf of a user.
 * @property {object} [options.customHeaders] - Any additional custom headers for the request.
 * @property {boolean} [options.throttle] - Flag to enable throttling of requests.
 * @property {boolean} [options.debug=false] - Flag to enable or disable debug logging.
 * @property {object} [options.logger=ConsoleLogger] - Optional logger for logging. Should have methods like `info`, `error`, etc. Defaults to a basic console logger.
 *
 * @example
 * const zendeskOptions = {
 *     username: 'exampleUser',
 *     token: 'exampleToken',
 *     subdomain: 'mycompany'
 * };
 * const zendeskClient = new ZendeskClient(zendeskOptions);
 * const data = await zendeskClient.someResource.someMethod();
 */
class ZendeskClient {
  constructor(options = {}) {
    this.config = options;
    const ConsoleLogger = options.logger ? null : require('./logger');
    this.logger = options.logger || new ConsoleLogger(); // Use provided logger or default to console logger
    this.client = {};
    this._initializeClientModules();
  }

  _getEndpoint(apiType) {
    return ENDPOINTS[apiType] || ENDPOINTS.core;
  }

  _initializeClientModules() {
    const {
      subdomain,
      apiType = ['core'],
      remoteUri: providedRemoteUri,
    } = this.config;

    // Ensure apiType is always an array
    const clientTypes = Array.isArray(apiType) ? apiType : [apiType];

    for (const type of clientTypes) {
      if (!ENDPOINTS[type] || !MODULES[type]) {
        throw new Error(`Invalid apiType provided: ${type}`);
      }

      const endpoint = this._getEndpoint(type);
      const remoteUri = providedRemoteUri || `https://${subdomain}${endpoint}`;

      const clientModules = MODULES[type];

      for (const module of clientModules) {
        const moduleName = module.toLowerCase();
        const ModuleClass = require(`./client/${type}/${moduleName}`)[module];
        this.client[moduleName] = new ModuleClass({...this.config, remoteUri});
        this.client[moduleName].on('debug::request', this._debug.bind(this));
        this.client[moduleName].on('debug::response', this._debug.bind(this));
      }
    }
  }

  _debug(args) {
    if (this.config.debug) {
      if (args.result) {
        args.result = String(args.result);
      }

      this.logger.debug(args);
    }
  }
}

module.exports = {
  createClient: (options) => new ZendeskClient(options).client,
};
