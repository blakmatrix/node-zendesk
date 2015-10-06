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
Triggers.prototype.list = function (cb) {
  this.requestAll('GET', ['triggers'], cb);//all
};

Triggers.prototype.listActive = function (triggerID, cb) {
  this.requestAll('GET', ['triggers', 'active'],  cb);//all?
};

// ====================================== Viewing Triggers
Triggers.prototype.show = function (triggerID, cb) {
  this.request('GET', ['triggers', triggerID], cb);
};

// ====================================== Creating Triggers
Triggers.prototype.create = function (trigger, cb) {
  this.request('POST', ['triggers'], trigger,  cb);
};

// ====================================== Updating Triggers
Triggers.prototype.update = function (triggerID, trigger, cb) {
  this.request('PUT', ['triggers', triggerID], trigger,  cb);
};

// ====================================== Deleting Triggers
Triggers.prototype.delete = function (triggerID, cb) {
  this.request('DELETE', ['triggers', triggerID],  cb);
};

// ====================================== Reorder Audits
Triggers.prototype.reorder = function (triggerIDs, cb) {
  this.requestAll('PUT', ['triggers', 'reorder'], {trigger_ids: triggerIDs}, cb);
};

