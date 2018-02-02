//targets.js: Client for the zendesk API.

var util        = require('util'),
  Client      = require('./client').Client;


var Targets = exports.Targets = function (options) {
  this.jsonAPINames = [ 'targets', 'target' ];
  Client.call(this, options);
};

// Inherit from Client base object
util.inherits(Targets, Client);

// ######################################################## Targets
// ====================================== Listing Targets
Targets.prototype.list = function () {
  return this.requestAll('GET', ['targets']);//all
};

// ====================================== Viewing Targets
Targets.prototype.show = function (triggerID) {
  return this.request('GET', ['targets', triggerID]);
};

// ====================================== Creating Targets
Targets.prototype.create = function (target) {
  return this.request('POST', ['targets'], target);
};

// ====================================== Updating Targets
Targets.prototype.update = function (targetID, target) {
  return this.request('PUT', ['targets', targetID], target);
};

// ====================================== Deleting Targets
Targets.prototype.delete = function (targetID) {
  return this.request('DELETE', ['targets', targetID]);
};
