//CustomAgentRoles.js: Client for the zendesk API.


var util        = require('util'),
    Client      = require('./client').Client;

var CustomAgentRoles = exports.CustomAgentRoles = function (options) {
  this.jsonAPINames  = [ 'custom_roles' ];
  Client.call(this, options);
};

// Inherit from Client base object
util.inherits(CustomAgentRoles, Client);

// ######################################################## CustomAgentRoles
// ====================================== Listing CustomAgentRoles
CustomAgentRoles.prototype.list = function (cb) {
  return this.requestAll('GET', ['custom_roles'], cb);//all
};

