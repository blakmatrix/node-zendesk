// Ticketmetrics.js: Client for the zendesk API.
const {Client} = require('./client');

class TicketMetrics extends Client {
  constructor(options) {
    super(options);
    this.jsonAPINames = ['ticket_metrics', 'ticket_metric'];
  }

  // Listing TicketMetrics for ticket
  list(ticketID, cb) {
    return this.get(['tickets', ticketID, 'metrics'], cb);
  }

  // Listing ALL TicketMetrics
  listAll(cb) {
    return this.getAll(['ticket_metrics', '?page[size]=100'], cb);
  }

  // Viewing A Single TicketMetric
  show(ticketMetricId, cb) {
    return this.get(['ticket_metrics', ticketMetricId], cb);
  }
}

exports.TicketMetrics = TicketMetrics;
