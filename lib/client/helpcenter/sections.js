//Sections.js: Client for the zendesk API.


var util        = require('util'),
  Client      = require('../client').Client;


var Sections = exports.Sections = function (options) {
  this.jsonAPINames = ['sections', 'section'];

  this.sideLoadMap = [{
    field: 'category_id',
    name: 'category',
    dataset: 'categories'
  }];

  Client.call(this, options);
};

// Inherit from Client base object
util.inherits(Sections, Client);

// ######################################################## Sections
// ====================================== Listing Sections
Sections.prototype.list = function (cb) {
  return this.requestAll('GET', ['sections'], cb); //all
};

// ====================================== Listing Sections In A Category
Sections.prototype.listByCategory = function (categoryID, cb) {
  return this.requestAll('GET', ['categories', categoryID, 'sections'], cb); //all
};

// ====================================== Listing Sections By Locale
Sections.prototype.listWithLocale = function (locale, cb) {
  return this.requestAll('GET', [locale, 'sections'], cb); //all
};

// ====================================== Listing Sections By Locale In A Category
Sections.prototype.listByCategoryByLocale = function (locale, categoryID, cb) {
  return this.requestAll('GET', [locale, 'categories', categoryID, 'sections'], cb); //all
};

// ====================================== Viewing Sections
Sections.prototype.show = function (sectionID, cb) {
  return this.request('GET', ['sections', sectionID], cb);
};

// ====================================== Viewing Section by locale
Sections.prototype.showWithLocale = function(locale, sectionID, cb) {
  return this.request('GET', [locale, 'sections', sectionID], cb);
};

// ====================================== Creating Sections
Sections.prototype.create = function (categoryId, section, cb) {
  return this.request('POST', ['categories', categoryId, 'sections'], section, cb);
};

// ====================================== Creating Sections With Specified Locale
Sections.prototype.createWithLocale = function (locale, categoryId, section, cb) {
  return this.request('POST', [locale, 'categories', categoryId, 'sections'], section, cb);
}

// ====================================== Updating Sections
Sections.prototype.update = function (sectionID, section, cb) {
  return this.request('PUT', ['sections', sectionID], section, cb);
};

// ====================================== Updating Sections By Locale
Sections.prototype.updateWithLocale = function (locale, sectionID, section, cb) {
  return this.request('PUT', [locale, 'sections', sectionID], section, cb);
};

// ====================================== Updating Sections' Source Locale
Sections.prototype.updateSourceLocale = function (sectionID, sourceLocale, cb) {
  return this.request('PUT', ['sections', sectionID, 'source_locale'],sourceLocale, cb);
}

// ====================================== Deleting Sections
Sections.prototype.delete = function (sectionID, cb) {
  return this.request('DELETE', ['sections', sectionID],  cb);
};
