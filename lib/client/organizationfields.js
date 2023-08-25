// Organizationfields.js: Client for the zendesk API.
const {Client} = require('./client');

class OrganizationFields extends Client {
  constructor(options) {
    super(options);
    this.jsonAPINames = ['organization_fields', 'organization_field'];
  }

  // Listing OrganizationFields
  list(cb) {
    return this.getAll(['organization_fields'], cb);
  }

  // Viewing OrganizationFields
  show(organizationFieldID, cb) {
    return this.get(['organization_fields', organizationFieldID], cb);
  }

  // Creating OrganizationFields
  create(organizationField, cb) {
    return this.post(['organization_fields'], organizationField, cb);
  }

  // Updating OrganizationFields
  update(organizationFieldID, organizationField, cb) {
    return this.put(
      ['organization_fields', organizationFieldID],
      organizationField,
      cb,
    );
  }

  // Deleting OrganizationFields
  delete(organizationFieldID, cb) {
    return this.delete(['organization_fields', organizationFieldID], cb);
  }
}

exports.OrganizationFields = OrganizationFields;
