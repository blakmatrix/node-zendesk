// Automations.js: Client for the zendesk API.

const {Client} = require('../client');

/**
 * Client for interacting with the Zendesk Automation API.
 */
/**
 * The Automations class provides methods for interacting with the Zendesk Automation API.
 * {@link https://developer.zendesk.com/api-reference/ticketing/business-rules/automations/| See the Zendesk API documentation for more details}.
 * @extends Client
 */
class Automations extends Client {
  constructor(options) {
    super(options);
    this.jsonAPINames = ['automations', 'automation'];
  }

  /**
   * List all automations.
   * @async
   * @returns {Promise<Array>} Returns a list of automations.
   * @see {@link https://developer.zendesk.com/api-reference/ticketing/business-rules/automations/#list-automations}
   * @example const automations = await client.automations.list();
   */
  async list() {
    return this.getAll(['automations']);
  }

  /**
   * List all active automations.
   * @async
   * @returns {Promise<Array>} Returns a list of active automations.
   * @see {@link https://developer.zendesk.com/api-reference/ticketing/business-rules/automations/#list-active-automations}
   * @example const activeAutomations = await client.automations.listActive();
   */
  async listActive() {
    return this.getAll(['automations', 'active']);
  }

  /**
   * Get details of a specific automation by ID.
   * @async
   * @param {number} automationID - The ID of the automation.
   * @returns {Promise<Object>} Returns details of the automation.
   * @see {@link https://developer.zendesk.com/api-reference/ticketing/business-rules/automations/#show-automation}
   * @example const automationDetails = await client.automations.show(123456);
   */
  async show(automationID) {
    return this.get(['automations', automationID]);
  }

  /**
   * Create a new automation.
   * @async
   * @param {Object} automationData - Data for the new automation.
   * @returns {Promise<Object>} Returns the created automation.
   * @see {@link https://developer.zendesk.com/api-reference/ticketing/business-rules/automations/#create-automation}
   * @example
   * const automation = await client.automations.create({
   *   title: "Roger Wilco",
   *   conditions: { ... },
   *   actions: { ... }
   * });
   */
  async create(automationData) {
    return this.post(['automations'], automationData);
  }

  /**
   * Update an existing automation.
   * @async
   * @param {number} automationID - ID of the automation to update.
   * @param {Object} updatedData - Updated data for the automation.
   * @returns {Promise<Object>} Returns the updated automation.
   * @see {@link https://developer.zendesk.com/api-reference/ticketing/business-rules/automations/#update-automation}
   * @example
   * const updatedAutomation = await client.automations.update(12345, {
   *   title: "Updated Automation"
   * });
   */
  async update(automationID, updatedData) {
    return this.put(['automations', automationID], updatedData);
  }

  /**
   * Update many automations in bulk.
   * @async
   * @param {Array<Object>} automations - Array of automation data with their IDs to be updated.
   * @returns {Promise<Object>} Returns the status of the bulk update.
   * @see {@link https://developer.zendesk.com/api-reference/ticketing/business-rules/automations/#update-many-automation}
   * @example
   * const status = await client.automations.updateMany([{id: 123, position: 1}, {id: 124, position: 2}]);
   */
  async updateMany(automations) {
    return this.put(['automations', 'update_many'], {automations});
  }

  /**
   * Delete an automation.
   * @async
   * @param {number} automationID - ID of the automation to be deleted.
   * @returns {Promise<void>}
   * @see {@link https://developer.zendesk.com/api-reference/ticketing/business-rules/automations/#delete-automation}
   * @example
   * await client.automations.delete(12345);
   */
  async delete(automationID) {
    return super.delete(['automations', automationID]);
  }

  /**
   * Bulk delete automations.
   * @async
   * @param {Array<number>} ids - Array of automation IDs to be deleted.
   * @returns {Promise<void>}
   * @see {@link https://developer.zendesk.com/api-reference/ticketing/business-rules/automations/#bulk-delete-automation}
   * @example
   * await client.automations.bulkDelete([12345, 67890]);
   */
  async bulkDelete(ids) {
    return super.delete(['automations', 'destroy_many', {ids}]);
  }

  /**
   * Search automations by with query.
   * @async
   * @param {Object} searchQuery - The parameters to search for ['active', 'include', 'query', 'sort_by', 'sort_order'].
   * @returns {Promise<Array>} Returns automations matching the search query.
   * @see {@link https://developer.zendesk.com/api-reference/ticketing/business-rules/automations/#search-automation}
   * @example const foundAutomations = await client.automations.search('close');
   */
  async search(searchQuery) {
    return this.getAll(['automations', 'search', searchQuery]);
  }

  /**
   * Reorder the list of automations.
   * @async
   * @param {Array<number>} automationIDs - Array of automation IDs in the desired order.
   * @returns {Promise<Object>} Returns the status of the reorder.
   * @deprecated This may now be deprecated, please notify developers if you find this to be the case.
   * @example
   * const status = await client.automations.reorder([67890, 12345]);
   */
  async reorder(automationIDs) {
    return this.requestAll('PUT', ['automations', 'reorder'], {
      automation_ids: automationIDs,
    });
  }
}

exports.Automations = Automations;
