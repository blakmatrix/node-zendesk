// Tickets.js: Client for the zendesk API.
const {Client} = require('../client');

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
  async list() {
    return this.getAll(['tickets']);
  }

  async listAssigned(userID) {
    return this.getAll(['users', userID, 'tickets', 'assigned']);
  }

  async listByOrganization(orgID) {
    return this.getAll(['organizations', orgID, 'tickets']);
  }

  async listByUserRequested(userID) {
    return this.getAll(['users', userID, 'tickets', 'requested']);
  }

  async listByUserCCD(userID) {
    return this.getAll(['users', userID, 'tickets', 'ccd']);
  }

  async listWithFilter(type, value) {
    return this.getAll(['tickets', {[type]: value}]);
  }

  async listRecent() {
    return this.getAll(['tickets', 'recent']);
  }

  async listCollaborators(ticketID) {
    return this.getAll(['tickets', ticketID, 'collaborators']);
  }

  async listIncidents(ticketID) {
    return this.getAll(['tickets', ticketID, 'incidents']);
  }

  async listMetrics(ticketID) {
    return this.get(['tickets', ticketID, 'metrics']);
  }

  // Viewing Tickets
  async show(ticketID) {
    return this.get(['tickets', ticketID]);
  }

  async showMany(ticket_ids) {
    return this.get(['tickets', 'show_many', '?ids=' + ticket_ids.toString()]);
  }

  // Creating Tickets
  async create(ticket) {
    return this.post(['tickets'], ticket);
  }

  async createMany(tickets) {
    return this.post(['tickets', 'create_many'], tickets);
  }

  // Updating Tickets
  async update(ticketID, ticket) {
    return this.put(['tickets', ticketID], ticket);
  }

  async updateMany(ticket_ids, ticket) {
    return this.put(
      ['tickets', 'update_many', '?ids=' + ticket_ids.toString()],
      ticket,
    );
  }

  // Deleting Tickets
  async delete(ticketID) {
    return super.delete(['tickets', ticketID]);
  }

  async deleteMany(ticket_ids) {
    return super.delete([
      'tickets',
      'destroy_many',
      '?ids=' + ticket_ids.toString(),
    ]);
  }

  // Merging tickets
  async merge(ticketID, mergedTicket) {
    return this.post(['tickets', ticketID, 'merge'], mergedTicket);
  }

  // *** Ticket export (max 1000 tickets per request in 5 min intrvals)
  // Ticket Export
  async export(startTime) {
    return this.get(['exports', 'tickets', {start_time: startTime}]);
  }

  // Ticket Export Sample (max 50 tickets per request)
  async exportSample(startTime) {
    return this.get(['exports', 'tickets', 'sample', {start_time: startTime}]);
  }

  // New Incremental Ticket Export
  async incremental(startTime) {
    return this.getAll(['incremental', 'tickets', {start_time: startTime}]);
  }

  // New Incremental Ticket Export with include
  async incrementalInclude(startTime, include) {
    return this.getAll([
      'incremental',
      'tickets',
      {start_time: startTime, include},
    ]);
  }

  // New Incremental Ticket Export Sample
  async incrementalSample(startTime) {
    return this.get([
      'incremental',
      'tickets',
      'sample',
      {start_time: startTime},
    ]);
  }

  // Listing Ticket Comments
  async getComments(ticketID) {
    return this.getAll(['tickets', ticketID, 'comments']);
  }

  // *** Ticket Audits

  // Listing Audits
  async exportAudit(ticketID) {
    return this.getAll(['tickets', ticketID, 'audits']);
  }

  // *** Ticket Tags

  // Add Tags to Ticket
  async addTags(ticketID, tags) {
    return this.requestAll('PUT', ['tickets', ticketID, 'tags'], tags); // TODO: putAll
  }

  // Replace Tags to Ticket
  async updateTags(ticketID, tags) {
    return this.requestAll('POST', ['tickets', ticketID, 'tags'], tags); // TODO: postAll
  }
}

exports.Tickets = Tickets;
