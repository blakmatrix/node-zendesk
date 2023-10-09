// File: sessions.js
const {Client} = require('../client');

/**
 * Client class for interacting with Zendesk's Sessions API.
 * @see {@link https://developer.zendesk.com/api-reference/ticketing/account-configuration/sessions/}
 */
class Sessions extends Client {
  constructor(options) {
    super(options);
    this.jsonAPINames = ['sessions'];
  }

  /**
   * List all sessions.
   * @returns {Promise<object[]>} Array of sessions.
   * @async
   * @see {@link https://developer.zendesk.com/api-reference/ticketing/account-configuration/sessions/#list-sessions}
   * @example
   * const sessions = await client.sessions.get();
   */
  async list() {
    return this.getAll(['sessions']);
  }

  /**
   * List sessions by user ID.
   * @param {number} userId - The ID of the user.
   * @returns {Promise<object[]>} Array of sessions.
   * @async
   * @see {@link https://developer.zendesk.com/api-reference/ticketing/account-configuration/sessions/#list-sessions}
   * @example
   * const sessions = await client.sessions.getByUserId(12345);
   */
  async getByUserId(userId) {
    return this.getAll(['users', userId, 'sessions']);
  }

  /**
   * Retrieve a specific session by user ID and session ID.
   * @param {number} userId - The ID of the user.
   * @param {number} sessionId - The ID of the session.
   * @returns {Promise<object>} Session details.
   * @async
   * @see {@link https://developer.zendesk.com/api-reference/ticketing/account-configuration/sessions/#show-session}
   * @example
   * const session = await client.sessions.getByUserIdBySessionId(12345, 67890);
   */
  async getByUserIdBySessionId(userId, sessionId) {
    return this.get(['users', userId, 'sessions', sessionId]);
  }

  /**
   * Retrieve details of the currently authenticated session.
   * @returns {Promise<object>} Session details.
   * @async
   * @see {@link https://developer.zendesk.com/api-reference/ticketing/account-configuration/sessions/#show-the-currently-authenticated-session}
   * @example
   * const session = await client.sessions.getMyAuthenticatedSession();
   */
  async getMyAuthenticatedSession() {
    return this.get(['users', 'me', 'session']);
  }

  /**
   * Delete a specific session by user ID and session ID.
   * @param {number} userId - The ID of the user.
   * @param {number} sessionId - The ID of the session.
   * @returns {Promise<void>}
   * @async
   * @throws Will throw an error if the request fails.
   * @see {@link https://developer.zendesk.com/api-reference/ticketing/account-configuration/sessions/#delete-session}
   * @example
   * await client.sessions.deleteByUserIdBySessionId(12345, 67890);
   */
  async deleteByUserIdBySessionId(userId, sessionId) {
    return super.delete(['users', userId, 'sessions', sessionId]);
  }

  /**
   * Delete all sessions for a specific user by user ID.
   * @param {number} userId - The ID of the user.
   * @returns {Promise<void>}
   * @async
   * @throws Will throw an error if the request fails.
   * @see {@link https://developer.zendesk.com/api-reference/ticketing/account-configuration/sessions/#bulk-delete-sessions}
   * @example
   * await client.sessions.bulkDeleteByUserId(12345);
   */
  async bulkDeleteByUserId(userId) {
    return super.delete(['users', userId, 'sessions']);
  }

  /**
   * Logs out the current authenticated user.
   * @returns {Promise<void>}
   * @async
   * @throws Will throw an error if the request fails.
   * @see {@link https://developer.zendesk.com/api-reference/ticketing/account-configuration/sessions/#delete-the-authenticated-session}
   * @example
   * await client.sessions.logMeOut();
   */
  async logMeOut() {
    return super.delete(['users', 'me', 'sessions']);
  }
}

exports.Sessions = Sessions;
