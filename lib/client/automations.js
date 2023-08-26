// Automations.js: Client for the zendesk API.

const {Client} = require('./client');

class Automations extends Client {
  constructor(options) {
    super(options);
    this.jsonAPINames = ['automations', 'automation'];
  }

  // Listing Automations
  async list() {
    return this.getAll(['automations', '?page[size]=100']);
  }

  async listActive() {
    return this.getAll(['automations', 'active']);
  }

  // Viewing Automations
  async show(automationID) {
    return this.get(['automations', automationID]);
  }

  // Creating Automations
  async create(automation) {
    return this.post(['automations'], automation);
  }

  // Updating Automations
  async update(automationID, automation) {
    return this.put(['automations', automationID], automation);
  }

  // Deleting Automations
  async delete(automationID) {
    return this.delete(['automations', automationID]);
  }

  // Reorder Audits
  async reorder(automationIDs) {
    return this.requestAll(
      // TODO: putAll
      'PUT',
      ['automations', 'reorder'],
      {automation_ids: automationIDs},
    );
  }
}

exports.Automations = Automations;
