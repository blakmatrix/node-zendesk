//ticketfields.js: Client for the zendesk API.


var util        = require('util'),
  Client      = require('./client').Client,
  defaultUser = require('./helpers').defaultUser;


var TicketFields = exports.TicketFields = function (options) {
  this.jsonAPINames = [ 'ticket_fields', 'ticket_field' ];
  Client.call(this, options);
};

// Inherit from Client base object
util.inherits(TicketFields, Client);

// ######################################################## Ticket Fields
// ====================================== Listing Tickets Fields
TicketFields.prototype.list = function () {
  return this.requestAll('GET', ['ticket_fields']);//all
};


// ====================================== Viewing Tickets Fields
TicketFields.prototype.show = function (ticketFieldID) {
  return this.request('GET', ['ticket_fields', ticketFieldID]);
};

// ====================================== Creating Tickets Fields
TicketFields.prototype.create = function (ticketField) {
  return this.request('POST', ['ticket_fields'], ticketField);
};

// ====================================== Updating Tickets Fields
TicketFields.prototype.update = function (ticketFieldID, ticketField) {
  return this.request('PUT', ['ticket_fields', ticketFieldID], ticketField);
};

// ====================================== Deleting Tickets Fields
TicketFields.prototype.delete = function (ticketFieldID) {
  return this.request('DELETE', ['ticket_fields', ticketFieldID]);
};

