//ticketfields.js: Client for the zendesk API.


var util        = require('util'),
    Client      = require('./client').Client;

var TicketFields = exports.TicketFields = function (options) {
  this.jsonAPINames = [ 'ticket_fields', 'ticket_field' ];
  Client.call(this, options);
};

// Inherit from Client base object
util.inherits(TicketFields, Client);

// ######################################################## Ticket Fields
// ====================================== Listing Tickets Fields
TicketFields.prototype.list = function (cb) {
  return this.requestAll('GET', ['ticket_fields'], cb);//all
};


// ====================================== Viewing Tickets Fields
TicketFields.prototype.show = function (ticketFieldID, cb) {
  return this.request('GET', ['ticket_fields', ticketFieldID], cb);
};

// ====================================== Creating Tickets Fields
TicketFields.prototype.create = function (ticketField, cb) {
  return this.request('POST', ['ticket_fields'], ticketField,  cb);
};

// ====================================== Updating Tickets Fields
TicketFields.prototype.update = function (ticketFieldID, ticketField, cb) {
  return this.request('PUT', ['ticket_fields', ticketFieldID], ticketField,  cb);
};

// ====================================== Deleting Tickets Fields
TicketFields.prototype.delete = function (ticketFieldID, cb) {
  return this.request('DELETE', ['ticket_fields', ticketFieldID],  cb);
};

