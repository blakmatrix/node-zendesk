// Tickets.js: Client for the zendesk API.
const {Client} = require('./client');

class TicketExport extends Client {
  constructor(options) {
    super(options);
    this.jsonAPINames = ['exports', 'export', 'audits'];
  }

  // Creating Tickets
  async export(start_time) {
    return this.get(['incremental', 'tickets', '?start_time=' + start_time]);
  }

  async exportWithUser(start_time) {
    return this.get([
      'incremental',
      'tickets',
      '?start_time=' + start_time + '&include=users,groups',
    ]);
  }

  // Ticket Audits

  // Listing Audits
  async exportAudit(ticketID) {
    return this.getAll(['tickets', ticketID, 'audits']);
  }
}

exports.TicketExport = TicketExport;
