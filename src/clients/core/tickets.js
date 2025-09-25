// File: tickets.js
const {Client} = require('../client');

/**
 * A recursive type that makes all properties of an object optional, including nested objects.
 * @template T
 * @typedef {Partial<{[K in keyof T]: RecursivePartial<T[K]>}>} RecursivePartial
 */

/**
 * @typedef {object} Attachment
 * @property {string} content_type - The content type of the image. Example value: "image/png"
 * @property {string} content_url - A full URL where the attachment image file can be downloaded. The file may be hosted externally so take care not to inadvertently send Zendesk authentication credentials. See Working with url properties
 * @property {boolean} deleted - If true, the attachment has been deleted
 * @property {string} file_name - The name of the image file
 * @property {string} height - The height of the image file in pixels. If height is unknown, returns null
 * @property {number} id - Automatically assigned when created
 * @property {boolean} inline - If true, the attachment is excluded from the attachment list and the attachment's URL can be referenced within the comment of a ticket. Default is false
 * @property {boolean} malware_access_override - If true, you can download an attachment flagged as malware. If false, you can't download such an attachment.
 * @property {string} malware_scan_result - The result of the malware scan. There is a delay between the time the attachment is uploaded and when the malware scan is completed. Usually the scan is done within a few seconds, but high load conditions can delay the scan results. Possible values: "malware_found", "malware_not_found", "failed_to_scan", "not_scanned"
 * @property {string} mapped_content_url - The URL the attachment image file has been mapped to
 * @property {number} size - The size of the image file in bytes
 * @property {object[]} thumbnails - An array of attachment objects. Note that photo thumbnails do not have thumbnails
 * @property {string} url - A URL to access the attachment details
 * @property {string} width - The width of the image file in pixels. If width is unknown, returns null
 */

/**
 * @typedef {object} TicketComment
 * @property {Attachment[]} [attachments] - Attachments, if any. See Attachment
 * @property {number} audit_id - The id of the ticket audit record. See Show Audit
 * @property {number} author_id - The id of the comment author. See Author id
 * @property {string} body - The comment string. See Bodies
 * @property {string} created_at - The time the comment was created
 * @property {string} html_body - The comment formatted as HTML. See Bodies
 * @property {number} id - Automatically assigned when the comment is created
 * @property {object} [metadata] - System information (web client, IP address, etc.) and comment flags, if any. See Comment flags
 * @property {string} plain_body - The comment presented as plain text. See Bodies
 * @property {boolean} public - true if a public comment; false if an internal note. The initial value set on ticket creation persists for any additional comment unless you change it
 * @property {string} type - Comment or VoiceComment. The JSON object for adding voice comments to tickets is different. See Adding voice comments to tickets
 * @property {string[]} [uploads] - List of tokens received from uploading files for comment attachments. The files are attached by creating or updating tickets with the tokens. See Attaching files in Tickets
 * @property {Via} [via] - Describes how the object was created. See the Via object reference
 */

/**
 * Tickets are the means through which your end users (customers) communicate with agents in Zendesk Support.
 * @typedef {object} Ticket
 * @property {boolean} allow_attachments - Permission for agents to add add attachments to a comment. Defaults to true
 * @property {boolean} allow_channelback - Is false if channelback is disabled, true otherwise. Only applicable for channels framework ticket
 * @property {string} [assignee_email] - Write only. The email address of the agent to assign the ticket to
 * @property {number} [assignee_id] - The agent currently assigned to the ticket
 * @property {number[]} [attribute_value_ids] - Write only. An array of the IDs of attribute values to be associated with the ticket
 * @property {number} [brand_id] - Enterprise only. The id of the brand this ticket is associated with
 * @property {number[]} [collaborator_ids] - The ids of users currently CC'ed on the ticket
 * @property {object[]} [collaborators] - POST requests only. Users to add as cc's when creating a ticket. See Setting Collaborators
 * @property {TicketComment} [comment] - Write only. An object that adds a comment to the ticket. See Ticket comments. To include an attachment with the comment, see Attaching files
 * @property {string} created_at - When this record was created
 * @property {Array<CustomField>} [custom_fields] - Custom fields for the ticket. See Setting custom field values
 * @property {number} [custom_status_id] - The custom ticket status id of the ticket. See custom ticket statuses
 * @property {string} description - Read-only first comment on the ticket. When creating a ticket, use comment to set the description. See Description and first comment
 * @property {string} [due_at] - If this is a ticket of type "task" it has a due date. Due date format uses ISO 8601 format.
 * @property {number[]} [email_cc_ids] - The ids of agents or end users currently CC'ed on the ticket. See CCs and followers resources in the Support Help Center
 * @property {object} [email_ccs] - Write only. An array of objects that represent agent or end users email CCs to add or delete from the ticket. See Setting email CCs
 * @property {string} [external_id] - An id you can use to link Zendesk Support tickets to local records
 * @property {number[]} [follower_ids] - The ids of agents currently following the ticket. See CCs and followers resources
 * @property {object} [followers] - Write only. An array of objects that represent agent followers to add or delete from the ticket. See Setting followers
 * @property {number[]} followup_ids - The ids of the followups created from this ticket. Ids are only visible once the ticket is closed
 * @property {number} [forum_topic_id] - The topic in the Zendesk Web portal this ticket originated from, if any. The Web portal is deprecated
 * @property {boolean} from_messaging_channel - If true, the ticket's via type is a messaging channel.
 * @property {number} [group_id] - The group this ticket is assigned to
 * @property {boolean} has_incidents - Is true if a ticket is a problem type and has one or more incidents linked to it. Otherwise, the value is false.
 * @property {number} id - Automatically assigned when the ticket is created
 * @property {boolean} is_public - Is true if any comments are public, false otherwise
 * @property {number} [macro_id] - Write only. A macro ID to be recorded in the ticket audit
 * @property {number[]} [macro_ids] - POST requests only. List of macro IDs to be recorded in the ticket audit
 * @property {object} [metadata] - Write only. Metadata for the audit. In the audit object, the data is specified in the custom property of the metadata object. See Setting Metadata
 * @property {number} [organization_id] - The organization of the requester. You can only specify the ID of an organization associated with the requester. See Organization Memberships
 * @property {Priority} [priority] - The urgency with which the ticket should be addressed. Allowed values are "urgent", "high", "normal", or "low".
 * @property {number} [problem_id] - For tickets of type "incident", the ID of the problem the incident is linked to
 * @property {string} [raw_subject] - The dynamic content placeholder, if present, or the "subject" value, if not. See Dynamic Content Items
 * @property {string} [recipient] - The original recipient e-mail address of the ticket. Notification emails for the ticket are sent from this address
 * @property {object} [requester] - Write only. See Creating a ticket with a new requester
 * @property {number} requester_id - The user who requested this ticket
 * @property {boolean} [safe_update] - Write only. Optional boolean. When true and an update_stamp date is included, protects against ticket update collisions and returns a message to let you know if one occurs. See Protecting against ticket update collisions. A value of false has the same effect as true. Omit the property to force the updates to not be safe
 * @property {object} [satisfaction_rating] - The satisfaction rating of the ticket, if it exists, or the state of satisfaction, "offered" or "unoffered". The value is null for plan types that don't support CSAT
 * @property {number[]} [sharing_agreement_ids] - The ids of the sharing agreements used for this ticket
 * @property {Status} [status] - The state of the ticket. If your account has activated custom ticket statuses, this is the ticket's status category. See custom ticket statuses. Allowed values are "new", "open", "pending", "hold", "solved", or "closed".
 * @property {string} [subject] - The value of the subject field for this ticket
 * @property {number} [submitter_id] - The user who submitted the ticket. The submitter always becomes the author of the first comment on the ticket
 * @property {string[]} [tags] - The array of tags applied to this ticket
 * @property {number} [ticket_form_id] - Enterprise only. The id of the ticket form to render for the ticket
 * @property {Type} [type] - The type of this ticket. Allowed values are "problem", "incident", "question", or "task".
 * @property {string} updated_at - When this record last got updated
 * @property {string} [updated_stamp] - Write only. Datetime of last update received from API. See the safe_update property
 * @property {string} url - The API url of this ticket
 * @property {Via} [via] - For more information, see the Via object reference
 * @property {number} [via_followup_source_id] - POST requests only. The id of a closed ticket when creating a follow-up ticket. See Creating a follow-up ticket
 * @property {number} [via_id] - Write only. For more information, see the Via object reference
 * @property {object} [voice_comment] - Write only. See Creating voicemail ticket
 */

/**
 * @typedef {object} CustomField
 * @property {number} id - The ID of the custom field.
 * @property {string|number|boolean} value - The value of the custom field.
 */

/**
 * @typedef {'urgent' | 'high' | 'normal' | 'low'} Priority
 */

/**
 * @typedef {'new' | 'open' | 'pending' | 'hold' | 'solved' | 'closed'} Status
 */

/**
 * @typedef {'problem' |'incident' | 'question' | 'task'} Type
 */

/**
 * @typedef {object} CreateOrUpdateTicket
 * @property {RecursivePartial<Ticket>} [ticket] - The ticket object to create or update.
 */

/**
 * @typedef {object} CreateManyTickets
 * @property {Array<Ticket>} [tickets] - The ticket object to create many tickets.
 */

/**
 * @typedef {object} TicketCollaborator
 * @property {number} id - The ID of the collaborator.
 * @property {string} name - The name of the collaborator.
 */

/** 
 * @typedef {object} Via
 * @property {string} [channel] - How the ticket or event was created expressed as a via type or via id
 * @property {object} source - For some channels a source object gives more information about how or why the ticket or event was created
 */

/**
 * @class
 * Client for the Zendesk API - Tickets.
 * @see {@link https://developer.zendesk.com/api-reference/ticketing/tickets/tickets/}
 */
class Tickets extends Client {
  /**
   * @param {import('../client').ClientOptions} options - The client options.
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
   * @returns {Promise<Array<Ticket>>} An array of tickets.
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
   * @returns {Promise<Array<Ticket>>} An array of tickets assigned to the user.
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
   * @returns {Promise<Array<Ticket>>} An array of tickets under the organization.
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
   * @returns {Promise<Array<Ticket>>} An array of tickets requested by the user.
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
   * @returns {Promise<Array<Ticket>>} An array of tickets where the user is CC'd.
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
   * @returns {Promise<Array<Ticket>>} An array of tickets matching the filter.
   * @see {@link https://developer.zendesk.com/api-reference/ticketing/tickets/tickets/#list-tickets}
   * @example
   * const filteredTickets = await client.tickets.listWithFilter('status', 'open');
   */
  async listWithFilter(type, value) {
    return this.getAll(['tickets', {[type]: value}]);
  }

  /**
   * List recently viewed tickets by the requesting agent.
   * @returns {Promise<Array<Ticket>>} An array of recently viewed tickets.
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
   * @returns {Promise<Array<TicketCollaborator>>} An array of collaborators for the ticket.
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
   * @returns {Promise<Array<Ticket>>} An array of incidents related to the ticket.
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
   * @returns {Promise<{response: object, result: Ticket}>} Metrics details for the ticket.
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
   * @returns {Promise<{response: object, result: Ticket}>} Details of the ticket.
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
   * @returns {Promise<{response: object, result: Array<Ticket>}>} An array of ticket details.
   * @see {@link https://developer.zendesk.com/api-reference/ticketing/tickets/tickets/#show-multiple-tickets}
   * @example
   * const ticketsDetails = await client.tickets.showMany([123, 456, 789]);
   */
  async showMany(ticketIds) {
    return this.get(['tickets', 'show_many', {ids: ticketIds}]);
  }

  /**
   * Create a new ticket.
   * @param {CreateOrUpdateTicket} ticket - Details of the ticket to be created.
   * @returns {Promise<{response: object, result: Ticket}>} The created ticket details.
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
   * @param {CreateManyTickets} tickets - An object of tickets containing an array of tickets.
   * @returns {Promise<{response: object, result: Array<Ticket>}>} A promise that resolves to an array of created ticket objects.
   * @throws {Error} If the provided `tickets` is not an array or is empty.
   * @see {@link https://developer.zendesk.com/api-reference/ticketing/tickets/tickets/#create-many-tickets}
   * @example
   * // Create multiple new tickets
   * const newTickets = {
   *  tickets: [
   *    { subject: 'Ticket 1', description: 'Description 1' },
   *    { subject: 'Ticket 2', description: 'Description 2' },
   *   ]
   * };
   * const createdTickets = await client.tickets.createMany(newTickets);
   */
  async createMany(tickets) {
    return this.post(['tickets', 'create_many'], tickets);
  }

  /**
   * Update an existing ticket by its ID.
   * @param {number} ticketId - The ID of the ticket to update.
   * @param {CreateOrUpdateTicket} ticket - The updated ticket data as an object.
   * @returns {Promise<{result: Ticket, response: {ticket:Ticket, audit:any[]}}>} A promise that resolves to the updated ticket object.
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
   * @returns {Promise<{response: object, result: object}>} A promise that resolves to the updated ticket object.
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
   * @returns {Promise<{response: object, result: Ticket}>} A promise that resolves with the merged ticket object.
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
   * @returns {Promise<{response: object, result: object}>} A promise that resolves with the exported tickets.
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
   * @returns {Promise<{response: object, result: object}>} A promise that resolves with the exported sample of tickets.
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
   * @returns {Promise<{response: object, result: Array<Ticket>}>} A promise that resolves with an array of exported incremental tickets.
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
   * @returns {Promise<Array<TicketComment>>} A promise that resolves with an array of comments associated with the ticket.
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
