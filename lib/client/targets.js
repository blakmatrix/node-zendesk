// Targets.js: Client for the zendesk API.
const {Client} = require('./client');

class Targets extends Client {
  constructor(options) {
    super(options);
    this.jsonAPINames = ['targets', 'target'];
  }

  // Listing Targets
  list(cb) {
    return this.getAll(['targets'], cb);
  }

  // Viewing Targets
  show(triggerID, cb) {
    return this.get(['targets', triggerID], cb);
  }

  // Creating Targets
  create(target, cb) {
    return this.post(['targets'], target, cb);
  }

  // Updating Targets
  update(targetID, target, cb) {
    return this.put(['targets', targetID], target, cb);
  }

  // Deleting Targets
  delete(targetID, cb) {
    return this.delete(['targets', targetID], cb);
  }
}

exports.Targets = Targets;
