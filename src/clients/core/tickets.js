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
   * @param {import('../client').ZendeskClientOptions} options - The client options.
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
   * @returns {Promise<Array>} An array of tickets.
   * @async
   * @see {@link https://developer.zendesk.com/api-reference/ticketing/tickets/tickets/#list-tickets}
   * @example
   * const tickets = await client.tickets.list();
   */
  async list() {
    return this.getAll(['tickets']);
  }

  /**
   * List all tickets assigned to a specific user.
   * @param {number} userID - The ID of the user.
   * @returns {Promise<Array>} An array of tickets assigned to the user.
   * @async
   * @see {@link https://developer.zendesk.com/api-reference/ticketing/tickets/tickets/#list-tickets}
   * @example
   * const assignedTickets = await client.tickets.listAssigned(12345);
   */
  async listAssigned(userID) {
    return this.getAll(['users', userID, 'tickets', 'assigned']);
  }

  /**
   * List all tickets associated with a specific organization.
   * @param {number} orgID - The ID of the organization.
   * @returns {Promise<Array>} An array of tickets under the organization.
   * @async
   * @see {@link https://developer.zendesk.com/api-reference/ticketing/tickets/tickets/#list-tickets}
   * @example
   * const orgTickets = await client.tickets.listByOrganization(6789);
   */
  async listByOrganization(orgID) {
    return this.getAll(['organizations', orgID, 'tickets']);
  }

  /**
   * List all tickets requested by a specific user.
   * @param {number} userID - The ID of the user.
   * @returns {Promise<Array>} An array of tickets requested by the user.
   * @async
   * @see {@link https://developer.zendesk.com/api-reference/ticketing/tickets/tickets/#list-tickets}
   * @example
   * const requestedTickets = await client.tickets.listByUserRequested(12345);
   */
  async listByUserRequested(userID) {
    return this.getAll(['users', userID, 'tickets', 'requested']);
  }

  /**
   * List all tickets where a specific user is CC'd.
   * @param {number} userID - The ID of the user.
   * @returns {Promise<Array>} An array of tickets where the user is CC'd.
   * @async
   * @see {@link https://developer.zendesk.com/api-reference/ticketing/tickets/tickets/#list-tickets}
   * @example
   * const ccdTickets = await client.tickets.listByUserCCD(12345);
   */
  async listByUserCCD(userID) {
    return this.getAll(['users', userID, 'tickets', 'ccd']);
  }

  /**
   * List tickets based on a specific filter.
   * @param {string} type - Type of filter.
   * @param {string|number} value - Value for the filter.
   * @returns {Promise<Array>} An array of tickets matching the filter.
   * @async
   * @see {@link https://developer.zendesk.com/api-reference/ticketing/tickets/tickets/#list-tickets}
   * @example
   * const filteredTickets = await client.tickets.listWithFilter('status', 'open');
   */
  async listWithFilter(type, value) {
    return this.getAll(['tickets', {[type]: value}]);
  }

  /**
   * List recently viewed tickets by the requesting agent.
   * @returns {Promise<Array>} An array of recently viewed tickets.
   * @async
   * @see {@link https://developer.zendesk.com/api-reference/ticketing/tickets/tickets/#list-tickets}
   * @example
   * const recentTickets = await client.tickets.listRecent();
   */
  async listRecent() {
    return this.getAll(['tickets', 'recent']);
  }

  /**
   * List collaborators of a specific ticket.
   * @param {number} ticketId - The ID of the ticket.
   * @returns {Promise<Array>} An array of collaborators for the ticket.
   * @async
   * @see {@link https://developer.zendesk.com/api-reference/ticketing/tickets/tickets/#list-tickets}
   * @example
   * const collaborators = await client.tickets.listCollaborators(7890);
   */
  async listCollaborators(ticketId) {
    return this.getAll(['tickets', ticketId, 'collaborators']);
  }

  /**
   * List incidents related to a specific ticket.
   * @param {number} ticketId - The ID of the ticket.
   * @returns {Promise<Array>} An array of incidents related to the ticket.
   * @async
   * @see {@link https://developer.zendesk.com/api-reference/ticketing/tickets/tickets/#list-tickets}
   * @example
   * const incidents = await client.tickets.listIncidents(7890);
   */
  async listIncidents(ticketId) {
    return this.getAll(['tickets', ticketId, 'incidents']);
  }

  /**
   * Retrieve metrics for a specific ticket.
   * @param {number} ticketId - The ID of the ticket.
   * @returns {Promise<object>} Metrics details for the ticket.
   * @async
   * @see {@link https://developer.zendesk.com/api-reference/ticketing/tickets/tickets/#list-tickets}
   * @example
   * const metrics = await client.tickets.listMetrics(7890);
   */
  async listMetrics(ticketId) {
    return this.get(['tickets', ticketId, 'metrics']);
  }

  /**
   * Retrieve a specific ticket by its ID.
   * @param {number} ticketId - The ID of the ticket.
   * @returns {Promise<object>} Details of the ticket.
   * @async
   * @throws {Error} If the ticket ID is not provided or invalid.
   * @see {@link https://developer.zendesk.com/api-reference/ticketing/tickets/tickets/#show-ticket}
   * @example
   * const ticket = await client.tickets.show(12345);
   */
  async show(ticketId) {
    return this.get(['tickets', ticketId]);
  }

  /**
   * Retrieve details for multiple tickets based on their IDs.
   * @param {Array<number>} ticketIds - An array of ticket IDs to fetch.
   * @returns {Promise<Array>} An array of ticket details.
   * @async
   * @see {@link https://developer.zendesk.com/api-reference/ticketing/tickets/tickets/#show-multiple-tickets}
   * @example
   * const ticketsDetails = await client.tickets.showMany([123, 456, 789]);
   */
  async showMany(ticketIds) {
    return this.get(['tickets', 'show_many', {ids: ticketIds}]);
  }

  /**
   * Create a new ticket.
   * @param {object} ticket - Details of the ticket to be created.
   * @returns {Promise<object>} The created ticket details.
   * @async
   * @throws {Error} If the ticket details are not provided or invalid.
   * @see {@link https://developer.zendesk.com/api-reference/ticketing/tickets/tickets/#create-ticket}
   * @example
   * const newTicket = await client.tickets.create({ subject: 'New ticket', description: 'Ticket description' });
   */
  async create(ticket) {
    return this.post(['tickets'], ticket);
  }

  /**
   * Create multiple new tickets.
   * @param {Array<object>} tickets - An array of ticket objects to create.
   * @returns {Promise<Array<object>>} A promise that resolves to an array of created ticket objects.
   * @async
   * @throws {Error} If the provided `tickets` is not an array or is empty.
   * @see {@link https://developer.zendesk.com/api-reference/ticketing/tickets/tickets/#create-multiple-tickets}
   * @example
   * // Create multiple new tickets
   * const newTickets = [
   *   { subject: 'Ticket 1', description: 'Description 1' },
   *   { subject: 'Ticket 2', description: 'Description 2' },
   * ];
   * const createdTickets = await client.tickets.createMany(newTickets);
   */
  async createMany(tickets) {
    return this.post(['tickets', 'create_many'], tickets);
  }

  /**
   * Update an existing ticket by its ID.
   * @param {number} ticketId - The ID of the ticket to update.
   * @param {object} ticket - The updated ticket data as an object.
   * @returns {Promise<object>} A promise that resolves to the updated ticket object.
   * @async
   * @throws {Error} If `ticketId` is not a number or if `ticket` is not an object.
   * @see {@link https://developer.zendesk.com/api-reference/ticketing/tickets/tickets/#update-ticket}
   * @example
   * // Update an existing ticket
   * const updatedTicketData = {
   *   subject: 'Updated Ticket Subject',
   *   description: 'Updated Ticket Description',
   * };
   * const updatedTicket = await client.tickets.update(123, updatedTicketData);
   */
  async update(ticketId, ticket) {
    return this.put(['tickets', ticketId], ticket);
  }

  /**
   * Update multiple tickets by their IDs.
   * @param {Array<number>} ticketIds - An array of ticket IDs to update.
   * @param {object} ticket - The updated ticket data as an object.
   * @returns {Promise<object>} A promise that resolves to the updated ticket object.
   * @async
   * @throws {Error} If `ticketIds` is not an array of numbers or if `ticket` is not an object.
   * @see {@link https://developer.zendesk.com/api-reference/ticketing/tickets/tickets/#update-many-tickets}
   * @example
   * // Update multiple tickets by their IDs
   * const ticketIdsToUpdate = [123, 456, 789];
   * const updatedTicketData = {
   *   status: 'solved',
   *   priority: 'high',
   * };
   * const updatedTickets = await client.tickets.updateMany(ticketIdsToUpdate, updatedTicketData);
   */
  async updateMany(ticketIds, ticket) {
    return this.put(['tickets', 'update_many', {ids: ticketIds}], ticket);
  }

  /**
   * Delete a ticket by its ID.
   * @param {number} ticketId - The ID of the ticket to delete.
   * @returns {Promise<void>} A promise that resolves when the ticket is successfully deleted.
   * @async
   * @throws {Error} If `ticketId` is not a number or is not provided.
   * @see {@link https://developer.zendesk.com/api-reference/ticketing/tickets/tickets/#delete-ticket}
   * @example
   * // Delete a ticket by its ID
   * const ticketIdToDelete = 123;
   * await client.tickets.delete(ticketIdToDelete);
   */
  async delete(ticketId) {
    return super.delete(['tickets', ticketId]);
  }

  /**
   * Delete multiple tickets by their IDs.
   * @param {Array<number>} ticketIds - An array of ticket IDs to delete.
   * @returns {Promise<void>} A promise that resolves when the tickets are successfully deleted.
   * @async
   * @throws {Error} If `ticketIds` is not an array of valid ticket IDs.
   * @see {@link https://developer.zendesk.com/api-reference/ticketing/tickets/tickets/#bulk-delete-tickets}
   * @example
   * // Delete multiple tickets by their IDs
   * const ticketIdsToDelete = [123, 456, 789];
   * await client.tickets.deleteMany(ticketIdsToDelete);
   */
  async deleteMany(ticketIds) {
    return super.delete(['tickets', 'destroy_many', {ids: ticketIds}]);
  }

  /**
   * Merge a ticket with another ticket.
   * @param {number} ticketId - The ID of the ticket to be merged.
   * @param {object} mergedTicket - The ticket object representing the ticket to merge with.
   * @returns {Promise<object>} A promise that resolves with the merged ticket object.
   * @async
   * @throws {Error} If `ticketId` is not a valid ticket ID or `mergedTicket` is not a valid ticket object.
   * @see {@link https://developer.zendesk.com/api-reference/ticketing/tickets/tickets/#merge-tickets}
   * @example
   * // Merge a ticket with another ticket
   * const sourceTicketId = 123;
   * const targetTicket = {
   *   subject: 'Merged Ticket',
   *   description: 'This is the merged ticket description.',
   *   // ...other ticket properties
   * };
   * const mergedTicket = await client.tickets.merge(sourceTicketId, targetTicket);
   */
  async merge(ticketId, mergedTicket) {
    return this.post(['tickets', ticketId, 'merge'], mergedTicket);
  }

  /**
   * **DEPRECATED**: Use the `TicketExport` class method `export` instead.
   *
   * Export tickets based on a specified start time.
   * @param {string} startTime - The start time for exporting tickets.
   * @returns {Promise<object>} A promise that resolves with the exported tickets.
   * @async
   * @throws {Error} If `startTime` is not a valid string.
   * @see {@link https://developer.zendesk.com/api-reference/ticketing/tickets/tickets/#ticket-export}
   * @example
   * // Export tickets based on a start time
   * const startTime = '2023-01-01T00:00:00Z';
   * const exportedTickets = await client.tickets.export(startTime);
   * @deprecated Use `TicketExport.export(startTime)` method instead.
   */
  async export(startTime) {
    return this.get(['exports', 'tickets', {start_time: startTime}]);
  }

  /**
   * **DEPRECATED**: Use the `TicketExport` class method `sample` instead.
   *
   * Export a sample of tickets based on a specified start time.
   * @param {string} startTime - The start time for exporting the sample of tickets.
   * @returns {Promise<object>} A promise that resolves with the exported sample of tickets.
   * @async
   * @throws {Error} If `startTime` is not a valid string.
   * @see {@link https://developer.zendesk.com/api-reference/ticketing/ticket-management/incremental_exports/#incremental-sample-export}
   * @example
   * // Export a sample of tickets based on a start time
   * const startTime = '2023-01-01T00:00:00Z';
   * const exportedSample = await client.tickets.exportSample(startTime);
   * @deprecated Use `TicketExport.sample(startTime)` method instead.
   */
  async exportSample(startTime) {
    return this.get(['exports', 'tickets', 'sample', {start_time: startTime}]);
  }

  /**
   * **DEPRECATED**: Use the `TicketExport` class method `export` instead.
   *
   * Export incremental tickets based on a specified start time.
   * @param {string} startTime - The start time for exporting incremental tickets.
   * @returns {Promise<Array>} A promise that resolves with an array of exported incremental tickets.
   * @async
   * @throws {Error} If `startTime` is not a valid string.
   * @see {@link https://developer.zendesk.com/api-reference/ticketing/tickets/tickets/#ticket-export-incremental}
   * @example
   * // Export incremental tickets based on a start time
   * const startTime = '2023-01-01T00:00:00Z';
   * const incrementalTickets = await client.tickets.incremental(startTime);
   * @deprecated Use `TicketExport.export(startTime)` method instead.
   */
  async incremental(startTime) {
    return this.getAll(['incremental', 'tickets', {start_time: startTime}]);
  }

  /**
   * **DEPRECATED**: Use the `TicketExport` class method `exportWithInclude` instead.
   *
   * Export incremental tickets based on a specified start time and optional include parameters.
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
   * const incrementalTickets = await client.tickets.incrementalInclude(startTime, include);
   * @deprecated Use `TicketExport.exportWithInclude(startTime, include)` method instead.
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
   * @param {string} startTime - The start time for exporting the sample of incremental tickets.
   * @returns {Promise<Array>} A promise that resolves with an array of exported incremental tickets.
   * @async
   * @throws {Error} If `startTime` is not a valid string.
   * @see {@link https://developer.zendesk.com/api-reference/ticketing/tickets/tickets/#ticket-export-incremental-sample}
   * @example
   * // Export a sample of incremental tickets based on a start time
   * const startTime = '2023-01-01T00:00:00Z';
   * const incrementalSampleTickets = await client.tickets.incrementalSample(startTime);
   * @deprecated Use `TicketExport.sample(startTime)` method instead.
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
   * @param {number} ticketId - The ID of the ticket to retrieve comments for.
   * @returns {Promise<Array>} A promise that resolves with an array of comments associated with the ticket.
   * @async
   * @throws {Error} If `ticketId` is not a valid number.
   * @see {@link https://developer.zendesk.com/api-reference/ticketing/tickets/ticket_comments/}
   * @example
   * // Retrieve comments for a specific ticket
   * const ticketId = 12345;
   * const comments = await client.tickets.getComments(ticketId);
   */
  async getComments(ticketId) {
    return this.getAll(['tickets', ticketId, 'comments']);
  }

  /**
   * Retrieve audits associated with a specific ticket. (Deprecated: Use TicketAudits class list method instead)
   * @param {number} ticketId - The ID of the ticket to retrieve audits for.
   * @returns {Promise<Array>} A promise that resolves with an array of audits associated with the ticket.
   * @async
   * @throws {Error} If `ticketId` is not a valid number.
   * @see {@link https://developer.zendesk.com/api-reference/ticketing/tickets/tickets/#listing-ticket-audits}
   * @example
   * // Retrieve audits for a specific ticket (deprecated)
   * const ticketId = 12345;
   * const audits = await client.tickets.exportAudit(ticketId);
   * @deprecated Use the `TicketAudits` class `list` method instead.
   */
  async exportAudit(ticketId) {
    return this.getAll(['tickets', ticketId, 'audits']);
  }

  /**
   * Add tags to a specific ticket.
   * @param {number} ticketId - The ID of the ticket to add tags to.
   * @param {Array<string>} tags - An array of tags to add to the ticket.
   * @returns {Promise<void>} A promise that resolves when the tags are successfully added to the ticket.
   * @async
   * @throws {Error} If `ticketId` is not a valid number or `tags` is not an array of strings.
   * @see {@link https://developer.zendesk.com/api-reference/ticketing/tickets/tickets/#updating-tag-lists}
   * @example
   * // Add tags to a specific ticket
   * const ticketId = 12345;
   * const tags = ['tag1', 'tag2'];
   * await client.tickets.addTags(ticketId, tags);
   */
  async addTags(ticketId, tags) {
    return this.requestAll('PUT', ['tickets', ticketId, 'tags'], tags);
  }

  /**
   * Replace tags on a specific ticket with new tags.
   * @param {number} ticketId - The ID of the ticket to replace tags on.
   * @param {Array<string>} tags - An array of new tags to replace the existing tags on the ticket.
   * @returns {Promise<void>} A promise that resolves when the tags are successfully replaced on the ticket.
   * @async
   * @throws {Error} If `ticketId` is not a valid number or `tags` is not an array of strings.
   * @see {@link https://developer.zendesk.com/api-reference/ticketing/tickets/tickets/#updating-tag-lists}
   * @example
   * // Replace tags on a specific ticket
   * const ticketId = 12345;
   * const newTags = ['newTag1', 'newTag2'];
   * await client.tickets.updateTags(ticketId, newTags);
   */
  async updateTags(ticketId, tags) {
    return this.requestAll('POST', ['tickets', ticketId, 'tags'], tags);
  }
}

exports.Tickets = Tickets;
