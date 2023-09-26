// Triggers.js: Client for the zendesk API.
const {Client} = require('../client');

/**
 * Client for interacting with the Zendesk Triggers API.
 * @see {@link https://developer.zendesk.com/api-reference/ticketing/business-rules/triggers/}
 */
class Triggers extends Client {
  constructor(options) {
    super(options);
    this.jsonAPINames = ['triggers', 'trigger'];
  }

  /**
   * Searches for triggers based on the provided search term.
   * @async
   * @param {string} searchTerm - The term to search for.
   * @returns {Promise<Object>} The search results.
   * @throws {Error} Throws an error if the request fails.
   * @example const results = await client.triggers.search('exampleTerm');
   * @see {@link https://developer.zendesk.com/api-reference/ticketing/business-rules/triggers/#search-triggers}
   */
  async search(searchTerm) {
    return this.get(['triggers', 'search', {query: searchTerm}]);
  }

  /**
   * Retrieves trigger definitions.
   * @async
   * @returns {Promise<Object>} The trigger definitions.
   * @throws {Error} Throws an error if the request fails.
   * @example const definitions = await client.triggers.definitions();
   * @see {@link https://developer.zendesk.com/api-reference/ticketing/business-rules/triggers/#list-trigger-action-and-condition-definitions}
   */
  async definitions() {
    return this.getAll(['triggers', 'definitions']);
  }

  /**
   * Lists all triggers, with optional filtering and sorting.
   * @async
   * @param {Object} [options] - Optional parameters for listing triggers.
   * @param {boolean} [options.active] - Filter by active triggers if true or inactive triggers if false.
   * @param {string} [options.category_id] - Filter triggers by category ID.
   * @param {string} [options.sort_by] - Possible values are "alphabetical", "created_at", "updated_at", "usage_1h", "usage_24h", or "usage_7d". Defaults to "position".
   * @param {string} [options.sort_order] - One of "asc" or "desc". Defaults to "asc" for alphabetical and position sort, "desc" for all others.
   * @returns {Promise<Object>} A list of all triggers.
   * @throws {Error} Throws an error if the request fails.
   * @example
   * const triggers = await client.triggers.list();
   * const activeTriggers = await client.triggers.list({ active: true });
   * @see {@link https://developer.zendesk.com/api-reference/ticketing/business-rules/triggers/#list-triggers}
   */
  async list(options = {}) {
    return this.getAll(['triggers', options]);
  }

  /**
   * Lists all active triggers.
   * @async
   * @returns {Promise<Object>} A list of all active triggers.
   * @throws {Error} Throws an error if the request fails.
   * @example const activeTriggers = await client.triggers.listActive();
   * @see {@link https://developer.zendesk.com/api-reference/ticketing/business-rules/triggers/#list-active-triggers}
   */
  async listActive() {
    return this.getAll(['triggers', 'active']);
  }

  /**
   * Retrieves details of a specific trigger.
   * @async
   * @param {number} triggerID - The ID of the trigger.
   * @returns {Promise<Object>} Details of the specified trigger.
   * @throws {Error} Throws an error if the request fails.
   * @example const triggerDetails = await client.triggers.show(12345);
   * @see {@link https://developer.zendesk.com/api-reference/ticketing/business-rules/triggers/#show-trigger}
   */
  async show(triggerID) {
    return this.get(['triggers', triggerID]);
  }

  /**
   * Creates a new trigger.
   * @async
   * @param {Object} trigger - The trigger object to be created.
   * @returns {Promise<Object>} The created trigger.
   * @throws {Error} Throws an error if the request fails.
   * @example
   * const newTrigger = {
   *   title: "Example Trigger",
   *   conditions: {...},
   *   actions: [...]
   * };
   * const response = await client.triggers.create(newTrigger);
   * @see {@link https://developer.zendesk.com/api-reference/ticketing/business-rules/triggers/#create-trigger}
   */
  async create(trigger) {
    return this.post(['triggers'], trigger);
  }

  /**
   * Updates an existing trigger.
   * @async
   * @param {number} triggerID - The ID of the trigger to be updated.
   * @param {Object} trigger - The updated trigger object.
   * @returns {Promise<Object>} The updated trigger.
   * @throws {Error} Throws an error if the request fails.
   * @example
   * const updatedTrigger = {
   *   title: "Updated Trigger",
   *   conditions: {...},
   *   actions: [...]
   * };
   * const response = await client.triggers.update(12345, updatedTrigger);
   * @see {@link https://developer.zendesk.com/api-reference/ticketing/business-rules/triggers/#update-trigger}
   */
  async update(triggerID, trigger) {
    return this.put(['triggers', triggerID], trigger);
  }

  /**
   * Updates multiple triggers.
   * @async
   * @param {Array<Object>} triggers - An array of trigger objects to be updated.
   * @returns {Promise<Object>} The response from the update request.
   * @throws {Error} Throws an error if the request fails.
   * @example
   * const triggersToUpdate = [
   *   {id: 12345, position: 3},
   *   {id: 67890, position: 5}
   * ];
   * const response = await client.triggers.updateMany(triggersToUpdate);
   * @see {@link https://developer.zendesk.com/api-reference/ticketing/business-rules/triggers/#update-many-triggers}
   */
  async updateMany(triggers) {
    return this.put(['triggers', 'update_many'], {triggers});
  }

  /**
   * Deletes a specified trigger.
   * @async
   * @param {number} triggerID - The ID of the trigger to be deleted.
   * @returns {Promise<Object>} The response from the deletion request.
   * @throws {Error} Throws an error if the request fails.
   * @example const response = await client.triggers.delete(12345);
   * @see {@link https://developer.zendesk.com/api-reference/ticketing/business-rules/triggers/#delete-trigger}
   */
  async delete(triggerID) {
    return super.delete(['triggers', triggerID]);
  }

  /**
   * Deletes multiple triggers based on their IDs.
   * @async
   * @param {Array<number>} triggerIDs - An array of trigger IDs to be deleted.
   * @returns {Promise<Object>} The response from the deletion request.
   * @throws {Error} Throws an error if the request fails.
   * @example const response = await client.triggers.bulkDelete([12345, 67890]);
   * @see {@link https://developer.zendesk.com/api-reference/ticketing/business-rules/triggers/#bulk-delete-triggers}
   */
  async bulkDelete(triggerIDs) {
    return this.delete([
      'triggers',
      'destroy_many',
      {
        ids: triggerIDs,
      },
    ]);
  }

  /**
   * Reorders the triggers based on the provided trigger IDs.
   * @async
   * @param {Array<number>} triggerIDs - An array of trigger IDs in the desired order.
   * @returns {Promise<Object>} The response from the reorder request.
   * @throws {Error} Throws an error if the request fails.
   * @example const response = await client.triggers.reorder([12345, 67890, 11223]);
   * @see {@link https://developer.zendesk.com/api-reference/ticketing/business-rules/triggers/#reorder-triggers}
   */
  async reorder(triggerIDs) {
    return this.requestAll('PUT', ['triggers', 'reorder'], {
      trigger_ids: triggerIDs,
    });
  }

  /**
   * Lists the revisions associated with a trigger.
   * @async
   * @param {number} triggerID - The ID of the trigger.
   * @returns {Promise<Object>} A list of revisions for the specified trigger.
   * @throws {Error} Throws an error if the request fails.
   * @example const revisions = await client.triggers.listRevisions(12345);
   * @see {@link https://developer.zendesk.com/api-reference/ticketing/business-rules/triggers/#list-trigger-revisions}
   */
  async listRevisions(triggerID) {
    return this.getAll(['triggers', triggerID, 'revisions']);
  }

  /**
   * Fetches a specific revision associated with a trigger.
   * @async
   * @param {number} triggerID - The ID of the trigger.
   * @param {number} revisionID - The ID of the revision.
   * @returns {Promise<Object>} Details of the specified trigger revision.
   * @throws {Error} Throws an error if the request fails.
   * @example const revisionDetails = await client.triggers.showRevision(12345, 67890);
   * @see {@link https://developer.zendesk.com/api-reference/ticketing/business-rules/triggers/#show-trigger-revision}
   */
  async showRevision(triggerID, revisionID) {
    return this.get(['triggers', triggerID, 'revisions', revisionID]);
  }
}

exports.Triggers = Triggers;
