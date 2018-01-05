//TicketEvents.js: Client for the zendesk API.


var util        = require('util'),
    Client      = require('./client').Client,
    defaultgroups = require('./helpers').defaultgroups;


var TicketEvents = exports.TicketEvents = function (options) {
  this.jsonAPINames = [ 'ticket_events', 'ticket_event' ];
  Client.call(this, options);
};

// Inherit from Client base object
util.inherits(TicketEvents, Client);

// ######################################################## TicketEvents

//  ====================================== New Incremental TicketEvents Export with include
TicketEvents.prototype.incrementalInclude = function (startTime, include, cb) {
  this.request('GET', ['incremental', 'ticket_events', {start_time: startTime, include: include}],  cb);
};

//  ====================================== New Incremental Ticket Export
TicketEvents.prototype.incremental = function (startTime, cb) {
  this.request('GET', ['incremental', 'ticket_events', {start_time: startTime}],  cb);
};
//  ====================================== New Incremental Ticket Export Sample
TicketEvents.prototype.incrementalSample = function (startTime, cb) {
  this.request('GET', ['incremental', 'ticket_events', 'sample', {start_time: startTime}],  cb);
};
