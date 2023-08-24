// Organizationfields.js: Client for the zendesk API.

const util = require('node:util');
const {Client} = require('./client');

const OrganizationFields = (exports.OrganizationFields = function (options) {
  this.jsonAPINames = ['organization_fields', 'organization_field'];
  Client.call(this, options);
});

// Inherit from Client base object
util.inherits(OrganizationFields, Client);

// ######################################################## OrganizationFields
// ====================================== Listing OrganizationFields
OrganizationFields.prototype.list = function (cb) {
  return this.requestAll('GET', ['organization_fields'], cb); // All
};

// ====================================== Viewing OrganizationFields
OrganizationFields.prototype.show = function (organizationFieldID, cb) {
  return this.request('GET', ['organization_fields', organizationFieldID], cb);
};

// ====================================== Creating OrganizationFields
OrganizationFields.prototype.create = function (organizationField, cb) {
  return this.request('POST', ['organization_fields'], organizationField, cb);
};

// ====================================== Updating OrganizationFields
OrganizationFields.prototype.update = function (
  organizationFieldID,
  organizationField,
  cb,
) {
  return this.request(
    'PUT',
    ['organization_fields', organizationFieldID],
    organizationField,
    cb,
  );
};

// ====================================== Deleting OrganizationFields
OrganizationFields.prototype.delete = function (organizationFieldID, cb) {
  return this.request(
    'DELETE',
    ['organization_fields', organizationFieldID],
    cb,
  );
};
