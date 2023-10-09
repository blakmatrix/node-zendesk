/**
 * @private
 */
class ZendeskClientVoice {
  /**
   * @param {import('../../index.js').ZendeskClient} client - The Zendesk client instance.
   */
  constructor(client) {
    this.client = client;
  }

  /**
   * @template T
   * @param {new (options: import('../../index.js').ZendeskClientOptions) => T} className - The class to instantiate.
   * @returns {T} An instance of the provided class.
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
