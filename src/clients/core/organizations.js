// File: organizations.js
const {Client} = require('../client');

/**
 * Organizations are typically collections of your end users, but they can also include team members.
 * @typedef {object} Organization
 * @property {string} created_at - The time the organization was created (read-only)
 * @property {string} [details] - Any details about the organization, such as the address
 * @property {string[]} [domain_names] - An array of domain names associated with this organization
 * @property {string} [external_id] - A unique external id to associate organizations to an external record. The id is case-insensitive
 * @property {number} [group_id] - New tickets from users in this organization are automatically put in this group
 * @property {number} [id] - Automatically assigned when the organization is created
 * @property {string} name - A unique name for the organization (mandatory)
 * @property {string} [notes] - Any notes you have about the organization
 * @property {{[field_name: string]: string|null}} [organization_fields] - Custom fields for this organization
 * @property {boolean} [shared_comments] - End users in this organization are able to comment on each other's tickets
 * @property {boolean} [shared_tickets] - End users in this organization are able to see each other's tickets
 * @property {string[]} [tags] - The tags of the organization
 * @property {string} updated_at - The time of the last update of the organization (read-only)
 * @property {string} url - The API url of this organization (read-only)
 */

/**
 * @typedef {{
 *   organization: Omit<Organization, 'id' | 'created_at' | 'updated_at' | 'url'>
 * }} CreateOrganization
 */

/**
 * @typedef {{
 *   organizations: Omit<Organization, 'id' | 'created_at' | 'updated_at' | 'url'>[]
 * }} CreateManyOrganizations
 */

/**
 * @typedef {{
 *   organization: Partial<Omit<Organization, 'id' | 'created_at' | 'updated_at' | 'url'>>
 * }} UpdateOrganization
 */

/**
 * @typedef {{
 *   organizations: (
 *     Partial<Omit<Organization, 'id' | 'created_at' | 'updated_at' | 'url'>>
 *     & Pick<Organization, 'id'>
 *   )
 * }} UpdateOrganizationWithId
 */

/**
 * @typedef {{
 *   organizations: (
 *     Partial<Omit<Organization, 'id' | 'created_at' | 'updated_at' | 'url'>>
 *     & Pick<Organization, 'id'>
 *   )[]
 * }} UpdateManyOrganizations
 */

/**
 * @typedef {object} OrganizationRelatedResponse
 * @property {object} organization_related - Information about objects related to the organization.
 * @property {number} organization_related.tickets_count - The number of tickets related to the organization.
 * @property {number} organization_related.users_count - The number of users related to the organization.
 */

/**
 * @class
 * Client for interacting with the Zendesk Organizations API.
 * @see {@link https://developer.zendesk.com/api-reference/ticketing/organizations/organizations/}
 */
class Organizations extends Client {
  constructor(options) {
    super(options);
    this.jsonAPINames = ['organizations', 'organization'];
  }

  /**
   * Lists all organizations.
   * @returns {Promise<Organization[]>} The list of organizations.
   * @see {@link https://developer.zendesk.com/api-reference/ticketing/organizations/organizations/#list-organizations}
   * @example const organizations = await client.organizations.list();
   */
  async list() {
    return this.getAll(['organizations']);
  }

  /**
   * Lists organizations associated with a specific user.
   * @param {number} userID - The ID of the user.
   * @returns {Promise<Organization[]>} List of organizations associated with the user.
   * @see {@link https://developer.zendesk.com/api-reference/ticketing/organizations/organizations/#list-organizations}
   * @example const userOrgs = await client.organizations.listByUser(12345);
   */
  async listByUser(userID) {
    return this.getAll(['users', userID, 'organizations']);
  }

  /**
   * Counts the number of organizations.
   * @returns {Promise<number>} Number of organizations.
   * @see {@link https://developer.zendesk.com/api-reference/ticketing/organizations/organizations/#count-organizations}
   * @example const orgCount = await client.organizations.count();
   */
  async count() {
    const result = await this.getAll(['organizations', 'count']);
    return result.count;
  }

  /**
   * Counts the number of organizations associated with a specific user.
   * @param {number} userID - The ID of the user.
   * @returns {Promise<number>} Number of organizations associated with the user.
   * @see {@link https://developer.zendesk.com/api-reference/ticketing/organizations/organizations/#count-organizations}
   * @example const userOrgCount = await client.organizations.countByUser(12345);
   */
  async countByUser(userID) {
    const result = await this.getAll([
      'users',
      userID,
      'organizations',
      'count',
    ]);
    return result.count;
  }

  /**
   * Retrieves related information for a specific organization.
   * @param {number} organizationID - The ID of the organization.
   * @returns {Promise<{response: object, result: OrganizationRelatedResponse}>} Object containing related information of the organization.
   * @see {@link https://developer.zendesk.com/api-reference/ticketing/organizations/organizations/#show-organizations-related-information}
   * @example const relatedInfo = await client.organizations.related(12345);
   */
  async related(organizationID) {
    return this.get(['organizations', organizationID, 'related']);
  }

  /**
   * Views a specific organization by its ID.
   * @param {number} organizationID - The ID of the organization.
   * @returns {Promise<{response: object, result: Organization}>} The organization's details.
   * @see {@link https://developer.zendesk.com/api-reference/ticketing/organizations/organizations/#show-organization}
   * @example const organization = await client.organizations.show(12345);
   */
  async show(organizationID) {
    return this.get(['organizations', organizationID]);
  }

  /**
   * Retrieves details of multiple organizations based on their IDs.
   * @param {number[]} organizationIDs - Array of organization IDs.
   * @returns {Promise<Organization[]>} List of organizations' details.
   * @see {@link https://developer.zendesk.com/api-reference/ticketing/organizations/organizations/#show-many-organizations}
   * @example const orgDetails = await client.organizations.showMany([12345, 67890]);
   */
  async showMany(organizationIDs) {
    return this.getAll([
      'organizations',
      'show_many',
      {
        ids: organizationIDs,
      },
    ]);
  }

  /**
   * Retrieves details of multiple organizations based on their External IDs.
   * @param {string[]} externalOrganizationIds - Array of organization IDs.
   * @returns {Promise<Organization[]>} List of organizations' details.
   * @see {@link https://developer.zendesk.com/api-reference/ticketing/organizations/organizations/#show-many-organizations}
   * @example const orgDetails = await client.organizations.showMany(['12345', '67890']);
   */
  async showManyByExternalIds(externalOrganizationIds) {
    return this.getAll([
      'organizations',
      'show_many',
      {
        external_ids: externalOrganizationIds,
      },
    ]);
  }

  /**
   * Creates a new organization.
   * @param {CreateOrganization} organization - The organization object to create.
   * @returns {Promise<{response: object, result: Organization}>} The created organization's details.
   * @see {@link https://developer.zendesk.com/api-reference/ticketing/organizations/organizations/#create-organization}
   * @example const newOrganization = await client.organizations.create({ organization: { name: 'New Org' }});
   */
  async create(organization) {
    return this.post(['organizations'], organization);
  }

  /**
   * Creates multiple organizations.
   * @param {CreateManyOrganizations} organizations - An array of organization objects to create.
   * @returns {Promise<{response: object, result: Organization[]}>} Details of the created organizations.
   * @see {@link https://developer.zendesk.com/api-reference/ticketing/organizations/organizations/#create-many-organizations}
   * @example const newOrganizations = await client.organizations.createMany({ organizations: [{ name: 'Org1' }, { name: 'Org2' }] });
   */
  async createMany(organizations) {
    return this.post(['organizations', 'create_many'], organizations);
  }

  /**
   * Creates or updates an organization.
   * @param {CreateOrganization|UpdateOrganizationWithId} organization - The organization object to create or update.
   * @returns {Promise<{response: object, result: Organization}>} The created or updated organization's details.
   * @see {@link https://developer.zendesk.com/api-reference/ticketing/organizations/organizations/#create-or-update-organization}
   * @example const org = await client.organizations.createOrUpdate({ organization: { id: 12345, name: 'Updated Name' }});
   */
  async createOrUpdate(organization) {
    return this.post(['organizations', 'create_or_update'], organization);
  }

  /**
   * Updates a specific organization by its ID.
   * @param {number} organizationID - The ID of the organization.
   * @param {UpdateOrganization} organization - The updated organization object.
   * @returns {Promise<{response: object, result: Organization}>} The updated organization's details.
   * @see {@link https://developer.zendesk.com/api-reference/ticketing/organizations/organizations/#update-organization}
   * @example const updatedOrganization = await client.organizations.update(12345, { organization: { name: 'New Name' }});
   */
  async update(organizationID, organization) {
    return this.put(['organizations', organizationID], organization);
  }

  /**
   * Updates multiple organizations.
   * @param {UpdateManyOrganizations} organizations - An array of organization objects to update.
   * @returns {Promise<{response: object, result: Organization[]}>} Details of the updated organizations.
   * @see {@link https://developer.zendesk.com/api-reference/ticketing/organizations/organizations/#update-many-organizations}
   * @example const updatedOrganizations = await client.organizations.updateMany({ organizations: [{ id: 1, name: 'Updated Org1' }, { id: 2, name: 'Updated Org2' }] });
   */
  async updateMany(organizations) {
    return this.put(['organizations', 'update_many'], organizations);
  }

  /**
   * Creates or updates an organization, identical to `createOrUpdate` method.
   * @param {CreateOrganization|UpdateOrganizationWithId} organization - The organization object to upsert.
   * @returns {Promise<{response: object, result: Organization}>} The created or updated organization's details.
   * @see {@link https://developer.zendesk.com/api-reference/ticketing/organizations/organizations/#create-or-update-organization}
   * @example const org = await client.organizations.upsert({ organization: { id: 12345, name: 'Upserted Name' }});
   * @deprecated use `createOrUpdate()` method instead.
   */
  async upsert(organization) {
    return this.createOrUpdate(organization);
  }

  /**
   * Deletes a specific organization by its ID.
   * @param {number} organizationID - The ID of the organization to delete.
   * @returns {Promise<void>}
   * @throws {Error} Throws an error if deletion fails.
   * @see {@link https://developer.zendesk.com/api-reference/ticketing/organizations/organizations/#delete-organization}
   * @example await client.organizations.delete(12345);
   */
  async delete(organizationID) {
    return super.delete(['organizations', organizationID]);
  }

  /**
   * Deletes multiple organizations based on their IDs.
   * @param {number[]} organizationIds - Array of organization IDs.
   * @returns {Promise<object>} Returns a job status JSON object.
   * @throws {Error} Throws an error if deletion fails.
   * @see {@link https://developer.zendesk.com/api-reference/ticketing/organizations/organizations/#bulk-delete-organizations}
   * @example await client.organizations.bulkDelete([12345, 67890]);
   */
  async bulkDelete(organizationIds) {
    return super.delete([
      'organizations',
      'destroy_many',
      {
        ids: organizationIds,
      },
    ]);
  }

  /**
   * Deletes multiple organizations based on their external IDs.
   * @param {string[]} organizationExternalIds - Array of organization external IDs.
   * @returns {Promise<object>} Returns a job status JSON object.
   * @throws {Error} Throws an error if deletion fails.
   * @see {@link https://developer.zendesk.com/api-reference/ticketing/organizations/organizations/#bulk-delete-organizations}
   * @example await client.organizations.bulkDeleteByExternalId(['ext-12345', 'ext-67890']);
   */
  async bulkDeleteByExternalId(organizationExternalIds) {
    return super.delete([
      'organizations',
      'destroy_many',
      {
        external_ids: organizationExternalIds,
      },
    ]);
  }

  /**
   * Searches organizations based on external ID.
   * @param {number} externalID - Search by externalID.
   * @returns {Promise<Organization[]>} List of organizations matching the search.
   * @see {@link https://developer.zendesk.com/api-reference/ticketing/organizations/organizations/#search-organizations-by-external-id}
   * @example const foundOrganizations = await client.organizations.search(1234);
   */
  async search(externalID) {
    return this.getAll(['organizations', 'search', {external_id: externalID}]);
  }

  /**
   * Autocompletes organization names based on provided parameters.
   * @param {object} parameters - Parameters for autocomplete.
   * @returns {Promise<Organization[]>} List of organizations matching the autocomplete.
   * @see {@link https://developer.zendesk.com/api-reference/ticketing/organizations/organizations/#autocomplete-organizations}
   * @example const autocompleteResults = await client.organizations.autocomplete({ name: 'Test' });
   */
  async autocomplete(parameters) {
    return this.getAll(['organizations', 'autocomplete', parameters]);
  }

  /**
   * Incrementally exports organizations with an include parameter.
   * @param {string|Date} startTime - Start time for incremental export.
   * @param {string} include - Data to include in the export.
   * @returns {Promise<Organization[]>} List of organizations in the incremental export.
   * @see {@link https://developer.zendesk.com/api-reference/ticketing/ticket-management/incremental_exports/#incremental-organization-export}
   * @example const exportedOrganizations = await client.organizations.incrementalInclude('2023-01-01T12:00:00Z', 'users');
   */
  async incrementalInclude(startTime, include) {
    return this.getAll([
      'incremental',
      'organizations',
      {start_time: startTime, include},
    ]);
  }

  /**
   * Incrementally exports organizations.
   * @param {string|Date} startTime - Start time for incremental export.
   * @returns {Promise<Organization[]>} List of organizations in the incremental export.
   * @see {@link https://developer.zendesk.com/api-reference/ticketing/ticket-management/incremental_exports/#incremental-organization-export}
   * @example const exportedOrganizations = await client.organizations.incremental('2023-01-01T12:00:00Z');
   */
  async incremental(startTime) {
    return this.getAll([
      'incremental',
      'organizations',
      {start_time: startTime},
    ]);
  }

  /**
   * Fetches a sample of incremental organization exports.
   * @param {string|Date} startTime - Start time for the sample.
   * @returns {Promise<{response: object, result: Organization[]}>} Sample list of organizations in the incremental export.
   * @see {@link https://developer.zendesk.com/api-reference/ticketing/ticket-management/incremental_exports/#incremental-sample-export}
   * @example const sampleExportedOrganizations = await client.organizations.incrementalSample('2023-01-01T12:00:00Z');
   */
  async incrementalSample(startTime) {
    return this.get([
      'incremental',
      'organizations',
      'sample',
      {start_time: startTime},
    ]);
  }
}

exports.Organizations = Organizations;
