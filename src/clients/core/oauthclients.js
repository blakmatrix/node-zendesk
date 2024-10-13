// File: oauthclients.js
const {Client} = require('../client');

/**
 * Represents a client for Zendesk OAuth Clients API.
 * @see {@link https://developer.zendesk.com/api-reference/ticketing/oauth/oauth_clients/}
 */
class OAuthClients extends Client {
  constructor(options) {
    super(options);
    this.jsonAPINames = ['oauthclients', 'oauthclient', 'clients'];
  }

  /**
   * Lists all OAuth clients.
   * @returns {Promise<Array>} A list of OAuth clients.
   * @throws {Error} Throws an error if the request fails.
   * @see {@link https://developer.zendesk.com/api-reference/ticketing/oauth/oauth_clients/#list-clients}
   * @example const clientsList = await client.oauthclients.list();
   */
  async list() {
    return this.getAll(['oauth', 'clients']);
  }

  /**
   * Retrieves a specific OAuth client by ID.
   * @param {number} id - The ID of the OAuth client.
   * @returns {Promise<{response: object, result: object}>} The OAuth client details.
   * @throws {Error} Throws an error if the request fails.
   * @see {@link https://developer.zendesk.com/api-reference/ticketing/oauth/oauth_clients/#show-client}
   * @example const clientDetails = await client.oauthclients.show(1234);
   */
  async show(id) {
    return this.get(['oauth', 'clients', id]);
  }

  /**
   * Creates a new OAuth client with the provided details.
   * @param {object} client - The details of the client to be created.
   * @returns {Promise<{response: object, result: object}>} The details of the created OAuth client.
   * @throws {Error} Throws an error if the request fails.
   * @see {@link https://developer.zendesk.com/api-reference/ticketing/oauth/oauth_clients/#create-client}
   * @example
   * const newClient = {
   *   name: "Test Client",
   *   identifier: "unique_id"
   * };
   * const createdClient = await client.oauthclients.create(newClient);
   */
  async create(client) {
    return this.post(['oauth', 'clients'], {client});
  }

  /**
   * Updates a specific OAuth client by ID.
   * @param {number} id - The ID of the OAuth client.
   * @param {object} client - The new details of the client.
   * @returns {Promise<{response: object, result: object}>} The updated OAuth client details.
   * @throws {Error} Throws an error if the request fails.
   * @see {@link https://developer.zendesk.com/api-reference/ticketing/oauth/oauth_clients/#update-client}
   * @example
   * const updatedClient = {
   *   name: "My New OAuth2 Client"
   * };
   * const updatedDetails = await client.oauthclients.update(1234, updatedClient);
   */
  async update(id, client) {
    return this.put(['oauth', 'clients', id], {client});
  }

  /**
   * Deletes a specific OAuth client by ID.
   * @param {number} id - The ID of the OAuth client.
   * @returns {Promise<void>}
   * @throws {Error} Throws an error if the request fails.
   * @see {@link https://developer.zendesk.com/api-reference/ticketing/oauth/oauth_clients/#delete-client}
   * @example await client.oauthclients.delete(1234);
   */
  async delete(id) {
    return super.delete(['oauth', 'clients', id]);
  }

  /**
   * Generates a new client secret for a specific OAuth client by ID.
   * @param {number} id - The ID of the OAuth client.
   * @returns {Promise<{response: object, result: object}>} The new client secret.
   * @throws {Error} Throws an error if the request fails.
   * @see {@link https://developer.zendesk.com/api-reference/ticketing/oauth/oauth_clients/#generate-secret}
   * @example const newSecret = await client.oauthclients.generateSecret(1234);
   */
  async generateSecret(id) {
    return this.put(['oauth', 'clients', id, 'generate_secret']);
  }
}

exports.OAuthClients = OAuthClients;
