const {Client} = require('../client');

/**
 * Represents a client for the Zendesk Targets API.
 * @see {@link https://developer.zendesk.com/api-reference/ticketing/targets/targets/}
 */
class Targets extends Client {
  constructor(options) {
    super(options);
    this.jsonAPINames = ['targets', 'target'];
  }

  /**
   * Lists all targets.
   * @async
   * @returns {Promise<Object>} A promise that resolves to the list of targets.
   * @see {@link https://developer.zendesk.com/api-reference/ticketing/targets/targets/#list-targets}
   * @example
   * const targets = await client.targets.list();
   */
  async list() {
    return this.getAll(['targets']);
  }

  /**
   * Retrieves details of a specific target.
   * @async
   * @param {number} targetId - The ID of the target to retrieve.
   * @returns {Promise<Object>} A promise that resolves to the target details.
   * @see {@link https://developer.zendesk.com/api-reference/ticketing/targets/targets/#show-target}
   * @example
   * const target = await client.targets.show(12345);
   */
  async show(targetId) {
    return this.get(['targets', targetId]);
  }

  /**
   * Creates a new target.
   * @async
   * @param {Object} target - The target data.
   * @returns {Promise<Object>} A promise that resolves to the created target's details.
   * @see {@link https://developer.zendesk.com/api-reference/ticketing/targets/targets/#create-target}
   * @example
   * const target = {
   *   type: 'email_target',
   *   title: 'Test Email Target',
   *   email: 'hello@example.com',
   *   subject: 'Test Target'
   * };
   * const response = await client.targets.create(target);
   */
  async create(target) {
    return this.post(['targets'], target);
  }

  /**
   * Updates a specific target.
   * @async
   * @param {number} targetId - The ID of the target to update.
   * @param {Object} target - The updated target data.
   * @returns {Promise<Object>} A promise that resolves to the updated target's details.
   * @see {@link https://developer.zendesk.com/api-reference/ticketing/targets/targets/#update-target}
   * @example
   * const updatedData = { email: 'updated@example.com' };
   * const response = await client.targets.update(12345, updatedData);
   */
  async update(targetId, target) {
    return this.put(['targets', targetId], target);
  }

  /**
   * Deletes a specific target.
   * @async
   * @param {number} targetId - The ID of the target to delete.
   * @returns {Promise<void>} A promise that resolves once the target has been deleted.
   * @throws {Error} Throws an error if deletion fails.
   * @see {@link https://developer.zendesk.com/api-reference/ticketing/targets/targets/#delete-target}
   * @example
   * await client.targets.delete(12345);
   */
  async delete(targetId) {
    return super.delete(['targets', targetId]);
  }
}

exports.Targets = Targets;
