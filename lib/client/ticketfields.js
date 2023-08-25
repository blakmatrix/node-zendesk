// Ticketfields.js: Client for the zendesk API.
const {Client} = require('./client');

class TicketFields extends Client {
  constructor(options) {
    super(options);
    this.jsonAPINames = ['ticket_fields', 'ticket_field'];
  }

  // Listing Tickets Fields
  list(cb) {
    return this.getAll(['ticket_fields'], cb);
  }

  // Viewing Tickets Fields
  show(ticketFieldID, cb) {
    return this.get(['ticket_fields', ticketFieldID], cb);
  }

  // Creating Tickets Fields
  create(ticketField, cb) {
    return this.post(['ticket_fields'], ticketField, cb);
  }

  // Updating Tickets Fields
  update(ticketFieldID, ticketField, cb) {
    return this.put(['ticket_fields', ticketFieldID], ticketField, cb);
  }

  // Deleting Tickets Fields
  delete(ticketFieldID, cb) {
    return this.delete(['ticket_fields', ticketFieldID], cb);
  }
}

exports.TicketFields = TicketFields;
