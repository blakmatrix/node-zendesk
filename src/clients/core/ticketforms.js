// Ticketforms.js: Client for the zendesk API.
const {Client} = require('../client');

/**
 * @class
 * @classdesc Client for interacting with the Zendesk TicketForms API.
 * @see {@link https://developer.zendesk.com/rest_api/docs/support#ticket-forms}
 */
class TicketForms extends Client {
  constructor(options) {
    super(options);
    this.jsonAPINames = ['ticket_forms', 'ticket_form'];
  }

  /**
   * List ticket forms based on the provided query parameters.
   *
   * @async
   * @param {Object} [options] - Optional query parameters.
   * @param {boolean} [options.active] - true returns active ticket forms; false returns inactive ticket forms. If not present, returns both.
   * @param {boolean} [options.associated_to_brand] - true returns the ticket forms of the brand specified by the url's subdomain.
   * @param {boolean} [options.end_user_visible] - true returns ticket forms where end_user_visible; false returns ticket forms that are not end-user visible. If not present, returns both.
   * @param {boolean} [options.fallback_to_default] - true returns the default ticket form when the criteria defined by the parameters results in a set without active and end-user visible ticket forms.
   *
   * @returns {Promise<Array>} An array of ticket forms.
   * @throws {Error} Throws an error if there is an issue with the API call.
   *
   * @example
   * const client = createClient({...});
   * const activeTicketForms = await client.ticketforms.list({ active: true });
   * const allTicketForms = await client.ticketforms.list();
   *
   * @see {@link https://developer.zendesk.com/rest_api/docs/support#list-ticket-forms}
   */
  async list(options = {}) {
    return this.getAll(['ticket_forms', options]);
  }

  /**
   * Retrieve a specific ticket form by its ID.
   *
   * @async
   * @param {number} ticketFormID - The ID of the ticket form to retrieve.
   * @returns {Promise<Object>} The requested ticket form.
   * @throws {Error} Throws an error if there is an issue with the API call.
   * @example
   * const client = createClient({...});
   * const ticketForm = await client.ticketforms.show(12345);
   * @see {@link https://developer.zendesk.com/rest_api/docs/support#show-ticket-form}
   */
  async show(ticketFormID) {
    return this.get(['ticket_forms', ticketFormID]);
  }

  /**
   * Creates a new Ticket Form.
   *
   * @async
   * @param {Object} ticketForm - The ticket form object to be created.
   * @returns {Promise<Object>} - A promise that resolves to the created ticket form.
   * @throws {Error} - Throws an error if the API call fails.
   * @see {@link https://developer.zendesk.com/api-reference/ticketing/tickets/ticket_forms/#create-ticket-form}
   *
   * @example
   * const ticketFormData = {
   *   name: "Snowboard Problem",
   *   end_user_visible: true,
   *   // ... other properties ...
   * };
   * const newTicketForm = await client.ticketforms.create(ticketFormData);
   */
  async create(ticketForm) {
    return this.post(['ticket_forms'], ticketForm);
  }

  /**
   * Update a specific ticket form by its ID.
   *
   * @async
   * @param {number} ticketFormID - The ID of the ticket form to update.
   * @param {Object} ticketForm - The updated ticket form object.
   * @returns {Promise<Object>} The updated ticket form.
   * @throws {Error} Throws an error if there is an issue with the API call.
   * @example
   * const client = createClient({...});
   * const updatedForm = await client.ticketforms.update(12345, {name: 'Updated Form'});
   * @see {@link https://developer.zendesk.com/rest_api/docs/support#update-ticket-form}
   */
  async update(ticketFormID, ticketForm) {
    return this.put(['ticket_forms', ticketFormID], ticketForm);
  }

  /**
   * Deletes a Ticket Form by its ID.
   *
   * @async
   * @param {number} ticketFormID - The ID of the ticket form to be deleted.
   *
   * @returns {Promise<void>} - A promise that resolves when the ticket form is deleted.
   *
   * @throws {Error} - Throws an error if the API call fails.
   *
   * @see {@link https://developer.zendesk.com/api-reference/ticketing/tickets/ticket_forms/#delete-ticket-form}
   *
   * @example
   * await client.ticketforms.delete(12345); // Replace 12345 with the actual ticket form ID.
   */
  async delete(ticketFormID) {
    return super.delete(['ticket_forms', ticketFormID]);
  }

  /**
   * Clones an already existing Ticket Form by its ID.
   *
   * @async
   * @param {number} ticketFormID - The ID of the ticket form to be cloned.
   * @param {boolean} [prependCloneTitle=false] - Whether to prepend the title with "Clone of" or not.
   *
   * @returns {Promise<Object>} - A promise that resolves to the cloned ticket form details.
   *
   * @throws {Error} - Throws an error if the API call fails.
   *
   * @see {@link https://developer.zendesk.com/api-reference/ticketing/tickets/ticket_forms/#clone-an-already-existing-ticket-form}
   *
   * @example
   * const clonedForm = await client.ticketforms.clone(12345, true); // Replace 12345 with the actual ticket form ID.
   */
  async clone(ticketFormID, prependCloneTitle = false) {
    const payload = {
      prepend_clone_title: prependCloneTitle,
    };
    return this.post(['ticket_forms', ticketFormID, 'clone'], payload);
  }

  /**
   * Reorders the specified Ticket Forms based on the provided array of IDs.
   *
   * @async
   * @param {number[]} ticketFormIDs - An array of ticket form IDs in the desired order.
   *
   * @returns {Promise<Object>} - A promise that resolves to the reordered ticket forms' details.
   *
   * @throws {Error} - Throws an error if the API call fails.
   *
   * @see {@link https://developer.zendesk.com/api-reference/ticketing/tickets/ticket_forms/#reorder-ticket-forms}
   *
   * @example
   * const reorderedForms = await client.ticketforms.reorder([2, 23, 46, 50]);
   */
  async reorder(ticketFormIDs) {
    return this.put(['ticket_forms', 'reorder'], {
      ticket_form_ids: ticketFormIDs,
    });
  }
}

exports.TicketForms = TicketForms;
