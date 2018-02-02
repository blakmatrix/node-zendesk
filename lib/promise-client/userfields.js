//userfields.js: Client for the zendesk API.


var util        = require('util'),
  Client      = require('./client').Client,
  defaultUser = require('./helpers').defaultUser;


var UserFields = exports.UserFields = function (options) {
  this.jsonAPINames = [ 'user_fields', 'user_field' ];
  Client.call(this, options);
};

// Inherit from Client base object
util.inherits(UserFields, Client);

// ######################################################## UserFields
// ====================================== Listing UserFields
UserFields.prototype.list = function () {
  return this.requestAll('GET', ['user_fields']);//all
};


// ====================================== Viewing UserFields
UserFields.prototype.show = function (userFieldID) {
  return this.request('GET', ['user_fields', userFieldID]);
};

// ====================================== Creating UserFields
UserFields.prototype.create = function (userField) {
  return this.request('POST', ['user_fields'], userField);
};

// ====================================== Updating UserFields
UserFields.prototype.update = function (userFieldID, userField) {
  return this.request('PUT', ['user_fields', userFieldID], userField);
};

// ====================================== Deleting UserFields
UserFields.prototype.delete = function (userFieldID) {
  return this.request('DELETE', ['user_fields', userFieldID]);
};
