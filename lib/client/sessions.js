// Sessions.js: Client for the zendesk API.
const {Client} = require('./client');

class Sessions extends Client {
  constructor(options) {
    super(options);
    this.jsonAPINames = ['sessions'];
  }

  // List Sessions
  get(cb) {
    return this.getAll(['sessions'], cb);
  }

  getByUserId(userId, cb) {
    return this.getAll(['users', userId, 'sessions'], cb);
  }

  getByUserIdBySessionId(userId, sessionId, cb) {
    return this.get(['users', userId, 'sessions', sessionId], cb);
  }

  getMyAuthenticatedSession(cb) {
    return this.get(['users', 'me', 'session'], cb);
  }

  deleteByUserIdBySessionId(userId, sessionId, cb) {
    return this.delete(['users', userId, 'sessions', sessionId], cb);
  }

  bulkDeleteByUserId(userId, cb) {
    return this.delete(['users', userId, 'sessions'], cb);
  }

  logMeOut(cb) {
    return this.delete(['users', 'me', 'sessions'], cb);
  }
}

exports.Sessions = Sessions;
