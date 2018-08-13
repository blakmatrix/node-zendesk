//tickets.js: Client for the zendesk API.


var util        = require('util'),
    Client      = require('./client').Client;

var TicketExport = exports.TicketExport = function (options) {
  this.jsonAPINames = [ 'exports', 'export', 'audits' ];
  Client.call(this, options);
};

// Inherit from Client base object
util.inherits(TicketExport, Client);

// ######################################################## TicketsImport


// ====================================== Creating Tickets
TicketExport.prototype.export = function (start_time, cb) {
  return this.request('GET', ['incremental', 'tickets', '?start_time='+start_time], cb);
};

TicketExport.prototype.exportWithUser = function (start_time, cb) {
  return this.request('GET', ['incremental', 'tickets', '?start_time='+start_time+'&include=users,groups'], cb);
};

// ######################################################## Ticket Audits

// ====================================== Listing Audits
TicketExport.prototype.exportAudit = function (ticketID, cb) {
  return this.requestAll('GET', ['tickets', ticketID, 'audits'],  cb);
};

