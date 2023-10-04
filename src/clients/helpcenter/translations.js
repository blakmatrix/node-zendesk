// Translation.js: Client for the zendesk API.
const {Client} = require('../client');
const { ApiTypes } = require('../../constants');

class Translations extends Client {
  constructor(options) {
    super(options, ApiTypes.helpcenter);
    this.jsonAPINames = ['translations', 'translation'];
  }

  // Viewing Translations
  async show(articleID, locale) {
    return this.get(['articles', articleID, 'translations', locale]);
  }

  // Listing Translations Belongs To An Article
  // Parameters allowed:
  // locales=en-us,en-uk
  // outdated=true
  async listByArticle(articleID, filterParameters) {
    return this.getAll([
      'articles',
      articleID,
      'translations',
      filterParameters,
    ]);
  }

  // Listing Translations Belongs To A Section
  async listBySection(sectionID) {
    return this.getAll(['sections', sectionID, 'translations']);
  }

  // Listing Translations Belongs To A Category
  async listByCategory(categoryID) {
    return this.getAll(['categories', categoryID, 'translations']);
  }

  // Listing Translations Belongs To An Article
  async listMissingLocalesByArticle(articleID) {
    return this.get(['articles', articleID, 'translations', 'missing']);
  }

  // Listing Translations Belongs To A Section
  async listMissingLocalesBySection(sectionID) {
    return this.get(['sections', sectionID, 'translations', 'missing']);
  }

  // Listing Translations Belongs To A Category
  async listMissingLocalesByCategory(categoryID) {
    return this.get(['categories', categoryID, 'translations', 'missing']);
  }

  // Creating Translations For An Article
  async createForArticle(articleID, translation) {
    return this.post(['articles', articleID, 'translations'], translation);
  }

  // Creating Translations For A Section
  async createForSection(sectionID, translation) {
    return this.post(['sections', sectionID, 'translations'], translation);
  }

  // Creating Translations For A Category
  async createForCategory(categoryID, translation) {
    return this.post(['categories', categoryID, 'translations'], translation);
  }

  // Updating Translations For An Article
  async updateForArticle(articleID, locale, translation) {
    return this.put(
      ['articles', articleID, 'translations', locale],
      translation,
    );
  }

  // Updating Translations For A Section
  async updateForSection(sectionID, locale, translation) {
    return this.put(
      ['sections', sectionID, 'translations', locale],
      translation,
    );
  }

  // Updating Translations For A Category
  async updateForCategory(categoryID, locale, translation) {
    return this.put(
      ['categories', categoryID, 'translations', locale],
      translation,
    );
  }

  // Deleting Translations
  async delete(translationID) {
    return super.delete(['translations', translationID]);
  }

  // Listing All Enabled Locales And Default Locale
  async listLocales() {
    return this.get(['locales']);
  }
}

exports.Translations = Translations;
