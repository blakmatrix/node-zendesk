// Categories.js: Client for the zendesk API.
const {Client} = require('../client');

class Categories extends Client {
  constructor(options) {
    super(options);
    this.jsonAPINames = ['categories', 'category'];
  }

  // Listing Categories
  async list() {
    return this.getAll(['categories']);
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

  // Deleting Categories
  async delete(categoryID) {
    return super.delete(['categories', categoryID]);
  }
}

exports.Categories = Categories;
