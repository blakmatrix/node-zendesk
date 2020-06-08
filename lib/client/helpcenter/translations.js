//Translation.js: Client for the zendesk API.


var util        = require('util'),
  Client      = require('../client').Client;

var Translations = exports.Translations = function (options) {
  this.jsonAPINames = [ 'translations', 'translation' ];
  Client.call(this, options);
};

// Inherit from Client base object
util.inherits(Translations, Client);

// ######################################################## Translations

// ====================================== Viewing Translations
Translations.prototype.show = function (articleID, locale, cb) {
  return this.request('GET', ['articles', articleID, 'translations', locale], cb);
};

// ====================================== Listing Translations Belongs To An Article
//Parameters allowed:
//  locales=en-us,en-uk
//  outdated=true
Translations.prototype.listByArticle = function (articleID, filterParams, cb) {
  return this.requestAll('GET', ['articles', articleID, 'translations',filterParams], cb);
};

// ====================================== Listing Translations Belongs To A Section
Translations.prototype.listBySection = function (sectionID, cb) {
  return this.requestAll('GET', ['sections', sectionID, 'translations'], cb);
};

// ====================================== Listing Translations Belongs To A Category
Translations.prototype.listByCategory = function (categoryID, cb) {
  return this.requestAll('GET', ['categories', categoryID, 'translations'], cb);
};

// ====================================== Listing Translations Belongs To An Article
Translations.prototype.listMissingLocalesByArticle = function (articleID, cb) {
  return this.request('GET', ['articles', articleID, 'translations', 'missing'], cb);
};

// ====================================== Listing Translations Belongs To A Section
Translations.prototype.listMissingLocalesBySection = function (sectionID, cb) {
  return this.request('GET', ['sections', sectionID, 'translations', 'missing'], cb);
};

// ====================================== Listing Translations Belongs To A Category
Translations.prototype.listMissingLocalesByCategory = function (categoryID, cb) {
  return this.request('GET', ['categories', categoryID, 'translations', 'missing'], cb);
};

// ====================================== Creating Translations For An Article
Translations.prototype.createForArticle = function (articleID, translation, cb) {
  return this.request('POST', ['articles',articleID,'translations'], translation, cb);
};

// ====================================== Creating Translations For A Section
Translations.prototype.createForSection = function (sectionID, translation, cb) {
  return this.request('POST', ['sections',sectionID,'translations'], translation, cb);
};

// ====================================== Creating Translations For A Category
Translations.prototype.createForCategory = function (categoryID, translation, cb) {
  return this.request('POST', ['categories',categoryID,'translations'], translation, cb);
};

// ====================================== Updating Translations For An Article
Translations.prototype.updateForArticle = function (articleID, locale, translation, cb) {
  return this.request('PUT', ['articles',articleID,'translations',locale], translation, cb);
};

// ====================================== Updating Translations For A Section
Translations.prototype.updateForSection = function (sectionID, locale, translation, cb) {
  return this.request('PUT', ['sections',sectionID,'translations',locale], translation, cb);
};

// ====================================== Updating Translations For A Category
Translations.prototype.updateForCategory = function (categoryID, locale, translation, cb) {
  return this.request('PUT', ['categories',categoryID,'translations',locale], translation, cb);
};

// ====================================== Deleting Translations
Translations.prototype.delete = function (translationID, cb) {
  return this.request('DELETE', ['translations', translationID],  cb);
};
// ====================================== Listing All Enabled Locales And Default Locale
Translations.prototype.listLocales = function(cb) {
  return this.request('GET', ['locales'], cb);
}
