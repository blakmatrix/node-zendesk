//Brand.js: Client for the zendesk API.


var util = require('util'),
   Client = require('./client').Client,
   defaultgroups = require('./helpers').defaultgroups;


var Brand = exports.Brand = function(options) {
   this.jsonAPINames = [ 'sharing-agreement' ];
   Client.call(this, options);
};

// Inherit from Client base object
util.inherits(Brand, Client);

// ######################################################## Brand
// ====================================== Listing Brands
Brand.prototype.list = function list() {
    return this.request('GET', ['brands']);
};

// ====================================== Show Brand
Brand.prototype.show = function show(brandId) {
    return this.request('GET', ['brands']);
};

// ====================================== Create Brand
Brand.prototype.create = function create(brand) {
    return this.request('POST', ['brands'], brand);
};

// ====================================== Update Brand
Brand.prototype.update = function update(brand, brandId) {
    return this.request('PUT', ['brands', brandId], brand);
};

// ====================================== Delete Brand
Brand.prototype.delete = function delete(brandId) {
    return this.request('DELETE', ['brands', brandId]);
};

// ====================================== Check Host Mapping Validity
Brand.prototype.checkHostMapping = function checkHostMapping(hostMapping, subdomain, brandId) {
    return this.request('GET', ['brands', 'check_host_mapping']);
};
