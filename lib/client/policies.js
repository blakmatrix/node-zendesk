//Policies.js: Client for the zendesk API.


var util        = require('util'),
    Client      = require('./client').Client;

var Policies = exports.Policies = function (options) {
  this.jsonAPINames = [ 'slas/policies' ];
  Client.call(this, options);
};

// Inherit from Client base object
util.inherits(Policies, Client);

// ######################################################## Policies
// ====================================== Listing Policies
Policies.prototype.list = function (cb) {
  return this.requestAll('GET', ['slas/policies'], cb);//all
};


// ====================================== Viewing Policies
Policies.prototype.show = function (policyID, cb) {
  return this.request('GET', ['slas/policies', policyID], cb);
};

// ====================================== Creating Policies
Policies.prototype.create = function (policy, cb) {
  return this.request('POST', ['slas/policies'], policy, cb);
};

// ====================================== Updating Policies
Policies.prototype.update = function (policyID, policy, cb) {
  return this.request('PUT', ['slas/policies', policyID], policy, cb);
};

// ====================================== Deleting Policies
Policies.prototype.delete = function (policyID, cb) {
  return this.request('DELETE', ['slas/policies', policyID],  cb);
};
