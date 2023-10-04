// AccessPolicies.js: Client for the zendesk help center API.

const {Client} = require('../client');
const { ApiTypes } = require('../../constants');

class AccessPolicies extends Client {
  constructor(options) {
    super(options, ApiTypes.helpcenter);
    this.jsonAPINames = ['accesspplicies', 'accesspolicy'];
  }

  // AccessPolicies
  // Showing Access Policies
  async show(sectionID) {
    return this.get(['sections', sectionID, 'access_policy']);
  }

  // Updating Access Policies
  async update(sectionID, accessPolicy) {
    return this.put(['sections', sectionID, 'access_policy'], accessPolicy);
  }
}

exports.AccessPolicies = AccessPolicies;
