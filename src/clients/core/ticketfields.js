// Ticketfields.js: Client for the zendesk API.
const {Client} = require('../client');

/**
 * Client for the Zendesk Ticket Fields API.
 * @see {@link https://developer.zendesk.com/api-reference/ticketing/tickets/ticket_fields/}
 */
class TicketFields extends Client {
  constructor(options) {
    super(options);
    this.jsonAPINames = ['ticket_fields', 'ticket_field'];
  }

  /**
   * Lists all ticket fields.
   * @returns {Promise<Array>} Returns an array of ticket fields.
   * @async
   * @throws {Error} Throws an error if the request fails.
   * @see {@link https://developer.zendesk.com/api-reference/ticketing/tickets/ticket_fields/#list-ticket-fields}
   * @example
   * const client = createClient({...});
   * const fields = await client.ticketfields.list();
   */
  async list() {
    return this.getAll(['ticket_fields']);
  }

  /**
   * Retrieves a specific ticket field by ID.
   * @param {number} ticketFieldId - The ID of the ticket field to retrieve.
   * @returns {Promise<object>} Returns the details of the ticket field.
   * @async
   * @throws {Error} Throws an error if the request fails.
   * @see {@link https://developer.zendesk.com/api-reference/ticketing/tickets/ticket_fields/#show-ticket-field}
   * @example
   * const client = createClient({...});
   * const field = await client.ticketfields.show(12345);
   */
  async show(ticketFieldId) {
    return this.get(['ticket_fields', ticketFieldId]);
  }

  /**
   * Retrieves the count of ticket fields.
   * @returns {Promise<number>} Returns the count of ticket fields.
   * @async
   * @throws {Error} Throws an error if the request fails.
   * @see {@link https://developer.zendesk.com/api-reference/ticketing/tickets/ticket_fields/#count-ticket-fields}
   * @example
   * const client = createClient({...});
   * const count = await client.ticketfields.count();
   */
  async count() {
    return this.get(['ticket_fields', 'count']);
  }

  /**
   * Creates a new ticket field.
   * @param {object} ticketField - The properties of the ticket field to create.
   * @returns {Promise<object>} Returns the created ticket field.
   * @async
   * @throws {Error} Throws an error if the request fails.
   * @see {@link https://developer.zendesk.com/api-reference/ticketing/tickets/ticket_fields/#create-ticket-field}
   * @example
   * const client = createClient({...});
   * const newField = await client.ticketfields.create({
   *   type: 'text',
   *   title: 'New Field'
   * });
   */
  async create(ticketField) {
    return this.post(['ticket_fields'], ticketField);
  }

  /**
   * Updates a specific ticket field by ID.
   * @param {number} ticketFieldId - The ID of the ticket field to update.
   * @param {object} ticketField - The updated properties of the ticket field.
   * @returns {Promise<object>} Returns the updated ticket field.
   * @async
   * @throws {Error} Throws an error if the request fails.
   * @see {@link https://developer.zendesk.com/api-reference/ticketing/tickets/ticket_fields/#update-ticket-field}
   * @example
   * const client = createClient({...});
   * const updatedField = await client.ticketfields.update(12345, {
   *   title: 'Updated Field'
   * });
   */
  async update(ticketFieldId, ticketField) {
    return this.put(['ticket_fields', ticketFieldId], ticketField);
  }

  /**
   * Deletes a specific ticket field by ID.
   * @param {number} ticketFieldId - The ID of the ticket field to delete.
   * @returns {Promise<void>}
   * @async
   * @throws {Error} Throws an error if the request fails.
   * @see {@link https://developer.zendesk.com/api-reference/ticketing/tickets/ticket_fields/#delete-ticket-field}
   * @example
   * const client = createClient({...});
   * await client.ticketfields.delete(12345);
   */
  async delete(ticketFieldId) {
    return super.delete(['ticket_fields', ticketFieldId]);
  }

  /**
   * Lists all options of a ticket field.
   * @param {number} ticketFieldId - The ID of the ticket field to retrieve options from.
   * @returns {Promise<Array>} Returns an array of options for the ticket field.
   * @async
   * @throws {Error} Throws an error if the request fails.
   * @see {@link https://developer.zendesk.com/api-reference/ticketing/tickets/ticket_fields/#list-ticket-field-options}
   * @example
   * const client = createClient({...});
   * const options = await client.ticketfields.listOptions(12345);
   */
  async listOptions(ticketFieldId) {
    return this.get(['ticket_fields', ticketFieldId, 'options']);
  }

  /**
   * Retrieves a specific option of a ticket field by ID.
   * @param {number} ticketFieldId - The ID of the ticket field.
   * @param {number} optionID - The ID of the option to retrieve.
   * @returns {Promise<object>} Returns the option details.
   * @async
   * @throws {Error} Throws an error if the request fails.
   * @see {@link https://developer.zendesk.com/api-reference/ticketing/tickets/ticket_fields/#show-ticket-field-option}
   * @example
   * const client = createClient({...});
   * const option = await client.ticketfields.showOption(12345, 67890);
   */
  async showOption(ticketFieldId, optionID) {
    return this.get(['ticket_fields', ticketFieldId, 'options', optionID]);
  }

  /**
   * Creates or updates an option of a ticket field.
   * @param {number} ticketFieldId - The ID of the ticket field.
   * @param {object} option - The properties of the option to create or update.
   * @returns {Promise<object>} Returns the created or updated option.
   * @async
   * @throws {Error} Throws an error if the request fails.
   * @see {@link https://developer.zendesk.com/api-reference/ticketing/tickets/ticket_fields/#create-or-update-ticket-field-option}
   * @example
   * const client = createClient({...});
   * const newOption = await client.ticketfields.createOrUpdateOption(12345, {
   *   name: 'Option Name',
   *   value: 'Option Value'
   * });
   */
  async createOrUpdateOption(ticketFieldId, option) {
    return this.put(['ticket_fields', ticketFieldId, 'options'], option);
  }

  /**
   * Deletes a specific option of a ticket field by ID.
   * @param {number} ticketFieldId - The ID of the ticket field.
   * @param {number} optionID - The ID of the option to delete.
   * @returns {Promise<void>}
   * @async
   * @throws {Error} Throws an error if the request fails.
   * @see {@link https://developer.zendesk.com/api-reference/ticketing/tickets/ticket_fields/#delete-ticket-field-option}
   * @example
   * const client = createClient({...});
   * await client.ticketfields.deleteOption(12345, 67890);
   */
  async deleteOption(ticketFieldId, optionID) {
    return super.delete(['ticket_fields', ticketFieldId, 'options', optionID]);
  }
}

exports.TicketFields = TicketFields;
