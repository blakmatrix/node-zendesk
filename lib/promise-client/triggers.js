//triggers.js: Client for the zendesk API.


var util        = require('util'),
  Client      = require('./client').Client,
  defaultUser = require('./helpers').defaultUser;


var Triggers = exports.Triggers = function (options) {
  this.jsonAPINames = [ 'triggers', 'trigger' ];
  Client.call(this, options);
};

// Inherit from Client base object
util.inherits(Triggers, Client);

// ######################################################## Triggers
// ====================================== Listing Triggers
Triggers.prototype.list = function () {
  return this.requestAll('GET', ['triggers']);//all
};

Triggers.prototype.listActive = function (triggerID) {
  return this.requestAll('GET', ['triggers', 'active']);//all?
};

// ====================================== Viewing Triggers
Triggers.prototype.show = function (triggerID) {
  return this.request('GET', ['triggers', triggerID]);
};

// ====================================== Creating Triggers
Triggers.prototype.create = function (trigger) {
  return this.request('POST', ['triggers'], trigger);
};

// ====================================== Updating Triggers
Triggers.prototype.update = function (triggerID, trigger) {
  return this.request('PUT', ['triggers', triggerID], trigger);
};

// ====================================== Deleting Triggers
Triggers.prototype.delete = function (triggerID) {
  return this.request('DELETE', ['triggers', triggerID]);
};

// ====================================== Reorder Audits
Triggers.prototype.reorder = function (triggerIDs) {
  return this.requestAll('PUT', ['triggers', 'reorder'], {trigger_ids: triggerIDs});
};

