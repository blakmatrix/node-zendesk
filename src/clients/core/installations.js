// Installations.js: Client for the zendesk API.
const {Client} = require('../client');

class Installations extends Client {
  constructor(options) {
    super(options);
    this.jsonAPINames = ['installations', 'installation'];
  }

  /**
   * List all app installations in the account.
   * @returns {Promise<Array<object>>} An array of app installation objects.
   * @async
   * @throws {Error} Throws an error if the API call is unsuccessful.
   * @see {@link https://developer.zendesk.com/api-reference/ticketing/apps/apps/#list-app-installations}
   * @example
   * const client = createClient({...});
   * const appInstallations = await client.apps.list();
   */
  async list() {
    return this.getAll(['apps', 'installations']);
  }

  /**
   * Retrieve details of a specific app installation by its ID.
   * @param {number|string} installationID - The unique identifier for the app installation.
   * @returns {Promise<object>} The app installation details as an object.
   * @async
   * @throws {Error} Throws an error if the API call is unsuccessful or the installationID is invalid.
   * @see {@link https://developer.zendesk.com/api-reference/ticketing/apps/apps/#show-app-installation}
   * @example
   * const client = createClient({...});
   * const appInstallationDetails = await client.apps.show(12345); // Replace 12345 with a valid installation ID
   */
  async show(installationID) {
    return this.get(['apps', 'installations', installationID]);
  }

  /**
   * Create a new app installation.
   * @param {object} installation - The app installation data to be created.
   * @returns {Promise<object>} The response data from creating the app installation.
   * @async
   * @throws {Error} Throws an error if the API call is unsuccessful or if the installation data is invalid.
   * @see {@link https://developer.zendesk.com/api-reference/ticketing/apps/apps/#install-app} For more details about creating an installation.
   * @example
   * const client = createClient({...});
   * const installationData = {
   *   name: 'My App Installation',
   *   config: {...},
   *   // ... other installation properties ...
   * };
   * const response = await client.installations.create(installationData);
   */
  async create(installation) {
    return this.post(['apps', 'installations'], installation);
  }

  /**
   * Updates a specific app installation.
   * @param {number} installationID - The ID of the app installation.
   * @param {object} installation - The updated installation data.
   * @returns {Promise<object>} Returns the response from Zendesk API.
   * @async
   * @throws {Error} Throws an error if the API call is unsuccessful.
   * @see {@link https://developer.zendesk.com/api-reference/ticketing/apps/apps/#update-app-installation}
   * @example
   * const client = createClient({...});
   * const updatedInstallationData = {
   *   settings: {
   *     name: "Helpful App - Updated",
   *     api_token: "659323ngt4ut9an"
   *   }
   * };
   * const response = await client.installations.update(12345, updatedInstallationData);
   */
  async update(installationID, installation) {
    return this.put(['apps', 'installations', installationID], installation);
  }

  /**
   * Removes a specific app installation.
   * @param {number} installationID - The ID of the app installation.
   * @returns {Promise<void>} Returns the response from Zendesk API.
   * @async
   * @throws {Error} Throws an error if the API call is unsuccessful.
   * @see {@link https://developer.zendesk.com/api-reference/ticketing/apps/apps/#remove-app-installation}
   * @example
   * const client = createClient({...});
   * await client.installations.delete(12345);
   */
  async delete(installationID) {
    return super.delete(['apps', 'installations', installationID]);
  }
}

exports.Installations = Installations;
