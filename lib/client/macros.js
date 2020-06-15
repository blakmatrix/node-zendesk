//Macros.js: Client for the zendesk API.


var util        = require('util'),
    Client      = require('./client').Client;

var Macros = exports.Macros = function (options) {
  this.jsonAPINames = [ 'macros' ];
  Client.call(this, options);
};

// Inherit from Client base object
util.inherits(Macros, Client);

// ######################################################## Macros
// ====================================== Listing Macros
Macros.prototype.list = function (cb) {
  return this.requestAll('GET', ['macros', 'active'], cb);//all
};

Macros.prototype.listByParams = function (params, cb) {
  return this.requestAll('GET', ['macros', params], cb);
};

Macros.prototype.apply = function (macroID, cb) {
  return this.request('GET', ['macros', macroID, 'apply'], cb);//all
};
Macros.prototype.applyTicket = function (ticketID, macroID, cb) {
  return this.request('GET', ['tickets', ticketID, 'macros', macroID, 'apply'], cb);//all
};

Macros.prototype.create = function (macro, cb) {
  return this.request('POST', ['macros'], macro, cb);
};

Macros.prototype.categories = function (cb) {
  return this.requestAll('GET', ['macros', 'categories'], cb);
};

// ====================================== Updating Tickets Fields
Macros.prototype.update = function (macroID, macro, cb) {
  return this.request('PUT', ['macros', macroID], macro, cb);
};

// ====================================== Deleting Macros
Macros.prototype.delete = function (macroID, cb) {
  return this.request('DELETE', ['macros', macroID],  cb);
};

Macros.prototype.createMany = function (users, cb) {
  return this.request('POST', ['users', 'create_many'], users, cb);
};
