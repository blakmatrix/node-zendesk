//Macros.js: Client for the zendesk API.


var util        = require('util'),
    Client      = require('./client').Client,
    defaultgroups = require('./helpers').defaultgroups;


var Macros = exports.Macros = function (options) {
  this.jsonAPINames = [ 'macros' ];
  Client.call(this, options);
};

// Inherit from Client base object
util.inherits(Macros, Client);

// ######################################################## Macros
// ====================================== Listing Macros
Macros.prototype.list = function () {
  return this.requestAll('GET', ['macros', 'active']);//all
};

Macros.prototype.listByParams = function (params) {
  return this.requestAll('GET', ['macros', params]);
};

Macros.prototype.apply = function (macroID) {
  return this.request('GET', ['macros', macroID, 'apply']);//all
};
Macros.prototype.applyTicket = function (ticketID, macroID) {
  return this.request('GET', ['tickets', ticketID, 'macros', macroID, 'apply']);//all
};

Macros.prototype.create = function (macro) {
  return this.request('POST', ['macros'], macro);
};

Macros.prototype.categories = function () {
  return this.requestAll('GET', ['macros', 'categories']);
};

// ====================================== Updating Tickets Fields
Macros.prototype.update = function (macroID, macro) {
  return this.request('PUT', ['macros', macroID], macro);
};

// ====================================== Deleting Macros
Macros.prototype.delete = function (macroID) {
  return this.request('DELETE', ['macros', macroID]);
};

Macros.prototype.createMany = function (users) {
  return this.request('POST', ['users', 'create_many'], users);
};
