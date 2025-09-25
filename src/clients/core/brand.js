// File: brands.js
const {Client} = require('../client');

/**
 * Brands are your customer-facing identities.
 * @typedef {object} Brand
 * @property {boolean} [active] - If the brand is set as active
 * @property {string} [brand_url] - The url of the brand
 * @property {string} created_at - The time the brand was created
 * @property {boolean} [default] - Is the brand the default brand for this account
 * @property {boolean} [has_help_center] - If the brand has a Help Center
 * @property {'enabled' | 'disabled' | 'restricted'} help_center_state - The state of the Help Center
 * @property {string | null} [host_mapping] - The hostmapping to this brand, if any. Only admins view this property
 * @property {number} id - The ID automatically assigned when the brand is created
 * @property {boolean} [is_deleted] - If the brand object is deleted or not
 * @property {object | null} [logo] - A file represented as an Attachment object
 * @property {string} name - The name of the brand
 * @property {string} [signature_template] - The signature template for a brand
 * @property {string} subdomain - The subdomain of the brand
 * @property {number[]} [ticket_form_ids] - The ids of ticket forms that are available for use by a brand
 * @property {string} [updated_at] - The time of the last update of the brand
 * @property {string} [url] - The API url of this brand
 */

/**
 * @typedef {object} CreateOrUpdateBrand
 * @property {Partial<Brand>} brand - The brand object to create or update.
 */

/**
 * Class representing the Brand API endpoints.
 * @see {@link https://developer.zendesk.com/api-reference/ticketing/account-configuration/brands/}
 */
class Brands extends Client {
  constructor(options) {
    super(options);
    this.jsonAPINames = ['brands'];
  }

  /**
   * List all brands.
   * @returns {Promise<{response: object, result: Array<Brand>}>} The list of brands.
   * @see {@link https://developer.zendesk.com/api-reference/ticketing/account-configuration/brands/#list-brands}
   * @example const brands = await client.brands.list();
   */
  async list() {
    return this.get(['brands']);
  }

  /**
   * Show a specific brand by ID.
   * @param {number} brandId - The ID of the brand.
   * @returns {Promise<{response: object, result: { brand: Brand }}>} The brand details.
   * @see {@link https://developer.zendesk.com/api-reference/ticketing/account-configuration/brands/#show-a-brand}
   * @example const brand = await client.brands.show(47);
   */
  async show(brandId) {
    return this.get(['brands', brandId]);
  }

  /**
   * Create a new brand.
   * @param {CreateOrUpdateBrand} brand - The brand data.
   * @returns {Promise<{response: object, result: { brand: Brand }}>} The created brand details.
   * @see {@link https://developer.zendesk.com/api-reference/ticketing/account-configuration/brands/#create-brand}
   * @example const newBrand = await client.brands.create({name: "Brand 1", subdomain: "Brand1"});
   */
  async create(brand) {
    return this.post(['brands'], brand);
  }

  /**
   * Update an existing brand.
   * @param {CreateOrUpdateBrand} brand - The updated brand data.
   * @param {number} brandId - The ID of the brand to update.
   * @returns {Promise<{response: object, result: { brand: Brand }}>} The updated brand details.
   * @see {@link https://developer.zendesk.com/api-reference/ticketing/account-configuration/brands/#update-a-brand}
   * @example const updatedBrand = await client.brands.update({name: "Updated Brand"}, 47);
   */
  async update(brand, brandId) {
    return this.put(['brands', brandId], brand);
  }

  /**
   * Delete a brand.
   * @param {number} brandId - The ID of the brand to delete.
   * @returns {Promise<object>} The deletion status.
   * @see {@link https://developer.zendesk.com/api-reference/ticketing/account-configuration/brands/#delete-a-brand}
   * @example await client.brands.delete(47);
   */
  async delete(brandId) {
    return super.delete(['brands', brandId]);
  }

  /**
   * Check host mapping validity for a given subdomain and host mapping.
   * @param {string} hostMapping - The host mapping to check.
   * @param {string} subdomain - The subdomain to check.
   * @returns {Promise<{response: object, result: object}>} The check result.
   * @see {@link https://developer.zendesk.com/api-reference/ticketing/account-configuration/brands/#check-host-mapping-validity}
   * @example await client.brands.checkHostMapping("brand1.com", "brand1");
   */
  async checkHostMapping(hostMapping, subdomain) {
    return this.get([
      'brands',
      'check_host_mapping',
      {host_mapping: hostMapping, subdomain},
    ]);
  }

  /**
   * Check host mapping validity for an existing brand.
   * @param {number} brandId - The ID of the brand to check.
   * @returns {Promise<{response: object, result: object}>} The check result.
   * @see {@link https://developer.zendesk.com/api-reference/ticketing/account-configuration/brands/#check-host-mapping-validity-for-an-existing-brand}
   * @example await client.brands.checkHostMappingForExistingBrand(47);
   */
  async checkHostMappingForExistingBrand(brandId) {
    return this.get(['brands', brandId, 'check_host_mapping']);
  }
}

exports.Brands = Brands;
