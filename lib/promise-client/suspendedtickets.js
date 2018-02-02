//SuspendedTickets.js: Client for the zendesk API.


var util        = require('util'),
  Client      = require('./client').Client,
  defaultgroups = require('./helpers').defaultgroups;


var SuspendedTickets = exports.SuspendedTickets = function (options) {
  this.jsonAPINames = [ 'suspended_tickets', 'suspended_ticket' ];
  Client.call(this, options);
};

// Inherit from Client base object
util.inherits(SuspendedTickets, Client);

// ######################################################## SuspendedTickets
// ====================================== Listing SuspendedTickets
SuspendedTickets.prototype.list = function () {
  return this.requestAll('GET', ['suspended_tickets']);//all
};


// ====================================== Viewing SuspendedTickets

SuspendedTickets.prototype.show = function (suspendedTicketID) {
  return this.request('GET', ['suspended_tickets', suspendedTicketID]);
};

// ====================================== Recover SuspendedTickets
SuspendedTickets.prototype.recover = function (suspendedTicketID) {
  return this.request('PUT', ['suspended_tickets', suspendedTicketID, 'recover']);
};

SuspendedTickets.prototype.recoverMany = function (suspendedTicketIDs) {
  return this.request('PUT', ['suspended_tickets', 'recover_many', { ids: suspendedTicketIDs}]);
};


// ====================================== Deleting SuspendedTickets
SuspendedTickets.prototype.delete = function (suspendedTicketID) {
  return this.request('DELETE', ['suspended_tickets', suspendedTicketID]);
};

SuspendedTickets.prototype.destroyMany = function (suspendedTicketIDs) {
  return this.request('DELETE', ['suspended_tickets', 'destroy_many', { ids: suspendedTicketIDs}]);
};

SuspendedTickets.prototype.deleteMany = function (suspendedTicketIDs) {
  return this.request('DELETE', ['suspended_tickets', 'destroy_many', { ids: suspendedTicketIDs}]);
};
