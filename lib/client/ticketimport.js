//tickets.js: Client for the zendesk API.


var util        = require('util'),
    Client      = require('./client').Client;


var TicketImport = exports.TicketImport = function (options) {
  this.jsonAPINames = [ 'imports', 'import' ];
  Client.call(this, options);
};

// Inherit from Client base object
util.inherits(TicketImport, Client);

// ######################################################## TicketsImport


// ====================================== Creating Tickets
TicketImport.prototype.import = function (ticket, cb) {
  return this.request('POST', ['imports/tickets'], ticket,  cb);
};


// ######################################################## Ticket Audits

// ====================================== Listing Audits
TicketImport.prototype.exportAudit = function (ticketID, cb) {
  return this.requestAll('GET', ['tickets', ticketID, 'audits'],  cb);
};

