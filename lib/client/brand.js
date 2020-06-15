//Brand.js: Client for the zendesk API.


var util = require('util'),
   Client = require('./client').Client;



var Brand = exports.Brand = function(options) {
   this.jsonAPINames = [ 'sharing-agreement' ];
   Client.call(this, options);
};

// Inherit from Client base object
util.inherits(Brand, Client);

// ######################################################## Brand
// ====================================== Listing Brands
Brand.prototype.list = function(cb) {
   return this.request('GET', ['brands'], cb);
};

// ====================================== Show Brand
Brand.prototype.show = function(brandId, cb) {
   return this.request('GET', ['brands', brandId], cb);
};

// ====================================== Create Brand
Brand.prototype.create = function(brand, cb) {
   return this.request('POST', ['brands'], brand, cb);
};

// ====================================== Update Brand
Brand.prototype.update = function(brand, brandId, cb) {
   return this.request('PUT', ['brands', brandId], brand, cb);
};

// ====================================== Delete Brand
Brand.prototype.delete = function(brandId, cb) {
   return this.request('DELETE', ['brands', brandId], cb);
};

// ====================================== Check Host Mapping Validity
Brand.prototype.checkHostMapping = function(hostMapping, subdomain, brandId, cb) {
   return this.request('GET', ['brands', 'check_host_mapping'], cb);
};
