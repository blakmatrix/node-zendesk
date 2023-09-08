// Organizationfields.js: Client for the zendesk API.
const {Client} = require('../client');

/**
 * Class representing the OrganizationFields API endpoints.
 * @see {@link https://developer.zendesk.com/api-reference/ticketing/organizations/organization_fields/}
 */
class OrganizationFields extends Client {
  constructor(options) {
    super(options);
    this.jsonAPINames = ['organization_fields', 'organization_field'];
  }

  /**
   * List all organization fields.
   * @async
   * @see {@link https://developer.zendesk.com/api-reference/ticketing/organizations/organization_fields/#list-organization-fields}
   * @returns {Promise<Object>} The organization fields.
   * @example const orgFields = await client.organizationfields.list();
   */
  async list() {
    return this.getAll(['organization_fields']);
  }

  /**
   * Show a specific organization field.
   * @async
   * @param {number} organizationFieldID - The ID of the organization field.
   * @returns {Promise<Object>} The organization field details.
   * @throws {Error} Throws an error if the organization field is not found.
   * @see {@link https://developer.zendesk.com/api-reference/ticketing/organizations/organization_fields/#show-organization-field}
   * @example const orgField = await client.organizationfields.show(12345);
   */
  async show(organizationFieldID) {
    return this.get(['organization_fields', organizationFieldID]);
  }

  /**
   * Create a new organization field.
   * @async
   * @param {Object} organizationField - The organization field object.
   * @returns {Promise<Object>} The newly created organization field.
   * @see {@link https://developer.zendesk.com/api-reference/ticketing/organizations/organization_fields/#create-organization-field}
   * @example const newOrgField = await client.organizationfields.create({ type: 'text', title: 'Support description' });
   */
  async create(organizationField) {
    return this.post(['organization_fields'], organizationField);
  }

  /**
   * Update an existing organization field.
   * @async
   * @param {number} organizationFieldID - The ID of the organization field to update.
   * @param {Object} organizationField - The updated organization field object.
   * @returns {Promise<Object>} The updated organization field.
   * @see {@link https://developer.zendesk.com/api-reference/ticketing/organizations/organization_fields/#update-organization-field}
   * @example const updatedOrgField = await client.organizationfields.update(12345, { title: 'New title' });
   */
  async update(organizationFieldID, organizationField) {
    return this.put(
      ['organization_fields', organizationFieldID],
      organizationField,
    );
  }

  /**
   * Delete an organization field.
   * @async
   * @param {number} organizationFieldID - The ID of the organization field to delete.
   * @returns {Promise<Object>} Response indicating the deletion status.
   * @throws {Error} Throws an error if the deletion fails.
   * @see {@link https://developer.zendesk.com/api-reference/ticketing/organizations/organization_fields/#delete-organization-field}
   * @example await client.organizationfields.delete(12345);
   */
  async delete(organizationFieldID) {
    return super.delete(['organization_fields', organizationFieldID]);
  }

  /**
   * Reorder the organization fields.
   * @async
   * @param {Array<number>} organizationFieldIds - An array of organization field IDs in the desired order.
   * @returns {Promise<Object>} The reordered organization fields.
   * @see {@link https://developer.zendesk.com/api-reference/ticketing/organizations/organization_fields/#reorder-organization-field}
   * @example await client.organizationfields.reorder([3, 4]);
   */
  async reorder(organizationFieldIds) {
    return this.put(['organization_fields', 'reorder'], {
      organization_field_ids: organizationFieldIds,
    });
  }
}

exports.OrganizationFields = OrganizationFields;
