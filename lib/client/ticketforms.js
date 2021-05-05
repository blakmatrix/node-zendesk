//ticketforms.js: Client for the zendesk API.

var util        = require('util'),
    Client      = require('./client').Client;

var TicketForms = exports.TicketForms = function (options) {
  this.jsonAPINames = [ 'ticket_forms', 'ticket_form' ];
  Client.call(this, options);
};

// Inherit from Client base object
util.inherits(TicketForms, Client);

// ######################################################## Ticket Forms
// ====================================== Listing Tickets Forms
TicketForms.prototype.list = function (cb) {
  return this.requestAll('GET', ['ticket_forms'], cb);//all
};

//
// // ====================================== Viewing TicketForm
TicketForms.prototype.show = function (ticketFormID, cb) {
  return this.request('GET', ['ticket_forms', ticketFormID], cb);
};

// // ====================================== Updating TicketForm
TicketForms.prototype.update = function (ticketFormID, cb) {
  return this.request('PUT', ['ticket_forms', ticketFormID], ticketForm, cb);
};
