// Tags.js: Client for the zendesk API.

const {Client} = require('../client');

class Tags extends Client {
  constructor(options) {
    super(options);
    this.jsonAPINames = ['tags'];
  }

  // Listing Tags
  async list() {
    return this.getAll(['tags']);
  }
}

exports.Tags = Tags;
