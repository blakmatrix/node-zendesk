// Tickets.js: Client for the zendesk API.
const {Client} = require('./client');

class TicketImport extends Client {
  constructor(options) {
    super(options);
    this.jsonAPINames = ['imports', 'import'];
  }

  // Creating Tickets
  import(ticket, cb) {
    return this.post(['imports/tickets'], ticket, cb);
  }

  // Ticket Audits

  // Listing Audits
  exportAudit(ticketID, cb) {
    return this.getAll(['tickets', ticketID, 'audits'], cb);
  }
}

exports.TicketImport = TicketImport;
