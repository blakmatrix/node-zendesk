// Brand.js: Client for the zendesk API.

const {Client} = require('./client');

class Brand extends Client {
  constructor(options) {
    super(options);
    this.jsonAPINames = ['brands'];
  }

  // Listing Brands
  list(cb) {
    return this.get(['brands'], cb);
  }

  // Show Brand
  show(brandId, cb) {
    return this.get(['brands', brandId], cb);
  }

  // Create Brand
  create(brand, cb) {
    return this.post(['brands'], brand, cb);
  }

  // Update Brand
  update(brand, brandId, cb) {
    return this.put(['brands', brandId], brand, cb);
  }

  // Delete Brand
  delete(brandId, cb) {
    return this.delete(['brands', brandId], cb);
  }

  // Check Host Mapping Validity
  checkHostMapping(hostMapping, subdomain, brandId, cb) {
    return this.get(['brands', 'check_host_mapping'], cb);
  }
}

exports.Brand = Brand;
