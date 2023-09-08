// Installations.js: Client for the zendesk API.
const {Client} = require('../client');

class Installations extends Client {
  constructor(options) {
    super(options);
    this.jsonAPINames = ['installations', 'installation'];
  }

  /**
   * List all app installations in the account.
   *
   * @async
   * @returns {Promise<Array<Object>>} An array of app installation objects.
   *
   * @example
   * const client = createClient({...});
   * const appInstallations = await client.apps.list();
   *
   * @see {@link https://developer.zendesk.com/api-reference/ticketing/apps/apps/#list-app-installations}
   * @throws {Error} Throws an error if the API call is unsuccessful.
   */
  async list() {
    return this.getAll(['apps', 'installations']);
  }

  /**
   * Retrieve details of a specific app installation by its ID.
   *
   * @async
   * @param {number|string} installationID - The unique identifier for the app installation.
   * @returns {Promise<Object>} The app installation details as an object.
   *
   * @example
   * const client = createClient({...});
   * const appInstallationDetails = await client.apps.show(12345); // Replace 12345 with a valid installation ID
   *
   * @see {@link https://developer.zendesk.com/api-reference/ticketing/apps/apps/#show-app-installation}
   * @throws {Error} Throws an error if the API call is unsuccessful or the installationID is invalid.
   */
  async show(installationID) {
    return this.get(['apps', 'installations', installationID]);
  }

  /**
   * Create a new app installation.
   *
   * @async
   * @param {Object} installation - The app installation data to be created.
   * @returns {Promise<Object>} The response data from creating the app installation.
   *
   * @example
   * const client = createClient({...});
   * const installationData = {
   *   name: 'My App Installation',
   *   config: {...},
   *   // ... other installation properties ...
   * };
   * const response = await client.installations.create(installationData);
   *
   * @throws {Error} Throws an error if the API call is unsuccessful or if the installation data is invalid.
   *
   * @see {@link https://developer.zendesk.com/api-reference/ticketing/apps/apps/#install-app} For more details about creating an installation.
   */
  async create(installation) {
    return this.post(['apps', 'installations'], installation);
  }

  /**
   * Updates a specific app installation.
   * @async
   * @param {number} installationID - The ID of the app installation.
   * @param {object} installation - The updated installation data.
   * @returns {Promise<object>} Returns the response from Zendesk API.
   * @throws {Error} Throws an error if the API call is unsuccessful.
   * @example
   * const client = createClient({...});
   * const updatedInstallationData = {
   *   settings: {
   *     name: "Helpful App - Updated",
   *     api_token: "659323ngt4ut9an"
   *   }
   * };
   * const response = await client.installations.update(12345, updatedInstallationData);
   * @see {@link https://developer.zendesk.com/api-reference/ticketing/apps/apps/#update-app-installation}
   */
  async update(installationID, installation) {
    return this.put(['apps', 'installations', installationID], installation);
  }

  /**
   * Removes a specific app installation.
   * @async
   * @param {number} installationID - The ID of the app installation.
   * @returns {Promise<void>} Returns the response from Zendesk API.
   * @throws {Error} Throws an error if the API call is unsuccessful.
   * @example
   * const client = createClient({...});
   * await client.installations.delete(12345);
   * @see {@link https://developer.zendesk.com/api-reference/ticketing/apps/apps/#remove-app-installation}
   */
  async delete(installationID) {
    return super.delete(['apps', 'installations', installationID]);
  }
}

exports.Installations = Installations;
