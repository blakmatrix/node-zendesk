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
   * @returns {Promise<object>} The organization fields.
   * @async
   * @see {@link https://developer.zendesk.com/api-reference/ticketing/organizations/organization_fields/#list-organization-fields}
   * @example const orgFields = await client.organizationfields.list();
   */
  async list() {
    return this.getAll(['organization_fields']);
  }

  /**
   * Show a specific organization field.
   * @param {number} organizationFieldID - The ID of the organization field.
   * @returns {Promise<object>} The organization field details.
   * @async
   * @throws {Error} Throws an error if the organization field is not found.
   * @see {@link https://developer.zendesk.com/api-reference/ticketing/organizations/organization_fields/#show-organization-field}
   * @example const orgField = await client.organizationfields.show(12345);
   */
  async show(organizationFieldID) {
    return this.get(['organization_fields', organizationFieldID]);
  }

  /**
   * Create a new organization field.
   * @param {object} organizationField - The organization field object.
   * @returns {Promise<object>} The newly created organization field.
   * @async
   * @see {@link https://developer.zendesk.com/api-reference/ticketing/organizations/organization_fields/#create-organization-field}
   * @example const newOrgField = await client.organizationfields.create({ type: 'text', title: 'Support description' });
   */
  async create(organizationField) {
    return this.post(['organization_fields'], organizationField);
  }

  /**
   * Update an existing organization field.
   * @param {number} organizationFieldID - The ID of the organization field to update.
   * @param {object} organizationField - The updated organization field object.
   * @returns {Promise<object>} The updated organization field.
   * @async
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
   * @param {number} organizationFieldID - The ID of the organization field to delete.
   * @returns {Promise<object>} Response indicating the deletion status.
   * @async
   * @throws {Error} Throws an error if the deletion fails.
   * @see {@link https://developer.zendesk.com/api-reference/ticketing/organizations/organization_fields/#delete-organization-field}
   * @example await client.organizationfields.delete(12345);
   */
  async delete(organizationFieldID) {
    return super.delete(['organization_fields', organizationFieldID]);
  }

  /**
   * Reorder the organization fields.
   * @param {Array<number>} organizationFieldIds - An array of organization field IDs in the desired order.
   * @returns {Promise<object>} The reordered organization fields.
   * @async
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
