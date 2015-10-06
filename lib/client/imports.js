//imports.js: Client for the zendesk API.


var util        = require('util'),
    Client      = require('./client').Client,
    defaultUser = require('./helpers').defaultUser;


var Imports = exports.Imports = function (options) {
  this.jsonAPINames = ['tickets', 'ticket'];

  Client.call(this, options);
};

// Inherit from Client base object
util.inherits(Imports, Client);

// ######################################################## Imports
// ======================================  Import Ticket
Imports.prototype.ticket = function (ticket, cb) {
  this.request('POST', ['imports', 'tickets'], ticket, cb);
};

// ======================================  Import Many Tickets
Imports.prototype.ticketMany = function (tickets, cb) {
  this.requestAll('POST', ['imports', 'tickets', 'create_many'], tickets, cb);//all
};
