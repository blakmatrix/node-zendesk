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
Targets.prototype.list = function (cb) {
  return this.requestAll('GET', ['targets'], cb);//all
};

// ====================================== Viewing Targets
Targets.prototype.show = function (triggerID, cb) {
  return this.request('GET', ['targets', triggerID], cb);
};

// ====================================== Creating Targets
Targets.prototype.create = function (target, cb) {
  return this.request('POST', ['targets'], target,  cb);
};

// ====================================== Updating Targets
Targets.prototype.update = function (targetID, target, cb) {
  return this.request('PUT', ['targets', targetID], target,  cb);
};

// ====================================== Deleting Targets
Targets.prototype.delete = function (targetID, cb) {
  return this.request('DELETE', ['targets', targetID],  cb);
};