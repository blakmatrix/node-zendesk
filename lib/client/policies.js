// Policies.js: Client for the zendesk API.
const {Client} = require('./client');

class Policies extends Client {
  constructor(options) {
    super(options);
    this.jsonAPINames = ['slas/policies'];
  }

  // Listing Policies
  list(cb) {
    return this.getAll(['slas/policies'], cb);
  }

  // Viewing Policies
  show(policyID, cb) {
    return this.get(['slas/policies', policyID], cb);
  }

  // Creating Policies
  create(policy, cb) {
    return this.post(['slas/policies'], policy, cb);
  }

  // Updating Policies
  update(policyID, policy, cb) {
    return this.put(['slas/policies', policyID], policy, cb);
  }

  // Deleting Policies
  delete(policyID, cb) {
    return this.delete(['slas/policies', policyID], cb);
  }
}

exports.Policies = Policies;
