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
Brand.prototype.list = function(cb) {
   this.request('GET', ['brands'], cb);
};

// ====================================== Show Brand
Brand.prototype.show = function(brandId, cb) {
   this.request('GET', ['brands'], cb);
};

// ====================================== Create Brand
Brand.prototype.create = function(brand, cb) {
   this.request('POST', ['brands'], brand, cb);
};

// ====================================== Update Brand
Brand.prototype.update = function(brand, brandId, cb) {
   this.request('PUT', ['brands', brandId], brand, cb);
};

// ====================================== Delete Brand
Brand.prototype.delete = function(brandId, cb) {
   this.request('DELETE', ['brands', brandId], cb);
};

// ====================================== Check Host Mapping Validity
Brand.prototype.checkHostMapping = function(hostMapping, subdomain, brandId, cb) {
   this.request('GET', ['brands', 'check_host_mapping'], cb);
};
