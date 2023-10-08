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
   * @param {string} searchTerm - The term to search for.
   * @returns {Promise<object>} The search results.
   * @async
   * @throws {Error} Throws an error if the request fails.
   * @see {@link https://developer.zendesk.com/api-reference/ticketing/business-rules/triggers/#search-triggers}
   * @example const results = await client.triggers.search('exampleTerm');
   */
  async search(searchTerm) {
    return this.get(['triggers', 'search', {query: searchTerm}]);
  }

  /**
   * Retrieves trigger definitions.
   * @returns {Promise<object>} The trigger definitions.
   * @async
   * @throws {Error} Throws an error if the request fails.
   * @see {@link https://developer.zendesk.com/api-reference/ticketing/business-rules/triggers/#list-trigger-action-and-condition-definitions}
   * @example const definitions = await client.triggers.definitions();
   */
  async definitions() {
    return this.getAll(['triggers', 'definitions']);
  }

  /**
   * Lists all triggers, with optional filtering and sorting.
   * @param {object} [options] - Optional parameters for listing triggers.
   * @param {boolean} [options.active] - Filter by active triggers if true or inactive triggers if false.
   * @param {string} [options.category_id] - Filter triggers by category ID.
   * @param {string} [options.sort_by] - Possible values are "alphabetical", "created_at", "updated_at", "usage_1h", "usage_24h", or "usage_7d". Defaults to "position".
   * @param {string} [options.sort_order] - One of "asc" or "desc". Defaults to "asc" for alphabetical and position sort, "desc" for all others.
   * @returns {Promise<object>} A list of all triggers.
   * @async
   * @throws {Error} Throws an error if the request fails.
   * @see {@link https://developer.zendesk.com/api-reference/ticketing/business-rules/triggers/#list-triggers}
   * @example
   * const triggers = await client.triggers.list();
   * const activeTriggers = await client.triggers.list({ active: true });
   */
  async list(options = {}) {
    return this.getAll(['triggers', options]);
  }

  /**
   * Lists all active triggers.
   * @returns {Promise<object>} A list of all active triggers.
   * @async
   * @throws {Error} Throws an error if the request fails.
   * @see {@link https://developer.zendesk.com/api-reference/ticketing/business-rules/triggers/#list-active-triggers}
   * @example const activeTriggers = await client.triggers.listActive();
   */
  async listActive() {
    return this.getAll(['triggers', 'active']);
  }

  /**
   * Retrieves details of a specific trigger.
   * @param {number} triggerID - The ID of the trigger.
   * @returns {Promise<object>} Details of the specified trigger.
   * @async
   * @throws {Error} Throws an error if the request fails.
   * @see {@link https://developer.zendesk.com/api-reference/ticketing/business-rules/triggers/#show-trigger}
   * @example const triggerDetails = await client.triggers.show(12345);
   */
  async show(triggerID) {
    return this.get(['triggers', triggerID]);
  }

  /**
   * Creates a new trigger.
   * @param {object} trigger - The trigger object to be created.
   * @returns {Promise<object>} The created trigger.
   * @async
   * @throws {Error} Throws an error if the request fails.
   * @see {@link https://developer.zendesk.com/api-reference/ticketing/business-rules/triggers/#create-trigger}
   * @example
   * const newTrigger = {
   *   title: "Example Trigger",
   *   conditions: {...},
   *   actions: [...]
   * };
   * const response = await client.triggers.create(newTrigger);
   */
  async create(trigger) {
    return this.post(['triggers'], trigger);
  }

  /**
   * Updates an existing trigger.
   * @param {number} triggerID - The ID of the trigger to be updated.
   * @param {object} trigger - The updated trigger object.
   * @returns {Promise<object>} The updated trigger.
   * @async
   * @throws {Error} Throws an error if the request fails.
   * @see {@link https://developer.zendesk.com/api-reference/ticketing/business-rules/triggers/#update-trigger}
   * @example
   * const updatedTrigger = {
   *   title: "Updated Trigger",
   *   conditions: {...},
   *   actions: [...]
   * };
   * const response = await client.triggers.update(12345, updatedTrigger);
   */
  async update(triggerID, trigger) {
    return this.put(['triggers', triggerID], trigger);
  }

  /**
   * Updates multiple triggers.
   * @param {Array<object>} triggers - An array of trigger objects to be updated.
   * @returns {Promise<object>} The response from the update request.
   * @async
   * @throws {Error} Throws an error if the request fails.
   * @see {@link https://developer.zendesk.com/api-reference/ticketing/business-rules/triggers/#update-many-triggers}
   * @example
   * const triggersToUpdate = [
   *   {id: 12345, position: 3},
   *   {id: 67890, position: 5}
   * ];
   * const response = await client.triggers.updateMany(triggersToUpdate);
   */
  async updateMany(triggers) {
    return this.put(['triggers', 'update_many'], {triggers});
  }

  /**
   * Deletes a specified trigger.
   * @param {number} triggerID - The ID of the trigger to be deleted.
   * @returns {Promise<object>} The response from the deletion request.
   * @async
   * @throws {Error} Throws an error if the request fails.
   * @see {@link https://developer.zendesk.com/api-reference/ticketing/business-rules/triggers/#delete-trigger}
   * @example const response = await client.triggers.delete(12345);
   */
  async delete(triggerID) {
    return super.delete(['triggers', triggerID]);
  }

  /**
   * Deletes multiple triggers based on their IDs.
   * @param {Array<number>} triggerIDs - An array of trigger IDs to be deleted.
   * @returns {Promise<object>} The response from the deletion request.
   * @async
   * @throws {Error} Throws an error if the request fails.
   * @see {@link https://developer.zendesk.com/api-reference/ticketing/business-rules/triggers/#bulk-delete-triggers}
   * @example const response = await client.triggers.bulkDelete([12345, 67890]);
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
   * @param {Array<number>} triggerIDs - An array of trigger IDs in the desired order.
   * @returns {Promise<object>} The response from the reorder request.
   * @async
   * @throws {Error} Throws an error if the request fails.
   * @see {@link https://developer.zendesk.com/api-reference/ticketing/business-rules/triggers/#reorder-triggers}
   * @example const response = await client.triggers.reorder([12345, 67890, 11223]);
   */
  async reorder(triggerIDs) {
    return this.requestAll('PUT', ['triggers', 'reorder'], {
      trigger_ids: triggerIDs,
    });
  }

  /**
   * Lists the revisions associated with a trigger.
   * @param {number} triggerID - The ID of the trigger.
   * @returns {Promise<object>} A list of revisions for the specified trigger.
   * @async
   * @throws {Error} Throws an error if the request fails.
   * @see {@link https://developer.zendesk.com/api-reference/ticketing/business-rules/triggers/#list-trigger-revisions}
   * @example const revisions = await client.triggers.listRevisions(12345);
   */
  async listRevisions(triggerID) {
    return this.getAll(['triggers', triggerID, 'revisions']);
  }

  /**
   * Fetches a specific revision associated with a trigger.
   * @param {number} triggerID - The ID of the trigger.
   * @param {number} revisionID - The ID of the revision.
   * @returns {Promise<object>} Details of the specified trigger revision.
   * @async
   * @throws {Error} Throws an error if the request fails.
   * @see {@link https://developer.zendesk.com/api-reference/ticketing/business-rules/triggers/#show-trigger-revision}
   * @example const revisionDetails = await client.triggers.showRevision(12345, 67890);
   */
  async showRevision(triggerID, revisionID) {
    return this.get(['triggers', triggerID, 'revisions', revisionID]);
  }
}

exports.Triggers = Triggers;
