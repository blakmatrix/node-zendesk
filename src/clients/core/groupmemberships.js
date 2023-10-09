// File: groupMemberships.js
const {Client} = require('../client');

/**
 * Represents a GroupMembership in Zendesk.
 * @see {@link https://developer.zendesk.com/api-reference/ticketing/groups/group_memberships/ }
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
   * @returns {Promise<object[]>} Array of group memberships.
   * @async
   * @see {@link https://developer.zendesk.com/api-reference/ticketing/groups/group_memberships/#list-memberships}
   * @example
   * const memberships = await client.groupmemberships.list();
   */
  async list() {
    return this.getAll(['group_memberships']);
  }

  /**
   * List group memberships by user ID.
   * @param {number} userID - The ID of the user.
   * @returns {Promise<object[]>} Array of group memberships.
   * @async
   * @see {@link https://developer.zendesk.com/api-reference/ticketing/groups/group_memberships/#list-memberships}
   * @example
   * const memberships = await client.groupmemberships.listByUser(123);
   */
  async listByUser(userID) {
    return this.getAll(['users', userID, 'group_memberships']);
  }

  /**
   * List group memberships by group ID.
   * @param {number} groupID - The ID of the group.
   * @returns {Promise<object[]>} Array of group memberships.
   * @async
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
   * @param {number} groupMembershipID - The ID of the group membership.
   * @returns {Promise<object>} Details of the group membership.
   * @async
   * @see {@link https://developer.zendesk.com/api-reference/ticketing/groups/group_memberships/#show-membership}
   * @example
   * const membershipDetails = await client.groupmemberships.show(123);
   */
  async show(groupMembershipID) {
    return this.get(['group_memberships', groupMembershipID]);
  }

  /**
   * Show details of a group membership by user ID.
   * @param {number} userID - The ID of the user.
   * @param {number} groupMembershipID - The ID of the group membership.
   * @returns {Promise<object>} Details of the group membership.
   * @async
   * @see {@link https://developer.zendesk.com/api-reference/ticketing/groups/group_memberships/#show-membership}
   * @example
   * const membershipDetails = await client.groupmemberships.showByUser(123, 456);
   */
  async showByUser(userID, groupMembershipID) {
    return this.get(['users', userID, 'group_memberships', groupMembershipID]);
  }

  /**
   * Create a new group membership.
   * @param {object} groupMembership - The group membership details.
   * @returns {Promise<object>} The created group membership.
   * @async
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
   * @param {number} userID - The ID of the user.
   * @param {object} groupMembership - The group membership details.
   * @returns {Promise<object>} The created group membership.
   * @async
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
   * @param {number} groupMembershipID - The ID of the group membership.
   * @returns {Promise<void>}
   * @async
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
   * @param {number} userID - The ID of the user.
   * @param {number} groupMembershipID - The ID of the group membership.
   * @returns {Promise<void>}
   * @async
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
   * @param {number} userID - The ID of the user.
   * @param {number} groupMembershipID - The ID of the group membership.
   * @returns {Promise<object>} Updated group membership.
   * @async
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
   * @returns {Promise<Array>} List of assignable group memberships.
   * @async
   * @throws {Error} Throws an error if the request fails.
   * @see {@link https://developer.zendesk.com/api-reference/ticketing/groups/group_memberships/#list-assignable-memberships}
   * @example
   * const memberships = await client.groupmemberships.listAssignable();
   */
  async listAssignable() {
    return this.getAll(['group_memberships', 'assignable']);
  }

  /**
   * List all assignable group memberships by group.
   * @param {number} groupID - The ID of the group.
   * @returns {Promise<Array>} List of assignable group memberships for the specified group.
   * @async
   * @throws {Error} Throws an error if the request fails.
   * @see {@link https://developer.zendesk.com/api-reference/ticketing/groups/group_memberships/#list-assignable-memberships}
   * @example
   * const memberships = await client.groupmemberships.listAssignableByGroup(12345);
   */
  async listAssignableByGroup(groupID) {
    return this.getAll(['groups', groupID, 'memberships', 'assignable']);
  }

  /**
   * Bulk create group memberships.
   * @param {Array} groupMemberships - Array of group memberships to be created.
   * @returns {Promise<object>} Job status indicating the progress of the bulk create operation.
   * @async
   * @throws {Error} Throws an error if the request fails.
   * @see {@link https://developer.zendesk.com/api-reference/ticketing/groups/group_memberships/#bulk-create-memberships}
   * @example
   * const jobStatus = await client.groupmemberships.bulkCreate([{ user_id: 72, group_id: 88 }, { user_id: 73, group_id: 88 }]);
   */
  async bulkCreate(groupMemberships) {
    return this.post(['group_memberships', 'create_many'], {
      group_memberships: groupMemberships,
    });
  }

  /**
   * Bulk delete group memberships.
   * @param {Array<number>} ids - Array of group membership IDs to be deleted.
   * @returns {Promise<object>} Response object indicating the result of the bulk delete operation.
   * @async
   * @throws {Error} Throws an error if the request fails.
   * @see {@link https://developer.zendesk.com/api-reference/ticketing/groups/group_memberships/#bulk-delete-memberships}
   * @example
   * const response = await client.groupmemberships.bulkDelete([1, 2, 3]);
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
