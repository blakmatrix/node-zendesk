// Webhooks.js: Client for the zendesk API.
const {Client} = require('../client');

class Webhooks extends Client {
  constructor(options) {
    super(options);
    this.jsonAPINames = ['webhooks', 'webhook'];
  }

  // Listing Webhooks
  async list() {
    return this.getAll('/webhooks');
  }

  // Viewing Webhooks
  async show(webhookID) {
    return this.get(`/webhooks/${webhookID}`);
  }

  // Creating Webhooks
  async create(webhook) {
    return this.post('/webhooks', webhook);
  }

  // Updating Webhooks
  async update(webhookID, webhook) {
    return this.put(`/webhooks/${webhookID}`, webhook);
  }

  // Deleting Webhooks
  async delete(webhookID) {
    return super.delete(`/webhooks/${webhookID}`);
  }
}

exports.Webhooks = Webhooks;
