//organizationfields.js: Client for the zendesk API.


var util        = require('util'),
    Client      = require('./client').Client,
    defaultUser = require('./helpers').defaultUser;


var OrganizationFields = exports.OrganizationFields = function (options) {
  this.jsonAPIName = 'organization_fields';
  this.jsonAPIName2 = 'organization_field';
  Client.call(this, options);
};

// Inherit from Client base object
util.inherits(OrganizationFields, Client);

// ######################################################## OrganizationFields
// ====================================== Listing OrganizationFields
OrganizationFields.prototype.list = function (cb) {
  this.requestAll('GET', ['organization_fields'], cb);//all
};


// ====================================== Viewing OrganizationFields
OrganizationFields.prototype.show = function (userFieldID, cb) {
  this.request('GET', ['organization_fields', userFieldID], cb);
};

// ====================================== Creating OrganizationFields
OrganizationFields.prototype.create = function (userField, cb) {
  this.request('POST', ['organization_fields'], userField, cb);
};

// ====================================== Updating OrganizationFields
OrganizationFields.prototype.update = function (userFieldID, userField, cb) {
  this.request('PUT', ['organization_fields', userFieldID], userField, cb);
};

// ====================================== Deleting OrganizationFields
OrganizationFields.prototype.delete = function (userFieldID, cb) {
  this.request('DELETE', ['organization_fields', userFieldID],  cb);
};
