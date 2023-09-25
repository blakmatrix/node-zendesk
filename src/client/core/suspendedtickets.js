// SuspendedTickets.js: Client for the zendesk API.
const {Client} = require('../client');

/**
 * @class SuspendedTickets
 * @extends Client
 * @description A thin wrapper around the Zendesk Suspended Tickets API
 * @see {@link https://developer.zendesk.com/api-reference/ticketing/tickets/suspended_tickets/}
 */
class SuspendedTickets extends Client {
  constructor(options) {
    super(options);
    this.jsonAPINames = ['suspended_tickets', 'suspended_ticket'];
  }

  /**
   * List all suspended tickets
   * @async
   * @returns {Promise} Returns a promise that resolves to a list of suspended tickets
   * @example const tickets = await client.suspendedtickets.list();
   * @see {@link https://developer.zendesk.com/api-reference/ticketing/tickets/suspended_tickets/#list-suspended-tickets}
   */
  async list() {
    return this.getAll(['suspended_tickets']);
  }

  /**
   * Get details of a specific suspended ticket by ID
   * @async
   * @param {number} suspendedTicketID - ID of the suspended ticket
   * @returns {Promise} Returns a promise that resolves to the details of the suspended ticket
   * @example const ticket = await client.suspendedtickets.show(12345);
   * @see {@link https://developer.zendesk.com/api-reference/ticketing/tickets/suspended_tickets/#show-suspended-ticket}
   */
  async show(suspendedTicketID) {
    return this.get(['suspended_tickets', suspendedTicketID]);
  }

  /**
   * Recover a specific suspended ticket by ID
   * @async
   * @param {number} suspendedTicketID - ID of the suspended ticket to recover
   * @returns {Promise} Returns a promise that resolves once the ticket has been recovered
   * @example await client.suspendedtickets.recover(12345);
   * @see {@link https://developer.zendesk.com/api-reference/ticketing/tickets/suspended_tickets/#recover-suspended-ticket}
   */
  async recover(suspendedTicketID) {
    return this.put(['suspended_tickets', suspendedTicketID, 'recover']);
  }

  /**
   * Recover multiple suspended tickets by their IDs
   * @async
   * @param {Array<number>} suspendedTicketIDs - An array of suspended ticket IDs to recover
   * @returns {Promise} Returns a promise that resolves once the tickets have been recovered
   * @example await client.suspendedtickets.recoverMany([12345, 67890]);
   * @see {@link https://developer.zendesk.com/api-reference/ticketing/tickets/suspended_tickets/#recover-multiple-suspended-tickets}
   */
  async recoverMany(suspendedTicketIDs) {
    return this.put([
      'suspended_tickets',
      'recover_many',
      {ids: suspendedTicketIDs},
    ]);
  }

  /**
   * Delete a specific suspended ticket by ID
   * @async
   * @param {number} suspendedTicketID - ID of the suspended ticket to delete
   * @returns {Promise} Returns a promise that resolves once the ticket has been deleted
   * @example await client.suspendedtickets.delete(12345);
   * @throws Will throw an error if the request fails
   * @see {@link https://developer.zendesk.com/api-reference/ticketing/tickets/suspended_tickets/#delete-suspended-ticket}
   */
  async delete(suspendedTicketID) {
    return super.delete(['suspended_tickets', suspendedTicketID]);
  }

  /**
   * Deletes multiple suspended tickets by their IDs
   * @async
   * @param {Array<number>} suspendedTicketIDs - An array of suspended ticket IDs to delete
   * @returns {Promise} Returns a promise that resolves once the tickets have been deleted
   * @example await client.suspendedtickets.destroyMany([12345, 67890]);
   * @throws Will throw an error if the request fails
   * @see {@link https://developer.zendesk.com/api-reference/ticketing/tickets/suspended_tickets/#delete-multiple-suspended-tickets}
   */
  async destroyMany(suspendedTicketIDs) {
    return super.delete([
      'suspended_tickets',
      'destroy_many',
      {
        ids: suspendedTicketIDs,
      },
    ]);
  }

  /**
   * @deprecated Use `destroyMany` method instead.
   * Deletes multiple suspended tickets by their IDs. This method is deprecated.
   * @async
   * @param {Array<number>} suspendedTicketIDs - An array of suspended ticket IDs to delete
   * @returns {Promise} Returns a promise that resolves once the tickets have been deleted
   * @example await client.suspendedtickets.deleteMany([12345, 67890]);
   * @throws Will throw an error if the request fails
   */
  async deleteMany(suspendedTicketIDs) {
    return this.destroyMany(suspendedTicketIDs);
  }

  /**
   * Get attachments for a specific suspended ticket by ID
   * @async
   * @param {number} suspendedTicketID - ID of the suspended ticket to get attachments from
   * @returns {Promise} Returns a promise that resolves to the attachments of the suspended ticket
   * @example const attachments = await client.suspendedtickets.attachments(12345);
   * @see {@link https://developer.zendesk.com/api-reference/ticketing/tickets/suspended_tickets/#suspended-ticket-attachments}
   */
  async attachments(suspendedTicketID) {
    return this.post(['suspended_tickets', suspendedTicketID, 'attachments']);
  }

  /**
   * Export suspended tickets for the Zendesk Support instance
   * @async
   * @returns {Promise} Returns a promise that resolves once the export request has been initiated
   * @example await client.suspendedtickets.exportTickets();
   * @see {@link https://developer.zendesk.com/api-reference/ticketing/tickets/suspended_tickets/#export-suspended-tickets}
   */
  async exportTickets() {
    return this.post(['suspended_tickets', 'export']);
  }
}

exports.SuspendedTickets = SuspendedTickets;
