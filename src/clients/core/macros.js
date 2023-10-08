// Macros.js: Client for the zendesk API.
const {Client} = require('../client');

/**
 * The Macros class provides methods for interacting with the Zendesk Macros API.
 * @see {@link https://developer.zendesk.com/api-reference/ticketing/business-rules/macros/} Zendesk Macros API
 */
class Macros extends Client {
  constructor(options) {
    super(options);
    this.jsonAPINames = ['macros'];
  }

  /**
   * Lists all shared and personal macros available to the current user.
   * @param {object} [options] - The options object.
   * @param {string} [options.access] - Filter macros by access.
   * @param {boolean} [options.active] - Filter by active macros.
   * @param {number} [options.category] - Filter macros by category.
   * @param {number} [options.group_id] - Filter macros by group.
   * @param {string} [options.include] - A sideload to include in the response.
   * @param {boolean} [options.only_viewable=false] - If true, returns only macros that can be applied to tickets.
   * @param {string} [options.sort_by="alphabetical"] - Possible values are "alphabetical", "created_at", etc.
   * @param {string} [options.sort_order="asc"] - One of "asc" or "desc".
   * @returns {Promise<Array>} Returns a promise that resolves to an array of macros.
   * @async
   * @throws {Error} Throws an error if the request fails.
   * @see {@link https://developer.zendesk.com/api-reference/ticketing/business-rules/macros/#list-macros} Zendesk List Macros API
   * @example
   * const macros = await client.macros.list({ active: true });
   */
  async list() {
    return this.gettAll(['macros', 'active']);
  }

  /**
   * Retrieves details of a specific macro.
   * @param macroID
   * @param {number} macro_id - The ID of the macro to retrieve.
   * @returns {Promise<object>} Returns a promise that resolves to the macro's details.
   * @async
   * @throws {Error} Throws an error if the request fails.
   * @see {@link https://developer.zendesk.com/api-reference/ticketing/business-rules/macros/#show-macro} Zendesk Show Macro API
   * @example
   * const macroDetails = await client.macros.show(123);
   */
  async show(macroID) {
    return this.get(['macros', macroID]);
  }

  /**
   * Searches for macros based on provided query.
   * @param {string} query - The search query string.
   * @returns {Promise<Array<object>>} - A promise that resolves to a list of matched macros.
   * @async
   * @throws {Error} Throws an error if the request fails.
   * @see {@link https://developer.zendesk.com/api-reference/ticketing/business-rules/macros/#search-macros}
   * @example
   * const matchedMacros = await client.macros.search("priority:urgent");
   */
  async search(query) {
    return this.get(['macros', 'search', {query}]);
  }

  /**
   * Lists all active macros.
   * @returns {Promise<Array<object>>} - A promise that resolves to a list of active macros.
   * @async
   * @throws {Error} Throws an error if the request fails.
   * @see {@link https://developer.zendesk.com/api-reference/ticketing/business-rules/macros/#list-active-macros}
   * @example
   * const activeMacros = await client.macros.listActive();
   */
  async listActive() {
    return this.get(['macros', 'active']);
  }

  /**
   * Lists macros based on provided parameters.
   * @param {object} params - The filtering parameters.
   * @param {string} [params.access] - Filter macros by access. Possible values are "personal", "agents", "shared", or "account".
   * @param {boolean} [params.active] - Filter by active macros.
   * @param {number} [params.category] - Filter macros by category.
   * @param {number} [params.group_id] - Filter macros by group.
   * @param {string} [params.include] - A sideload to include in the response.
   * @param {boolean} [params.only_viewable] - If true, returns only macros that can be applied to tickets.
   * @param {string} [params.sort_by] - The field by which to sort results.
   * @param parameters
   * @param {string} [params.sort_order] - One of "asc" or "desc".
   * @returns {Promise<object>} - A promise that resolves to a list of macros.
   * @async
   * @throws {Error} Throws an error if the request fails.
   * @see {@link https://developer.zendesk.com/api-reference/ticketing/business-rules/macros/#list-macros}
   * @example
   * const macros = await client.macros.listByParams({ active: true });
   */
  async listByParams(parameters) {
    return this.gettAll(['macros', parameters]);
  }

  /**
   * Applies a macro to a ticket.
   * @param macroID
   * @param {number} macroId - The ID of the macro.
   * @returns {Promise<object>} - A promise that resolves to the applied macro's result.
   * @async
   * @throws {Error} Throws an error if the request fails.
   * @see {@link https://developer.zendesk.com/api-reference/ticketing/business-rules/macros/#show-macro-replica}
   * @example
   * const result = await client.macros.apply(12345);
   */
  async apply(macroID) {
    return this.get(['macros', macroID, 'apply']);
  }

  /**
   * Creates a macro representation derived from a ticket.
   * @param ticketID
   * @param macroID
   * @param {number} ticketId - The ID of the ticket from which to build a macro replica.
   * @returns {Promise<object>} - A promise that resolves to the macro replica.
   * @async
   * @throws {Error} Throws an error if the request fails.
   * @see {@link https://developer.zendesk.com/api-reference/ticketing/business-rules/macros/#show-macro-replica}
   * @example
   * const replica = await client.macros.applyTicket(12345);
   */
  async applyTicket(ticketID, macroID) {
    return this.get(['tickets', ticketID, 'macros', macroID, 'apply']);
  }

  /**
   * Creates a new macro.
   * @param {object} macro - The macro object containing necessary values.
   * @param {Array<object>} macro.actions - List of actions that the macro will perform.
   * @param {string} macro.title - The title of the macro.
   * @param {boolean} [macro.active] - Whether the macro is active.
   * @param {string} [macro.description] - The description of the macro.
   * @returns {Promise<object>} - A promise that resolves to the created macro.
   * @async
   * @throws {Error} Throws an error if the request fails.
   * @see {@link https://developer.zendesk.com/api-reference/ticketing/business-rules/macros/#create-macro}
   * @example
   * const newMacro = await client.macros.create({
   *   title: "Test Macro",
   *   actions: [{ field: "status", value: "solved" }]
   * });
   */
  async create(macro) {
    return this.post(['macros'], macro);
  }

  /**
   * Lists all macro categories available to the current user.
   * @returns {Promise<object>} - A promise that resolves to a list of macro categories.
   * @async
   * @throws {Error} Throws an error if the request fails.
   * @see {@link https://developer.zendesk.com/api-reference/ticketing/business-rules/macros/#list-macro-categories}
   * @example
   * const macroCategories = await client.macros.categories();
   */
  async categories() {
    return this.gettAll(['macros', 'categories']);
  }

  /**
   * Updates an existing macro.
   * @param {number} macroId - The ID of the macro to update.
   * @param macroID
   * @param macro
   * @param {object} updates - The updates to apply to the macro.
   * @returns {Promise<object>} - A promise that resolves to the updated macro.
   * @async
   * @throws {Error} Throws an error if the request fails.
   * @see {@link https://developer.zendesk.com/api-reference/ticketing/business-rules/macros/#update-macro}
   * @example
   * const updatedMacro = await client.macros.update(12345, {
   *   title: "Updated Macro Title"
   * });
   */
  async update(macroID, macro) {
    return this.put(['macros', macroID], macro);
  }

  /**
   * Deletes a specified macro.
   * @param macroID
   * @param {number} macroId - The ID of the macro to delete.
   * @returns {Promise<void>} - A promise indicating successful deletion.
   * @async
   * @throws {Error} Throws an error if the request fails.
   * @see {@link https://developer.zendesk.com/api-reference/ticketing/business-rules/macros/#delete-macro}
   * @example
   * await client.macros.delete(12345);
   */
  async delete(macroID) {
    return super.delete(['macros', macroID]);
  }

  /**
   * Creates multiple macros.
   * @param users
   * @param {Array<object>} macros - An array of macro objects to be created.
   * @returns {Promise<Array<object>>} - A promise that resolves to an array of created macros.
   * @async
   * @throws {Error} Throws an error if the request fails.
   * @see {@link https://developer.zendesk.com/api-reference/ticketing/business-rules/macros/#bulk-create-macros}
   * @example
   * const newMacros = await client.macros.createMany([
   *   { title: "Macro One", actions: [{ field: "status", value: "pending" }] },
   *   { title: "Macro Two", actions: [{ field: "priority", value: "urgent" }] }
   * ]);
   */
  async createMany(users) {
    return this.post(['users', 'create_many'], users);
  }

  /**
   * Updates multiple macros.
   * @param {Array<object>} macrosUpdates - An array of macro update objects.
   * @returns {Promise<Array<object>>} - A promise that resolves to an array of updated macros.
   * @async
   * @throws {Error} Throws an error if the request fails.
   * @see {@link https://developer.zendesk.com/api-reference/ticketing/business-rules/macros/#update-many-macros}
   * @example
   * const updatedMacros = await client.macros.updateMany([
   *   { id: 12345, title: "Updated Macro One" },
   *   { id: 67890, title: "Updated Macro Two" }
   * ]);
   */
  async updateMany(macrosUpdates) {
    return this.put(['macros', 'update_many'], {macros: macrosUpdates});
  }
}

exports.Macros = Macros;
