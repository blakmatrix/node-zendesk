// TicketEvents.js: Client for the zendesk API.
const {Client} = require('./client');

class TicketEvents extends Client {
  constructor(options) {
    super(options);
    this.jsonAPINames = ['ticket_events', 'ticket_event'];
  }

  // New Incremental TicketEvents Export with include
  async incrementalInclude(startTime, include) {
    return this.getAll([
      'incremental',
      'ticket_events',
      {start_time: startTime, include},
    ]);
  }

  // New Incremental Ticket Export
  async incremental(startTime) {
    return this.getAll([
      'incremental',
      'ticket_events',
      {start_time: startTime},
    ]);
  }

  // New Incremental Ticket Export Sample
  async incrementalSample(startTime) {
    return this.get([
      'incremental',
      'ticket_events',
      'sample',
      {start_time: startTime},
    ]);
  }
}

exports.TicketEvents = TicketEvents;
