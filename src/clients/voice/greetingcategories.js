// GreetingCategories.js: Client for the zendesk API.
const {Client} = require('../client');
const {ApiTypes} = require('../../constants');

class GreetingCategories extends Client {
  constructor(options) {
    super(options, ApiTypes.voice);
    this.jsonAPINames = ['greeting_categories', 'greeting_category'];
  }

  // List Greetings Categories
  async list() {
    return this.get(['greeting_categories']);
  }

  // Get Greetings Category by ID
  async show(greetingCategoryID) {
    return this.get(['greeting_category', greetingCategoryID]);
  }
}

exports.GreetingCategories = GreetingCategories;
