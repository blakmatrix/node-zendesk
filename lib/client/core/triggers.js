// Triggers.js: Client for the zendesk API.
const {Client} = require('../client');

class Triggers extends Client {
  constructor(options) {
    super(options);
    this.jsonAPINames = ['triggers', 'trigger'];
  }

  // Searching Triggers
  async search(searchTerm) {
    return this.request('GET', ['triggers', 'search', {query: searchTerm}]);
  }

  // Trigger Definitions
  async definitions() {
    return this.getAll(['triggers', 'definitions']);
  }

  // Listing Triggers
  async list() {
    return this.getAll(['triggers', '?page[size]=100']);
  }

  async listActive() {
    return this.getAll(['triggers', 'active']);
  }

  // Viewing Triggers
  async show(triggerID) {
    return this.get(['triggers', triggerID]);
  }

  // Creating Triggers
  async create(trigger) {
    return this.post(['triggers'], trigger);
  }

  // Updating Triggers
  async update(triggerID, trigger) {
    return this.put(['triggers', triggerID], trigger);
  }

  // Deleting Triggers
  async delete(triggerID) {
    return this.delete(['triggers', triggerID]);
  }

  // Reorder Audits
  async reorder(triggerIDs) {
    return this.requestAll(
      // TODO: putAll
      'PUT',
      ['triggers', 'reorder'],
      {trigger_ids: triggerIDs},
    );
  }
}

exports.Triggers = Triggers;
