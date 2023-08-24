// Automations.js: Client for the zendesk API.

const util = require('node:util');
const {Client} = require('./client');

const Automations = (exports.Automations = function (options) {
  this.jsonAPINames = ['automations', 'automation'];
  Client.call(this, options);
});

// Inherit from Client base object
util.inherits(Automations, Client);

// ######################################################## Automations
// ====================================== Listing Automations
Automations.prototype.list = function (cb) {
  return this.requestAll('GET', ['automations', '?page[size]=100'], cb); // All
};

Automations.prototype.listActive = function (automationID, cb) {
  return this.requestAll('GET', ['automations', 'active'], cb); // All?
};

// ====================================== Viewing Automations
Automations.prototype.show = function (automationID, cb) {
  return this.request('GET', ['automations', automationID], cb);
};

// ====================================== Creating Automations
Automations.prototype.create = function (automation, cb) {
  return this.request('POST', ['automations'], automation, cb);
};

// ====================================== Updating Automations
Automations.prototype.update = function (automationID, automation, cb) {
  return this.request('PUT', ['automations', automationID], automation, cb);
};

// ====================================== Deleting Automations
Automations.prototype.delete = function (automationID, cb) {
  return this.request('DELETE', ['automations', automationID], cb);
};

// ====================================== Reorder Audits
Automations.prototype.reorder = function (automationIDs, cb) {
  return this.requestAll(
    'PUT',
    ['automations', 'reorder'],
    {automation_ids: automationIDs},
    cb,
  );
};
