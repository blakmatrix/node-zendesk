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
   * @returns {Promise<Array>} Returns a promise that resolves to an array of macros.
   * @throws {Error} Throws an error if the request fails.
   * @see {@link https://developer.zendesk.com/api-reference/ticketing/business-rules/macros/#list-macros} Zendesk List Macros API
   * @example
   * const macros = await client.macros.list();
   */
  async list() {
    return this.getAll(['macros', 'active']);
  }

  /**
   * Retrieves details of a specific macro.
   * @param {number} macroID - The ID of the macro to retrieve.
   * @returns {Promise<object>} Returns a promise that resolves to the macro's details.
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
   * @param {object} parameters - The filtering parameters.
   * @returns {Promise<object>} - A promise that resolves to a list of macros.
   * @throws {Error} Throws an error if the request fails.
   * @see {@link https://developer.zendesk.com/api-reference/ticketing/business-rules/macros/#list-macros}
   * @example
   * const macros = await client.macros.listByParams({ active: true });
   */
  async listByParams(parameters) {
    return this.getAll(['macros', parameters]);
  }

  /**
   * Applies a macro to a ticket.
   * @param {number} macroID - The ID of the macro.
   * @returns {Promise<object>} - A promise that resolves to the applied macro's result.
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
   * @param {number} ticketID - The ID of the ticket from which to build a macro replica.
   * @param {number} macroID - The ID of the macro.
   * @returns {Promise<object>} - A promise that resolves to the macro replica.
   * @throws {Error} Throws an error if the request fails.
   * @see {@link https://developer.zendesk.com/api-reference/ticketing/business-rules/macros/#show-macro-replica}
   * @example
   * const replica = await client.macros.applyTicket(12345, 67890);
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
   * @throws {Error} Throws an error if the request fails.
   * @see {@link https://developer.zendesk.com/api-reference/ticketing/business-rules/macros/#list-macro-categories}
   * @example
   * const macroCategories = await client.macros.categories();
   */
  async categories() {
    return this.getAll(['macros', 'categories']);
  }

  /**
   * Updates an existing macro.
   * @param {number} macroID - The ID of the macro to update.
   * @param {object} macro - The updates to apply to the macro.
   * @returns {Promise<object>} - A promise that resolves to the updated macro.
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
   * @param {number} macroID - The ID of the macro to delete.
   * @returns {Promise<void>} - A promise indicating successful deletion.
   * @throws {Error} Throws an error if the request fails.
   * @see {@link https://developer.zendesk.com/api-reference/ticketing/business-rules/macros/#delete-macro}
   * @example
   * await client.macros.delete(12345);
   */
  async delete(macroID) {
    return super.delete(['macros', macroID]);
  }

  /**
   * Updates multiple macros.
   * @param {Array<object>} macrosUpdates - An array of macro update objects.
   * @returns {Promise<Array<object>>} - A promise that resolves to an array of updated macros.
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
