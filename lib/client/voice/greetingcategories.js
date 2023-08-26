// GreetingCategories.js: Client for the zendesk API.
const {Client} = require('../client');

class GreetingCategories extends Client {
  constructor(options) {
    super(options);
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
