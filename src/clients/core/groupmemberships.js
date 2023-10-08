// File: groupMemberships.js
const {Client} = require('../client');

/**
 * Represents a GroupMembership in Zendesk.
 * @see {@link https://developer.zendesk.com/api-reference/ticketing/groups/group_memberships/
 */
class GroupMemberships extends Client {
  constructor(options) {
    super(options);
    this.jsonAPINames = ['group_memberships', 'group_membership'];
    this.sideLoadMap = [
      {field: 'group_id', name: 'groups', dataset: 'groups'},
      {field: 'user_id', name: 'user', dataset: 'users'},
    ];
  }

  /**
   * List all group memberships.
   * @async
   * @returns {Promise<Object[]>} Array of group memberships.
   * @see {@link https://developer.zendesk.com/api-reference/ticketing/groups/group_memberships/#list-memberships}
   * @example
   * const memberships = await client.groupmemberships.list();
   */
  async list() {
    return this.getAll(['group_memberships']);
  }

  /**
   * List group memberships by user ID.
   * @async
   * @param {number} userID - The ID of the user.
   * @returns {Promise<Object[]>} Array of group memberships.
   * @see {@link https://developer.zendesk.com/api-reference/ticketing/groups/group_memberships/#list-memberships}
   * @example
   * const memberships = await client.groupmemberships.listByUser(123);
   */
  async listByUser(userID) {
    return this.getAll(['users', userID, 'group_memberships']);
  }

  /**
   * List group memberships by group ID.
   * @async
   * @param {number} groupID - The ID of the group.
   * @returns {Promise<Object[]>} Array of group memberships.
   * @see {@link https://developer.zendesk.com/api-reference/ticketing/groups/group_memberships/#list-memberships}
   * @example
   * const memberships = await client.groupmemberships.listByGroup(123);
   */
  async listByGroup(groupID) {
    return this.getAll(['groups', groupID, 'memberships']);
  }

  // Viewing GroupMemberships

  /**
   * Show details of a specific group membership.
   * @async
   * @param {number} groupMembershipID - The ID of the group membership.
   * @returns {Promise<Object>} Details of the group membership.
   * @see {@link https://developer.zendesk.com/api-reference/ticketing/groups/group_memberships/#show-membership}
   * @example
   * const membershipDetails = await client.groupmemberships.show(123);
   */
  async show(groupMembershipID) {
    return this.get(['group_memberships', groupMembershipID]);
  }

  /**
   * Show details of a group membership by user ID.
   * @async
   * @param {number} userID - The ID of the user.
   * @param {number} groupMembershipID - The ID of the group membership.
   * @returns {Promise<Object>} Details of the group membership.
   * @see {@link https://developer.zendesk.com/api-reference/ticketing/groups/group_memberships/#show-membership}
   * @example
   * const membershipDetails = await client.groupmemberships.showByUser(123, 456);
   */
  async showByUser(userID, groupMembershipID) {
    return this.get(['users', userID, 'group_memberships', groupMembershipID]);
  }

  /**
   * Create a new group membership.
   * @async
   * @param {Object} groupMembership - The group membership details.
   * @returns {Promise<Object>} The created group membership.
   * @throws {Error} Throws an error if the creation fails.
   * @see {@link https://developer.zendesk.com/api-reference/ticketing/groups/group_memberships/#create-membership}
   * @example
   * const newMembership = await client.groupmemberships.create({user_id: 72, group_id: 88});
   */
  async create(groupMembership) {
    return this.post(['group_memberships'], groupMembership);
  }

  /**
   * Create a new group membership by user ID.
   * @async
   * @param {number} userID - The ID of the user.
   * @param {Object} groupMembership - The group membership details.
   * @returns {Promise<Object>} The created group membership.
   * @throws {Error} Throws an error if the creation fails.
   * @see {@link https://developer.zendesk.com/api-reference/ticketing/groups/group_memberships/#create-membership}
   * @example
   * const newMembership = await client.groupmemberships.createByUser(123, {group_id: 88});
   */
  async createByUser(userID, groupMembership) {
    return this.post(['users', userID, 'group_memberships'], groupMembership);
  }

  /**
   * Delete a group membership.
   * @async
   * @param {number} groupMembershipID - The ID of the group membership.
   * @returns {Promise<void>}
   * @throws {Error} Throws an error if the deletion fails.
   * @see {@link https://developer.zendesk.com/api-reference/ticketing/groups/group_memberships/#delete-membership}
   * @example
   * await client.groupmemberships.delete(123);
   */
  async delete(groupMembershipID) {
    return super.delete(['group_memberships', groupMembershipID]);
  }

  /**
   * Delete a group membership by user ID.
   * @async
   * @param {number} userID - The ID of the user.
   * @param {number} groupMembershipID - The ID of the group membership.
   * @returns {Promise<void>}
   * @throws {Error} Throws an error if the deletion fails.
   * @see {@link https://developer.zendesk.com/api-reference/ticketing/groups/group_memberships/#delete-membership}
   * @example
   * await client.groupmemberships.deleteByUser(123, 456);
   */
  async deleteByUser(userID, groupMembershipID) {
    return super.delete([
      'users',
      userID,
      'group_memberships',
      groupMembershipID,
    ]);
  }

  /**
   * Set a group membership as default.
   * @async
   * @param {number} userID - The ID of the user.
   * @param {number} groupMembershipID - The ID of the group membership.
   * @returns {Promise<Object>} Updated group membership.
   * @throws {Error} Throws an error if the operation fails.
   * @see {@link https://developer.zendesk.com/api-reference/ticketing/groups/group_memberships/#set-membership-as-default}
   * @example
   * const updatedMembership = await client.groupmemberships.makeDefault(123, 456);
   */
  async makeDefault(userID, groupMembershipID) {
    return this.put([
      'users',
      userID,
      'group_memberships',
      groupMembershipID,
      'make_default',
    ]);
  }

  /**
   * List all assignable group memberships.
   * @async
   * @returns {Promise<Array>} List of assignable group memberships.
   * @throws {Error} Throws an error if the request fails.
   * @example
   * const memberships = await client.groupmemberships.listAssignable();
   * @see {@link https://developer.zendesk.com/api-reference/ticketing/groups/group_memberships/#list-assignable-memberships}
   */
  async listAssignable() {
    return this.getAll(['group_memberships', 'assignable']);
  }

  /**
   * List all assignable group memberships by group.
   * @async
   * @param {number} groupID - The ID of the group.
   * @returns {Promise<Array>} List of assignable group memberships for the specified group.
   * @throws {Error} Throws an error if the request fails.
   * @example
   * const memberships = await client.groupmemberships.listAssignableByGroup(12345);
   * @see {@link https://developer.zendesk.com/api-reference/ticketing/groups/group_memberships/#list-assignable-memberships}
   */
  async listAssignableByGroup(groupID) {
    return this.getAll(['groups', groupID, 'memberships', 'assignable']);
  }

  /**
   * Bulk create group memberships.
   * @async
   * @param {Array} groupMemberships - Array of group memberships to be created.
   * @returns {Promise<Object>} Job status indicating the progress of the bulk create operation.
   * @throws {Error} Throws an error if the request fails.
   * @example
   * const jobStatus = await client.groupmemberships.bulkCreate([{ user_id: 72, group_id: 88 }, { user_id: 73, group_id: 88 }]);
   * @see {@link https://developer.zendesk.com/api-reference/ticketing/groups/group_memberships/#bulk-create-memberships}
   */
  async bulkCreate(groupMemberships) {
    return this.post(['group_memberships', 'create_many'], {
      group_memberships: groupMemberships,
    });
  }

  /**
   * Bulk delete group memberships.
   * @async
   * @param {Array<number>} ids - Array of group membership IDs to be deleted.
   * @returns {Promise<Object>} Response object indicating the result of the bulk delete operation.
   * @throws {Error} Throws an error if the request fails.
   * @example
   * const response = await client.groupmemberships.bulkDelete([1, 2, 3]);
   * @see {@link https://developer.zendesk.com/api-reference/ticketing/groups/group_memberships/#bulk-delete-memberships}
   */
  async bulkDelete(ids) {
    return super.delete([
      'group_memberships',
      'destroy_many',
      {
        ids: ids.join(','),
      },
    ]);
  }
}

exports.GroupMemberships = GroupMemberships;
