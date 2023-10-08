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
   * @param {number|string} id - The ID of the OAuth token or "current" for the currently authenticated token.
   * @returns {Promise<object>} The OAuth token details.
   * @async
   * @throws {Error} Throws an error if the request fails.
   * @see {@link https://developer.zendesk.com/api-reference/ticketing/oauth/oauth_tokens/#show-token}
   * @example const tokenDetails = await client.oauthtokens.show(1234);
   */
  async show(id) {
    return this.get('GET', ['oauth', 'tokens', id]);
  }

  /**
   * Retrieves the details of the currently authenticated OAuth token.
   * @returns {Promise<object>} The details of the currently authenticated OAuth token.
   * @async
   * @throws {Error} Throws an error if the request fails.
   * @see {@link https://developer.zendesk.com/api-reference/ticketing/oauth/oauth_tokens/#show-token}
   * @example const currentTokenDetails = await client.oauthtokens.current();
   */
  async current() {
    return this.show('current');
  }

  /**
   * Lists all available OAuth tokens.
   * @returns {Promise<Array>} A list of OAuth tokens.
   * @async
   * @throws {Error} Throws an error if the request fails.
   * @see {@link https://developer.zendesk.com/api-reference/ticketing/oauth/oauth_tokens/#list-tokens}
   * @example const tokensList = await client.oauthtokens.list();
   */
  async list() {
    return this.getAll(['oauth', 'tokens']);
  }

  /**
   * Revokes a specific OAuth token by ID.
   * @param {number} id - The ID of the OAuth token.
   * @returns {Promise<void>}
   * @async
   * @throws {Error} Throws an error if the request fails.
   * @see {@link https://developer.zendesk.com/api-reference/ticketing/oauth/oauth_tokens/#revoke-token}
   * @example await client.oauthtokens.revoke(1234);
   */
  async revoke(id) {
    return super.delete(['oauth', 'tokens', id]);
  }

  /**
   * Creates a new OAuth token with the provided details.
   * @param {object} token - The details of the token to be created. Must include client_id and scopes.
   * @returns {Promise<object>} The details of the created OAuth token.
   * @async
   * @throws {Error} Throws an error if the request fails.
   * @see {@link https://developer.zendesk.com/api-reference/ticketing/oauth/oauth_tokens/#create-token}
   * @example const createdToken = await client.oauthtokens.create({client_id: 1234, scopes: ["read", "write"]});
   */
  async create(token) {
    return this.post(['oauth', 'tokens'], token);
  }
}

exports.OauthTokens = OauthTokens;
