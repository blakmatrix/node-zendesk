// Tickets.js: Client for the zendesk API.
const {Client} = require('../client');

/**
 * TicketImport: A class that provides methods to interact with Zendesk's Ticket Import API.
 * This is a thin wrapper around the Zendesk REST API for ticket imports.
 * @see {@link https://developer.zendesk.com/api-reference/ticketing/tickets/ticket_import/}
 */

class TicketImport extends Client {
  constructor(options) {
    super(options);
    this.jsonAPINames = ['imports', 'import'];
  }

  /**
   * Imports a ticket into Zendesk.
   * @param {object} ticket - The ticket data to be imported.
   * @param {number} ticket.assignee_id - The ID of the user to assign this ticket to.
   * @param {Array} ticket.comments - Array of comments associated with the ticket.
   * @param {string} ticket.description - The description of the ticket.
   * @param {number} ticket.requester_id - The ID of the user requesting the ticket.
   * @param {string} ticket.subject - The subject of the ticket.
   * @param {Array} ticket.tags - Array of tags associated with the ticket.
   * @returns {Promise<object>} The response from the Zendesk API.
   * @async
   * @throws {Error} Throws an error if the request to the Zendesk API fails.
   * @see {@link https://developer.zendesk.com/api-reference/ticketing/tickets/ticket_import/#ticket-import}
   * @example
   * const ticketData = {
   *   assignee_id: 19,
   *   comments: [{ author_id: 19, value: "This is a comment" }],
   *   description: "A description",
   *   requester_id: 827,
   *   subject: "Help",
   *   tags: ["foo", "bar"]
   * };
   * const response = await client.ticketimport.import(ticketData);
   */
  async import(ticket) {
    return this.post(['imports/tickets'], ticket);
  }

  /**
   * @param {number} ticketID - The ID of the ticket to fetch the audits for.
   * @returns {Promise<Array>} An array of ticket audits from the Zendesk API.
   * @async
   * @throws {Error} Throws an error if the request to the Zendesk API fails.
   * @see {@link https://developer.zendesk.com/api-reference/ticketing/tickets/ticket_import/}
   * @example
   * const ticketID = 12345;
   * const audits = await client.ticketimport.exportAudit(ticketID);
   * @deprecated Use the `list` method from the `TicketAudits` class instead.
   * Exports the audits of a specific ticket.
   */
  async exportAudit(ticketID) {
    return this.getAll(['tickets', ticketID, 'audits']);
  }

  /**
   * Bulk imports multiple tickets into Zendesk.
   * @param {Array} tickets - An array containing ticket data to be imported. Accepts up to 100 ticket objects.
   * @param {number} tickets[].assignee_id - The ID of the user to assign this ticket to.
   * @param {Array} tickets[].comments - Array of comments associated with the ticket.
   * @param {string} tickets[].description - The description of the ticket.
   * @param {number} tickets[].requester_id - The ID of the user requesting the ticket.
   * @param {string} tickets[].subject - The subject of the ticket.
   * @param {Array} tickets[].tags - Array of tags associated with the ticket.
   * @returns {Promise<object>} The response from the Zendesk API, including a job status object.
   * @async
   * @throws {Error} Throws an error if the request to the Zendesk API fails.
   * @see {@link https://developer.zendesk.com/api-reference/ticketing/tickets/ticket_import/#ticket-bulk-import}
   * @example
   * const ticketDataArray = [{
   *   assignee_id: 19,
   *   comments: [{ author_id: 19, value: "This is a comment" }],
   *   description: "A description",
   *   requester_id: 827,
   *   subject: "Help",
   *   tags: ["foo", "bar"]
   * },
   * {
   *   assignee_id: 20,
   *   comments: [{ author_id: 20, value: "Another comment" }],
   *   description: "Another description",
   *   requester_id: 828,
   *   subject: "Help Again",
   *   tags: ["foo2", "bar2"]
   * }];
   * const response = await client.ticketimport.bulkImport(ticketDataArray);
   */
  async bulkImport(tickets) {
    return this.post(['imports', 'tickets', 'create_many'], {tickets});
  }
}

exports.TicketImport = TicketImport;
