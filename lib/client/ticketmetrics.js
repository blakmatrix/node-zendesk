// Ticketmetrics.js: Client for the zendesk API.

const util = require('node:util');
const {Client} = require('./client');

const TicketMetrics = (exports.TicketMetrics = function (options) {
  this.jsonAPINames = ['ticket_metrics', 'ticket_metric'];
  Client.call(this, options);
});

// Inherit from Client base object
util.inherits(TicketMetrics, Client);

// ######################################################## TicketMetrics
// ====================================== Listing TicketMetrics for ticket
TicketMetrics.prototype.list = function (ticketID, cb) {
  return this.request('GET', ['tickets', ticketID, 'metrics'], cb); // All for ticket
};

// ====================================== Listing ALL TicketMetrics
TicketMetrics.prototype.listAll = function (cb) {
  return this.requestAll('GET', ['ticket_metrics', '?page[size]=100'], cb); // All metrics for all tickets
};

// ====================================== Viewing A Single TicketMetric
TicketMetrics.prototype.show = function (ticketMetricId, cb) {
  return this.request('GET', ['ticket_metrics', ticketMetricId], cb); // Get by ticket metric id
};
