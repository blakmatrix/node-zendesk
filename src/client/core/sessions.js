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
   * @async
   * @returns {Promise<Object[]>} Array of sessions.
   * @example
   * const sessions = await client.sessions.get();
   * @see {@link https://developer.zendesk.com/api-reference/ticketing/account-configuration/sessions/#list-sessions}
   */
  async get() {
    return this.getAll(['sessions']);
  }

  /**
   * List sessions by user ID.
   * @async
   * @param {number} userId - The ID of the user.
   * @returns {Promise<Object[]>} Array of sessions.
   * @example
   * const sessions = await client.sessions.getByUserId(12345);
   * @see {@link https://developer.zendesk.com/api-reference/ticketing/account-configuration/sessions/#list-sessions}
   */
  async getByUserId(userId) {
    return this.getAll(['users', userId, 'sessions']);
  }

  /**
   * Retrieve a specific session by user ID and session ID.
   * @async
   * @param {number} userId - The ID of the user.
   * @param {number} sessionId - The ID of the session.
   * @returns {Promise<Object>} Session details.
   * @example
   * const session = await client.sessions.getByUserIdBySessionId(12345, 67890);
   * @see {@link https://developer.zendesk.com/api-reference/ticketing/account-configuration/sessions/#show-session}
   */
  async getByUserIdBySessionId(userId, sessionId) {
    return this.get(['users', userId, 'sessions', sessionId]);
  }

  /**
   * Retrieve details of the currently authenticated session.
   * @async
   * @returns {Promise<Object>} Session details.
   * @example
   * const session = await client.sessions.getMyAuthenticatedSession();
   * @see {@link https://developer.zendesk.com/api-reference/ticketing/account-configuration/sessions/#show-the-currently-authenticated-session}
   */
  async getMyAuthenticatedSession() {
    return this.get(['users', 'me', 'session']);
  }

  /**
   * Delete a specific session by user ID and session ID.
   * @async
   * @param {number} userId - The ID of the user.
   * @param {number} sessionId - The ID of the session.
   * @returns {Promise<void>}
   * @throws Will throw an error if the request fails.
   * @example
   * await client.sessions.deleteByUserIdBySessionId(12345, 67890);
   * @see {@link https://developer.zendesk.com/api-reference/ticketing/account-configuration/sessions/#delete-session}
   */
  async deleteByUserIdBySessionId(userId, sessionId) {
    return super.delete(['users', userId, 'sessions', sessionId]);
  }

  /**
   * Delete all sessions for a specific user by user ID.
   * @async
   * @param {number} userId - The ID of the user.
   * @returns {Promise<void>}
   * @throws Will throw an error if the request fails.
   * @example
   * await client.sessions.bulkDeleteByUserId(12345);
   * @see {@link https://developer.zendesk.com/api-reference/ticketing/account-configuration/sessions/#bulk-delete-sessions}
   */
  async bulkDeleteByUserId(userId) {
    return super.delete(['users', userId, 'sessions']);
  }

  /**
   * Logs out the current authenticated user.
   * @async
   * @returns {Promise<void>}
   * @throws Will throw an error if the request fails.
   * @example
   * await client.sessions.logMeOut();
   * @see {@link https://developer.zendesk.com/api-reference/ticketing/account-configuration/sessions/#delete-the-authenticated-session}
   */
  async logMeOut() {
    return super.delete(['users', 'me', 'sessions']);
  }
}

exports.Sessions = Sessions;
