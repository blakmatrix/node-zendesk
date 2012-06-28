//Macros.js: Client for the zendesk API.


var util        = require('util'),
    Client      = require('./client').Client,
    defaultgroups = require('./helpers').defaultgroups;


var Macros = exports.Macros = function (options) {
  Client.call(this, options);
};

// Inherit from Client base object
util.inherits(Macros, Client);

// ######################################################## Macros
// ====================================== Listing Macros
Macros.prototype.list = function (cb) {
  this.requestAll('GET', ['macros', 'active'], cb);//all
};

