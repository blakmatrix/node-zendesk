var util        = require('util'),
    Client      = require('./client').Client;


var DynamicContent = exports.DynamicContent = function (options) {
  this.jsonAPINames = [ 'items', 'variants' ];
  Client.call(this, options);
};

util.inherits(DynamicContent, Client);


DynamicContent.prototype.listItems = function listItems() {
  return this.request('GET', ['dynamic_content', 'items']);
};

DynamicContent.prototype.listAllItems = function listAllItems() {
  return this.requestAll('GET', ['dynamic_content', 'items']);
};

DynamicContent.prototype.showItem = function showItem(itemId) {
  return this.request('GET', ['dynamic_content', 'items', itemId]);
};

DynamicContent.prototype.createItem = function createItem(item) {
  return this.request('POST', ['dynamic_content', 'items'], item);
};

DynamicContent.prototype.updateItem = function updateItem(itemId, item) {
  return this.request('PUT', ['dynamic_content', 'items', itemId], item);
};

DynamicContent.prototype.deleteItem = function deleteItem(itemId) {
  return this.request('DELETE', ['dynamic_content', 'items', itemId]);
};


DynamicContent.prototype.listVariants = function listVariants(itemId) {
  return this.request('GET', ['dynamic_content', 'items', itemId, 'variants']);
};

DynamicContent.prototype.listAllVariants = function listAllVariants(itemId) {
  return this.requestAll('GET', ['dynamic_content', 'items', itemId, 'variants']);
};


DynamicContent.prototype.showVariant = function showVariant(itemId, variantId) {
  return this.request('GET', ['dynamic_content', 'items', itemId, 'variants', variantId]);
};

DynamicContent.prototype.createVariant = function createVariant(itemId, variant) {
  return this.request('POST', ['dynamic_content', 'items', itemId, 'variants'], variant);
};

DynamicContent.prototype.updateVariant = function (itemId, variantId, variant) {
  return this.request('PUT', ['dynamic_content', 'items', itemId, 'variants', variantId], variant);
};

DynamicContent.prototype.deleteVariant = function (itemId, variantId) {
  return this.request('DELETE', ['dynamic_content', 'items', itemId, 'variants', variantId]);
};
