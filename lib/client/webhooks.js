// Webhooks.js: Client for the zendesk API.
const {Client} = require('./client');

class Webhooks extends Client {
  constructor(options) {
    super(options);
    this.jsonAPINames = ['webhooks', 'webhook'];
  }

  // Listing Webhooks
  list(cb) {
    return this.getAll('/webhooks', cb);
  }

  // Viewing Webhooks
  show(webhookID, cb) {
    return this.get(`/webhooks/${webhookID}`, cb);
  }

  // Creating Webhooks
  create(webhook, cb) {
    return this.post('/webhooks', webhook, cb);
  }

  // Updating Webhooks
  update(webhookID, webhook, cb) {
    return this.put(`/webhooks/${webhookID}`, webhook, cb);
  }

  // Deleting Webhooks
  delete(webhookID, cb) {
    return this.delete(`/webhooks/${webhookID}`, cb);
  }
}

exports.Webhooks = Webhooks;
