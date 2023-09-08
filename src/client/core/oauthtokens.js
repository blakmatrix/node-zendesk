// File: oauthtokens.js
const {Client} = require('../client');

/**
 * Represents a client for Zendesk OAuth Tokens API.
 * @see {@link https://developer.zendesk.com/api-reference/ticketing/oauth/oauth_tokens/}
 */
class OauthTokens extends Client {
  constructor(options) {
    super(options);
    this.jsonAPINames = ['oauthtokens', 'oauthtoken'];
  }

  /**
   * Retrieves a specific OAuth token by ID.
   * @async
   * @param {number|string} id - The ID of the OAuth token or "current" for the currently authenticated token.
   * @returns {Promise<Object>} The OAuth token details.
   * @throws {Error} Throws an error if the request fails.
   * @example const tokenDetails = await client.oauthtokens.show(1234);
   * @see {@link https://developer.zendesk.com/api-reference/ticketing/oauth/oauth_tokens/#show-token}
   */
  async show(id) {
    return this.get('GET', ['oauth', 'tokens', id]);
  }

  /**
   * Retrieves the details of the currently authenticated OAuth token.
   * @async
   * @returns {Promise<Object>} The details of the currently authenticated OAuth token.
   * @throws {Error} Throws an error if the request fails.
   * @example const currentTokenDetails = await client.oauthtokens.current();
   * @see {@link https://developer.zendesk.com/api-reference/ticketing/oauth/oauth_tokens/#show-token}
   */
  async current() {
    return this.show('current');
  }

  /**
   * Lists all available OAuth tokens.
   * @async
   * @returns {Promise<Array>} A list of OAuth tokens.
   * @throws {Error} Throws an error if the request fails.
   * @example const tokensList = await client.oauthtokens.list();
   * @see {@link https://developer.zendesk.com/api-reference/ticketing/oauth/oauth_tokens/#list-tokens}
   */
  async list() {
    return this.getAll(['oauth', 'tokens']);
  }

  /**
   * Revokes a specific OAuth token by ID.
   * @async
   * @param {number} id - The ID of the OAuth token.
   * @returns {Promise<void>}
   * @throws {Error} Throws an error if the request fails.
   * @example await client.oauthtokens.revoke(1234);
   * @see {@link https://developer.zendesk.com/api-reference/ticketing/oauth/oauth_tokens/#revoke-token}
   */
  async revoke(id) {
    return super.delete(['oauth', 'tokens', id]);
  }

  /**
   * Creates a new OAuth token with the provided details.
   * @async
   * @param {Object} token - The details of the token to be created. Must include client_id and scopes.
   * @returns {Promise<Object>} The details of the created OAuth token.
   * @throws {Error} Throws an error if the request fails.
   * @example const createdToken = await client.oauthtokens.create({client_id: 1234, scopes: ["read", "write"]});
   * @see {@link https://developer.zendesk.com/api-reference/ticketing/oauth/oauth_tokens/#create-token}
   */
  async create(token) {
    return this.post(['oauth', 'tokens'], token);
  }
}

exports.OauthTokens = OauthTokens;
