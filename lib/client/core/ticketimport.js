// Tickets.js: Client for the zendesk API.
const {Client} = require('../client');

class TicketImport extends Client {
  constructor(options) {
    super(options);
    this.jsonAPINames = ['imports', 'import'];
  }

  // Creating Tickets
  async import(ticket) {
    return this.post(['imports/tickets'], ticket);
  }

  // Ticket Audits

  // Listing Audits
  async exportAudit(ticketID) {
    return this.getAll(['tickets', ticketID, 'audits']);
  }
}

exports.TicketImport = TicketImport;
