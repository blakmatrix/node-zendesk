// GreetingCategories.js: Client for the zendesk API.
const {Client} = require('../client');

class GreetingCategories extends Client {
  constructor(options) {
    super(options);
    this.jsonAPINames = ['greeting_categories', 'greeting_category'];
  }

  // List Greetings Categories
  list(cb) {
    return this.get(['greeting_categories'], cb);
  }

  // Get Greetings Category by ID
  show(greetingCategoryID, cb) {
    return this.get(['greeting_category', greetingCategoryID], cb);
  }
}

exports.GreetingCategories = GreetingCategories;
