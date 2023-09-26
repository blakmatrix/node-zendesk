// TicketEvents.js: Client for the zendesk API.
const {Client} = require('../client');

/**
 * TicketEvents class to handle operations related to the Zendesk Ticket Events API.
 * @see {@link https://developer.zendesk.com/api-reference/ticketing/ticket-management/incremental_exports/}
 */
class TicketEvents extends Client {
  constructor(options) {
    super(options);
    this.jsonAPINames = ['ticket_events', 'ticket_event'];
  }

  /**
   * Fetches incremental ticket events with optional inclusion.
   * @async
   * @param {number} startTime - The time to start the incremental export from.
   * @param {string} include - Additional entities to include in the response.
   * @returns {Promise<Object>} Returns the result of the API call.
   * @throws {Error} Throws an error if the API call fails.
   * @example const result = await client.ticketevents.incrementalInclude(1632505559, 'comment_events');
   * @see {@link https://developer.zendesk.com/api-reference/ticketing/ticket-management/incremental_exports/#incremental-ticket-event-export}
   */
  async incrementalInclude(startTime, include) {
    return this.getAll([
      'incremental',
      'ticket_events',
      {start_time: startTime, include},
    ]);
  }

  /**
   * Fetches incremental ticket events.
   * @async
   * @param {number} startTime - The time to start the incremental export from.
   * @returns {Promise<Object>} Returns the result of the API call.
   * @throws {Error} Throws an error if the API call fails.
   * @example const result = await client.ticketevents.incremental(1632505559);
   * @see {@link https://developer.zendesk.com/api-reference/ticketing/ticket-management/incremental_exports/#incremental-ticket-event-export}
   */
  async incremental(startTime) {
    return this.getAll([
      'incremental',
      'ticket_events',
      {start_time: startTime},
    ]);
  }

  /**
   * Fetches a sample of ticket events for testing purposes.
   * @async
   * @param {number} startTime - The time to start the incremental export from.
   * @returns {Promise<Object>} Returns the result of the API call.
   * @throws {Error} Throws an error if the API call fails.
   * @example const result = await client.ticketevents.incrementalSample(1632505559);
   * @see {@link https://developer.zendesk.com/api-reference/ticketing/ticket-management/incremental_exports/#incremental-sample-export}
   */
  async incrementalSample(startTime) {
    return this.get([
      'incremental',
      'ticket_events',
      'sample',
      {start_time: startTime},
    ]);
  }
}

exports.TicketEvents = TicketEvents;
