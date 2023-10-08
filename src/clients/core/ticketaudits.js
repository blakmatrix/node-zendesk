const {Client} = require('../client');

/**
 * Client for the Zendesk Ticket Audits API.
 * @see {@link https://developer.zendesk.com/api-reference/ticketing/tickets/ticket_audits/}
 */
class TicketAudits extends Client {
  constructor(options) {
    super(options);
    this.jsonAPINames = ['audits', 'audit'];
    this.sideLoadMap = [
      {field: 'author_id', name: 'author', dataset: 'users'},
      {field: 'ticket_id', name: 'ticket', dataset: 'tickets'},
    ];
  }

  /**
   * List all ticket audits. Note: Archived tickets are not included.
   * @async
   * @returns {Promise<Array<Object>>} Returns an array of ticket audit objects.
   * @throws {Error} Throws an error if request fails.
   * @see {@link https://developer.zendesk.com/api-reference/ticketing/tickets/ticket_audits/#list-all-ticket-audits}
   * @example
   * const client = createClient({...});
   * const allAudits = await client.ticketaudits.listAll();
   */
  async listAll() {
    return this.get('ticket_audits');
  }

  /**
   * List all audits for a specified ticket.
   * @async
   * @param {number} ticketID - The ID of the ticket.
   * @returns {Promise<Array<Object>>} Returns an array of ticket audit objects.
   * @throws {Error} Throws an error if request fails.
   * @see {@link https://developer.zendesk.com/api-reference/ticketing/tickets/ticket_audits/#list-audits-for-a-ticket}
   * @example
   * const client = createClient({...});
   * const audits = await client.ticketaudits.list(12345);
   */
  async list(ticketID) {
    return this.getAll(['tickets', ticketID, 'audits']);
  }

  /**
   * Get an approximate count of audits for a specified ticket.
   * @async
   * @param {number} ticketID - The ID of the ticket.
   * @returns {Promise<number>} Returns an approximate count of audits.
   * @throws {Error} Throws an error if request fails.
   * @see {@link https://developer.zendesk.com/api-reference/ticketing/tickets/ticket_audits/#count-audits-for-a-ticket}
   * @example
   * const client = createClient({...});
   * const auditCount = await client.ticketaudits.count(12345);
   */
  async count(ticketID) {
    return this.get(['tickets', ticketID, 'audits', 'count']);
  }

  /**
   * Show details of a specific ticket audit.
   * @async
   * @param {number} ticketID - The ID of the ticket.
   * @param {number} auditID - The ID of the ticket audit.
   * @returns {Promise<Object>} Returns details of the ticket audit.
   * @throws {Error} Throws an error if request fails.
   * @see {@link https://developer.zendesk.com/api-reference/ticketing/tickets/ticket_audits/#show-audit}
   * @example
   * const client = createClient({...});
   * const auditDetails = await client.ticketaudits.show(12345, 67890);
   */
  async show(ticketID, auditID) {
    return this.get(['tickets', ticketID, 'audits', auditID]);
  }

  /**
   * Change a comment from public to private for a specific ticket audit.
   * @async
   * @param {number} ticketID - The ID of the ticket.
   * @param {number} auditID - The ID of the ticket audit.
   * @returns {Promise<Object>} Returns the updated ticket audit details.
   * @throws {Error} Throws an error if request fails.
   * @see {@link https://developer.zendesk.com/api-reference/ticketing/tickets/ticket_audits/#change-a-comment-from-public-to-private}
   * @example
   * const client = createClient({...});
   * await client.ticketaudits.makePrivate(12345, 67890);
   */
  async makePrivate(ticketID, auditID) {
    return this.put(['tickets', ticketID, 'audits', auditID, 'make_private']);
  }
}

exports.TicketAudits = TicketAudits;
