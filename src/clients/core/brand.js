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
   * @returns {Promise<object>} The list of brands.
   * @async
   * @see {@link https://developer.zendesk.com/api-reference/ticketing/account-configuration/brands/#list-brands}
   * @example const brands = await client.brands.list();
   */
  async list() {
    return this.get(['brands']);
  }

  /**
   * Show a specific brand by ID.
   * @param {number} brandId - The ID of the brand.
   * @returns {Promise<object>} The brand details.
   * @async
   * @see {@link https://developer.zendesk.com/api-reference/ticketing/account-configuration/brands/#show-a-brand}
   * @example const brand = await client.brands.show(47);
   */
  async show(brandId) {
    return this.get(['brands', brandId]);
  }

  /**
   * Create a new brand.
   * @param {object} brand - The brand data.
   * @returns {Promise<object>} The created brand details.
   * @async
   * @see {@link https://developer.zendesk.com/api-reference/ticketing/account-configuration/brands/#create-brand}
   * @example const newBrand = await client.brands.create({name: "Brand 1", subdomain: "Brand1"});
   */
  async create(brand) {
    return this.post(['brands'], brand);
  }

  /**
   * Update an existing brand.
   * @param {object} brand - The updated brand data.
   * @param {number} brandId - The ID of the brand to update.
   * @returns {Promise<object>} The updated brand details.
   * @async
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
   * @async
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
   * @returns {Promise<object>} The check result.
   * @async
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
   * @returns {Promise<object>} The check result.
   * @async
   * @see {@link https://developer.zendesk.com/api-reference/ticketing/account-configuration/brands/#check-host-mapping-validity-for-an-existing-brand}
   * @example await client.brands.checkHostMappingForExistingBrand(47);
   */
  async checkHostMappingForExistingBrand(brandId) {
    return this.get(['brands', brandId, 'check_host_mapping']);
  }
}

exports.Brand = Brand;
