// Sections.js: Client for the zendesk API.
const {Client} = require('../client');
const {ApiTypes} = require('../../constants');

class Sections extends Client {
  constructor(options) {
    super(options, ApiTypes.helpcenter);
    this.jsonAPINames = ['sections', 'section'];
    this.sideLoadMap = [
      {
        field: 'category_id',
        name: 'category',
        dataset: 'categories',
      },
    ];
  }

  // Sections
  // Listing Sections
  async list() {
    return this.getAll(['sections']);
  }

  // Listing Sections In A Category
  async listByCategory(categoryID) {
    return this.getAll(['categories', categoryID, 'sections']);
  }

  // Listing Sections By Locale
  async listWithLocale(locale) {
    return this.getAll([locale, 'sections']);
  }

  // Listing Sections By Locale In A Category
  async listByCategoryByLocale(locale, categoryID) {
    return this.getAll([locale, 'categories', categoryID, 'sections']);
  }

  // Viewing Sections
  async show(sectionID) {
    return this.get(['sections', sectionID]);
  }

  // Viewing Section by locale
  async showWithLocale(locale, sectionID) {
    return this.get([locale, 'sections', sectionID]);
  }

  // Creating Sections
  async create(categoryId, section) {
    return this.post(['categories', categoryId, 'sections'], section);
  }

  // Creating Sections With Specified Locale
  async createWithLocale(locale, categoryId, section) {
    return this.post([locale, 'categories', categoryId, 'sections'], section);
  }

  // Updating Sections
  async update(sectionID, section) {
    return this.put(['sections', sectionID], section);
  }

  // Updating Sections By Locale
  async updateWithLocale(locale, sectionID, section) {
    return this.put([locale, 'sections', sectionID], section);
  }

  // Updating Sections' Source Locale
  async updateSourceLocale(sectionID, sourceLocale) {
    return this.put(['sections', sectionID, 'source_locale'], sourceLocale);
  }

  // Deleting Sections
  async delete(sectionID) {
    return super.delete(['sections', sectionID]);
  }
}

exports.Sections = Sections;
