// Automations.js: Client for the zendesk API.

const {Client} = require('./client');

class Automations extends Client {
  constructor(options) {
    super(options);
    this.jsonAPINames = ['automations', 'automation'];
  }

  // Listing Automations
  list(cb) {
    return this.getAll(['automations', '?page[size]=100'], cb);
  }

  listActive(automationID, cb) {
    return this.getAll(['automations', 'active'], cb);
  }

  // Viewing Automations
  show(automationID, cb) {
    return this.get(['automations', automationID], cb);
  }

  // Creating Automations
  create(automation, cb) {
    return this.post(['automations'], automation, cb);
  }

  // Updating Automations
  update(automationID, automation, cb) {
    return this.put(['automations', automationID], automation, cb);
  }

  // Deleting Automations
  delete(automationID, cb) {
    return this.delete(['automations', automationID], cb);
  }

  // Reorder Audits
  reorder(automationIDs, cb) {
    return this.requestAll(
      // TODO: putAll
      'PUT',
      ['automations', 'reorder'],
      {automation_ids: automationIDs},
      cb,
    );
  }
}

exports.Automations = Automations;
