//Translation.js: Client for the zendesk API.


var util = require('util'),
  Client = require('../client').Client
//defaultgroups = require('./helpers').defaultgroups;


var Translations = exports.Translations = function (options) {
  this.jsonAPINames = [ 'translations', 'translation' ];
  Client.call(this, options);
};

// Inherit from Client base object
util.inherits(Translations, Client);

// ######################################################## Translations

// ====================================== Viewing Translations
Translations.prototype.show = function (articleID, locale) {
  return this.request('GET', ['articles', articleID, 'translations', locale]);
};

// ====================================== Listing Translations Belongs To An Article
//Parameters allowed:
//  locales=en-us,en-uk
//  outdated=true
Translations.prototype.listByArticle = function (articleID, filterParams) {
  return this.requestAll('GET', ['articles', articleID, 'translations',filterParams]);
};

// ====================================== Listing Translations Belongs To A Section
Translations.prototype.listBySection = function (sectionID) {
  return this.requestAll('GET', ['sections', sectionID, 'translations']);
};

// ====================================== Listing Translations Belongs To A Category
Translations.prototype.listByCategory = function (categoryID) {
  return this.requestAll('GET', ['categories', categoryID, 'translations']);
};

// ====================================== Listing Translations Belongs To An Article
Translations.prototype.listMissingLocalesByArticle = function (articleID) {
  return this.request('GET', ['articles', articleID, 'translations', 'missing']);
};

// ====================================== Listing Translations Belongs To A Section
Translations.prototype.listMissingLocalesBySection = function (sectionID) {
  return this.request('GET', ['sections', sectionID, 'translations', 'missing']);
};

// ====================================== Listing Translations Belongs To A Category
Translations.prototype.listMissingLocalesByCategory = function (categoryID) {
  return this.request('GET', ['categories', categoryID, 'translations', 'missing']);
};

// ====================================== Creating Translations For An Article
Translations.prototype.createForArticle = function (articleID, translation) {
  return this.request('POST', ['articles',articleID,'translations'], translation);
};

// ====================================== Creating Translations For A Section
Translations.prototype.createForSection = function (sectionID, translation) {
  return this.request('POST', ['sections',sectionID,'translations'], translation);
};

// ====================================== Creating Translations For A Category
Translations.prototype.createForCategory = function (categoryID, translation) {
  return this.request('POST', ['categories',categoryID,'translations'], translation);
};

// ====================================== Updating Translations For An Article
Translations.prototype.updateForArticle = function (articleID, locale, translation) {
  return this.request('PUT', ['articles',articleID,'translations',locale], translation);
};

// ====================================== Updating Translations For A Section
Translations.prototype.updateForSection = function (sectionID, locale, translation) {
  return this.request('PUT', ['sections',sectionID,'translations',locale], translation);
};

// ====================================== Updating Translations For A Category
Translations.prototype.updateForCategory = function (categoryID, locale, translation) {
  return this.request('PUT', ['categories',categoryID,'translations',locale], translation);
};

// ====================================== Deleting Translations
Translations.prototype.delete = function (translationID) {
  return this.request('DELETE', ['translations', translationID],);
};
// ====================================== Listing All Enabled Locales And Default Locale
Translations.prototype.listLocales = function() {
  return this.request('GET', ['locales']);
}
