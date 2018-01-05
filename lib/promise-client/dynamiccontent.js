var util        = require('util'),
    Client      = require('./client').Client;


var DynamicContent = exports.DynamicContent = function (options) {
  this.jsonAPINames = [ 'items', 'variants' ];
  Client.call(this, options);
};

util.inherits(DynamicContent, Client);


DynamicContent.prototype.listItems = function (cb) {
  this.request('GET', ['dynamic_content', 'items'], cb);
};

DynamicContent.prototype.listAllItems = function (cb) {
  this.requestAll('GET', ['dynamic_content', 'items'], cb);
};

DynamicContent.prototype.showItem = function (itemID, cb) {
  this.request('GET', ['dynamic_content', 'items', itemID], cb);
};

DynamicContent.prototype.createItem = function(item, cb) {
  this.request('POST', ['dynamic_content', 'items'], item, cb);
};

DynamicContent.prototype.updateItem = function(itemID, item, cb) {
  this.request('PUT', ['dynamic_content', 'items', itemID], item, cb);
};

DynamicContent.prototype.deleteItem = function (itemID, cb) {
  this.request('DELETE', ['dynamic_content', 'items', itemID],  cb);
};


DynamicContent.prototype.listVariants = function (itemID, cb) {
  this.request('GET', ['dynamic_content', 'items', itemID, 'variants'], cb);
};

DynamicContent.prototype.listAllVariants = function (itemID, cb) {
  this.requestAll('GET', ['dynamic_content', 'items', itemID, 'variants'], cb);
};


DynamicContent.prototype.showVariant = function (itemID, variantID, cb) {
  this.request('GET', ['dynamic_content', 'items', itemID, 'variants', variantID], cb);
};

DynamicContent.prototype.createVariant = function (itemID, variant, cb) {
  this.request('POST', ['dynamic_content', 'items', itemID, 'variants'], variant, cb);
};

DynamicContent.prototype.updateVariant = function (itemID, variantID, variant, cb) {
  this.request('PUT', ['dynamic_content', 'items', itemID, 'variants', variantID], variant, cb);
};

DynamicContent.prototype.deleteVariant = function (itemID, variantID, cb) {
  this.request('DELETE', ['dynamic_content', 'items', itemID, 'variants', variantID], cb);
};
