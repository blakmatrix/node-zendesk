// Links.js: Client for the zendesk services API.
const {Client} = require('../client');

class Links extends Client {
  constructor(options) {
    super(options);
    this.jsonAPINames = ['links'];
    this.sideLoadMap = [
      {field: 'ticket_id', name: 'ticket', dataset: 'tickets'},
    ];
  }

  // Listing Links
  list(cb) {
    this.getAll(['links'], cb);
  }

  // Viewing Links
  show(ticket_ids, cb) {
    this.get(['links', '?ticket_id=' + ticket_ids.toString()], cb);
  }
}

exports.Links = Links;
