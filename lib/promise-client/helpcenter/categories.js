//Categories.js: Client for the zendesk API.


var util        = require('util'),
  Client      = require('../client').Client
//defaultgroups = require('./helpers').defaultgroups;


var Categories = exports.Categories = function (options) {
  this.jsonAPINames = [ 'categories', 'category' ];

  Client.call(this, options);
};

// Inherit from Client base object
util.inherits(Categories, Client);

// ######################################################## Categories

// ====================================== Listing Categories

Categories.prototype.list = function (cb) {
  this.requestAll('GET', ['categories'], cb);//all
};

// ====================================== Viewing Categories

Categories.prototype.show = function (categoryID, cb) {
  this.request('GET', ['categories', categoryID], cb);
};

// ====================================== Creating Categories
Categories.prototype.create = function (category, cb) {
  this.request('POST', ['categories'], category, cb);
};

// ====================================== Updating Categories
Categories.prototype.update = function (categoryID, category, cb) {
  this.request('PUT', ['categories', categoryID], category, cb);
};

// ====================================== Updating Categories With Specified Locale
Categories.prototype.updateWithLocale = function(locale, categoryID, category, cb) {
  this.request('PUT', [locale, 'categories', categoryID], category, cb);
}

// ====================================== Updating Categories' Source Locale
Categories.prototype.updateSourceLocale = function(categoryID, sourceLocale, cb) {
  this.request('PUT', ['categories', categoryID, 'source_locale'], sourceLocale, cb);
};

// ====================================== Deleting Categories
Categories.prototype.delete = function (categoryID, cb) {
  this.request('DELETE', ['categories', categoryID],  cb);
};
