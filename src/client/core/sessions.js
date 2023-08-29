// Sessions.js: Client for the zendesk API.
const {Client} = require('../client');

class Sessions extends Client {
  constructor(options) {
    super(options);
    this.jsonAPINames = ['sessions'];
  }

  // List Sessions
  async get() {
    return this.getAll(['sessions']);
  }

  async getByUserId(userId) {
    return this.getAll(['users', userId, 'sessions']);
  }

  async getByUserIdBySessionId(userId, sessionId) {
    return this.get(['users', userId, 'sessions', sessionId]);
  }

  async getMyAuthenticatedSession() {
    return this.get(['users', 'me', 'session']);
  }

  async deleteByUserIdBySessionId(userId, sessionId) {
    return super.delete(['users', userId, 'sessions', sessionId]);
  }

  async bulkDeleteByUserId(userId) {
    return super.delete(['users', userId, 'sessions']);
  }

  async logMeOut() {
    return super.delete(['users', 'me', 'sessions']);
  }
}

exports.Sessions = Sessions;
