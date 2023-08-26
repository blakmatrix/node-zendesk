// SuspendedTickets.js: Client for the zendesk API.
const {Client} = require('./client');

class SuspendedTickets extends Client {
  constructor(options) {
    super(options);
    this.jsonAPINames = ['suspended_tickets', 'suspended_ticket'];
  }

  // Listing SuspendedTickets
  async list() {
    return this.getAll(['suspended_tickets', '?page[size]=100']);
  }

  // Viewing SuspendedTickets
  async show(suspendedTicketID) {
    return this.get(['suspended_tickets', suspendedTicketID]);
  }

  // Recover SuspendedTickets
  async recover(suspendedTicketID) {
    return this.put(['suspended_tickets', suspendedTicketID, 'recover']);
  }

  async recoverMany(suspendedTicketIDs) {
    return this.put([
      'suspended_tickets',
      'recover_many',
      {ids: suspendedTicketIDs},
    ]);
  }

  // Deleting SuspendedTickets
  async delete(suspendedTicketID) {
    return this.request('DELETE', ['suspended_tickets', suspendedTicketID]);
  }

  async destroyMany(suspendedTicketIDs) {
    return this.delete([
      'suspended_tickets',
      'destroy_many',
      {ids: suspendedTicketIDs},
    ]);
  }

  async deleteMany(suspendedTicketIDs) {
    return this.delete([
      'suspended_tickets',
      'destroy_many',
      {ids: suspendedTicketIDs},
    ]);
  }
}

exports.SuspendedTickets = SuspendedTickets;
