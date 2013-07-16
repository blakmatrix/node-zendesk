//tickets.js: Client for the zendesk API.


var util        = require('util'),
    Client      = require('./client').Client,
    defaultUser = require('./helpers').defaultUser;


var Tickets = exports.Tickets = function (options) {
  this.jsonAPIName = 'tickets';
  this.jsonAPIName2 = 'ticket';
  Client.call(this, options);
};

// Inherit from Client base object
util.inherits(Tickets, Client);

// ######################################################## Tickets
// ====================================== Listing Tickets
Tickets.prototype.list = function (cb) {
  this.requestAll('GET', ['tickets'], cb);//all
};

Tickets.prototype.listByOrganization = function (orgID, cb) {
  this.requestAll('GET', ['organizations', orgID, 'tickets'], cb);//all
};

Tickets.prototype.listByUserRequested = function (userID, cb) {
  this.requestAll('GET', ['users', userID, 'tickets', 'requested'], cb);//all
};

Tickets.prototype.listByUserCCD = function (userID, cb) {
  this.requestAll('GET', ['users', userID, 'tickets', 'ccd'], cb);//all
};

Tickets.prototype.listRecent = function (cb) {
  this.requestAll('GET', ['tickets', 'recent'], cb);//all?
};

Tickets.prototype.listCollaborators = function (ticketID, cb) {
  this.requestAll('GET', ['tickets', ticketID, 'collaborators'],  cb);//all?
};

Tickets.prototype.listIncidents = function (ticketID, cb) {
  this.requestAll('GET', ['tickets', ticketID, 'incidents'],  cb);//all
};

// ====================================== Viewing Tickets
Tickets.prototype.show = function (ticketID, cb) {
  this.request('GET', ['tickets', ticketID], cb);
};

// ====================================== Creating Tickets
Tickets.prototype.create = function (ticket, cb) {
  this.request('POST', ['tickets'], ticket,  cb);
};

// ====================================== Updating Tickets
Tickets.prototype.update = function (ticketID, ticket, cb) {
  this.request('PUT', ['tickets', ticketID], ticket,  cb);
};

Tickets.prototype.updateMany = function (ticket_ids, ticket, cb) {
  this.request('PUT', ['tickets', 'update_many', {ids: ticket_ids}], ticket,  cb);
};

// ====================================== Deleting Tickets
Tickets.prototype.delete = function (ticketID, cb) {
  this.request('DELETE', ['tickets', ticketID],  cb);
};


// ######################################################## Ticket export (max 1000 tickets per request in 5 min intrvals)
// ====================================== Ticket Export
Tickets.prototype.export = function (startTime, cb) {
  this.request('GET', ['exports', 'tickets', {start_time: startTime}],  cb);
};

// ====================================== Ticket Export Sample (max 50 tickets per request)
Tickets.prototype.exportSample = function (startTime, cb) {
  this.request('GET', ['exports', 'tickets', 'sample', {start_time: startTime}],  cb);
};


// ######################################################## Ticket Audits

// ====================================== Listing Audits
Tickets.prototype.exportAudit = function (ticketID, cb) {
  this.request('GET', ['tickets', ticketID, 'audits'],  cb);
};

