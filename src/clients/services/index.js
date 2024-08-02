/**
 * Manages services for the Zendesk client.
 *
 * This class provides access to various service-related functionality within the Zendesk API.
 */
class ZendeskClientServices {
  /**
   * Creates a new instance of ZendeskClientServices.
   * @param {import('../../index.js').ZendeskClient} client - The Zendesk client instance.
   */
  constructor(client) {
    this.client = client;
  }

  /**
   * Instantiates a new service class.
   * @template T
   * @param {new (options: import('../../index.js').ZendeskClientOptions) => T} className - The class to instantiate.
   * @returns {T} An instance of the provided class.
   */
  _instantiate(className) {
    return this.client._instantiate(className);
  }

  get links() {
    const {Links} = require('./links');
    return this._instantiate(Links);
  }
}

module.exports = {ZendeskClientServices};
