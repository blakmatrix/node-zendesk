// Organizationfields.js: Client for the zendesk API.
const {Client} = require('./client');

class OrganizationFields extends Client {
  constructor(options) {
    super(options);
    this.jsonAPINames = ['organization_fields', 'organization_field'];
  }

  // Listing OrganizationFields
  async list() {
    return this.getAll(['organization_fields']);
  }

  // Viewing OrganizationFields
  async show(organizationFieldID) {
    return this.get(['organization_fields', organizationFieldID]);
  }

  // Creating OrganizationFields
  async create(organizationField) {
    return this.post(['organization_fields'], organizationField);
  }

  // Updating OrganizationFields
  async update(organizationFieldID, organizationField) {
    return this.put(
      ['organization_fields', organizationFieldID],
      organizationField,
    );
  }

  // Deleting OrganizationFields
  async delete(organizationFieldID) {
    return this.delete(['organization_fields', organizationFieldID]);
  }
}

exports.OrganizationFields = OrganizationFields;
