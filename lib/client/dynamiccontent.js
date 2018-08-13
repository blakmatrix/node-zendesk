var util        = require('util'),
    Client      = require('./client').Client;


var DynamicContent = exports.DynamicContent = function (options) {
  this.jsonAPINames = [ 'items', 'variants' ];
  Client.call(this, options);
};

util.inherits(DynamicContent, Client);


DynamicContent.prototype.listItems = function (cb) {
  return this.request('GET', ['dynamic_content', 'items'], cb);
};

DynamicContent.prototype.listAllItems = function (cb) {
  return this.requestAll('GET', ['dynamic_content', 'items'], cb);
};

DynamicContent.prototype.showItem = function (itemID, cb) {
  return this.request('GET', ['dynamic_content', 'items', itemID], cb);
};

DynamicContent.prototype.createItem = function(item, cb) {
  return this.request('POST', ['dynamic_content', 'items'], item, cb);
};

DynamicContent.prototype.updateItem = function(itemID, item, cb) {
  return this.request('PUT', ['dynamic_content', 'items', itemID], item, cb);
};

DynamicContent.prototype.deleteItem = function (itemID, cb) {
  return this.request('DELETE', ['dynamic_content', 'items', itemID],  cb);
};


DynamicContent.prototype.listVariants = function (itemID, cb) {
  return this.request('GET', ['dynamic_content', 'items', itemID, 'variants'], cb);
};

DynamicContent.prototype.listAllVariants = function (itemID, cb) {
  return this.requestAll('GET', ['dynamic_content', 'items', itemID, 'variants'], cb);
};


DynamicContent.prototype.showVariant = function (itemID, variantID, cb) {
  return this.request('GET', ['dynamic_content', 'items', itemID, 'variants', variantID], cb);
};

DynamicContent.prototype.createVariant = function (itemID, variant, cb) {
  return this.request('POST', ['dynamic_content', 'items', itemID, 'variants'], variant, cb);
};

DynamicContent.prototype.updateVariant = function (itemID, variantID, variant, cb) {
  return this.request('PUT', ['dynamic_content', 'items', itemID, 'variants', variantID], variant, cb);
};

DynamicContent.prototype.deleteVariant = function (itemID, variantID, cb) {
  return this.request('DELETE', ['dynamic_content', 'items', itemID, 'variants', variantID], cb);
};
