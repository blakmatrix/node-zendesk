const {Client} = require('../client');

/**
 * TicketExport class for interacting with the Zendesk Ticket Export API.
 * @see {@link https://developer.zendesk.com/api-reference/ticketing/ticket-management/incremental_exports/}
 */
class TicketExport extends Client {
  constructor(options) {
    super(options);
    this.jsonAPINames = ['exports', 'export', 'audits'];
  }

  /**
   * Export tickets that changed since the provided start time using the time-based approach.
   * @async
   * @param {number} start_time - The time to start the incremental export from.
   * @returns {Promise<Object>} Returns the response from the Zendesk API.
   * @throws Will throw an error if the request fails.
   * @example const tickets = await client.ticketexport.export(1332034771);
   * @see {@link https://developer.zendesk.com/api-reference/ticketing/ticket-management/incremental_exports/#incremental-ticket-export-time-based}
   */
  async export(start_time) {
    return this.get(['incremental', 'tickets', '?start_time=' + start_time]);
  }

  /**
   * Export tickets with associated users and groups since the provided start time.
   * @async
   * @param {number} start_time - The time to start the incremental export from.
   * @returns {Promise<Object>} Returns the response from the Zendesk API with users and groups included.
   * @throws Will throw an error if the request fails.
   * @example const ticketsWithUsers = await client.ticketexport.exportWithUser(1332034771);
   */
  async exportWithUser(start_time) {
    return this.get([
      'incremental',
      'tickets',
      '?start_time=' + start_time + '&include=users,groups',
    ]);
  }

  /**
   *
   * Export incremental tickets based on a specified start time and optional include parameters.
   *
   * @async
   * @param {string} startTime - The start time for exporting incremental tickets.
   * @param {string} include - Optional parameters to include in the export.
   * @returns {Promise<Array>} A promise that resolves with an array of exported incremental tickets.
   *
   * @throws {Error} If `startTime` is not a valid string.
   *
   * @example
   * // Export incremental tickets based on a start time with optional include parameters
   * const startTime = '2023-01-01T00:00:00Z';
   * const include = 'users,groups';
   * const incrementalTickets = await client.tickets.ticketexport(startTime, include);
   *
   * @see {@link https://developer.zendesk.com/api-reference/ticketing/tickets/tickets/#ticket-export-incremental-include}
   */
  async exportWithInclude(startTime, include) {
    return this.getAll([
      'incremental',
      'tickets',
      {start_time: startTime, include},
    ]);
  }

  /**
   * Export tickets using the cursor-based approach.
   * @async
   * @param {number} start_time - The time to start the incremental export from.
   * @param {string} [cursor] - The cursor pointer for subsequent requests.
   * @returns {Promise<Object>} Returns the response from the Zendesk API.
   * @throws Will throw an error if the request fails.
   * @example const cursorTickets = await client.ticketexport.exportCursor(1332034771, 'MTU3NjYxMzUzOS4wfHw0NTF8');
   * @see {@link https://developer.zendesk.com/api-reference/ticketing/ticket-management/incremental_exports/#incremental-ticket-export-cursor-based}
   */
  async exportCursor(start_time, cursor) {
    return this.get(['incremental', 'tickets', 'cursor', {start_time, cursor}]);
  }

  /**
   * @deprecated Use the `list` method from the `TicketAudits` class instead.
   * Retrieve all audits for a specific ticket.
   * @async
   * @param {number} ticketID - The ID of the ticket.
   * @returns {Promise<Object>} Returns the list of audits for the ticket.
   * @throws Will throw an error if the request fails.
   * @example const ticketAudits = await client.ticketexport.exportAudit(12345);
   */
  async exportAudit(ticketID) {
    return this.getAll(['tickets', ticketID, 'audits']);
  }

  /**

   * Export a sample of tickets based on a specified start time.
   *
   * @async
   * @param {string} startTime - The start time for exporting the sample of tickets.
   * @returns {Promise<Object>} A promise that resolves with the exported sample of tickets.
   *
   * @throws {Error} If `startTime` is not a valid string.
   *
   * @example
   * // Export a sample of tickets based on a start time
   * const startTime = '2023-01-01T00:00:00Z';
   * const exportedSample = await client.ticketexport.sample(startTime);
   *
   * @see {@link https://developer.zendesk.com/api-reference/ticketing/ticket-management/incremental_exports/#incremental-sample-export}
  */
  async sample(startTime) {
    return this.get(['exports', 'tickets', 'sample', {start_time: startTime}]);
  }
}

exports.TicketExport = TicketExport;
