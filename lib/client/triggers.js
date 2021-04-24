//triggers.js: Client for the zendesk API.


var util        = require('util'),
    Client      = require('./client').Client;

var Triggers = exports.Triggers = function (options) {
  this.jsonAPINames = [ 'triggers', 'trigger' ];
  Client.call(this, options);
};

// Inherit from Client base object
util.inherits(Triggers, Client);

// ######################################################## Triggers
// ====================================== Searching Triggers
Triggers.prototype.search = function(searchTerm, cb) {
    return this.request('GET', ['triggers', 'search', {query: searchTerm}], cb);
};

// ====================================== Trigger Definitions
Triggers.prototype.definitions = function (cb) {
  return this.requestAll('GET', ['triggers', 'definitions'], cb);
};

// ====================================== Listing Triggers
Triggers.prototype.list = function (cb) {
  return this.requestAll('GET', ['triggers'], cb);//all
};

Triggers.prototype.listActive = function (triggerID, cb) {
  return this.requestAll('GET', ['triggers', 'active'],  cb);//all?
};

// ====================================== Viewing Triggers
Triggers.prototype.show = function (triggerID, cb) {
  return this.request('GET', ['triggers', triggerID], cb);
};

// ====================================== Creating Triggers
Triggers.prototype.create = function (trigger, cb) {
  return this.request('POST', ['triggers'], trigger,  cb);
};

// ====================================== Updating Triggers
Triggers.prototype.update = function (triggerID, trigger, cb) {
  return this.request('PUT', ['triggers', triggerID], trigger,  cb);
};

// ====================================== Deleting Triggers
Triggers.prototype.delete = function (triggerID, cb) {
  return this.request('DELETE', ['triggers', triggerID],  cb);
};

// ====================================== Reorder Audits
Triggers.prototype.reorder = function (triggerIDs, cb) {
  return this.requestAll('PUT', ['triggers', 'reorder'], {trigger_ids: triggerIDs}, cb);
};

