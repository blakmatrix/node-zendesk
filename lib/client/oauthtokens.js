//oauthtokens.js: Client for the zendesk API.

var util        = require('util'),
    Client      = require('./client').Client;

var OauthTokens = exports.OauthTokens = function (options) {
  this.jsonAPINames = [ 'oauthtokens', 'oauthtoken' ];
  Client.call(this, options);
};

// Inherit from Client base object
util.inherits(OauthTokens, Client);

OauthTokens.prototype.show = function (id, cb) {
  return this.request('GET', ['oauth', 'tokens', id], cb);
};

OauthTokens.prototype.current = function (cb) {
  return this.show('current', cb);
};

OauthTokens.prototype.list = function (cb) {
  return this.requestAll('GET', ['oauth', 'tokens'], cb);
};

OauthTokens.prototype.revoke = function (id, cb) {
  return this.request('DELETE', ['oauth', 'tokens', id], cb);
};

OauthTokens.prototype.create = function (token, cb) {
  return this.request('POST', ['oauth', 'tokens'], token, cb);
};
