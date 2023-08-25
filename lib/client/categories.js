// Categories.js: Client for the zendesk API.
const {Client} = require('./client');

class Categories extends Client {
  constructor(options) {
    super(options);
    this.jsonAPINames = ['categories', 'category'];
  }

  // Listing Categories
  list(cb) {
    return this.getAll(['categories'], cb);
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

  // Deleting Categories
  delete(categoryID, cb) {
    return this.delete(['categories', categoryID], cb);
  }
}

exports.Categories = Categories;
