// Tickets.js: Client for the zendesk API.
const {Client} = require('./client');

class TicketExport extends Client {
  constructor(options) {
    super(options);
    this.jsonAPINames = ['exports', 'export', 'audits'];
  }

  // Creating Tickets
  export(start_time, cb) {
    return this.get(
      ['incremental', 'tickets', '?start_time=' + start_time],
      cb,
    );
  }

  exportWithUser(start_time, cb) {
    return this.get(
      [
        'incremental',
        'tickets',
        '?start_time=' + start_time + '&include=users,groups',
      ],
      cb,
    );
  }

  // Ticket Audits

  // Listing Audits
  exportAudit(ticketID, cb) {
    return this.getAll(['tickets', ticketID, 'audits'], cb);
  }
}

exports.TicketExport = TicketExport;
