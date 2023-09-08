const {Client} = require('../client');

/**
 * Represents the Dynamic Content section of the Zendesk API.
 * Provides methods to interact with the Dynamic Content Items.
 *
 * @see {@link https://developer.zendesk.com/api-reference/ticketing/ticket-management/dynamic_content/}
 */
class DynamicContent extends Client {
  /**
   * Creates an instance of the DynamicContent.
   * @param {Object} options - The options for the client.
   */
  constructor(options) {
    super(options);
    this.jsonAPINames = ['dynamic_content_items', 'dynamic_content_items'];
  }

  /**
   * Lists the dynamic content items.
   *
   * @async
   * @returns {Promise<Object>} The dynamic content items.
   * @throws {Error} Throws an error if the request fails.
   * @example const items = await client.dynamiccontent.listItems();
   * @see {@link https://developer.zendesk.com/api-reference/ticketing/ticket-management/dynamic_content/#list-items}
   */
  async listItems() {
    return this.get(['dynamic_content', 'items']);
  }

  /**
   * Lists all dynamic content items.
   *
   * @async
   * @returns {Promise<Object>} All the dynamic content items.
   * @throws {Error} Throws an error if the request fails.
   * @example const allItems = await client.dynamiccontent.listAllItems();
   */
  async listAllItems() {
    return this.getAll(['dynamic_content', 'items']);
  }

  /**
   * Shows a specific dynamic content item.
   *
   * @async
   * @param {number} itemID - The ID of the dynamic content item.
   * @returns {Promise<Object>} The specified dynamic content item.
   * @throws {Error} Throws an error if the request fails.
   * @example const item = await client.dynamiccontent.showItem(12345);
   * @see {@link https://developer.zendesk.com/api-reference/ticketing/ticket-management/dynamic_content/#show-item}
   */
  async showItem(itemID) {
    return this.get(['dynamic_content', 'items', itemID]);
  }

  /**
   * Retrieves multiple dynamic content items using their identifiers.
   *
   * @async
   * @param {string[]} identifiers - An array of identifiers for the dynamic content items.
   * @returns {Promise<Object>} Returns the fetched dynamic content items.
   * @throws {Error} Throws an error if the provided identifiers parameter is not a valid array or is empty.
   *
   * @example
   * const items = await client.dynamiccontent.showManyItems(['item_one', 'item_two']);
   *
   * @see {@link https://developer.zendesk.com/api-reference/ticketing/ticket-management/dynamic_content/#show-many-items}
   */
  async showManyItems(identifiers) {
    if (!Array.isArray(identifiers) || identifiers.length === 0) {
      throw new Error('A valid array of identifiers is required.');
    }

    return this.get(['dynamic_content', 'items', 'show_many', {identifiers}]);
  }

  /**
   * Creates a new dynamic content item.
   *
   * @async
   * @param {Object} item - The item to create.
   * @returns {Promise<Object>} The created dynamic content item.
   * @throws {Error} Throws an error if the request fails.
   * @example const newItem = await client.dynamiccontent.createItem({name: "Sample Item", default_locale_id: 1, variants: [...]});
   * @see {@link https://developer.zendesk.com/api-reference/ticketing/ticket-management/dynamic_content/#create-item}
   */
  async createItem(item) {
    return this.post(['dynamic_content', 'items'], item);
  }

  /**
   * Updates a specific dynamic content item.
   *
   * @async
   * @param {number} itemID - The ID of the dynamic content item.
   * @param {Object} item - The updated item details.
   * @returns {Promise<Object>} The updated dynamic content item.
   * @throws {Error} Throws an error if the request fails.
   * @example const updatedItem = await client.dynamiccontent.updateItem(12345, {name: "Updated Name"});
   * @see {@link https://developer.zendesk.com/api-reference/ticketing/ticket-management/dynamic_content/#update-item}
   */
  async updateItem(itemID, item) {
    return this.put(['dynamic_content', 'items', itemID], item);
  }

  /**
   * Deletes a specific dynamic content item.
   *
   * @async
   * @param {number} itemID - The ID of the dynamic content item.
   * @returns {Promise<Object>} The response after deletion.
   * @throws {Error} Throws an error if the request fails.
   * @example await client.dynamiccontent.deleteItem(12345);
   * @see {@link https://developer.zendesk.com/api-reference/ticketing/ticket-management/dynamic_content/#delete-item}
   */
  async deleteItem(itemID) {
    return super.delete(['dynamic_content', 'items', itemID]);
  }
}

exports.DynamicContent = DynamicContent;
