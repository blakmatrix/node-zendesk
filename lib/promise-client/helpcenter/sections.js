//Sections.js: Client for the zendesk API.

var util = require('util'),
  Client = require('../client').Client
//defaultgroups = require('./helpers').defaultgroups;

var Sections = exports.Sections = function (options) {
  this.jsonAPINames = [ 'sections', 'section' ];

  this.sideLoadMap = [
    { field: 'category_id', name: 'category', dataset: 'categories' }
  ];

  Client.call(this, options);
};

// Inherit from Client base object
util.inherits(Sections, Client);

// ######################################################## Sections
// ====================================== Listing Sections
Sections.prototype.list = function () {
  return this.requestAll('GET', ['sections']);//all
};

// ====================================== Listing Sections In A Category
Sections.prototype.listByCategory = function (categoryID) {
  return this.requestAll('GET', ['categories', categoryID, 'sections']);//all
};

// ====================================== Listing Sections By Locale
Sections.prototype.listWithLocale = function (locale) {
  return this.requestAll('GET', [locale, 'sections']);//all
};


// ====================================== Viewing Sections
Sections.prototype.show = function (sectionID) {
  return this.request('GET', ['sections', sectionID]);
};

// ====================================== Viewing Section by locale
Sections.prototype.showWithLocale = function(locale, sectionID) {
  return this.request('GET', [locale, 'sections', sectionID]);
};

// ====================================== Creating Sections
Sections.prototype.create = function (categoryId, section) {
  return this.request('POST', ['categories', categoryId, 'sections'], section);
};

// ====================================== Creating Sections With Specified Locale
Sections.prototype.createWithLocale = function (locale, categoryId, section) {
  return this.request('POST', [locale, 'categories', categoryId, 'sections'], section);
}

// ====================================== Updating Sections
Sections.prototype.update = function (sectionID, section) {
  return this.request('PUT', ['sections', sectionID], section);
};

// ====================================== Updating Sections By Locale
Sections.prototype.updateWithLocale = function (locale, sectionID, section) {
  return this.request('PUT', [locale, 'sections', sectionID], section);
};

// ====================================== Updating Sections' Source Locale
Sections.prototype.updateSourceLocale = function (sectionID, sourceLocale) {
  return this.request('PUT', ['sections', sectionID, 'source_locale'],sourceLocale);
}

// ====================================== Deleting Sections
Sections.prototype.delete = function (sectionID) {
  return this.request('DELETE', ['sections', sectionID]);
};
