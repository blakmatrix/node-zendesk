//AccessPolicies.js: Client for the zendesk help center API.


var util        = require('util'),
  Client      = require('../client').Client
//defaultgroups = require('./helpers').defaultgroups;


var AccessPolicies = exports.AccessPolicies = function (options) {
  this.jsonAPINames = [ 'accesspplicies', 'accesspolicy' ];
  Client.call(this, options);
};

// Inherit from Client base object
util.inherits(AccessPolicies, Client);

// ######################################################## AccessPolicies
// ====================================== Showing Access Policies
AccessPolicies.prototype.show = function (sectionID, cb) {
  this.request('GET', ['sections', sectionID, 'access_policy'], cb);
};

// ====================================== Updating Access Policies
AccessPolicies.prototype.update = function (sectionID, accessPolicy, cb) {
  this.request('PUT', ['sections', sectionID, 'access_policy'], accessPolicy, cb);
};
