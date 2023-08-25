// TicketEvents.js: Client for the zendesk API.
const {Client} = require('./client');

class TicketEvents extends Client {
  constructor(options) {
    super(options);
    this.jsonAPINames = ['ticket_events', 'ticket_event'];
  }

  // New Incremental TicketEvents Export with include
  incrementalInclude(startTime, include, cb) {
    return this.getAll(
      ['incremental', 'ticket_events', {start_time: startTime, include}],
      cb,
    );
  }

  // New Incremental Ticket Export
  incremental(startTime, cb) {
    return this.getAll(
      ['incremental', 'ticket_events', {start_time: startTime}],
      cb,
    );
  }

  // New Incremental Ticket Export Sample
  incrementalSample(startTime, cb) {
    return this.get(
      ['incremental', 'ticket_events', 'sample', {start_time: startTime}],
      cb,
    );
  }
}

exports.TicketEvents = TicketEvents;
