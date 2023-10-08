const {Client} = require('../client');

/**
 * Dynamic Content Variants client for the Zendesk REST API.
 * @see {@link https://developer.zendesk.com/api-reference/ticketing/ticket-management/dynamic_content_item_variants/}
 */
class DynamicContentVariants extends Client {
  constructor(options) {
    super(options);
    this.jsonAPINames = [
      'dynamic_content_item_variant',
      'dynamic_content_item_variants',
    ];
  }

  /**
   * Lists all variants of a specified dynamic content item.
   * @param {number} itemID - The ID of the dynamic content item.
   * @returns {Promise<object>} The variants of the specified content item.
   * @async
   * @throws {Error} Throws an error if request fails.
   * @see {@link https://developer.zendesk.com/api-reference/ticketing/ticket-management/dynamic_content_item_variants/#list-variants}
   * @example
   * const variants = await client.dynamiccontentvariants.list(1234);
   */
  async list(itemID) {
    return this.get(['dynamic_content', 'items', itemID, 'variants']);
  }

  /**
   * Fetches the details of a specified dynamic content variant.
   * @param {number} itemID - The ID of the dynamic content item.
   * @param {number} variantID - The ID of the variant to fetch.
   * @returns {Promise<object>} Returns the dynamic content variant details.
   * @async
   * @throws {Error} Throws an error if the API call fails.
   * @see {@link https://developer.zendesk.com/api-reference/ticketing/ticket-management/dynamic_content_item_variants/#show-variant}
   * @example
   * const client = createClient({...});
   * const variant = await client.dynamiccontentvariants.show(12345, 67890);
   */
  async show(itemID, variantID) {
    return this.get([
      'dynamic_content',
      'items',
      itemID,
      'variants',
      variantID,
    ]);
  }

  /**
   * Creates a new dynamic content variant.
   * @param {number} itemID - The ID of the dynamic content item.
   * @param {object} variant - The details of the variant to create.
   * @returns {Promise<object>} Returns the details of the created variant.
   * @async
   * @throws {Error} Throws an error if the API call fails or if a locale variant already exists.
   * @see {@link https://developer.zendesk.com/api-reference/ticketing/ticket-management/dynamic_content_item_variants/#create-variant}
   * @example
   * const client = createClient({...});
   * const newVariant = {
   *   locale_id: 127,
   *   active: true,
   *   default: false,
   *   content: "Some dynamic content"
   * };
   * const createdVariant = await client.dynamiccontentvariants.create(12345, newVariant);
   */
  async create(itemID, variant) {
    return this.post(['dynamic_content', 'items', itemID, 'variants'], variant);
  }

  /**
   * Updates a specified dynamic content variant.
   * @param {number} itemID - The ID of the dynamic content item.
   * @param {number} variantID - The ID of the variant to update.
   * @param {object} variant - The updated details of the variant.
   * @returns {Promise<object>} Returns the details of the updated variant.
   * @async
   * @throws {Error} Throws an error if the API call fails or if you try to switch the active state of the default variant.
   * @see {@link https://developer.zendesk.com/api-reference/ticketing/ticket-management/dynamic_content_item_variants/#update-variant}
   * @example
   * const client = createClient({...});
   * const updatedVariant = {
   *   active: false,
   *   default: false,
   *   content: "Updated dynamic content"
   * };
   * const variant = await client.dynamiccontentvariants.update(12345, 67890, updatedVariant);
   */
  async update(itemID, variantID, variant) {
    return this.put(
      ['dynamic_content', 'items', itemID, 'variants', variantID],
      variant,
    );
  }

  /**
   * Deletes a specific variant of a dynamic content item.
   * @param {number} itemID - The ID of the dynamic content item.
   * @param {number} variantID - The ID of the variant to delete.
   * @returns {Promise<object>} A confirmation of the deletion.
   * @async
   * @throws {Error} Throws an error if request fails.
   * @see {@link https://developer.zendesk.com/api-reference/ticketing/ticket-management/dynamic_content_item_variants/#delete-variant}
   * @example
   * await client.dynamiccontentvariants.delete(1234, 5678);
   */
  async delete(itemID, variantID) {
    return super.delete([
      'dynamic_content',
      'items',
      itemID,
      'variants',
      variantID,
    ]);
  }

  /**
   * Creates multiple variants for a dynamic content item.
   * @param {number} itemID - The ID of the dynamic content item.
   * @param {object[]} variants - Array of variant objects to be created.
   * @returns {Promise<object>} A confirmation of the creation.
   * @async
   * @throws {Error} Throws an error if request fails.
   * @see {@link https://developer.zendesk.com/api-reference/ticketing/ticket-management/dynamic_content_item_variants/#create-many-variants}
   * @example
   * const newVariants = await client.dynamiccontentvariants.createMany(1234, [...variantsData]);
   */
  async createMany(itemID, variants) {
    return this.post(
      ['dynamic_content', 'items', itemID, 'variants', 'create_many'],
      {variants},
    );
  }

  /**
   * Updates multiple variants of a dynamic content item.
   * @param {number} itemID - The ID of the dynamic content item.
   * @param {object[]} variants - Array of variant objects to be updated.
   * @returns {Promise<object>} A confirmation of the update.
   * @async
   * @throws {Error} Throws an error if request fails.
   * @see {@link https://developer.zendesk.com/api-reference/ticketing/ticket-management/dynamic_content_item_variants/#update-many-variants}
   * @example
   * const updatedVariants = await client.dynamiccontentvariants.updateMany(1234, [...variantsData]);
   */
  async updateMany(itemID, variants) {
    return this.put(
      ['dynamic_content', 'items', itemID, 'variants', 'update_many'],
      {variants},
    );
  }
}

exports.DynamicContentVariants = DynamicContentVariants;
