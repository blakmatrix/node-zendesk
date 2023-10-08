// File: tickets.js
const {Client} = require('../client');

/**
 * @class
 * Client for the Zendesk API - Tickets.
 * @see {@link https://developer.zendesk.com/api-reference/ticketing/tickets/tickets/}
 */
class Tickets extends Client {
  /**
   * @constructs Tickets
   * @param options {import('../client').ZendeskClientOptions} The client options.
   */
  constructor(options) {
    super(options);
    this.jsonAPINames = ['tickets', 'ticket', 'audits', 'comments'];
    this.sideLoadMap = [
      {field: 'assignee_id', name: 'assignee', dataset: 'users'},
      {field: 'requester_id', name: 'requester', dataset: 'users'},
      {field: 'submitter_id', name: 'submitter', dataset: 'users'},
      {
        field: 'organization_id',
        name: 'organization',
        dataset: 'organizations',
      },
      {field: 'id', name: 'sharing_agreements', dataset: 'sharing_agreements'},
    ];
  }

  /**
   * List all the tickets.
   * @async
   * @returns {Promise<Array>} An array of tickets.
   * @example
   * const tickets = await client.tickets.list();
   * @see {@link https://developer.zendesk.com/api-reference/ticketing/tickets/tickets/#list-tickets}
   */
  async list() {
    return this.getAll(['tickets']);
  }

  /**
   * List all tickets assigned to a specific user.
   * @async
   * @param {number} userID - The ID of the user.
   * @returns {Promise<Array>} An array of tickets assigned to the user.
   * @example
   * const assignedTickets = await client.tickets.listAssigned(12345);
   * @see {@link https://developer.zendesk.com/api-reference/ticketing/tickets/tickets/#list-tickets}
   */
  async listAssigned(userID) {
    return this.getAll(['users', userID, 'tickets', 'assigned']);
  }

  /**
   * List all tickets associated with a specific organization.
   * @async
   * @param {number} orgID - The ID of the organization.
   * @returns {Promise<Array>} An array of tickets under the organization.
   * @example
   * const orgTickets = await client.tickets.listByOrganization(6789);
   * @see {@link https://developer.zendesk.com/api-reference/ticketing/tickets/tickets/#list-tickets}
   */
  async listByOrganization(orgID) {
    return this.getAll(['organizations', orgID, 'tickets']);
  }

  /**
   * List all tickets requested by a specific user.
   * @async
   * @param {number} userID - The ID of the user.
   * @returns {Promise<Array>} An array of tickets requested by the user.
   * @example
   * const requestedTickets = await client.tickets.listByUserRequested(12345);
   * @see {@link https://developer.zendesk.com/api-reference/ticketing/tickets/tickets/#list-tickets}
   */
  async listByUserRequested(userID) {
    return this.getAll(['users', userID, 'tickets', 'requested']);
  }

  /**
   * List all tickets where a specific user is CC'd.
   * @async
   * @param {number} userID - The ID of the user.
   * @returns {Promise<Array>} An array of tickets where the user is CC'd.
   * @example
   * const ccdTickets = await client.tickets.listByUserCCD(12345);
   * @see {@link https://developer.zendesk.com/api-reference/ticketing/tickets/tickets/#list-tickets}
   */
  async listByUserCCD(userID) {
    return this.getAll(['users', userID, 'tickets', 'ccd']);
  }

  /**
   * List tickets based on a specific filter.
   * @async
   * @param {string} type - Type of filter.
   * @param {string|number} value - Value for the filter.
   * @returns {Promise<Array>} An array of tickets matching the filter.
   * @example
   * const filteredTickets = await client.tickets.listWithFilter('status', 'open');
   * @see {@link https://developer.zendesk.com/api-reference/ticketing/tickets/tickets/#list-tickets}
   */
  async listWithFilter(type, value) {
    return this.getAll(['tickets', {[type]: value}]);
  }

  /**
   * List recently viewed tickets by the requesting agent.
   * @async
   * @returns {Promise<Array>} An array of recently viewed tickets.
   * @example
   * const recentTickets = await client.tickets.listRecent();
   * @see {@link https://developer.zendesk.com/api-reference/ticketing/tickets/tickets/#list-tickets}
   */
  async listRecent() {
    return this.getAll(['tickets', 'recent']);
  }

  /**
   * List collaborators of a specific ticket.
   * @async
   * @param {number} ticketId - The ID of the ticket.
   * @returns {Promise<Array>} An array of collaborators for the ticket.
   * @example
   * const collaborators = await client.tickets.listCollaborators(7890);
   * @see {@link https://developer.zendesk.com/api-reference/ticketing/tickets/tickets/#list-tickets}
   */
  async listCollaborators(ticketId) {
    return this.getAll(['tickets', ticketId, 'collaborators']);
  }

  /**
   * List incidents related to a specific ticket.
   * @async
   * @param {number} ticketId - The ID of the ticket.
   * @returns {Promise<Array>} An array of incidents related to the ticket.
   * @example
   * const incidents = await client.tickets.listIncidents(7890);
   * @see {@link https://developer.zendesk.com/api-reference/ticketing/tickets/tickets/#list-tickets}
   */
  async listIncidents(ticketId) {
    return this.getAll(['tickets', ticketId, 'incidents']);
  }

  /**
   * Retrieve metrics for a specific ticket.
   * @async
   * @param {number} ticketId - The ID of the ticket.
   * @returns {Promise<Object>} Metrics details for the ticket.
   * @example
   * const metrics = await client.tickets.listMetrics(7890);
   * @see {@link https://developer.zendesk.com/api-reference/ticketing/tickets/tickets/#list-tickets}
   */
  async listMetrics(ticketId) {
    return this.get(['tickets', ticketId, 'metrics']);
  }

  /**
   * Retrieve a specific ticket by its ID.
   * @async
   * @param {number} ticketId - The ID of the ticket.
   * @returns {Promise<Object>} Details of the ticket.
   * @throws {Error} If the ticket ID is not provided or invalid.
   * @example
   * const ticket = await client.tickets.show(12345);
   * @see {@link https://developer.zendesk.com/api-reference/ticketing/tickets/tickets/#show-ticket}
   */
  async show(ticketId) {
    return this.get(['tickets', ticketId]);
  }

  /**
   * Retrieve details for multiple tickets based on their IDs.
   *
   * @async
   * @param {Array<number>} ticketIds - An array of ticket IDs to fetch.
   * @returns {Promise<Array>} An array of ticket details.
   * @example
   * const ticketsDetails = await client.tickets.showMany([123, 456, 789]);
   *
   * @see {@link https://developer.zendesk.com/api-reference/ticketing/tickets/tickets/#show-multiple-tickets}
   */
  async showMany(ticketIds) {
    return this.get(['tickets', 'show_many', {ids: ticketIds}]);
  }

  /**
   * Create a new ticket.
   * @async
   * @param {Object} ticket - Details of the ticket to be created.
   * @returns {Promise<Object>} The created ticket details.
   * @throws {Error} If the ticket details are not provided or invalid.
   * @example
   * const newTicket = await client.tickets.create({ subject: 'New ticket', description: 'Ticket description' });
   * @see {@link https://developer.zendesk.com/api-reference/ticketing/tickets/tickets/#create-ticket}
   */
  async create(ticket) {
    return this.post(['tickets'], ticket);
  }

  /**
   * Create multiple new tickets.
   *
   * @async
   * @param {Array<Object>} tickets - An array of ticket objects to create.
   * @returns {Promise<Array<Object>>} A promise that resolves to an array of created ticket objects.
   *
   * @throws {Error} If the provided `tickets` is not an array or is empty.
   *
   * @example
   * // Create multiple new tickets
   * const newTickets = [
   *   { subject: 'Ticket 1', description: 'Description 1' },
   *   { subject: 'Ticket 2', description: 'Description 2' },
   * ];
   * const createdTickets = await client.tickets.createMany(newTickets);
   *
   * @see {@link https://developer.zendesk.com/api-reference/ticketing/tickets/tickets/#create-multiple-tickets}
   */
  async createMany(tickets) {
    return this.post(['tickets', 'create_many'], tickets);
  }

  /**
   * Update an existing ticket by its ID.
   *
   * @async
   * @param {number} ticketId - The ID of the ticket to update.
   * @param {Object} ticket - The updated ticket data as an object.
   * @returns {Promise<Object>} A promise that resolves to the updated ticket object.
   *
   * @throws {Error} If `ticketId` is not a number or if `ticket` is not an object.
   *
   * @example
   * // Update an existing ticket
   * const updatedTicketData = {
   *   subject: 'Updated Ticket Subject',
   *   description: 'Updated Ticket Description',
   * };
   * const updatedTicket = await client.tickets.update(123, updatedTicketData);
   *
   * @see {@link https://developer.zendesk.com/api-reference/ticketing/tickets/tickets/#update-ticket}
   */
  async update(ticketId, ticket) {
    return this.put(['tickets', ticketId], ticket);
  }

  /**
   * Update multiple tickets by their IDs.
   *
   * @async
   * @param {Array<number>} ticketIds - An array of ticket IDs to update.
   * @param {Object} ticket - The updated ticket data as an object.
   * @returns {Promise<Object>} A promise that resolves to the updated ticket object.
   *
   * @throws {Error} If `ticketIds` is not an array of numbers or if `ticket` is not an object.
   *
   * @example
   * // Update multiple tickets by their IDs
   * const ticketIdsToUpdate = [123, 456, 789];
   * const updatedTicketData = {
   *   status: 'solved',
   *   priority: 'high',
   * };
   * const updatedTickets = await client.tickets.updateMany(ticketIdsToUpdate, updatedTicketData);
   *
   * @see {@link https://developer.zendesk.com/api-reference/ticketing/tickets/tickets/#update-many-tickets}
   */
  async updateMany(ticketIds, ticket) {
    return this.put(['tickets', 'update_many', {ids: ticketIds}], ticket);
  }

  /**
   * Delete a ticket by its ID.
   *
   * @async
   * @param {number} ticketId - The ID of the ticket to delete.
   * @returns {Promise<void>} A promise that resolves when the ticket is successfully deleted.
   *
   * @throws {Error} If `ticketId` is not a number or is not provided.
   *
   * @example
   * // Delete a ticket by its ID
   * const ticketIdToDelete = 123;
   * await client.tickets.delete(ticketIdToDelete);
   *
   * @see {@link https://developer.zendesk.com/api-reference/ticketing/tickets/tickets/#delete-ticket}
   */
  async delete(ticketId) {
    return super.delete(['tickets', ticketId]);
  }

  /**
   * Delete multiple tickets by their IDs.
   *
   * @async
   * @param {Array<number>} ticketIds - An array of ticket IDs to delete.
   * @returns {Promise<void>} A promise that resolves when the tickets are successfully deleted.
   *
   * @throws {Error} If `ticketIds` is not an array of valid ticket IDs.
   *
   * @example
   * // Delete multiple tickets by their IDs
   * const ticketIdsToDelete = [123, 456, 789];
   * await client.tickets.deleteMany(ticketIdsToDelete);
   *
   * @see {@link https://developer.zendesk.com/api-reference/ticketing/tickets/tickets/#bulk-delete-tickets}
   */
  async deleteMany(ticketIds) {
    return super.delete(['tickets', 'destroy_many', {ids: ticketIds}]);
  }

  /**
   * Merge a ticket with another ticket.
   *
   * @async
   * @param {number} ticketId - The ID of the ticket to be merged.
   * @param {Object} mergedTicket - The ticket object representing the ticket to merge with.
   * @returns {Promise<Object>} A promise that resolves with the merged ticket object.
   *
   * @throws {Error} If `ticketId` is not a valid ticket ID or `mergedTicket` is not a valid ticket object.
   *
   * @example
   * // Merge a ticket with another ticket
   * const sourceTicketId = 123;
   * const targetTicket = {
   *   subject: 'Merged Ticket',
   *   description: 'This is the merged ticket description.',
   *   // ...other ticket properties
   * };
   * const mergedTicket = await client.tickets.merge(sourceTicketId, targetTicket);
   *
   * @see {@link https://developer.zendesk.com/api-reference/ticketing/tickets/tickets/#merge-tickets}
   */
  async merge(ticketId, mergedTicket) {
    return this.post(['tickets', ticketId, 'merge'], mergedTicket);
  }

  /**
   * **DEPRECATED**: Use the `TicketExport` class method `export` instead.
   *
   * Export tickets based on a specified start time.
   *
   * @deprecated Use `TicketExport.export(startTime)` method instead.
   *
   * @async
   * @param {string} startTime - The start time for exporting tickets.
   * @returns {Promise<Object>} A promise that resolves with the exported tickets.
   *
   * @throws {Error} If `startTime` is not a valid string.
   *
   * @example
   * // Export tickets based on a start time
   * const startTime = '2023-01-01T00:00:00Z';
   * const exportedTickets = await client.tickets.export(startTime);
   *
   * @see {@link https://developer.zendesk.com/api-reference/ticketing/tickets/tickets/#ticket-export}
   */
  async export(startTime) {
    return this.get(['exports', 'tickets', {start_time: startTime}]);
  }

  /**
   * **DEPRECATED**: Use the `TicketExport` class method `sample` instead.
   *
   * Export a sample of tickets based on a specified start time.
   *
   * @deprecated Use `TicketExport.sample(startTime)` method instead.
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
   * const exportedSample = await client.tickets.exportSample(startTime);
   *
   * @see {@link https://developer.zendesk.com/api-reference/ticketing/ticket-management/incremental_exports/#incremental-sample-export}
   */
  async exportSample(startTime) {
    return this.get(['exports', 'tickets', 'sample', {start_time: startTime}]);
  }

  /**
   * **DEPRECATED**: Use the `TicketExport` class method `export` instead.
   *
   * Export incremental tickets based on a specified start time.
   *
   * @deprecated Use `TicketExport.export(startTime)` method instead.
   *
   * @async
   * @param {string} startTime - The start time for exporting incremental tickets.
   * @returns {Promise<Array>} A promise that resolves with an array of exported incremental tickets.
   *
   * @throws {Error} If `startTime` is not a valid string.
   *
   * @example
   * // Export incremental tickets based on a start time
   * const startTime = '2023-01-01T00:00:00Z';
   * const incrementalTickets = await client.tickets.incremental(startTime);
   *
   * @see {@link https://developer.zendesk.com/api-reference/ticketing/tickets/tickets/#ticket-export-incremental}
   */
  async incremental(startTime) {
    return this.getAll(['incremental', 'tickets', {start_time: startTime}]);
  }

  /**
   * **DEPRECATED**: Use the `TicketExport` class method `exportWithInclude` instead.
   *
   * Export incremental tickets based on a specified start time and optional include parameters.
   *
   * @deprecated Use `TicketExport.exportWithInclude(startTime, include)` method instead.
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
   * const incrementalTickets = await client.tickets.incrementalInclude(startTime, include);
   *
   * @see {@link https://developer.zendesk.com/api-reference/ticketing/tickets/tickets/#ticket-export-incremental-include}
   */
  async incrementalInclude(startTime, include) {
    return this.getAll([
      'incremental',
      'tickets',
      {start_time: startTime, include},
    ]);
  }

  /**
   * **DEPRECATED**: Use the `TicketExport` class method `sample` instead.
   *
   * Export a sample of incremental tickets based on a specified start time.
   *
   * @deprecated Use `TicketExport.sample(startTime)` method instead.
   *
   * @async
   * @param {string} startTime - The start time for exporting the sample of incremental tickets.
   * @returns {Promise<Array>} A promise that resolves with an array of exported incremental tickets.
   *
   * @throws {Error} If `startTime` is not a valid string.
   *
   * @example
   * // Export a sample of incremental tickets based on a start time
   * const startTime = '2023-01-01T00:00:00Z';
   * const incrementalSampleTickets = await client.tickets.incrementalSample(startTime);
   *
   * @see {@link https://developer.zendesk.com/api-reference/ticketing/tickets/tickets/#ticket-export-incremental-sample}
   */
  async incrementalSample(startTime) {
    return this.get([
      'incremental',
      'tickets',
      'sample',
      {start_time: startTime},
    ]);
  }

  /**
   * Retrieve comments associated with a specific ticket.
   *
   * @async
   * @param {number} ticketId - The ID of the ticket to retrieve comments for.
   * @returns {Promise<Array>} A promise that resolves with an array of comments associated with the ticket.
   *
   * @throws {Error} If `ticketId` is not a valid number.
   *
   * @example
   * // Retrieve comments for a specific ticket
   * const ticketId = 12345;
   * const comments = await client.tickets.getComments(ticketId);
   *
   * @see {@link https://developer.zendesk.com/api-reference/ticketing/tickets/ticket_comments/}
   */
  async getComments(ticketId) {
    return this.getAll(['tickets', ticketId, 'comments']);
  }

  /**
   * Retrieve audits associated with a specific ticket. (Deprecated: Use TicketAudits class list method instead)
   *
   * @deprecated Use the `TicketAudits` class `list` method instead.
   * @async
   * @param {number} ticketId - The ID of the ticket to retrieve audits for.
   * @returns {Promise<Array>} A promise that resolves with an array of audits associated with the ticket.
   *
   * @throws {Error} If `ticketId` is not a valid number.
   *
   * @example
   * // Retrieve audits for a specific ticket (deprecated)
   * const ticketId = 12345;
   * const audits = await client.tickets.exportAudit(ticketId);
   *
   * @see {@link https://developer.zendesk.com/api-reference/ticketing/tickets/tickets/#listing-ticket-audits}
   */
  async exportAudit(ticketId) {
    return this.getAll(['tickets', ticketId, 'audits']);
  }

  /**
   * Add tags to a specific ticket.
   *
   * @async
   * @param {number} ticketId - The ID of the ticket to add tags to.
   * @param {Array<string>} tags - An array of tags to add to the ticket.
   * @returns {Promise<void>} A promise that resolves when the tags are successfully added to the ticket.
   *
   * @throws {Error} If `ticketId` is not a valid number or `tags` is not an array of strings.
   *
   * @example
   * // Add tags to a specific ticket
   * const ticketId = 12345;
   * const tags = ['tag1', 'tag2'];
   * await client.tickets.addTags(ticketId, tags);
   *
   * @see {@link https://developer.zendesk.com/api-reference/ticketing/tickets/tickets/#updating-tag-lists}
   */
  async addTags(ticketId, tags) {
    return this.requestAll('PUT', ['tickets', ticketId, 'tags'], tags);
  }

  /**
   * Replace tags on a specific ticket with new tags.
   *
   * @async
   * @param {number} ticketId - The ID of the ticket to replace tags on.
   * @param {Array<string>} tags - An array of new tags to replace the existing tags on the ticket.
   * @returns {Promise<void>} A promise that resolves when the tags are successfully replaced on the ticket.
   *
   * @throws {Error} If `ticketId` is not a valid number or `tags` is not an array of strings.
   *
   * @example
   * // Replace tags on a specific ticket
   * const ticketId = 12345;
   * const newTags = ['newTag1', 'newTag2'];
   * await client.tickets.updateTags(ticketId, newTags);
   *
   * @see {@link https://developer.zendesk.com/api-reference/ticketing/tickets/tickets/#updating-tag-lists}
   */
  async updateTags(ticketId, tags) {
    return this.requestAll('POST', ['tickets', ticketId, 'tags'], tags);
  }
}

exports.Tickets = Tickets;
