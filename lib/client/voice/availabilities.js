// Availabilities.js: Client for the Zendesk Voice API.
const {Client} = require('../client');

class Availabilities extends Client {
  constructor(options) {
    super(options);
    this.jsonAPINames = ['availabilities', 'availability'];
  }

  // Update Availabilities
  async update(agentID, availability) {
    return this.put(['availabilities', agentID], availability);
  }

  // Get Availabilities by ID
  async show(agentID) {
    return this.get(['availabilities', agentID]);
  }
}

exports.Availabilities = Availabilities;
