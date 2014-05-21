//TicketAudits.js: Client for the zendesk API.


var util        = require('util'),
    Client      = require('./client').Client,
    defaultgroups = require('./helpers').defaultgroups;


var TicketAudits = exports.TicketAudits = function (options) {
  this.jsonAPIName = 'audits';
  this.jsonAPIName2 = 'audit';
  Client.call(this, options);
};

// Inherit from Client base object
util.inherits(TicketAudits, Client);

// ######################################################## TicketAudits
// ====================================== Listing TicketAudits
TicketAudits.prototype.list = function (ticketID, cb) {
  this.requestAll('GET', ['tickets', ticketID, 'audit'], cb);//all?
};