const {Client} = require('../client');

/**
 * TicketMetrics client for the Zendesk API.
 * @see {@link https://developer.zendesk.com/api-reference/ticketing/tickets/ticket_metrics/}
 */
class TicketMetrics extends Client {
  constructor(options) {
    super(options);
    this.jsonAPINames = ['ticket_metrics', 'ticket_metric'];
  }

  /**
   * Lists the Ticket Metrics for a specific ticket.
   * @param {number} ticketID - The ID of the ticket.
   * @returns {Promise<object>} The ticket metrics data.
   * @async
   * @throws {Error} Throws an error if the request fails.
   * @see {@link https://developer.zendesk.com/api-reference/ticketing/tickets/ticket_metrics/#show-ticket-metrics}
   * @example
   * const client = createClient({...});
   * const metrics = await client.ticketmetrics.list(12345);
   */
  async list(ticketID) {
    return this.get(['tickets', ticketID, 'metrics']);
  }

  /**
   * Lists all Ticket Metrics.
   * @returns {Promise<object[]>} An array of all ticket metrics data.
   * @async
   * @throws {Error} Throws an error if the request fails.
   * @see {@link https://developer.zendesk.com/api-reference/ticketing/tickets/ticket_metrics/#list-ticket-metrics}
   * @example
   * const client = createClient({...});
   * const allMetrics = await client.ticketmetrics.listAll();
   */
  async listAll() {
    return this.getAll(['ticket_metrics']);
  }

  /**
   * Shows a specific Ticket Metric by its ID.
   * @param {number} ticketMetricId - The ID of the ticket metric to retrieve.
   * @returns {Promise<object>} The ticket metric data.
   * @async
   * @throws {Error} Throws an error if the request fails.
   * @see {@link https://developer.zendesk.com/api-reference/ticketing/tickets/ticket_metrics/#show-ticket-metrics}
   * @example
   * const client = createClient({...});
   * const metric = await client.ticketmetrics.show(12345);
   */
  async show(ticketMetricId) {
    return this.get(['ticket_metrics', ticketMetricId]);
  }
}

exports.TicketMetrics = TicketMetrics;
