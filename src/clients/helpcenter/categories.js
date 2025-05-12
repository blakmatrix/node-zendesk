// Categories.js: Client for the zendesk API.
const {Client} = require('../client');
const {ApiTypes} = require('../../constants');

/**
 * Categories are the top-level organizing containers of the knowledge base in the help center
 * @typedef {object} Category
 * @property {string} [created_at] - The time at which the category was created
 * @property {string} [description] - The description of the category
 * @property {string} [html_url] - The url of this category in Help Center
 * @property {number} id - Automatically assigned when creating categories
 * @property {string} locale - The locale where the category is displayed
 * @property {string} name - The name of the category
 * @property {boolean} [outdated] - Whether the category is out of date
 * @property {number} [position] - The position of this category relative to other categories
 * @property {string} [source_locale] - The source (default) locale of the category
 * @property {string} [updated_at] - The time at which the category was last updated
 * @property {string} [url] - The API url of this category
 */

class Categories extends Client {
  constructor(options) {
    super(options, ApiTypes.helpcenter);
    this.jsonAPINames = ['categories', 'category'];
  }

  /**
   * List all the categories
   * @returns {Promise<Array<Category>>} An array of categories
   * @see {@link https://developer.zendesk.com/api-reference/help_center/help-center-api/categories/#list-categories}
   * @example
   * const categories = await client.helpcenter.categories.list();
   */
  async list() {
    return this.getAll(['categories']);
  }

  /**
   * List all the categories
   * @param {string} locale - The locale to filter categories by
   * @returns {Promise<Array<Category>>} An array of categories
   * @see {@link https://developer.zendesk.com/api-reference/help_center/help-center-api/categories/#list-categories}
   * @example
   * const categories = await client.helpcenter.categories.listWithLocale('en-us');
   */
  async listWithLocale(locale) {
    return this.getAll([locale, 'categories']);
  }

  /**
   * Get a specific category
   * @param {number} categoryID - The ID of the category to retrieve
   * @returns {Promise<Category>} An array of categories
   * @see {@link https://developer.zendesk.com/api-reference/help_center/help-center-api/categories/#show-category}
   * @example
   * const categories = await client.helpcenter.categories.show(12345678);
   */
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
