// UserIdentities.js: Client for the zendesk API.

const util = require('node:util');
const {Client} = require('./client');

const UserIdentities = (exports.UserIdentities = function (options) {
  this.jsonAPINames = ['identities', 'identity'];
  Client.call(this, options);
});

// Inherit from Client base object
util.inherits(UserIdentities, Client);

// ######################################################## UserIdentities
// ====================================== Listing UserIdentities
UserIdentities.prototype.list = function (userID, cb) {
  return this.requestAll('GET', ['users', userID, 'identities'], cb); // All
};

// ====================================== Viewing UserIdentities
UserIdentities.prototype.show = function (userID, userIDentityID, cb) {
  return this.request(
    'GET',
    ['users', userID, 'identities', userIDentityID],
    cb,
  );
};

// ====================================== Creating UserIdentities
UserIdentities.prototype.create = function (userID, userIDentity, cb) {
  if (
    userIDentity &&
    typeof userIDentity === 'object' &&
    !Array.isArray(userIDentity) &&
    !Object.hasOwn(userIDentity, 'identity')
  ) {
    userIDentity = {identity: userIDentity};
  }

  return this.request(
    'POST',
    ['users', userID, 'identities'],
    userIDentity,
    cb,
  );
};

// ====================================== Updating UserIdentities

UserIdentities.prototype.update = function (
  userID,
  userIDentityID,
  identity,
  cb,
) {
  return this.request(
    'PUT',
    ['users', userID, 'identities', userIDentityID],
    identity,
    cb,
  );
};

UserIdentities.prototype.makePrimary = function (userID, userIDentityID, cb) {
  return this.request(
    'PUT',
    ['users', userID, 'identities', userIDentityID, 'make_primary'],
    cb,
  );
};

UserIdentities.prototype.verify = function (userID, userIDentityID, cb) {
  return this.request(
    'PUT',
    ['users', userID, 'identities', userIDentityID, 'verify'],
    cb,
  );
};

UserIdentities.prototype.requestVerification = function (
  userID,
  userIDentityID,
  cb,
) {
  return this.request(
    'PUT',
    ['users', userID, 'identities', userIDentityID, 'request_verification'],
    cb,
  );
};

// ====================================== Deleting UserIdentities
UserIdentities.prototype.delete = function (userID, userIDentityID, cb) {
  return this.request(
    'DELETE',
    ['users', userID, 'identities', userIDentityID],
    cb,
  );
};
