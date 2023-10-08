// File: imports.js
const {Client} = require('../client');

/**
 * Client for the Zendesk Ticket Import API.
 * @see {@link https://developer.zendesk.com/api-reference/ticketing/tickets/ticket_import/}
 */
class Imports extends Client {
  constructor(options) {
    super(options);
    this.jsonAPINames = ['tickets', 'ticket'];
  }

  /**
   * Imports a single ticket to Zendesk.
   * @param {object} ticket - The ticket data to be imported.
   * @returns {Promise<object>} The response from the Zendesk API.
   * @async
   * @throws {Error} Throws an error if the request fails.
   * @see {@link https://developer.zendesk.com/api-reference/ticketing/tickets/ticket_import/#ticket-import}
   * @example
   * const ticketData = {
   *   ticket: {
   *     assignee_id: 19,
   *     comments: [{
   *       author_id: 827,
   *       created_at: "2009-06-25T10:15:18Z",
   *       value: "This is a comment"
   *     }],
   *     description: "A description",
   *     requester_id: 827,
   *     subject: "Help"
   *   }
   * };
   * const response = await client.imports.ticket(ticketData);
   */
  async ticket(ticket) {
    return this.post(['imports', 'tickets'], ticket);
  }

  /**
   * Imports multiple tickets to Zendesk in bulk.
   * @param {object[]} tickets - An array of ticket data to be imported.
   * @returns {Promise<object>} The response from the Zendesk API.
   * @async
   * @throws {Error} Throws an error if the request fails.
   * @see {@link https://developer.zendesk.com/api-reference/ticketing/tickets/ticket_import/#ticket-bulk-import}
   * @example
   * const ticketsData = [{
   *   assignee_id: 19,
   *   comments: [{
   *     author_id: 827,
   *     created_at: "2009-06-25T10:15:18Z",
   *     value: "This is a comment"
   *   }],
   *   description: "A description",
   *   requester_id: 827,
   *   subject: "Help"
   * }];
   * const response = await client.imports.ticketMany(ticketsData);
   */
  async ticketMany(tickets) {
    return this.requestAll(
      'POST',
      ['imports', 'tickets', 'create_many'],
      tickets,
    );
  }
}

exports.Imports = Imports;
