// Groups.js: Client for the zendesk API.
const {Client} = require('../client');

/**
 * A client for interfacing with the Zendesk Groups API.
 * @see {@link https://developer.zendesk.com/api-reference/ticketing/groups/groups/}
 */
class Groups extends Client {
  constructor(options) {
    super(options);
    this.jsonAPINames = ['groups', 'group'];
    this.sideLoadMap = [
      {field: 'user_id', name: 'users', dataset: 'users', all: true},
    ];
  }

  /**
   * Retrieves a list of all groups.
   * @see {@link https://developer.zendesk.com/api-reference/ticketing/groups/groups/#list-groups}
   * @returns {Promise<Object>} A promise that resolves to the list of groups.
   * @throws {Error} Throws an error if the request fails.
   * @example
   * const allGroups = await client.groups.list();
   */
  async list() {
    return this.getAll(['groups']);
  }

  /**
   * Retrieves an approximate count of groups.
   * If the count exceeds 100,000, it is updated every 24 hours.
   * @see {@link https://developer.zendesk.com/api-reference/ticketing/groups/groups/#count-groups}
   * @returns {Promise<Object>} A promise that resolves to the group count data.
   * @throws {Error} Throws an error if the request fails.
   * @example
   * const count = await client.groups.count();
   */
  async count() {
    return this.get(['groups', 'count']);
  }

  /**
   * Retrieves the approximate count of groups for a specified user.
   * @see {@link https://developer.zendesk.com/api-reference/ticketing/groups/groups/#count-groups}
   * @param {number} userID - The ID of the user for whom to count the groups.
   * @returns {Promise<Object>} A promise that resolves to the approximate count of groups for the user.
   * @throws {Error} Throws an error if the request fails.
   * @example
   * const groupCount = await client.groups.countByUser(12345);
   */
  async countByUser(userID) {
    return this.get(['users', userID, 'groups', 'count']);
  }

  /**
   * Retrieves a list of all assignable groups.
   * @see {@link https://developer.zendesk.com/api-reference/ticketing/groups/groups/#list-assignable-groups}
   * @returns {Promise<Object>} A promise that resolves to the list of assignable groups.
   * @throws {Error} Throws an error if the request fails.
   * @example
   * const assignableGroups = await client.groups.assignable();
   */
  async assignable() {
    return this.getAll(['groups', 'assignable']);
  }

  /**
   * Retrieves details of a specific group by its ID.
   * @see {@link https://developer.zendesk.com/api-reference/ticketing/groups/groups/#show-group}
   * @param {number} groupID - The ID of the group.
   * @returns {Promise<Object>} A promise that resolves to the group's details.
   * @throws {Error} Throws an error if the request fails.
   * @example
   * const groupDetails = await client.groups.show(12345);
   */
  async show(groupID) {
    return this.get(['groups', groupID]);
  }

  /**
   * Creates a new group.
   * @see {@link https://developer.zendesk.com/api-reference/ticketing/groups/groups/#create-group}
   * @param {Object} group - The group details to create.
   * @param {string} group.name - The name of the group (mandatory).
   * @param {string} [group.description] - The description of the group.
   * @returns {Promise<Object>} A promise that resolves to the details of the created group.
   * @throws {Error} Throws an error if the request fails.
   * @example
   * const newGroup = {
   *   name: "Support Team",
   *   description: "Handles support tickets"
   * };
   * const createdGroup = await client.groups.create(newGroup);
   */
  async create(group) {
    return this.post(['groups'], group);
  }

  /**
   * Updates a specified group.
   * @see {@link https://developer.zendesk.com/api-reference/ticketing/groups/groups/#update-group}
   * @param {number} groupID - The ID of the group to update.
   * @param {Object} group - The updated group details.
   * @param {string} [group.name] - The updated name of the group.
   * @param {string} [group.description] - The updated description of the group.
   * @returns {Promise<Object>} A promise that resolves to the details of the updated group.
   * @throws {Error} Throws an error if the request fails.
   * @example
   * const updatedInfo = {
   *   name: "Updated Support Team"
   * };
   * const updatedGroup = await client.groups.update(12345, updatedInfo);
   */
  async update(groupID, group) {
    return this.put(['groups', groupID], group);
  }

  /**
   * Deletes a specified group by its ID.
   * @see {@link https://developer.zendesk.com/api-reference/ticketing/groups/groups/#delete-group}
   * @param {number} groupID - The ID of the group to delete.
   * @returns {Promise<Object>} A promise that resolves to the response data (might be empty or a confirmation).
   * @throws {Error} Throws an error if the request fails.
   * @example
   * await client.groups.delete(12345);
   */
  async delete(groupID) {
    return super.delete(['groups', groupID]);
  }
}

exports.Groups = Groups;
