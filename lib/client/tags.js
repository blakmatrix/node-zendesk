// Tags.js: Client for the zendesk API.

const {Client} = require('./client');

class Tags extends Client {
  constructor(options) {
    super(options);
    this.jsonAPINames = ['tags'];
  }

  // Listing Tags
  list(cb) {
    return this.getAll(['tags', '?page[size]=100'], cb);
  }
}

exports.Tags = Tags;
