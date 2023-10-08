// Locales.js: Client for the zendesk API.
const {Client} = require('../client');

/**
 * @class
 * @description Represents the Locales endpoint of the Zendesk REST API wrapper.
 * @see {@link https://developer.zendesk.com/api-reference/ticketing/account-configuration/locales/}
 */
class Locales extends Client {
  constructor(options) {
    super(options);
    this.jsonAPINames = ['locales', 'locale'];
  }

  /**
   * Lists all the translation locales available for the account.
   * @returns {Promise<object[]>} List of locales.
   * @async
   * @throws {Error} Throws an error if the API request fails.
   * @see {@link https://developer.zendesk.com/api-reference/ticketing/account-configuration/locales/#list-locales}
   * @example
   * const client = createClient({...});
   * const locales = await client.locales.list();
   */
  async list() {
    return this.getAll(['locales']);
  }

  /**
   * Retrieves information about a specific locale based on the localeID.
   * @param {number|string} localeID - The ID or the BCP-47 code of the locale (e.g., 'en-US', 'es-419').
   * @returns {Promise<object>} Details of the specified locale.
   * @async
   * @throws {Error} Throws an error if the API request fails.
   * @see {@link https://developer.zendesk.com/api-reference/ticketing/account-configuration/locales/#show-locale}
   * @example
   * const client = createClient({...});
   * const locale = await client.locales.show('en-US');
   */
  async show(localeID) {
    return this.get(['locales', localeID]);
  }

  /**
   * Retrieves the locale information of the currently logged-in user.
   * @returns {Promise<object>} Details of the current user's locale.
   * @async
   * @throws {Error} Throws an error if the API request fails.
   * @see {@link https://developer.zendesk.com/api-reference/ticketing/account-configuration/locales/#show-current-locale}
   * @example
   * const client = createClient({...});
   * const currentLocale = await client.locales.showCurrent();
   */
  async showCurrent() {
    return this.get(['locales', 'current']);
  }

  /**
   * Alias for showCurrent. Retrieves the locale information of the currently logged-in user.
   * @returns {Promise<object>} Details of the current user's locale.
   * @async
   * @throws {Error} Throws an error if the API request fails.
   * @see {@link https://developer.zendesk.com/api-reference/ticketing/account-configuration/locales/#show-current-locale}
   * @example
   * const client = createClient({...});
   * const currentLocale = await client.locales.current();
   */
  async current() {
    return this.get(['locales', 'current']);
  }

  /**
   * Lists the translation locales that have been localized for agents on a specific account.
   * @returns {Promise<object[]>} List of locales available for agents.
   * @async
   * @throws {Error} Throws an error if the API request fails.
   * @see {@link https://developer.zendesk.com/api-reference/ticketing/account-configuration/locales/#list-locales-for-agent}
   * @example
   * const client = createClient({...});
   * const agentLocales = await client.locales.listForAgent();
   */
  async listForAgent() {
    return this.getAll(['locales', 'agent']);
  }

  /**
   * Lists the translation locales that are available to all accounts.
   * @returns {Promise<object[]>} List of public locales available to all accounts.
   * @async
   * @throws {Error} Throws an error if the API request fails.
   * @see {@link https://developer.zendesk.com/api-reference/ticketing/account-configuration/locales/#list-available-public-locales}
   * @example
   * const client = createClient({...});
   * const publicLocales = await client.locales.listPublicLocales();
   */
  async listPublicLocales() {
    return this.getAll(['locales', 'public']);
  }

  /**
   * Detects the best language/locale for the user based on provided available locales.
   * @param {string[]} availableLocales - Array of available locales e.g., ['es', 'ja', 'en-uk'].
   * @returns {Promise<object>} Best detected locale for the user.
   * @async
   * @throws {Error} Throws an error if the API request fails.
   * @see {@link https://developer.zendesk.com/api-reference/ticketing/account-configuration/locales/#detect-best-language-for-user}
   * @example
   * const client = createClient({...});
   * const bestLocale = await client.locales.detectBestLocale(['es', 'ja', 'en-uk']);
   */
  async detectBestLocale(availableLocales) {
    return this.put(['locales', 'detect_best_locale'], {
      available_locales: availableLocales,
    });
  }
}

exports.Locales = Locales;
