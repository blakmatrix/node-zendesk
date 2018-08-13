//SuspendedTickets.js: Client for the zendesk API.


var util        = require('util'),
    Client      = require('./client').Client;

var SuspendedTickets = exports.SuspendedTickets = function (options) {
  this.jsonAPINames = [ 'suspended_tickets', 'suspended_ticket' ];
  Client.call(this, options);
};

// Inherit from Client base object
util.inherits(SuspendedTickets, Client);

// ######################################################## SuspendedTickets
// ====================================== Listing SuspendedTickets
SuspendedTickets.prototype.list = function (cb) {
  return this.requestAll('GET', ['suspended_tickets'], cb);//all
};


// ====================================== Viewing SuspendedTickets

SuspendedTickets.prototype.show = function (suspendedTicketID, cb) {
  return this.request('GET', ['suspended_tickets', suspendedTicketID], cb);
};

// ====================================== Recover SuspendedTickets
SuspendedTickets.prototype.recover = function (suspendedTicketID, cb) {
  return this.request('PUT', ['suspended_tickets', suspendedTicketID, 'recover'], cb);
};

SuspendedTickets.prototype.recoverMany = function (suspendedTicketIDs, cb) {
  return this.request('PUT', ['suspended_tickets', 'recover_many', { ids: suspendedTicketIDs}], cb);
};


// ====================================== Deleting SuspendedTickets
SuspendedTickets.prototype.delete = function (suspendedTicketID, cb) {
  return this.request('DELETE', ['suspended_tickets', suspendedTicketID],  cb);
};
SuspendedTickets.prototype.destroyMany = function (suspendedTicketIDs, cb) {
  return this.request('DELETE', ['suspended_tickets', 'destroy_many', { ids: suspendedTicketIDs}], cb);
};
SuspendedTickets.prototype.deleteMany = function (suspendedTicketIDs, cb) {
  return this.request('DELETE', ['suspended_tickets', 'destroy_many', { ids: suspendedTicketIDs}], cb);
};
