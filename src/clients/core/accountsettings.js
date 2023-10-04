// AccountSettings.js: Client for the zendesk API.

const {Client} = require('../client');

/**
 * The AccountSettings class provides methods for interacting with account settings in the Zendesk JSON API.
 * {@link https://developer.zendesk.com/api-reference/ticketing/account-configuration/account_settings/ | See the Zendesk API documentation for more details}.
 * @extends Client
 */
class AccountSettings extends Client {
  constructor(options) {
    super(options);
    this.jsonAPINames = ['settings'];
  }

  /**
   * Retrieves the account settings.
   * @async
   * @returns {Promise<Object>} A promise that resolves to the account settings.
   * {@link https://developer.zendesk.com/api-reference/ticketing/account-configuration/account_settings/#show-settings | See the Zendesk API documentation for more details}.
   * @example
   * const settings = await client.accountsettings.show();
   */
  async show() {
    return this.get(['account', 'settings']);
  }

  /**
   * Updates the account settings.
   * @async
   * @param {Object} settings - The settings to update.
   * @returns {Promise<Object>} A promise that resolves to the updated account settings.
   * {@link https://developer.zendesk.com/api-reference/ticketing/account-configuration/account_settings/#update-account-settings | See the Zendesk API documentation for more details}.
   * @example
   * const settings = await client.accountsettings.update({ "settings": { "active_features": { "customer_satisfaction": false }}});
   */
  async update(settings) {
    return this.put(['account', 'settings'], settings);
  }
}

exports.AccountSettings = AccountSettings;
