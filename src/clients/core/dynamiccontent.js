const {Client} = require('../client');

/**
 * Represents the Dynamic Content section of the Zendesk API.
 * Provides methods to interact with the Dynamic Content Items.
 * @see {@link https://developer.zendesk.com/api-reference/ticketing/ticket-management/dynamic_content/}
 */
class DynamicContent extends Client {
  /**
   * Creates an instance of the DynamicContent.
   * @param {object} options - The options for the client.
   */
  constructor(options) {
    super(options);
    this.jsonAPINames = ['dynamic_content_items', 'dynamic_content_items'];
  }

  /**
   * Lists the dynamic content items.
   * @returns {Promise<object>} The dynamic content items.
   * @async
   * @throws {Error} Throws an error if the request fails.
   * @see {@link https://developer.zendesk.com/api-reference/ticketing/ticket-management/dynamic_content/#list-items}
   * @example const items = await client.dynamiccontent.listItems();
   */
  async listItems() {
    return this.get(['dynamic_content', 'items']);
  }

  /**
   * Lists all dynamic content items.
   * @returns {Promise<object>} All the dynamic content items.
   * @async
   * @throws {Error} Throws an error if the request fails.
   * @example const allItems = await client.dynamiccontent.listAllItems();
   */
  async listAllItems() {
    return this.getAll(['dynamic_content', 'items']);
  }

  /**
   * Shows a specific dynamic content item.
   * @param {number} itemID - The ID of the dynamic content item.
   * @returns {Promise<object>} The specified dynamic content item.
   * @async
   * @throws {Error} Throws an error if the request fails.
   * @see {@link https://developer.zendesk.com/api-reference/ticketing/ticket-management/dynamic_content/#show-item}
   * @example const item = await client.dynamiccontent.showItem(12345);
   */
  async showItem(itemID) {
    return this.get(['dynamic_content', 'items', itemID]);
  }

  /**
   * Retrieves multiple dynamic content items using their identifiers.
   * @param {string[]} identifiers - An array of identifiers for the dynamic content items.
   * @returns {Promise<object>} Returns the fetched dynamic content items.
   * @async
   * @throws {Error} Throws an error if the provided identifiers parameter is not a valid array or is empty.
   * @see {@link https://developer.zendesk.com/api-reference/ticketing/ticket-management/dynamic_content/#show-many-items}
   * @example
   * const items = await client.dynamiccontent.showManyItems(['item_one', 'item_two']);
   */
  async showManyItems(identifiers) {
    if (!Array.isArray(identifiers) || identifiers.length === 0) {
      throw new Error('A valid array of identifiers is required.');
    }

    return this.get(['dynamic_content', 'items', 'show_many', {identifiers}]);
  }

  /**
   * Creates a new dynamic content item.
   * @param {object} item - The item to create.
   * @returns {Promise<object>} The created dynamic content item.
   * @async
   * @throws {Error} Throws an error if the request fails.
   * @see {@link https://developer.zendesk.com/api-reference/ticketing/ticket-management/dynamic_content/#create-item}
   * @example const newItem = await client.dynamiccontent.createItem({name: "Sample Item", default_locale_id: 1, variants: [...]});
   */
  async createItem(item) {
    return this.post(['dynamic_content', 'items'], item);
  }

  /**
   * Updates a specific dynamic content item.
   * @param {number} itemID - The ID of the dynamic content item.
   * @param {object} item - The updated item details.
   * @returns {Promise<object>} The updated dynamic content item.
   * @async
   * @throws {Error} Throws an error if the request fails.
   * @see {@link https://developer.zendesk.com/api-reference/ticketing/ticket-management/dynamic_content/#update-item}
   * @example const updatedItem = await client.dynamiccontent.updateItem(12345, {name: "Updated Name"});
   */
  async updateItem(itemID, item) {
    return this.put(['dynamic_content', 'items', itemID], item);
  }

  /**
   * Deletes a specific dynamic content item.
   * @param {number} itemID - The ID of the dynamic content item.
   * @returns {Promise<object>} The response after deletion.
   * @async
   * @throws {Error} Throws an error if the request fails.
   * @see {@link https://developer.zendesk.com/api-reference/ticketing/ticket-management/dynamic_content/#delete-item}
   * @example await client.dynamiccontent.deleteItem(12345);
   */
  async deleteItem(itemID) {
    return super.delete(['dynamic_content', 'items', itemID]);
  }
}

exports.DynamicContent = DynamicContent;
