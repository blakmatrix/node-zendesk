// Brand.js: Client for the zendesk API.

const {Client} = require('../client');

class Brand extends Client {
  constructor(options) {
    super(options);
    this.jsonAPINames = ['brands'];
  }

  // Listing Brands
  async list() {
    return this.get(['brands']);
  }

  // Show Brand
  async show(brandId) {
    return this.get(['brands', brandId]);
  }

  // Create Brand
  async create(brand) {
    return this.post(['brands'], brand);
  }

  // Update Brand
  async update(brand, brandId) {
    return this.put(['brands', brandId], brand);
  }

  // Delete Brand
  async delete(brandId) {
    return this.delete(['brands', brandId]);
  }

  // Check Host Mapping Validity
  async checkHostMapping(/* hostMapping, subdomain, brandId */) {
    // TODO
    return this.get(['brands', 'check_host_mapping']);
  }
}

exports.Brand = Brand;
