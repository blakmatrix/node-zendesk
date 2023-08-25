// Ticketforms.js: Client for the zendesk API.
const {Client} = require('./client');

class TicketForms extends Client {
  constructor(options) {
    super(options);
    this.jsonAPINames = ['ticket_forms', 'ticket_form'];
  }

  // Listing Tickets Forms
  list(cb) {
    return this.getAll(['ticket_forms'], cb);
  }

  //
  // Viewing TicketForm
  show(ticketFormID, cb) {
    return this.get(['ticket_forms', ticketFormID], cb);
  }

  // Updating TicketForm
  update(ticketFormID, ticketForm, cb) {
    return this.put(['ticket_forms', ticketFormID], ticketForm, cb);
  }
}

exports.TicketForms = TicketForms;
