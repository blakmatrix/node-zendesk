//Categories.js: Client for the zendesk API.

var util = require('util'),
  Client = require('../client').Client
//defaultgroups = require('./helpers').defaultgroups;

var Categories = exports.Categories = function (options) {
  this.jsonAPINames = [ 'categories', 'category' ];

  Client.call(this, options);
};

// Inherit from Client base object
util.inherits(Categories, Client);

// ######################################################## Categories

// ====================================== Listing Categories

Categories.prototype.list = function () {
  return this.requestAll('GET', ['categories']);//all
};

// ====================================== Viewing Categories

Categories.prototype.show = function (categoryID) {
  return this.request('GET', ['categories', categoryID]);
};

// ====================================== Creating Categories
Categories.prototype.create = function (category) {
  return this.request('POST', ['categories'], category);
};

// ====================================== Updating Categories
Categories.prototype.update = function (categoryID, category) {
  return this.request('PUT', ['categories', categoryID], category);
};

// ====================================== Updating Categories With Specified Locale
Categories.prototype.updateWithLocale = function(locale, categoryID, category) {
  return this.request('PUT', [locale, 'categories', categoryID], category);
}

// ====================================== Updating Categories' Source Locale
Categories.prototype.updateSourceLocale = function(categoryID, sourceLocale) {
  return this.request('PUT', ['categories', categoryID, 'source_locale'], sourceLocale);
};

// ====================================== Deleting Categories
Categories.prototype.delete = function (categoryID) {
  return this.request('DELETE', ['categories', categoryID]);
};
