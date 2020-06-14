//automations.js: Client for the zendesk API.


var util        = require('util'),
    Client      = require('./client').Client,
    defaultUser = require('./helpers').defaultUser;


var Automations = exports.Automations = function (options) {
  this.jsonAPINames = [ 'automations', 'automation' ];
  Client.call(this, options);
};

// Inherit from Client base object
util.inherits(Automations, Client);

// ######################################################## Automations
// ====================================== Listing Automations
Automations.prototype.list = function (cb) {
  this.requestAll('GET', ['automations'], cb);//all
};

Automations.prototype.listActive = function (automationID, cb) {
  this.requestAll('GET', ['automations', 'active'],  cb);//all?
};

// ====================================== Viewing Automations
Automations.prototype.show = function (automationID, cb) {
  this.request('GET', ['automations', automationID], cb);
};

// ====================================== Creating Automations
Automations.prototype.create = function (automation, cb) {
  this.request('POST', ['automations'], automation,  cb);
};

// ====================================== Updating Automations
Automations.prototype.update = function (automationID, automation, cb) {
  this.request('PUT', ['automations', automationID], automation,  cb);
};

// ====================================== Deleting Automations
Automations.prototype.delete = function (automationID, cb) {
  this.request('DELETE', ['automations', automationID],  cb);
};

// ====================================== Reorder Audits
Automations.prototype.reorder = function (automationIDs, cb) {
  this.requestAll('PUT', ['automations', 'reorder'], {automation_ids: automationIDs}, cb);
};

