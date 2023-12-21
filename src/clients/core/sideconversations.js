// File: sideconversations.js
const { Client } = require('../client');

class SideConversations extends Client {
  /**
   * @constructs SideConversations
   * @param {import('../client').ZendeskClientOptions} options - The client options.
   */
  constructor(options) {
    super(options);
    this.jsonAPINames = ['side_conversations'];
  }

  /**
   * List all the Side Conversations tickets.
   * @returns {Promise<Array<Ticket>>} An array of tickets.
   * @async
   * @see {@link https://developer.zendesk.com/api-reference/ticketing/side_conversation/side_conversation/#list-side-conversations}
   * @example
   * const tickets = await client.sideconversations.list(123);
   */
  async list(ticketID) {
    return this.getAll(['tickets', ticketID, 'side_conversations']);
  }

  /**
   * Retrieve a specific ticket by its ID.
   * @param {number} ticketId - The ID of the ticket.
   * @param {number} sideConversationId - The ID of the side conversation.
   * @returns {Promise<Ticket>} Details of the side conversation.
   * @async
   * @throws {Error} If the ticket ID is not provided or invalid.
   * @see {@link https://developer.zendesk.com/api-reference/ticketing/side_conversation/side_conversation/#show-side-conversation}
   * @example
   * const ticket = await client.sideconversations.show(12345, 12333);
   */
  async show(ticketId, sideConversationId) {
    return this.get(['tickets', ticketId, 'side_conversations', sideConversationId]);
  }
}

exports.Tickets = SideConversations;
