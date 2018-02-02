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
OrganizationFields.prototype.list = function () {
  return this.requestAll('GET', ['organization_fields']);//all
};


// ====================================== Viewing OrganizationFields
OrganizationFields.prototype.show = function (organizationFieldID) {
  return this.request('GET', ['organization_fields', organizationFieldID]);
};

// ====================================== Creating OrganizationFields
OrganizationFields.prototype.create = function (organizationField) {
  return this.request('POST', ['organization_fields'], organizationField);
};

// ====================================== Updating OrganizationFields
OrganizationFields.prototype.update = function (organizationFieldID, organizationField) {
  return this.request('PUT', ['organization_fields', organizationFieldID], organizationField);
};

// ====================================== Deleting OrganizationFields
OrganizationFields.prototype.delete = function (organizationFieldID) {
  return this.request('DELETE', ['organization_fields', organizationFieldID]);
};
