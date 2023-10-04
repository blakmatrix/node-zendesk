// Categories.js: Client for the zendesk API.
const {Client} = require('../client');
const {ApiTypes} = require('../../constants');

class Categories extends Client {
  constructor(options) {
    super(options, ApiTypes.helpcenter);
    this.jsonAPINames = ['categories', 'category'];
  }

  // Listing Categories
  async list() {
    return this.getAll(['categories']);
  }

  // Listing Categories By Locale
  async listWithLocale(locale) {
    return this.getAll([locale, 'categories']);
  }

  // Viewing Categories
  async show(categoryID) {
    return this.get(['categories', categoryID]);
  }

  // Creating Categories
  async create(category) {
    return this.post(['categories'], category);
  }

  // Updating Categories
  async update(categoryID, category) {
    return this.put(['categories', categoryID], category);
  }

  // Updating Categories With Specified Locale
  async updateWithLocale(locale, categoryID, category) {
    return this.put([locale, 'categories', categoryID], category);
  }

  // Updating Categories' Source Locale
  async updateSourceLocale(categoryID, sourceLocale) {
    return this.put(['categories', categoryID, 'source_locale'], sourceLocale);
  }

  // Deleting Categories
  async delete(categoryID) {
    return super.delete(['categories', categoryID]);
  }
}

exports.Categories = Categories;
