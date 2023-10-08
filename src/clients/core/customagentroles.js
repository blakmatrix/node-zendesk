// File: customAgentRoles.js
const {Client} = require('../client');

/**
 * @class
 * @classdesc Client for Zendesk's Custom Agent Roles API.
 * @see {@link https://developer.zendesk.com/api-reference/ticketing/account-configuration/custom_roles/}
 */
class CustomAgentRoles extends Client {
  constructor(options) {
    super(options);
    this.jsonAPINames = ['custom_roles'];
  }

  /**
   * List all Custom Agent Roles.
   * @async
   * @return {Promise<Object[]>} Returns a promise that resolves with the list of custom agent roles.
   * @example
   * const client = createClient({...});
   * const roles = await client.customagentroles.list();
   * @see {@link https://developer.zendesk.com/api-reference/ticketing/account-configuration/custom_roles/#list-custom-roles}
   */
  list() {
    return this.getAll(['custom_roles']);
  }

  /**
   * Retrieve a specific Custom Agent Role by its ID.
   * @async
   * @param {number} roleId The ID of the custom agent role to retrieve.
   * @return {Promise<Object>} Returns a promise that resolves with the specified custom agent role.
   * @throws Will throw an error if unable to retrieve the role.
   * @example
   * const client = createClient({...});
   * const role = await client.customagentroles.show(12345);
   * @see {@link https://developer.zendesk.com/api-reference/ticketing/account-configuration/custom_roles/#show-custom-role}
   */
  show(roleId) {
    return this.get(['custom_roles', roleId]);
  }

  /**
   * Creates a new custom agent role.
   * @async
   * @param {Object} roleData - The data for the new custom agent role.
   * @returns {Promise<Object>} The created custom agent role.
   * @throws Will throw an error if creation fails.
   * @see {@link https://developer.zendesk.com/api-reference/ticketing/account-configuration/custom_roles/#create-custom-role}
   * @example
   * const newRole = {
   *   name: "Sample Role",
   *   description: "Description here",
   *   configuration: { chat_access: true }
   * };
   * const role = await client.customagentroles.create(newRole);
   */
  create(roleData) {
    return this.post(['custom_roles'], {custom_role: roleData});
  }

  /**
   * Updates an existing custom agent role.
   * @async
   * @param {number} customRoleId - The ID of the custom agent role to update.
   * @param {Object} updatedData - The updated data for the custom agent role.
   * @returns {Promise<Object>} The updated custom agent role.
   * @throws Will throw an error if the update fails or custom agent role ID is not found.
   * @see {@link https://developer.zendesk.com/api-reference/ticketing/account-configuration/custom_roles/#update-custom-role}
   * @example
   * const updatedData = { name: "Updated Role", description: "Updated Description" };
   * const updatedRole = await client.customagentroles.update(12345, updatedData);
   */
  update(customRoleId, updatedData) {
    return this.put(['custom_roles', customRoleId], {custom_role: updatedData});
  }

  /**
   * Delete a specific Custom Agent Role by its ID.
   * @async
   * @param {number} roleId The ID of the custom agent role to delete.
   * @return {Promise<void>} Returns a promise that resolves when the role is deleted.
   * @throws Will throw an error if unable to delete the role.
   * @example
   * const client = createClient({...});
   * await client.customagentroles.delete(12345);
   * @see {@link https://developer.zendesk.com/api-reference/ticketing/account-configuration/custom_roles/#delete-custom-role}
   */
  delete(roleId) {
    return super.delete(['custom_roles', roleId]);
  }
}

exports.CustomAgentRoles = CustomAgentRoles;
