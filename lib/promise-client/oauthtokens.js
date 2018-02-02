//oauthtokens.js: Client for the zendesk API.

var util        = require('util'),
    Client      = require('./client').Client,
    defaultUser = require('./helpers').defaultUser;

var OauthTokens = exports.OauthTokens = function (options) {
  this.jsonAPINames = [ 'oauthtokens', 'oauthtoken' ];
  Client.call(this, options);
};

// Inherit from Client base object
util.inherits(OauthTokens, Client);

OauthTokens.prototype.show = function (id) {
  return this.request('GET', ['oauth', 'tokens', id]);
};

OauthTokens.prototype.current = function () {
  this.show('current');
};

OauthTokens.prototype.list = function () {
  return this.requestAll('GET', ['oauth', 'tokens']);
};

OauthTokens.prototype.revoke = function (id) {
  return this.request('DELETE', ['oauth', 'tokens', id]);
};

OauthTokens.prototype.create = function (token) {
  return this.request('POST', ['oauth', 'tokens'], token);
};
