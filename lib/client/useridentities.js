// UserIdentities.js: Client for the zendesk API.
const {Client} = require('./client');

class UserIdentities extends Client {
  constructor(options) {
    super(options);
    this.jsonAPINames = ['identities', 'identity'];
  }

  // Listing UserIdentities
  list(userID, cb) {
    return this.getAll(['users', userID, 'identities'], cb);
  }

  // Viewing UserIdentities
  show(userID, userIdentityID, cb) {
    return this.get(['users', userID, 'identities', userIdentityID], cb);
  }

  // Creating UserIdentities
  create(userID, userIDentity, cb) {
    if (
      userIDentity &&
      typeof userIDentity === 'object' &&
      !Array.isArray(userIDentity) &&
      !Object.hasOwn(userIDentity, 'identity')
    ) {
      userIDentity = {identity: userIDentity};
    }

    return this.post(['users', userID, 'identities'], userIDentity, cb);
  }

  // Updating UserIdentities
  update(userID, userIdentityID, identity, cb) {
    return this.put(
      ['users', userID, 'identities', userIdentityID],
      identity,
      cb,
    );
  }

  makePrimary(userID, userIdentityID, cb) {
    return this.put(
      ['users', userID, 'identities', userIdentityID, 'make_primary'],
      cb,
    );
  }

  verify(userID, userIdentityID, cb) {
    return this.put(
      ['users', userID, 'identities', userIdentityID, 'verify'],
      cb,
    );
  }

  requestVerification(userID, userIdentityID, cb) {
    return this.put(
      ['users', userID, 'identities', userIdentityID, 'request_verification'],
      cb,
    );
  }

  // Deleting UserIdentities
  delete(userID, userIdentityID, cb) {
    return this.delete(['users', userID, 'identities', userIdentityID], cb);
  }
}

exports.UserIdentities = UserIdentities;
