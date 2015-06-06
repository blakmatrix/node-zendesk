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
UserFields.prototype.list = function (cb) {
  this.requestAll('GET', ['user_fields'], cb);//all
};


// ====================================== Viewing UserFields
UserFields.prototype.show = function (userFieldID, cb) {
  this.request('GET', ['user_fields', userFieldID], cb);
};

// ====================================== Creating UserFields
UserFields.prototype.create = function (userField, cb) {
  this.request('POST', ['user_fields'], userField, cb);
};

// ====================================== Updating UserFields
UserFields.prototype.update = function (userFieldID, userField, cb) {
  this.request('PUT', ['user_fields', userFieldID], userField, cb);
};

// ====================================== Deleting UserFields
UserFields.prototype.delete = function (userFieldID, cb) {
  this.request('DELETE', ['user_fields', userFieldID],  cb);
};
