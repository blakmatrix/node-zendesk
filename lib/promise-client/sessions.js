//Sessions.js: Client for the zendesk API.


var util        = require('util'),
    Client      = require('./client').Client;


var Sessions = exports.Sessions = function (options) {
  this.jsonAPINames = [ 'sessions' ];
  Client.call(this, options);
};

// Inherit from Client base object
util.inherits(Sessions, Client);

// ######################################################## Sessions
// ====================================== List Sessions
Sessions.prototype.get = function () {
  return this.requestAll('GET', ['sessions']);
};

Sessions.prototype.getByUserId = function (userId) {
  return this.requestAll('GET', ['users', userId, 'sessions']);
};

Sessions.prototype.getByUserIdBySessionId  = function (userId, sessionId) {
  return this.request('GET', ['users', userId, 'sessions', sessionId]);
};

Sessions.prototype.getMyAuthenticatedSession = function () {
  return this.request('GET', ['users', 'me', 'session']);
};

Sessions.prototype.deleteByUserIdBySessionId = function (userId, sessionId) {
  return this.request('DELETE', ['users', userId, 'sessions', sessionId]);
};

Sessions.prototype.bulkDeleteByUserId = function (userId) {
  return this.request('DELETE', ['users', userId, 'sessions']);
};

Sessions.prototype.logMeOut = function () {
  return this.request('DELETE', ['users', 'me', 'sessions']);
};

