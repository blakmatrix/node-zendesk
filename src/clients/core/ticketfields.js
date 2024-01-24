// Ticketfields.js: Client for the zendesk API.
const {Client} = require('../client');

/**
 * @typedef {object} TicketField
 * @property {boolean} active - Whether this field is available
 * @property {string} agent_description - A description of the ticket field that only agents can see
 * @property {boolean} collapsed_for_agents - If true, the field is shown to agents by default. If false, the field is hidden alongside infrequently used fields. Classic interface only
 * @property {string} created_at - The time the custom ticket field was created
 * @property {string} creator_app_name - Name of the app that created the ticket field, or a null value if no app created the ticket field
 * @property {number} creator_user_id - The id of the user that created the ticket field, or a value of "-1" if an app created the ticket field
 * @property {Array} custom_field_options - Required and presented for a custom ticket field of type "multiselect" or "tagger"
 * @property {Array} custom_statuses - List of customized ticket statuses. Only presented for a system ticket field of type "custom_status"
 * @property {string} description - Describes the purpose of the ticket field to users
 * @property {boolean} editable_in_portal - Whether this field is editable by end users in Help Center
 * @property {number} id - Automatically assigned when created
 * @property {number} position - The relative position of the ticket field on a ticket. Note that for accounts with ticket forms, positions are controlled by the different forms
 * @property {string} raw_description - The dynamic content placeholder if present, or the description value if not. See Dynamic Content
 * @property {string} raw_title - The dynamic content placeholder if present, or the title value if not. See Dynamic Content
 * @property {string} raw_title_in_portal - The dynamic content placeholder if present, or the "title_in_portal" value if not. See Dynamic Content
 * @property {string} regexp_for_validation - For "regexp" fields only. The validation pattern for a field value to be deemed valid
 * @property {object} relationship_filter - A filter definition that allows your autocomplete to filter down results
 * @property {string} relationship_target_type - A representation of what type of object the field references. Options are "zen:user", "zen:organization", "zen:ticket", or "zen:custom_object:{key}" where key is a custom object key. For example "zen:custom_object:apartment".
 * @property {boolean} removable - If false, this field is a system field that must be present on all tickets
 * @property {boolean} required - If true, agents must enter a value in the field to change the ticket status to solved
 * @property {boolean} required_in_portal - If true, end users must enter a value in the field to create the request
 * @property {number} sub_type_id - For system ticket fields of type "priority" and "status". Defaults to 0. A "priority" sub type of 1 removes the "Low" and "Urgent" options. A "status" sub type of 1 adds the "On-Hold" option
 * @property {Array} system_field_options - Presented for a system ticket field of type "tickettype", "priority" or "status"
 * @property {string} tag - For "checkbox" fields only. A tag added to tickets when the checkbox field is selected
 * @property {string} title - The title of the ticket field
 * @property {string} title_in_portal - The title of the ticket field for end users in Help Center
 * @property {string} type - System or custom field type. Editable for custom field types and only on creation. See Create Ticket Field
 * @property {string} updated_at - The time the custom ticket field was last updated
 * @property {string} url - The URL for this resource
 * @property {boolean} visible_in_portal - Whether this field is visible to end users in Help Center
 */

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
   * @returns {Promise<Array<TicketField>>}>} Returns an array of ticket fields.
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
   * @returns {Promise<TicketField>} Returns the details of the ticket field.
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
   * @returns {Promise<TicketField>} Returns the created ticket field.
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
   * @returns {Promise<TicketField>} Returns the updated ticket field.
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
   *   custom_field_option: {
   *     name: 'Option Name',
   *     value: 'Option Value'
   *   }
   * });
   */
  async createOrUpdateOption(ticketFieldId, option) {
    return this.post(['ticket_fields', ticketFieldId, 'options'], option);
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
