// Targetfailures.js: Client for the zendesk API.
const {Client} = require('./client');

class TargetFailures extends Client {
  constructor(options) {
    super(options);
    this.jsonAPINames = ['targetfailures', 'targetsfailures'];
  }

  // Listing Target Failures
  list(cb) {
    this.getAll(['target_failures'], cb);
  }

  // Viewing Target Failure
  show(targetFailureID, cb) {
    this.get(['target_failures', targetFailureID], cb);
  }
}

exports.TargetFailures = TargetFailures;
