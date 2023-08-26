// Ticketforms.js: Client for the zendesk API.
const {Client} = require('./client');

class TicketForms extends Client {
  constructor(options) {
    super(options);
    this.jsonAPINames = ['ticket_forms', 'ticket_form'];
  }

  // Listing Tickets Forms
  async list() {
    return this.getAll(['ticket_forms']);
  }

  //
  // Viewing TicketForm
  async show(ticketFormID) {
    return this.get(['ticket_forms', ticketFormID]);
  }

  // Updating TicketForm
  async update(ticketFormID, ticketForm) {
    return this.put(['ticket_forms', ticketFormID], ticketForm);
  }
}

exports.TicketForms = TicketForms;
