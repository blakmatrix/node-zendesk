/**
 * @private
 */
class ZendeskClientNps {
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

  get invitations() {
    const { Invitations } = require('./invitations');
    return this._instantiate(Invitations);
  }

  get surveys() {
    const { Surveys } = require('./surveys');
    return this._instantiate(Surveys);
  }
}

module.exports = { ZendeskClientNps };