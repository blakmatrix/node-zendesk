// Targetfailures.js: Client for the zendesk API.
const {Client} = require('../client');

class TargetFailures extends Client {
  constructor(options) {
    super(options);
    this.jsonAPINames = ['targetfailures', 'targetsfailures'];
  }

  // Listing Target Failures
  async list() {
    this.getAll(['target_failures']);
  }

  // Viewing Target Failure
  async show(targetFailureID) {
    this.get(['target_failures', targetFailureID]);
  }
}

exports.TargetFailures = TargetFailures;
