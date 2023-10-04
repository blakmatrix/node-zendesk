/**
 * @private
 */
class ZendeskClientVoice {
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

  get currentqueueactivity() {
    const {CurrentQueueActivity} = require('./currentqueueactivity');
    return this._instantiate(CurrentQueueActivity);
  }

  get greetingcategories() {
    const {GreetingCategories} = require('./greetingcategories');
    return this._instantiate(GreetingCategories);
  }

  get greetings() {
    const {Greetings} = require('./greetings');
    return this._instantiate(Greetings);
  }

  get historicalqueueactivity() {
    const {HistoricalQueueActivity} = require('./historicalqueueactivity');
    return this._instantiate(HistoricalQueueActivity);
  }

  get phonenumbers() {
    const {PhoneNumbers} = require('./phonenumbers');
    return this._instantiate(PhoneNumbers);
  }
}

module.exports = {ZendeskClientVoice};
