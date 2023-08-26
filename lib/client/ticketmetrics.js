// Ticketmetrics.js: Client for the zendesk API.
const {Client} = require('./client');

class TicketMetrics extends Client {
  constructor(options) {
    super(options);
    this.jsonAPINames = ['ticket_metrics', 'ticket_metric'];
  }

  // Listing TicketMetrics for ticket
  async list(ticketID) {
    return this.get(['tickets', ticketID, 'metrics']);
  }

  // Listing ALL TicketMetrics
  async listAll() {
    return this.getAll(['ticket_metrics', '?page[size]=100']);
  }

  // Viewing A Single TicketMetric
  async show(ticketMetricId) {
    return this.get(['ticket_metrics', ticketMetricId]);
  }
}

exports.TicketMetrics = TicketMetrics;
