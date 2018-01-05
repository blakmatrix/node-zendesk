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
UserIdentities.prototype.list = function (userID, cb) {
  this.requestAll('GET', ['users', userID, 'identities'], cb);//all
};


// ====================================== Viewing UserIdentities
UserIdentities.prototype.show = function (userID, userIDentityID, cb) {
  this.request('GET', ['users', userID, 'identities', userIDentityID], cb);
};

// ====================================== Creating UserIdentities
UserIdentities.prototype.create = function (userID, userIDentity, cb) {
  if (
    userIDentity && typeof userIDentity === "object" &&
    !Array.isArray(userIDentity) &&
    !userIDentity.hasOwnProperty("identity")
  ) {
    userIDentity = {"identity": userIDentity};
  }
  this.request('POST', ['users', userID, 'identities'], userIDentity, cb);
};

// ====================================== Updating UserIdentities

UserIdentities.prototype.update = function (userID, userIDentityID, cb) {
  this.request('PUT', ['users', userID, 'identities', userIDentityID], {"identity": {"verified": true}}, cb);
};

UserIdentities.prototype.makePrimary = function (userID, userIDentityID,  cb) {
  this.request('PUT', ['users', userID, 'identities', userIDentityID, "make_primary"],   cb);
};

UserIdentities.prototype.verify = function (userID, userIDentityID, cb) {
  this.request('PUT', ['users', userID, 'identities', userIDentityID, 'verify'],   cb);
};

UserIdentities.prototype.requestVerification = function (userID, userIDentityID, cb) {
  this.request('PUT', ['users', userID, 'identities', userIDentityID, 'request_verification'],   cb);
};

// ====================================== Deleting UserIdentities
UserIdentities.prototype.delete = function (userID, userIDentityID, cb) {
  this.request('DELETE', ['users', userID, 'identities', userIDentityID],  cb);
};
