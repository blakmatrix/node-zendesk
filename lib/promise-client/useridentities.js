//UserIdentities.js: Client for the zendesk API.


var util        = require('util'),
  Client      = require('./client').Client,
  defaultUser = require('./helpers').defaultUser;


var UserIdentities = exports.UserIdentities = function (options) {
  this.jsonAPINames = [ 'identities', 'identity' ];
  Client.call(this, options);
};

// Inherit from Client base object
util.inherits(UserIdentities, Client);

// ######################################################## UserIdentities
// ====================================== Listing UserIdentities
UserIdentities.prototype.list = function (userID) {
  return this.requestAll('GET', ['users', userID, 'identities']);//all
};


// ====================================== Viewing UserIdentities
UserIdentities.prototype.show = function (userID, userIDentityID) {
  return this.request('GET', ['users', userID, 'identities', userIDentityID]);
};

// ====================================== Creating UserIdentities
UserIdentities.prototype.create = function (userID, userIDentity) {
  if (
    userIDentity && typeof userIDentity === "object" &&
    !Array.isArray(userIDentity) &&
    !userIDentity.hasOwnProperty("identity")
  ) {
    userIDentity = {"identity": userIDentity};
  }
  return this.request('POST', ['users', userID, 'identities'], userIDentity);
};

// ====================================== Updating UserIdentities

UserIdentities.prototype.update = function (userID, userIDentityID) {
  return this.request('PUT', ['users', userID, 'identities', userIDentityID], {"identity": {"verified": true}});
};

UserIdentities.prototype.makePrimary = function (userID, userIDentityID) {
  return this.request('PUT', ['users', userID, 'identities', userIDentityID, "make_primary"]);
};

UserIdentities.prototype.verify = function (userID, userIDentityID) {
  return this.request('PUT', ['users', userID, 'identities', userIDentityID, 'verify']);
};

UserIdentities.prototype.requestVerification = function (userID, userIDentityID) {
  return this.request('PUT', ['users', userID, 'identities', userIDentityID, 'request_verification']);
};

// ====================================== Deleting UserIdentities
UserIdentities.prototype.delete = function (userID, userIDentityID) {
  return this.request('DELETE', ['users', userID, 'identities', userIDentityID]);
};
