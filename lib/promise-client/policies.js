//Policies.js: Client for the zendesk API.


var util        = require('util'),
  Client      = require('./client').Client,
  defaultUser = require('./helpers').defaultUser;


var Policies = exports.Policies = function (options) {
  this.jsonAPINames = [ 'slas/policies' ];
  Client.call(this, options);
};

// Inherit from Client base object
util.inherits(Policies, Client);

// ######################################################## Policies
// ====================================== Listing Policies
Policies.prototype.list = function () {
  return this.requestAll('GET', ['slas/policies']);//all
};


// ====================================== Viewing Policies
Policies.prototype.show = function (policyID) {
  return this.request('GET', ['slas/policies', policyID]);
};

// ====================================== Creating Policies
Policies.prototype.create = function (policy) {
  return this.request('POST', ['slas/policies'], policy);
};

// ====================================== Updating Policies
Policies.prototype.update = function (policyID, policy) {
  return this.request('PUT', ['slas/policies', policyID], policy);
};

// ====================================== Deleting Policies
Policies.prototype.delete = function (policyID) {
  return this.request('DELETE', ['slas/policies', policyID]);
};
