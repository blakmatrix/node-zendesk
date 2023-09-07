// File: brands.js
const {Client} = require('../client');
/**
 * Class representing the Brand API endpoints.
 * @see {@link https://developer.zendesk.com/api-reference/ticketing/account-configuration/brands/}
 */
class Brand extends Client {
  constructor(options) {
    super(options);
    this.jsonAPINames = ['brands'];
  }

  /**
   * List all brands.
   * @async
   * @returns {Promise<Object>} The list of brands.
   * @example const brands = await client.brands.list();
   * @see {@link https://developer.zendesk.com/api-reference/ticketing/account-configuration/brands/#list-brands}
   */
  async list() {
    return this.get(['brands']);
  }

  /**
   * Show a specific brand by ID.
   * @async
   * @param {number} brandId - The ID of the brand.
   * @returns {Promise<Object>} The brand details.
   * @example const brand = await client.brands.show(47);
   * @see {@link https://developer.zendesk.com/api-reference/ticketing/account-configuration/brands/#show-a-brand}
   */
  async show(brandId) {
    return this.get(['brands', brandId]);
  }

  /**
   * Create a new brand.
   * @async
   * @param {Object} brand - The brand data.
   * @returns {Promise<Object>} The created brand details.
   * @example const newBrand = await client.brands.create({name: "Brand 1", subdomain: "Brand1"});
   * @see {@link https://developer.zendesk.com/api-reference/ticketing/account-configuration/brands/#create-brand}
   */
  async create(brand) {
    return this.post(['brands'], brand);
  }

  /**
   * Update an existing brand.
   * @async
   * @param {Object} brand - The updated brand data.
   * @param {number} brandId - The ID of the brand to update.
   * @returns {Promise<Object>} The updated brand details.
   * @example const updatedBrand = await client.brands.update({name: "Updated Brand"}, 47);
   * @see {@link https://developer.zendesk.com/api-reference/ticketing/account-configuration/brands/#update-a-brand}
   */
  async update(brand, brandId) {
    return this.put(['brands', brandId], brand);
  }

  /**
   * Delete a brand.
   * @async
   * @param {number} brandId - The ID of the brand to delete.
   * @returns {Promise<Object>} The deletion status.
   * @example await client.brands.delete(47);
   * @see {@link https://developer.zendesk.com/api-reference/ticketing/account-configuration/brands/#delete-a-brand}
   */
  async delete(brandId) {
    return super.delete(['brands', brandId]);
  }

  /**
   * Check host mapping validity for a given subdomain and host mapping.
   * @async
   * @param {string} hostMapping - The host mapping to check.
   * @param {string} subdomain - The subdomain to check.
   * @returns {Promise<Object>} The check result.
   * @example await client.brands.checkHostMapping("brand1.com", "brand1");
   * @see {@link https://developer.zendesk.com/api-reference/ticketing/account-configuration/brands/#check-host-mapping-validity}
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
   * @async
   * @param {number} brandId - The ID of the brand to check.
   * @returns {Promise<Object>} The check result.
   * @example await client.brands.checkHostMappingForExistingBrand(47);
   * @see {@link https://developer.zendesk.com/api-reference/ticketing/account-configuration/brands/#check-host-mapping-validity-for-an-existing-brand}
   */
  async checkHostMappingForExistingBrand(brandId) {
    return this.get(['brands', brandId, 'check_host_mapping']);
  }
}

exports.Brand = Brand;
