//Categories.js: Client for the zendesk API.


var util        = require('util'),
    Client      = require('./client').Client,
    defaultgroups = require('./helpers').defaultgroups;


var Categories = exports.Categories = function (options) {
  this.jsonAPINames = [ 'categories', 'category' ];
  Client.call(this, options);
};

// Inherit from Client base object
util.inherits(Categories, Client);

// ######################################################## Categories
// ====================================== Listing Categories
Categories.prototype.list = function list() {
  return this.requestAll('GET', ['categories']);//all
};


// ====================================== Viewing Categories

Categories.prototype.show = function show(categoryId) {
  return this.request('GET', ['categories', categoryId]);
};

// ====================================== Creating Categories
Categories.prototype.create = function create(category) {
  return this.request('POST', ['categories'], category);
};

// ====================================== Updating Categories

Categories.prototype.update = function update(categoryId, category) {
  return this.request('PUT', ['categories', categoryId], category);
};


// ====================================== Deleting Categories
Categories.prototype.delete = function delete(categoryId) {
  return this.request('DELETE', ['categories', categoryId]);
};
