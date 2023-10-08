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
   * @param {number} start_time - The time to start the incremental export from.
   * @returns {Promise<object>} Returns the response from the Zendesk API.
   * @async
   * @throws Will throw an error if the request fails.
   * @see {@link https://developer.zendesk.com/api-reference/ticketing/ticket-management/incremental_exports/#incremental-ticket-export-time-based}
   * @example const tickets = await client.ticketexport.export(1332034771);
   */
  async export(start_time) {
    return this.get(['incremental', 'tickets', '?start_time=' + start_time]);
  }

  /**
   * Export tickets with associated users and groups since the provided start time.
   * @param {number} start_time - The time to start the incremental export from.
   * @returns {Promise<object>} Returns the response from the Zendesk API with users and groups included.
   * @async
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
   *Export incremental tickets based on a specified start time and optional include parameters.
   * @param {string} startTime - The start time for exporting incremental tickets.
   * @param {string} include - Optional parameters to include in the export.
   * @returns {Promise<Array>} A promise that resolves with an array of exported incremental tickets.
   * @async
   * @throws {Error} If `startTime` is not a valid string.
   * @see {@link https://developer.zendesk.com/api-reference/ticketing/tickets/tickets/#ticket-export-incremental-include}
   * @example
   * // Export incremental tickets based on a start time with optional include parameters
   * const startTime = '2023-01-01T00:00:00Z';
   * const include = 'users,groups';
   * const incrementalTickets = await client.tickets.ticketexport(startTime, include);
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
   * @param {number} start_time - The time to start the incremental export from.
   * @param {string} [cursor] - The cursor pointer for subsequent requests.
   * @returns {Promise<object>} Returns the response from the Zendesk API.
   * @async
   * @throws Will throw an error if the request fails.
   * @see {@link https://developer.zendesk.com/api-reference/ticketing/ticket-management/incremental_exports/#incremental-ticket-export-cursor-based}
   * @example const cursorTickets = await client.ticketexport.exportCursor(1332034771, 'MTU3NjYxMzUzOS4wfHw0NTF8');
   */
  async exportCursor(start_time, cursor) {
    return this.get(['incremental', 'tickets', 'cursor', {start_time, cursor}]);
  }

  /**
   * @param {number} ticketID - The ID of the ticket.
   * @returns {Promise<object>} Returns the list of audits for the ticket.
   * @async
   * @throws Will throw an error if the request fails.
   * @example const ticketAudits = await client.ticketexport.exportAudit(12345);
   * @deprecated Use the `list` method from the `TicketAudits` class instead.
   * Retrieve all audits for a specific ticket.
   */
  async exportAudit(ticketID) {
    return this.getAll(['tickets', ticketID, 'audits']);
  }

  /**
   
   Export a sample of tickets based on a specified start time.
   * @param {string} startTime - The start time for exporting the sample of tickets.
   * @returns {Promise<object>} A promise that resolves with the exported sample of tickets.
   * @async
   * @throws {Error} If `startTime` is not a valid string.
   * @see {@link https://developer.zendesk.com/api-reference/ticketing/ticket-management/incremental_exports/#incremental-sample-export}
   * @example
   * // Export a sample of tickets based on a start time
   * const startTime = '2023-01-01T00:00:00Z';
   * const exportedSample = await client.ticketexport.sample(startTime);
   */
  async sample(startTime) {
    return this.get(['exports', 'tickets', 'sample', {start_time: startTime}]);
  }
}

exports.TicketExport = TicketExport;
