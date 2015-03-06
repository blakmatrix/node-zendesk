//Macros.js: Client for the zendesk API.


var util        = require('util'),
    Client      = require('./client').Client,
    defaultgroups = require('./helpers').defaultgroups;


var Macros = exports.Macros = function (options) {
  this.jsonAPIName = 'macros';
  Client.call(this, options);
};

// Inherit from Client base object
util.inherits(Macros, Client);

// ######################################################## Macros
// ====================================== Listing Macros
Macros.prototype.list = function (cb) {
  this.requestAll('GET', ['macros', 'active'], cb);//all
};

Macros.prototype.apply = function (macroID, cb) {
  this.request('GET', ['macros', macroID, 'apply'], cb);//all
};
Macros.prototype.applyTicket = function (ticketID, macroID, cb) {
  this.request('GET', ['tickets', ticketID, 'macros', macroID, 'apply'], cb);//all
};

Macros.prototype.create = function (user, cb) {
  this.request('POST', ['macros'], macro, cb);
};


Macros.prototype.createMany = function (users, cb) {
  this.request('POST', ['users', 'create_many'], users, cb);
};
