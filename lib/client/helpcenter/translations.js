// Translation.js: Client for the zendesk API.
const {Client} = require('../client');

class Translations extends Client {
  constructor(options) {
    super(options);
    this.jsonAPINames = ['translations', 'translation'];
  }

  // Viewing Translations
  show(articleID, locale, cb) {
    return this.get(['articles', articleID, 'translations', locale], cb);
  }

  // Listing Translations Belongs To An Article
  // Parameters allowed:
  // locales=en-us,en-uk
  // outdated=true
  listByArticle(articleID, filterParameters, cb) {
    return this.getAll(
      ['articles', articleID, 'translations', filterParameters],
      cb,
    );
  }

  // Listing Translations Belongs To A Section
  listBySection(sectionID, cb) {
    return this.getAll(['sections', sectionID, 'translations'], cb);
  }

  // Listing Translations Belongs To A Category
  listByCategory(categoryID, cb) {
    return this.getAll(['categories', categoryID, 'translations'], cb);
  }

  // Listing Translations Belongs To An Article
  listMissingLocalesByArticle(articleID, cb) {
    return this.get(['articles', articleID, 'translations', 'missing'], cb);
  }

  // Listing Translations Belongs To A Section
  listMissingLocalesBySection(sectionID, cb) {
    return this.get(['sections', sectionID, 'translations', 'missing'], cb);
  }

  // Listing Translations Belongs To A Category
  listMissingLocalesByCategory(categoryID, cb) {
    return this.get(['categories', categoryID, 'translations', 'missing'], cb);
  }

  // Creating Translations For An Article
  createForArticle(articleID, translation, cb) {
    return this.post(['articles', articleID, 'translations'], translation, cb);
  }

  // Creating Translations For A Section
  createForSection(sectionID, translation, cb) {
    return this.post(['sections', sectionID, 'translations'], translation, cb);
  }

  // Creating Translations For A Category
  createForCategory(categoryID, translation, cb) {
    return this.post(
      ['categories', categoryID, 'translations'],
      translation,
      cb,
    );
  }

  // Updating Translations For An Article
  updateForArticle(articleID, locale, translation, cb) {
    return this.put(
      ['articles', articleID, 'translations', locale],
      translation,
      cb,
    );
  }

  // Updating Translations For A Section
  updateForSection(sectionID, locale, translation, cb) {
    return this.put(
      ['sections', sectionID, 'translations', locale],
      translation,
      cb,
    );
  }

  // Updating Translations For A Category
  updateForCategory(categoryID, locale, translation, cb) {
    return this.put(
      ['categories', categoryID, 'translations', locale],
      translation,
      cb,
    );
  }

  // Deleting Translations
  delete(translationID, cb) {
    return this.delete(['translations', translationID], cb);
  }

  // Listing All Enabled Locales And Default Locale
  listLocales(cb) {
    return this.get(['locales'], cb);
  }
}

exports.Translations = Translations;
