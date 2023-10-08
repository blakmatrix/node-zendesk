// File: permissiongroups.js
const {Client} = require('../client');

/**
 * Client for the Zendesk Permission Groups API.
 * @see {@link https://developer.zendesk.com/api-reference/help_center/help-center-api/permission_groups/}
 */
class PermissionGroups extends Client {
  constructor(options) {
    super(options);
    this.jsonAPINames = ['permission_groups'];
  }

  /**
   * List all permission groups.
   * @returns {Promise<object[]>} Array of permission group objects.
   * @async
   * @throws {Error} Throws an error if the API call fails.
   * @see {@link https://developer.zendesk.com/api-reference/help_center/help-center-api/permission_groups/#list-permission-groups}
   * @example
   * const groups = await client.permissiongroups.list();
   */
  async list() {
    return this.getAll(['guide', 'permission_groups']);
  }

  /**
   * Retrieve details of a specific permission group.
   * @param {number} groupID - The ID of the permission group.
   * @returns {Promise<object>} Permission group object.
   * @async
   * @throws {Error} Throws an error if the API call fails.
   * @see {@link https://developer.zendesk.com/api-reference/help_center/help-center-api/permission_groups/#show-permission-group}
   * @example
   * const group = await client.permissiongroups.show(42);
   */
  async show(groupID) {
    return this.get(['guide', 'permission_groups', groupID]);
  }

  /**
   * Create a new permission group.
   * @param {object} group - The permission group details.
   * @param {string} group.name - Name of the permission group.
   * @param {number[]} [group.edit] - Array of user segments that have edit privileges.
   * @param {number[]} [group.publish] - Array of user segments that have publish privileges.
   * @returns {Promise<object>} Newly created permission group object.
   * @async
   * @throws {Error} Throws an error if the API call fails.
   * @see {@link https://developer.zendesk.com/api-reference/help_center/help-center-api/permission_groups/#create-permission-group}
   * @example
   * const newGroup = await client.permissiongroups.create({
   *   name: "Printer Experts",
   *   edit: [12],
   *   publish: [34]
   * });
   */
  async create(group) {
    return this.post(['guide', 'permission_groups'], group);
  }

  /**
   * Update an existing permission group.
   * @param {number} groupID - The ID of the permission group.
   * @param {object} group - The permission group details to update.
   * @param {string} [group.name] - Name of the permission group.
   * @param {number[]} [group.edit] - Array of user segments that have edit privileges.
   * @param {number[]} [group.publish] - Array of user segments that have publish privileges.
   * @returns {Promise<object>} Updated permission group object.
   * @async
   * @throws {Error} Throws an error if the API call fails.
   * @see {@link https://developer.zendesk.com/api-reference/help_center/help-center-api/permission_groups/#update-permission-group}
   * @example
   * const updatedGroup = await client.permissiongroups.update(42, {
   *   name: "Super Printer Experts"
   * });
   */
  async update(groupID, group) {
    return this.put(['guide', 'permission_groups', groupID], group);
  }

  /**
   * Delete a permission group.
   * @param {number} groupID - The ID of the permission group.
   * @returns {Promise<void>}
   * @async
   * @throws {Error} Throws an error if the API call fails.
   * @see {@link https://developer.zendesk.com/api-reference/help_center/help-center-api/permission_groups/#delete-permission-group}
   * @example
   * await client.permissiongroups.delete(42);
   */
  async delete(groupID) {
    return super.delete(['guide', 'permission_groups', groupID]);
  }
}

exports.PermissionGroups = PermissionGroups;
