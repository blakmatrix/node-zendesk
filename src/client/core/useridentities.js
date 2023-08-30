// UserIdentities.js: Client for the zendesk API.
const {Client} = require('../client');

class UserIdentities extends Client {
  constructor(options) {
    super(options);
    this.jsonAPINames = ['identities', 'identity'];
  }

  // Listing UserIdentities
  async list(userID) {
    return this.getAll(['users', userID, 'identities']);
  }

  // Viewing UserIdentities
  async show(userID, userIdentityID) {
    return this.get(['users', userID, 'identities', userIdentityID]);
  }

  // Creating UserIdentities
  async create(userID, userIDentity) {
    if (
      userIDentity &&
      typeof userIDentity === 'object' &&
      !Array.isArray(userIDentity) &&
      !Object.hasOwn(userIDentity, 'identity')
    ) {
      userIDentity = {identity: userIDentity};
    }

    return this.post(['users', userID, 'identities'], userIDentity);
  }

  // Updating UserIdentities
  async update(userID, userIdentityID, identity) {
    return this.put(['users', userID, 'identities', userIdentityID], identity);
  }

  async makePrimary(userID, userIdentityID) {
    return this.put([
      'users',
      userID,
      'identities',
      userIdentityID,
      'make_primary',
    ]);
  }

  async verify(userID, userIdentityID) {
    return this.put(['users', userID, 'identities', userIdentityID, 'verify']);
  }

  async requestVerification(userID, userIdentityID) {
    return this.put([
      'users',
      userID,
      'identities',
      userIdentityID,
      'request_verification',
    ]);
  }

  // Deleting UserIdentities
  async delete(userID, userIdentityID) {
    return super.delete(['users', userID, 'identities', userIdentityID]);
  }
}

exports.UserIdentities = UserIdentities;
