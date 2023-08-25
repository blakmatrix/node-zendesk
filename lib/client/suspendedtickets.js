// SuspendedTickets.js: Client for the zendesk API.
const {Client} = require('./client');

class SuspendedTickets extends Client {
  constructor(options) {
    super(options);
    this.jsonAPINames = ['suspended_tickets', 'suspended_ticket'];
  }

  // Listing SuspendedTickets
  list(cb) {
    return this.getAll(['suspended_tickets', '?page[size]=100'], cb);
  }

  // Viewing SuspendedTickets
  show(suspendedTicketID, cb) {
    return this.get(['suspended_tickets', suspendedTicketID], cb);
  }

  // Recover SuspendedTickets
  recover(suspendedTicketID, cb) {
    return this.put(['suspended_tickets', suspendedTicketID, 'recover'], cb);
  }

  recoverMany(suspendedTicketIDs, cb) {
    return this.put(
      ['suspended_tickets', 'recover_many', {ids: suspendedTicketIDs}],
      cb,
    );
  }

  // Deleting SuspendedTickets
  delete(suspendedTicketID, cb) {
    return this.request('DELETE', ['suspended_tickets', suspendedTicketID], cb);
  }

  destroyMany(suspendedTicketIDs, cb) {
    return this.delete(
      ['suspended_tickets', 'destroy_many', {ids: suspendedTicketIDs}],
      cb,
    );
  }

  deleteMany(suspendedTicketIDs, cb) {
    return this.delete(
      ['suspended_tickets', 'destroy_many', {ids: suspendedTicketIDs}],
      cb,
    );
  }
}

exports.SuspendedTickets = SuspendedTickets;
