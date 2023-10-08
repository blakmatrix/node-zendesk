/**
 * @private
 */
class ZendeskClientServices {
  /**
   * @param client {import('../../index.js').ZendeskClient}
   */
  constructor(client) {
    this.client = client;
  }

  /**
   * @template {T} [T=import('../../client/client.js').Client]
   * @param {{ new (options: import('../../index.js').ZendeskClientOptions): T }} className
   * @return {T}
   * @private
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
