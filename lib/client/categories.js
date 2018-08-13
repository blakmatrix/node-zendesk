//Categories.js: Client for the zendesk API.


var util        = require('util'),
    Client      = require('./client').Client;

var Categories = exports.Categories = function (options) {
  this.jsonAPINames = [ 'categories', 'category' ];
  Client.call(this, options);
};

// Inherit from Client base object
util.inherits(Categories, Client);

// ######################################################## Categories
// ====================================== Listing Categories
Categories.prototype.list = function (cb) {
  return this.requestAll('GET', ['categories'], cb);//all
};


// ====================================== Viewing Categories

Categories.prototype.show = function (categoryID, cb) {
  return this.request('GET', ['categories', categoryID], cb);
};

// ====================================== Creating Categories
Categories.prototype.create = function (category, cb) {
  return this.request('POST', ['categories'], category, cb);
};

// ====================================== Updating Categories

Categories.prototype.update = function (categoryID, category, cb) {
  return this.request('PUT', ['categories', categoryID], category, cb);
};


// ====================================== Deleting Categories
Categories.prototype.delete = function (categoryID, cb) {
  return this.request('DELETE', ['categories', categoryID],  cb);
};
