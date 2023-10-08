// File: organizations.js
const {Client} = require('../client');

/**
 * @class
 * @description Client for interacting with the Zendesk Organizations API.
 * @see {@link https://developer.zendesk.com/api-reference/ticketing/organizations/organizations/}
 */
class Organizations extends Client {
  constructor(options) {
    super(options);
    this.jsonAPINames = ['organizations', 'organization'];
  }

  /**
   * @async
   * @description Lists all organizations.
   * @returns {Promise<Object>} The list of organizations.
   * @example const organizations = await client.organizations.list();
   * @see {@link https://developer.zendesk.com/api-reference/ticketing/organizations/organizations/#list-organizations}
   */
  async list() {
    return this.getAll(['organizations']);
  }

  /**
   * @async
   * @description Lists organizations associated with a specific user.
   * @param {number} userID - The ID of the user.
   * @returns {Promise<Object[]>} List of organizations associated with the user.
   * @example const userOrgs = await client.organizations.listByUser(12345);
   * @see {@link https://developer.zendesk.com/api-reference/ticketing/organizations/organizations/#list-organizations}
   */
  async listByUser(userID) {
    return this.getAll(['users', userID, 'organizations']);
  }

  /**
   * @async
   * @description Counts the number of organizations.
   * @returns {Promise<number>} Number of organizations.
   * @example const orgCount = await client.organizations.count();
   * @see {@link https://developer.zendesk.com/api-reference/ticketing/organizations/organizations/#count-organizations}
   */
  async count() {
    const result = await this.getAll(['organizations', 'count']);
    return result.count;
  }

  /**
   * @async
   * @description Counts the number of organizations associated with a specific user.
   * @param {number} userID - The ID of the user.
   * @returns {Promise<number>} Number of organizations associated with the user.
   * @example const userOrgCount = await client.organizations.countByUser(12345);
   * @see {@link https://developer.zendesk.com/api-reference/ticketing/organizations/organizations/#count-organizations}
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
   * @async
   * @description Retrieves related information for a specific organization.
   * @param {number} organizationID - The ID of the organization.
   * @returns {Promise<Object>} Object containing related information of the organization.
   * @example const relatedInfo = await client.organizations.related(12345);
   * @see {@link https://developer.zendesk.com/api-reference/ticketing/organizations/organizations/#show-organizations-related-information}
   */
  async related(organizationID) {
    return this.get(['organizations', organizationID, 'related']);
  }

  /**
   * @async
   * @description Views a specific organization by its ID.
   * @param {number} organizationID - The ID of the organization.
   * @returns {Promise<Object>} The organization's details.
   * @example const organization = await client.organizations.show(12345);
   * @see {@link https://developer.zendesk.com/api-reference/ticketing/organizations/organizations/#show-organization}
   */
  async show(organizationID) {
    return this.get(['organizations', organizationID]);
  }

  /**
   * @async
   * @description Retrieves details of multiple organizations based on their IDs.
   * @param {number[]} organizationIDs - Array of organization IDs.
   * @returns {Promise<Object[]>} List of organizations' details.
   * @example const orgDetails = await client.organizations.showMany([12345, 67890]);
   * @see {@link https://developer.zendesk.com/api-reference/ticketing/organizations/organizations/#show-many-organizations}
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
   * @async
   * @description Retrieves details of multiple organizations based on their External IDs.
   * @param {string[]} externalOrganizationIds - Array of organization IDs.
   * @returns {Promise<Object[]>} List of organizations' details.
   * @example const orgDetails = await client.organizations.showMany(['12345', '67890']);
   * @see {@link https://developer.zendesk.com/api-reference/ticketing/organizations/organizations/#show-many-organizations}
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
   * @async
   * @description Creates a new organization.
   * @param {Object} organization - The organization object to create.
   * @returns {Promise<Object>} The created organization's details.
   * @example const newOrganization = await client.organizations.create({ name: 'New Org' });
   * @see {@link https://developer.zendesk.com/api-reference/ticketing/organizations/organizations/#create-organization}
   */
  async create(organization) {
    return this.post(['organizations'], organization);
  }

  /**
   * @async
   * @description Creates multiple organizations.
   * @param {Object[]} organizations - An array of organization objects to create.
   * @returns {Promise<Object>} Details of the created organizations.
   * @example const newOrganizations = await client.organizations.createMany([{ name: 'Org1' }, { name: 'Org2' }]);
   * @see {@link https://developer.zendesk.com/api-reference/ticketing/organizations/organizations/#create-many-organizations}
   */
  async createMany(organizations) {
    return this.post(['organizations', 'create_many'], organizations);
  }

  /**
   * @async
   * @description Creates or updates an organization.
   * @param {Object} organization - The organization object to create or update.
   * @returns {Promise<Object>} The created or updated organization's details.
   * @example const org = await client.organizations.createOrUpdate({ id: 12345, name: 'Updated Name' });
   * @see {@link https://developer.zendesk.com/api-reference/ticketing/organizations/organizations/#create-or-update-organization}
   */
  async createOrUpdate(organization) {
    return this.post(['organizations', 'create_or_update'], organization);
  }

  /**
   * @async
   * @description Updates a specific organization by its ID.
   * @param {number} organizationID - The ID of the organization.
   * @param {Object} organization - The updated organization object.
   * @returns {Promise<Object>} The updated organization's details.
   * @example const updatedOrganization = await client.organizations.update(12345, { name: 'New Name' });
   * @see {@link https://developer.zendesk.com/api-reference/ticketing/organizations/organizations/#update-organization}
   */
  async update(organizationID, organization) {
    return this.put(['organizations', organizationID], organization);
  }

  /**
   * @async
   * @description Updates multiple organizations.
   * @param {Object[]} organizations - An array of organization objects to update.
   * @returns {Promise<Object>} Details of the updated organizations.
   * @example const updatedOrganizations = await client.organizations.updateMany([{ id: 1, name: 'Updated Org1' }, { id: 2, name: 'Updated Org2' }]);
   * @see {@link https://developer.zendesk.com/api-reference/ticketing/organizations/organizations/#update-many-organizations}
   */
  async updateMany(organizations) {
    return this.put(['organizations', 'update_many'], organizations);
  }

  /**
   * @async
   * @description Creates or updates an organization, similar to `createOrUpdate` method.
   * @param {Object} organization - The organization object to upsert.
   * @returns {Promise<Object>} The created or updated organization's details.
   * @example const org = await client.organizations.upsert({ id: 12345, name: 'Upserted Name' });
   * @see {@link https://developer.zendesk.com/api-reference/ticketing/organizations/organizations/#create-or-update-organization}
   */
  async upsert(organization) {
    return this.post(['organizations', 'create_or_update'], organization);
  }

  /**
   * @async
   * @description Deletes a specific organization by its ID.
   * @param {number} organizationID - The ID of the organization to delete.
   * @returns {Promise<void>}
   * @example await client.organizations.delete(12345);
   * @see {@link https://developer.zendesk.com/api-reference/ticketing/organizations/organizations/#delete-organization}
   * @throws {Error} Throws an error if deletion fails.
   */
  async delete(organizationID) {
    return super.delete(['organizations', organizationID]);
  }

  /**
   * @async
   * @description Deletes multiple organizations based on their IDs.
   * @param {number[]} organizationIds - Array of organization IDs.
   * @returns {Promise<Object>} Returns a job status JSON object.
   * @example await client.organizations.bulkDelete([12345, 67890]);
   * @see {@link https://developer.zendesk.com/api-reference/ticketing/organizations/organizations/#bulk-delete-organizations}
   * @throws {Error} Throws an error if deletion fails.
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
   * @async
   * @description Deletes multiple organizations based on their external IDs.
   * @param {string[]} organizationExternalIds - Array of organization external IDs.
   * @returns {Promise<Object>} Returns a job status JSON object.
   * @example await client.organizations.bulkDeleteByExternalId(['ext-12345', 'ext-67890']);
   * @see {@link https://developer.zendesk.com/api-reference/ticketing/organizations/organizations/#bulk-delete-organizations}
   * @throws {Error} Throws an error if deletion fails.
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
   * @async
   * @description Searches organizations based on external ID.
   * @param {Number} externalID - Search by externalID.
   * @returns {Promise<Object[]>} List of organizations matching the search.
   * @example const foundOrganizations = await client.organizations.search(1234);
   * @see {@link https://developer.zendesk.com/api-reference/ticketing/organizations/organizations/#search-organizations-by-external-id}
   */
  async search(externalID) {
    return this.getAll(['organizations', 'search', {external_id: externalID}]);
  }

  /**
   * @async
   * @description Autocompletes organization names based on provided parameters.
   * @param {Object} parameters - Parameters for autocomplete.
   * @returns {Promise<Object[]>} List of organizations matching the autocomplete.
   * @example const autocompleteResults = await client.organizations.autocomplete({ name: 'Test' });
   * @see {@link https://developer.zendesk.com/api-reference/ticketing/organizations/organizations/#autocomplete-organizations}
   */
  async autocomplete(parameters) {
    return this.getAll(['organizations', 'autocomplete', parameters]);
  }

  /**
   * @async
   * @description Incrementally exports organizations with an include parameter.
   * @param {string|Date} startTime - Start time for incremental export.
   * @param {string} include - Data to include in the export.
   * @returns {Promise<Object[]>} List of organizations in the incremental export.
   * @example const exportedOrganizations = await client.organizations.incrementalInclude('2023-01-01T12:00:00Z', 'users');
   * @see {@link https://developer.zendesk.com/api-reference/ticketing/ticket-management/incremental_exports/#incremental-organization-export}
   */
  async incrementalInclude(startTime, include) {
    return this.getAll([
      'incremental',
      'organizations',
      {start_time: startTime, include},
    ]);
  }

  /**
   * @async
   * @description Incrementally exports organizations.
   * @param {string|Date} startTime - Start time for incremental export.
   * @returns {Promise<Object[]>} List of organizations in the incremental export.
   * @example const exportedOrganizations = await client.organizations.incremental('2023-01-01T12:00:00Z');
   * @see {@link https://developer.zendesk.com/api-reference/ticketing/ticket-management/incremental_exports/#incremental-organization-export}
   */
  async incremental(startTime) {
    return this.getAll([
      'incremental',
      'organizations',
      {start_time: startTime},
    ]);
  }

  /**
   * @async
   * @description Fetches a sample of incremental organization exports.
   * @param {string|Date} startTime - Start time for the sample.
   * @returns {Promise<Object[]>} Sample list of organizations in the incremental export.
   * @example const sampleExportedOrganizations = await client.organizations.incrementalSample('2023-01-01T12:00:00Z');
   * @see {@link https://developer.zendesk.com/api-reference/ticketing/ticket-management/incremental_exports/#incremental-sample-export}
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
