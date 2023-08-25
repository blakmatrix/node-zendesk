// Greetings.js: Client for the zendesk API.
const {Client} = require('../client');

class Greetings extends Client {
  constructor(options) {
    super(options);
    this.jsonAPINames = ['greetings', 'greetings'];
  }

  // List Greetings
  list(cb) {
    return this.get(['greetings'], cb);
  }

  // List Greetings by ID
  show(greetingID, cb) {
    return this.get(['greetings', greetingID], cb);
  }

  // Create Greeting
  create(greeting, cb) {
    return this.post('POST', ['greetings'], greeting, cb);
  }

  // Update Greeting
  update(greeting, greetingID, cb) {
    return this.put('PUT', ['greetings', greetingID], greeting, cb);
  }

  // Delete Greeting
  delete(greetingID, cb) {
    return this.delete('DELETE', ['greetings', greetingID], cb);
  }
}

exports.Greetings = Greetings;
