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
Sessions.prototype.get = function (cb) {
  this.requestAll('GET', ['sessions'], cb);
};

Sessions.prototype.getByUserId = function (userId, cb) {
  this.requestAll('GET', ['users', userId, 'sessions'], cb);
};

Sessions.prototype.getByUserIdBySessionId  = function (userId, sessionId, cb) {
  this.request('GET', ['users', userId, 'sessions', sessionId], cb);
};

Sessions.prototype.getMyAuthenticatedSession = function (cb) {
  this.request('GET', ['users', 'me', 'session'], cb);
};

Sessions.prototype.deleteByUserIdBySessionId = function (userId, sessionId, cb) {
  this.request('DELETE', ['users', userId, 'sessions', sessionId], cb);
};

Sessions.prototype.bulkDeleteByUserId = function (userId, cb) {
  this.request('DELETE', ['users', userId, 'sessions'], cb);
};

Sessions.prototype.logMeOut = function (cb) {
  this.request('DELETE', ['users', 'me', 'sessions'], cb);
};

