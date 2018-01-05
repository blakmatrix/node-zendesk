//organizationfields.js: Client for the zendesk API.


var util        = require('util'),
    Client      = require('./client').Client,
    defaultUser = require('./helpers').defaultUser;


var OrganizationFields = exports.OrganizationFields = function (options) {
  this.jsonAPINames = [ 'organization_fields', 'organization_field' ];
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
OrganizationFields.prototype.show = function (organizationFieldID, cb) {
  this.request('GET', ['organization_fields', organizationFieldID], cb);
};

// ====================================== Creating OrganizationFields
OrganizationFields.prototype.create = function (organizationField, cb) {
  this.request('POST', ['organization_fields'], organizationField, cb);
};

// ====================================== Updating OrganizationFields
OrganizationFields.prototype.update = function (organizationFieldID, organizationField, cb) {
  this.request('PUT', ['organization_fields', organizationFieldID], organizationField, cb);
};

// ====================================== Deleting OrganizationFields
OrganizationFields.prototype.delete = function (organizationFieldID, cb) {
  this.request('DELETE', ['organization_fields', organizationFieldID],  cb);
};
