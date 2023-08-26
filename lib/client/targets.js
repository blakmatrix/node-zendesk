// Targets.js: Client for the zendesk API.
const {Client} = require('./client');

class Targets extends Client {
  constructor(options) {
    super(options);
    this.jsonAPINames = ['targets', 'target'];
  }

  // Listing Targets
  async list() {
    return this.getAll(['targets']);
  }

  // Viewing Targets
  async show(triggerID) {
    return this.get(['targets', triggerID]);
  }

  // Creating Targets
  async create(target) {
    return this.post(['targets'], target);
  }

  // Updating Targets
  async update(targetID, target) {
    return this.put(['targets', targetID], target);
  }

  // Deleting Targets
  async delete(targetID) {
    return this.delete(['targets', targetID]);
  }
}

exports.Targets = Targets;
