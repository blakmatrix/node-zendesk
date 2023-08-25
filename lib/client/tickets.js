// Tickets.js: Client for the zendesk API.
const {Client} = require('./client');

class Tickets extends Client {
  constructor(options) {
    super(options);
    this.jsonAPINames = ['tickets', 'ticket', 'audits', 'comments'];
    this.sideLoadMap = [
      {field: 'assignee_id', name: 'assignee', dataset: 'users'},
      {field: 'requester_id', name: 'requester', dataset: 'users'},
      {field: 'submitter_id', name: 'submitter', dataset: 'users'},
      {
        field: 'organization_id',
        name: 'organization',
        dataset: 'organizations',
      },
      {field: 'id', name: 'sharing_agreements', dataset: 'sharing_agreements'},
    ];
  }

  // Listing Tickets
  list(cb) {
    return this.getAll(['tickets', '?page[size]=100'], cb);
  }

  listAssigned(userID, cb) {
    return this.getAll(
      ['users', userID, 'tickets', 'assigned', '?page[size]=100'],
      cb,
    );
  }

  listByOrganization(orgID, cb) {
    return this.getAll(
      ['organizations', orgID, 'tickets', '?page[size]=100'],
      cb,
    );
  }

  listByUserRequested(userID, cb) {
    return this.getAll(
      ['users', userID, 'tickets', 'requested', '?page[size]=100'],
      cb,
    );
  }

  listByUserCCD(userID, cb) {
    return this.getAll(
      ['users', userID, 'tickets', 'ccd', '?page[size]=100'],
      cb,
    );
  }

  listWithFilter(type, value, cb) {
    return this.getAll(['tickets', {[type]: value}, '?page[size]=100'], cb);
  }

  listRecent(cb) {
    return this.getAll(['tickets', 'recent', '?page[size]=100'], cb);
  }

  listCollaborators(ticketID, cb) {
    return this.getAll(['tickets', ticketID, 'collaborators'], cb);
  }

  listIncidents(ticketID, cb) {
    return this.getAll(
      ['tickets', ticketID, 'incidents', '?page[size]=100'],
      cb,
    );
  }

  listMetrics(ticketID, cb) {
    return this.get(['tickets', ticketID, 'metrics'], cb);
  }

  // Viewing Tickets
  show(ticketID, cb) {
    return this.get(['tickets', ticketID], cb);
  }

  showMany(ticket_ids, cb) {
    return this.get(
      ['tickets', 'show_many', '?ids=' + ticket_ids.toString()],
      cb,
    );
  }

  // Creating Tickets
  create(ticket, cb) {
    return this.post(['tickets'], ticket, cb);
  }

  createMany(tickets, cb) {
    return this.post(['tickets', 'create_many'], tickets, cb);
  }

  // Updating Tickets
  update(ticketID, ticket, cb) {
    return this.put(['tickets', ticketID], ticket, cb);
  }

  updateMany(ticket_ids, ticket, cb) {
    return this.put(
      ['tickets', 'update_many', '?ids=' + ticket_ids.toString()],
      ticket,
      cb,
    );
  }

  // Deleting Tickets
  delete(ticketID, cb) {
    return this.delete(['tickets', ticketID], cb);
  }

  deleteMany(ticket_ids, cb) {
    return this.delete(
      ['tickets', 'destroy_many', '?ids=' + ticket_ids.toString()],
      cb,
    );
  }

  // Merging tickets
  merge(ticketID, mergedTicket, cb) {
    return this.post(['tickets', ticketID, 'merge'], mergedTicket, cb);
  }

  // *** Ticket export (max 1000 tickets per request in 5 min intrvals)
  // Ticket Export
  export(startTime, cb) {
    return this.get(['exports', 'tickets', {start_time: startTime}], cb);
  }

  // Ticket Export Sample (max 50 tickets per request)
  exportSample(startTime, cb) {
    return this.get(
      ['exports', 'tickets', 'sample', {start_time: startTime}],
      cb,
    );
  }

  // New Incremental Ticket Export
  incremental(startTime, cb) {
    return this.getAll(['incremental', 'tickets', {start_time: startTime}], cb);
  }

  // New Incremental Ticket Export with include
  incrementalInclude(startTime, include, cb) {
    return this.getAll(
      ['incremental', 'tickets', {start_time: startTime, include}],
      cb,
    );
  }

  // New Incremental Ticket Export Sample
  incrementalSample(startTime, cb) {
    return this.get(
      ['incremental', 'tickets', 'sample', {start_time: startTime}],
      cb,
    );
  }

  // Listing Ticket Comments
  getComments(ticketID, cb) {
    return this.getAll(['tickets', ticketID, 'comments'], cb);
  }

  // *** Ticket Audits

  // Listing Audits
  exportAudit(ticketID, cb) {
    return this.getAll(['tickets', ticketID, 'audits'], cb);
  }

  // *** Ticket Tags

  // Add Tags to Ticket
  addTags(ticketID, tags, cb) {
    return this.requestAll('PUT', ['tickets', ticketID, 'tags'], tags, cb); // TODO: putAll
  }

  // Replace Tags to Ticket
  updateTags(ticketID, tags, cb) {
    return this.requestAll('POST', ['tickets', ticketID, 'tags'], tags, cb); // TODO: postAll
  }
}

exports.Tickets = Tickets;
