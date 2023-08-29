// Policies.js: Client for the zendesk API.
const {Client} = require('../client');

class Policies extends Client {
  constructor(options) {
    super(options);
    this.jsonAPINames = ['slas/policies'];
  }

  // Listing Policies
  async list() {
    return this.getAll(['slas/policies']);
  }

  // Viewing Policies
  async show(policyID) {
    return this.get(['slas/policies', policyID]);
  }

  // Creating Policies
  async create(policy) {
    return this.post(['slas/policies'], policy);
  }

  // Updating Policies
  async update(policyID, policy) {
    return this.put(['slas/policies', policyID], policy);
  }

  // Deleting Policies
  async delete(policyID) {
    return super.delete(['slas/policies', policyID]);
  }
}

exports.Policies = Policies;
