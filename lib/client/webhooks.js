//webhooks.js: Client for the zendesk API.

var util = require('util');
var Client = require('./client').Client;

var Webhooks = exports.Webhooks = function (options) {
  this.jsonAPINames = [ 'webhooks', 'webhook' ];
  Client.call(this, options);
};

// Inherit from Client base object
util.inherits(Webhooks, Client);

// ######################################################## Webhooks
// ====================================== Listing Webhooks
Webhooks.prototype.list = function (cb) {
  return this.requestAll('GET', '/webhooks', cb);//all
};

// ====================================== Viewing Webhooks
Webhooks.prototype.show = function (webhookID, cb) {
  return this.request('GET', `/webhooks/${webhookID}`, cb);
};

// ====================================== Creating Webhooks
Webhooks.prototype.create = function (webhook, cb) {
  return this.request('POST', '/webhooks', webhook,  cb);
};

// ====================================== Updating Webhooks
Webhooks.prototype.update = function (webhookID, webhook, cb) {
  return this.request('PUT', `/webhooks/${webhookID}`, webhook,  cb);
};

// ====================================== Deleting Webhooks
Webhooks.prototype.delete = function (webhookID, cb) {
  return this.request('DELETE', `/webhooks/${webhookID}`,  cb);
};
