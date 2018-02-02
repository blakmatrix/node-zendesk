//tickets.js: Client for the zendesk API.


var util        = require('util'),
  Client      = require('./client').Client,
  defaultUser = require('./helpers').defaultUser;


var Tickets = exports.Tickets = function (options) {
  this.jsonAPINames = ['tickets', 'ticket', 'audits'];
  this.sideLoadMap = [
    { field: 'assignee_id', name: 'assignee', dataset: 'users'},
    { field: 'requester_id', name: 'requester', dataset: 'users'},
    { field: 'submitter_id', name: 'submitter', dataset: 'users'},
    { field: 'organization_id', name: 'organization', dataset: 'organizations'},
    { field: 'id', name: 'sharing_agreements', dataset: 'sharing_agreements'},
  ];
  Client.call(this, options);
};

// Inherit from Client base object
util.inherits(Tickets, Client);

// ######################################################## Tickets
// ====================================== Listing Tickets
Tickets.prototype.list = function () {
  return this.requestAll('GET', ['tickets']);//all
};

Tickets.prototype.listByOrganization = function (orgID) {
  return this.requestAll('GET', ['organizations', orgID, 'tickets']);//all
};

Tickets.prototype.listByUserRequested = function (userID) {
  return this.requestAll('GET', ['users', userID, 'tickets', 'requested']);//all
};

Tickets.prototype.listByUserCCD = function (userID) {
  return this.requestAll('GET', ['users', userID, 'tickets', 'ccd']);//all
};

Tickets.prototype.listWithFilter = function (type, value) {
  return this.requestAll('GET', ['tickets', {type: value}]);
};

Tickets.prototype.listRecent = function () {
  return this.requestAll('GET', ['tickets', 'recent']);//all?
};

Tickets.prototype.listCollaborators = function (ticketID) {
  return this.requestAll('GET', ['tickets', ticketID, 'collaborators']);//all?
};

Tickets.prototype.listIncidents = function (ticketID) {
  return this.requestAll('GET', ['tickets', ticketID, 'incidents']);//all
};

Tickets.prototype.listMetrics = function (ticketID) {
  return this.request('GET', ['tickets', ticketID, 'metrics']);//all
};

// ====================================== Viewing Tickets
Tickets.prototype.show = function (ticketID) {
  return this.request('GET', ['tickets', ticketID]);
};

Tickets.prototype.showMany = function (ticket_ids) {
  return this.request('GET', ['tickets', 'show_many', '?ids=' + ticket_ids.toString()]);
};

// ====================================== Creating Tickets
Tickets.prototype.create = function (ticket) {
  return this.request('POST', ['tickets'], ticket);
};

Tickets.prototype.createMany = function (tickets) {
  return this.request('POST', ['tickets', 'create_many'], tickets);
};

// ====================================== Updating Tickets
Tickets.prototype.update = function (ticketID, ticket) {
  return this.request('PUT', ['tickets', ticketID], ticket);
};

Tickets.prototype.updateMany = function (ticket_ids, ticket) {
  return this.request('PUT', ['tickets', 'update_many', '?ids=' + ticket_ids.toString()], ticket);
};

// ====================================== Deleting Tickets
Tickets.prototype.delete = function (ticketID) {
  return this.request('DELETE', ['tickets', ticketID]);
};

Tickets.prototype.deleteMany = function (ticket_ids) {
  return this.request('DELETE', ['tickets', 'destroy_many', '?ids=' + ticket_ids.toString()]);
};

// ====================================== Merging tickets
Tickets.prototype.merge = function (ticketID, mergedTicket) {
  return this.request('POST', ['tickets', ticketID, 'merge'], mergedTicket);
};

// ######################################################## Ticket export (max 1000 tickets per request in 5 min intrvals)
// ====================================== Ticket Export
Tickets.prototype.export = function (startTime) {
  return this.request('GET', ['exports', 'tickets', {start_time: startTime}]);
};

// ====================================== Ticket Export Sample (max 50 tickets per request)
Tickets.prototype.exportSample = function (startTime, options) {
  return this.request('GET', ['exports', 'tickets', 'sample', {start_time: startTime}]);
};

//  ====================================== New Incremental Ticket Export
Tickets.prototype.incremental = function (startTime) {
  return this.request('GET', ['incremental', 'tickets', {start_time: startTime}]);
};

//  ====================================== New Incremental Ticket Export with include
Tickets.prototype.incrementalInclude = function (startTime, include) {
  return this.request('GET', ['incremental', 'tickets', {start_time: startTime, include: include}]);
};

//  ====================================== New Incremental Ticket Export Sample
Tickets.prototype.incrementalSample = function (startTime) {
  return this.request('GET', ['incremental', 'tickets', 'sample', {start_time: startTime}]);
};

// ====================================== Listing Ticket Comments
Tickets.prototype.getComments = function (ticketID) {
  return this.requestAll('GET', ['tickets', ticketID, 'comments']);
};

// ######################################################## Ticket Audits

// ====================================== Listing Audits
Tickets.prototype.exportAudit = function (ticketID) {
  return this.requestAll('GET', ['tickets', ticketID, 'audits']);
};

// ######################################################## Ticket Tags

// ====================================== Add Tags to Ticket
Tickets.prototype.addTags = function (ticketID, tags) {
  return this.requestAll('PUT', ['tickets', ticketID, 'tags'], tags);
};
