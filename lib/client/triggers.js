// Triggers.js: Client for the zendesk API.
const {Client} = require('./client');

class Triggers extends Client {
  constructor(options) {
    super(options);
    this.jsonAPINames = ['triggers', 'trigger'];
  }

  // Searching Triggers
  search(searchTerm, cb) {
    return this.request('GET', ['triggers', 'search', {query: searchTerm}], cb);
  }

  // Trigger Definitions
  definitions(cb) {
    return this.getAll(['triggers', 'definitions'], cb);
  }

  // Listing Triggers
  list(cb) {
    return this.getAll(['triggers', '?page[size]=100'], cb);
  }

  listActive(triggerID, cb) {
    return this.getAll(['triggers', 'active'], cb);
  }

  // Viewing Triggers
  show(triggerID, cb) {
    return this.get(['triggers', triggerID], cb);
  }

  // Creating Triggers
  create(trigger, cb) {
    return this.post(['triggers'], trigger, cb);
  }

  // Updating Triggers
  update(triggerID, trigger, cb) {
    return this.put(['triggers', triggerID], trigger, cb);
  }

  // Deleting Triggers
  delete(triggerID, cb) {
    return this.delete(['triggers', triggerID], cb);
  }

  // Reorder Audits
  reorder(triggerIDs, cb) {
    return this.requestAll(
      // TODO: putAll
      'PUT',
      ['triggers', 'reorder'],
      {trigger_ids: triggerIDs},
      cb,
    );
  }
}

exports.Triggers = Triggers;
