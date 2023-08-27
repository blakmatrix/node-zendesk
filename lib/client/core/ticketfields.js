// Ticketfields.js: Client for the zendesk API.
const {Client} = require('../client');

class TicketFields extends Client {
  constructor(options) {
    super(options);
    this.jsonAPINames = ['ticket_fields', 'ticket_field'];
  }

  // Listing Tickets Fields
  async list() {
    return this.getAll(['ticket_fields']);
  }

  // Viewing Tickets Fields
  async show(ticketFieldID) {
    return this.get(['ticket_fields', ticketFieldID]);
  }

  // Creating Tickets Fields
  async create(ticketField) {
    return this.post(['ticket_fields'], ticketField);
  }

  // Updating Tickets Fields
  async update(ticketFieldID, ticketField) {
    return this.put(['ticket_fields', ticketFieldID], ticketField);
  }

  // Deleting Tickets Fields
  async delete(ticketFieldID) {
    return this.delete(['ticket_fields', ticketFieldID]);
  }
}

exports.TicketFields = TicketFields;
