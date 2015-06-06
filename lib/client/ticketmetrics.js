//ticketmetrics.js: Client for the zendesk API.


var util        = require('util'),
    Client      = require('./client').Client,
    defaultUser = require('./helpers').defaultUser;

var TicketMetrics = exports.TicketMetrics = function (options) {
    this.jsonAPINames = [ 'ticket_metrics', 'ticket_metric' ];
    Client.call(this, options);
};

// Inherit from Client base object
util.inherits(TicketMetrics, Client);

// ######################################################## TicketMetrics
// ====================================== Listing TicketMetrics for ticket
TicketMetrics.prototype.list = function (ticketID, cb) {
    this.request('GET', ['tickets', ticketID, 'metrics'],  cb);//all for ticket
};

// ====================================== Listing ALL TicketMetrics
TicketMetrics.prototype.listAll = function (cb) {
    this.requestAll('GET', ['ticket_metrics'], cb); //all metrics for all tickets
};


// ====================================== Viewing A Single TicketMetric
TicketMetrics.prototype.show = function (ticketMetricId, cb) {
    this.request('GET', ['ticket_metrics', ticketMetricId], cb);  //get by ticket metric id
};
