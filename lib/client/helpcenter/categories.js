// Categories.js: Client for the zendesk API.
const {Client} = require('../client');

class Categories extends Client {
  constructor(options) {
    super(options);
    this.jsonAPINames = ['categories', 'category'];
  }

  // Listing Categories
  list(cb) {
    return this.getAll(['categories'], cb);
  }

  // Listing Categories By Locale
  listWithLocale(locale, cb) {
    return this.getAll([locale, 'categories'], cb);
  }

  // Viewing Categories
  show(categoryID, cb) {
    return this.get(['categories', categoryID], cb);
  }

  // Creating Categories
  create(category, cb) {
    return this.post(['categories'], category, cb);
  }

  // Updating Categories
  update(categoryID, category, cb) {
    return this.put(['categories', categoryID], category, cb);
  }

  // Updating Categories With Specified Locale
  updateWithLocale(locale, categoryID, category, cb) {
    return this.put([locale, 'categories', categoryID], category, cb);
  }

  // Updating Categories' Source Locale
  updateSourceLocale(categoryID, sourceLocale, cb) {
    return this.put(
      ['categories', categoryID, 'source_locale'],
      sourceLocale,
      cb,
    );
  }

  // Deleting Categories
  delete(categoryID, cb) {
    return this.delete(['categories', categoryID], cb);
  }
}

exports.Categories = Categories;
