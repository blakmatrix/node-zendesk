// Organizations.js: Client for the zendesk API.
const {Client} = require('../client');

/**
 * Client class for interacting with the Zendesk Organization Memberships API.
 * @see {@link https://developer.zendesk.com/api-reference/ticketing/organizations/organization_memberships/}
 */
class OrganizationMemberships extends Client {
  constructor(options) {
    super(options);
    this.jsonAPINames = ['organization_membership', 'organization_memberships'];
  }

  /**
   * List all organization memberships.
   * @async
   * @returns {Promise<Object[]>} A promise resolving to an array of organization memberships.
   * @see {@link https://developer.zendesk.com/api-reference/ticketing/organizations/organization_memberships/#list-memberships}
   * @example
   * const memberships = await client.organizationmemberships.list();
   */
  async list() {
    return this.getAll(['organization_memberships']);
  }

  /**
   * List organization memberships by a specific user ID.
   * @async
   * @param {number} userID - The user ID.
   * @returns {Promise<Object[]>} A promise resolving to an array of organization memberships for the user.
   * @see {@link https://developer.zendesk.com/api-reference/ticketing/organizations/organization_memberships/#list-memberships}
   * @example
   * const memberships = await client.organizationmemberships.listByUser(123);
   */
  async listByUser(userID) {
    return this.getAll(['users', userID, 'organization_memberships']);
  }

  /**
   * List organization memberships by a specific organization ID.
   * @async
   * @param {number} organiationID - The organization ID.
   * @returns {Promise<Object[]>} A promise resolving to an array of organization memberships for the organization.
   * @see {@link https://developer.zendesk.com/api-reference/ticketing/organizations/organization_memberships/#list-memberships}
   * @example
   * const memberships = await client.organizationmemberships.listByOrganization(456);
   */
  async listByOrganization(organiationID) {
    return this.getAll([
      'organizations',
      organiationID,
      'organization_memberships',
    ]);
  }

  /**
   * Retrieve a specific organization membership by its ID.
   * @async
   * @param {number} organizationMembershipID - The organization membership ID.
   * @returns {Promise<Object>} A promise resolving to the organization membership.
   * @see {@link https://developer.zendesk.com/api-reference/ticketing/organizations/organization_memberships/#show-membership}
   * @example
   * const membership = await client.organizationmemberships.show(789);
   */
  async show(organizationMembershipID) {
    return this.get(['organization_memberships', organizationMembershipID]);
  }

  /**
   * Retrieve a specific organization membership by user ID and membership ID.
   * @async
   * @param {number} userID - The user ID.
   * @param {number} organizationMembershipID - The organization membership ID.
   * @returns {Promise<Object>} A promise resolving to the organization membership.
   * @see {@link https://developer.zendesk.com/api-reference/ticketing/organizations/organization_memberships/#show-membership}
   * @example
   * const membership = await client.organizationmemberships.showByUser(123, 789);
   */
  async showByUser(userID, organizationMembershipID) {
    return this.get([
      'users',
      userID,
      'organization_memberships',
      organizationMembershipID,
    ]);
  }

  /**
   * Create a new organization membership.
   * @async
   * @param {Object} organizationMembership - The organization membership data.
   * @returns {Promise<Object>} A promise resolving to the created organization membership.
   * @see {@link https://developer.zendesk.com/api-reference/ticketing/organizations/organization_memberships/#create-membership}
   * @example
   * const newMembership = await client.organizationmemberships.create({ user_id: 123, organization_id: 456 });
   */
  async create(organizationMembership) {
    return this.put(['organization_memberships'], organizationMembership);
  }

  /**
   * Create a new organization membership for a specific user.
   * @async
   * @param {number} userID - The user ID.
   * @param {Object} organizationMembership - The organization membership data.
   * @returns {Promise<Object>} A promise resolving to the created organization membership.
   * @see {@link https://developer.zendesk.com/api-reference/ticketing/organizations/organization_memberships/#create-membership}
   * @example
   * const newMembership = await client.organizationmemberships.createByUser(123, { organization_id: 456 });
   */
  async createByUser(userID, organizationMembership) {
    return this.put(
      ['users', userID, 'organization_memberships'],
      organizationMembership,
    );
  }

  /**
   * An object that relates a Zendesk user to a Zendesk organization.
   * @typedef {object} OrganizationMembership
   * @property {number} user_id The Zendesk identifier of the user.
   * @property {number} organization_id The Zendesk identifier of the
   *   organization.
   */

  /**
   * Create multiple organization memberships at once.
   * @async
   * @param {OrganizationMembership[]} organizationMemberships - An array of organization membership data.
   * @returns {Promise<Object>} A promise resolving to a job status.
   * @see {@link https://developer.zendesk.com/api-reference/ticketing/organizations/organization_memberships/#create-many-memberships}
   * @example
   * const jobStatus = await client.organizationmemberships.createMany([{ user_id: 123, organization_id: 456 }, ...]);
   */
  async createMany(organizationMemberships) {
    return this.post(
      ['organization_memberships', 'create_many'],
      organizationMemberships,
    );
  }

  /**
   * Delete a specific organization membership by its ID.
   * @async
   * @param {number} organizationMembershipID - The organization membership ID.
   * @returns {Promise<void>} A promise indicating the completion of the delete operation.
   * @see {@link https://developer.zendesk.com/api-reference/ticketing/organizations/organization_memberships/#delete-membership}
   * @example
   * await client.organizationmemberships.delete(789);
   */
  async delete(organizationMembershipID) {
    return super.delete(['organization_memberships', organizationMembershipID]);
  }

  /**
   * Delete a specific organization membership by user ID and membership ID.
   * @async
   * @param {number} userID - The user ID.
   * @param {number} organizationMembershipID - The organization membership ID.
   * @returns {Promise<void>} A promise indicating the completion of the delete operation.
   * @see {@link https://developer.zendesk.com/api-reference/ticketing/organizations/organization_memberships/#delete-membership}
   * @example
   * await client.organizationmemberships.deleteByUser(123, 789);
   */
  async deleteByUser(userID, organizationMembershipID) {
    return super.delete([
      'users',
      userID,
      'organization_memberships',
      organizationMembershipID,
    ]);
  }

  /**
   * Delete multiple organization memberships by their IDs.
   * @async
   * @param {number[]} organizationMembershipIDs - An array of organization membership IDs.
   * @returns {Promise<Object>} A promise resolving to a job status.
   * @see {@link https://developer.zendesk.com/api-reference/ticketing/organizations/organization_memberships/#bulk-delete-memberships}
   * @example
   * const jobStatus = await client.organizationmemberships.deleteMany([789, 790, 791]);
   */
  async deleteMany(organizationMembershipIDs) {
    return super.delete([
      'organization_memberships',
      'destroy_many',
      {ids: organizationMembershipIDs.join(',')},
    ]);
  }

  /**
   * Set a specific organization membership as the default for a user.
   * @async
   * @param {number} userID - The user ID.
   * @param {number} organizationMembershipID - The organization membership ID.
   * @returns {Promise<Object>} A promise resolving to the updated organization membership.
   * @see {@link https://developer.zendesk.com/api-reference/ticketing/organizations/organization_memberships/#set-membership-as-default}
   * @example
   * const updatedMembership = await client.organizationmemberships.setDefault(123, 789);
   */
  async makeDefault(userID, organizationMembershipID) {
    return this.put([
      'users',
      userID,
      'organization_memberships',
      organizationMembershipID,
      'make_default',
    ]);
  }
}

exports.OrganizationMemberships = OrganizationMemberships;
