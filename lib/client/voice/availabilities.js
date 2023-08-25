// Availabilities.js: Client for the Zendesk Voice API.
const {Client} = require('../client');

class Availabilities extends Client {
  constructor(options) {
    super(options);
    this.jsonAPINames = ['availabilities', 'availability'];
  }

  // Update Availabilities
  update(agentID, availability, cb) {
    return this.put(['availabilities', agentID], availability, cb);
  }

  // Get Availabilities by ID
  show(agentID, cb) {
    return this.get(['availabilities', agentID], cb);
  }
}

exports.Availabilities = Availabilities;
