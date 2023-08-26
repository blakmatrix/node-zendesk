// Imports.js: Client for the zendesk API.
const {Client} = require('./client');

class Imports extends Client {
  constructor(options) {
    super(options);
    this.jsonAPINames = ['tickets', 'ticket'];
  }

  // Import Ticket
  async ticket(ticket) {
    return this.post(['imports', 'tickets'], ticket);
  }

  // Import Many Tickets
  async ticketMany(tickets) {
    return this.requestAll(
      // TODO: postAll
      'POST',
      ['imports', 'tickets', 'create_many'],
      tickets,
    );
  }
}

exports.Imports = Imports;
