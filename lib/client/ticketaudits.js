//TicketAudits.js: Client for the zendesk API.


var util        = require('util'),
    Client      = require('./client').Client;

var TicketAudits = exports.TicketAudits = function (options) {
  this.jsonAPINames = [ 'audits', 'audit' ];
  this.sideLoadMap = [
    { field: 'author_id', name: 'author', dataset: 'users'},
    { field: 'ticket_id', name: 'ticket', dataset: 'tickets' }
  ];
  Client.call(this, options);
};

// Inherit from Client base object
util.inherits(TicketAudits, Client);

// ######################################################## TicketAudits
// ====================================== Listing TicketAudits
TicketAudits.prototype.list = function (ticketID, cb) {
  return this.requestAll('GET', ['tickets', ticketID, 'audits'], cb);//all?
};
