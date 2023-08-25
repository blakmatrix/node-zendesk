// Imports.js: Client for the zendesk API.
const {Client} = require('./client');

class Imports extends Client {
  constructor(options) {
    super(options);
    this.jsonAPINames = ['tickets', 'ticket'];
  }

  // Import Ticket
  ticket(ticket, cb) {
    return this.post(['imports', 'tickets'], ticket, cb);
  }

  // Import Many Tickets
  ticketMany(tickets, cb) {
    return this.requestAll(
      // TODO: postAll
      'POST',
      ['imports', 'tickets', 'create_many'],
      tickets,
      cb,
    );
  }
}

exports.Imports = Imports;
