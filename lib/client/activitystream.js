// ActivityStream.js: Client for the zendesk API.

const {Client} = require('./client');

class ActivityStream extends Client {
  constructor(options) {
    super(options);
    this.jsonAPINames = ['activities', 'activity'];
  }

  // Listing ActivityStream
  list(cb) {
    return this.getAll('GET', ['activities', '?page[size]=100'], cb);
  }

  // Viewing ActivityStream

  show(activityID, cb) {
    return this.get(['activities', activityID], cb);
  }
}

exports.ActivityStream = ActivityStream;
