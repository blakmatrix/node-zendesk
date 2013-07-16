//UserIdentities.js: Client for the zendesk API.


var util        = require('util'),
    Client      = require('./client').Client,
    defaultUser = require('./helpers').defaultUser;


var UserIdentities = exports.UserIdentities = function (options) {
  this.jsonAPIName = 'identities';
  this.jsonAPIName2 = 'identity';
  Client.call(this, options);
};

// Inherit from Client base object
util.inherits(UserIdentities, Client);

// ######################################################## UserIdentities
// ====================================== Listing UserIdentities
UserIdentities.prototype.list = function (userID, cb) {
  this.requestAll('GET', ['user', userID, 'identities'], cb);//all
};


// ====================================== Viewing UserIdentities
UserIdentities.prototype.show = function (userID, userIDentityID, cb) {
  this.request('GET', ['user', userID, 'identities', userIDentityID], cb);
};

// ====================================== Creating UserIdentities
UserIdentities.prototype.create = function (userID, userIDentity, cb) {
  this.request('POST', ['user', userID, 'identities'], userIDentity, cb);
};

// ====================================== Updating UserIdentities

UserIdentities.prototype.update = function (userID, userIDentityID, cb) {
  this.request('PUT', ['user', userID, 'identities', userIDentityID], {"identity": {"verified": true}}, cb);
};

UserIdentities.prototype.makePrimary = function (userID, userIDentityID,  cb) {
  this.request('PUT', ['user', userID, 'identities', userIDentityID, "make_primary"],   cb);
};

UserIdentities.prototype.verify = function (userID, userIDentityID, cb) {
  this.request('PUT', ['user', userID, 'identities', userIDentityID, 'verify'],   cb);
};

UserIdentities.prototype.requestVerification = function (userID, userIDentityID, cb) {
  this.request('PUT', ['user', userID, 'identities', userIDentityID, 'request_verification'],   cb);
};

// ====================================== Deleting UserIdentities
UserIdentities.prototype.delete = function (userID, userIDentityID, cb) {
  this.request('DELETE', ['user', userID, 'identities', userIDentityID],  cb);
};
