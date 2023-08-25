// AccessPolicies.js: Client for the zendesk help center API.

const {Client} = require('../client');

class AccessPolicies extends Client {
  constructor(options) {
    super(options);
    this.jsonAPINames = ['accesspplicies', 'accesspolicy'];
  }

  // AccessPolicies
  // Showing Access Policies
  show(sectionID, cb) {
    return this.get(['sections', sectionID, 'access_policy'], cb);
  }

  // Updating Access Policies
  update(sectionID, accessPolicy, cb) {
    return this.put(['sections', sectionID, 'access_policy'], accessPolicy, cb);
  }
}

exports.AccessPolicies = AccessPolicies;
