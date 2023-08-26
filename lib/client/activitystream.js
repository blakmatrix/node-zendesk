// ActivityStream.js: Client for the zendesk API.

const {Client} = require('./client');

class ActivityStream extends Client {
  constructor(options) {
    super(options);
    this.jsonAPINames = ['activities', 'activity'];
  }

  // Listing ActivityStream
  async list() {
    return this.getAll('GET', ['activities', '?page[size]=100']);
  }

  // Viewing ActivityStream

  async show(activityID) {
    return this.get(['activities', activityID]);
  }
}

exports.ActivityStream = ActivityStream;
