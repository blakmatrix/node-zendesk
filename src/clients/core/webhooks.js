// Webhooks.js: Client for the zendesk API.
const {Client} = require('../client');

/**
 * A webhook sends an HTTP request to a specified URL in response to an activity in Zendesk Support.
 * @typedef {object} Webhook
 * @property {object} [authentication] - Adds authentication to the webhook's HTTP requests. See Webhook security and authentication
 * @property {string} [created_at] - When the webhook was created (read-only)
 * @property {string} [created_by] - id of the user who created the webhook. "-1" represents the Zendesk system (read-only)
 * @property {object} [custom_headers] - Custom headers to deliver additional non-credential info to destinations
 * @property {string} [description] - Webhook description
 * @property {string} endpoint - The destination URL that the webhook notifies when Zendesk events occur
 * @property {object} [external_source] - External source by which a webhook is created, e.g. Zendesk Marketplace
 * @property {'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'} http_method - HTTP method used for the webhook's requests. To subscribe the webhook to Zendesk events, this must be "POST"
 * @property {string} id - An auto-generated webhook id (read-only)
 * @property {string} name - Webhook name
 * @property {'json' | 'xml' | 'form_encoded'} request_format - The format of the data that the webhook will send. To subscribe the webhook to Zendesk events, this must be "json"
 * @property {WebhookSigningSecret} [signing_secret] - Signing secret used to verify webhook requests
 * @property {'active' | 'inactive'} status - Current status of the webhook
 * @property {Array} [subscriptions] - Event subscriptions for the webhook. To subscribe the webhook to Zendesk events, specify one or more event types
 * @property {string} [updated_at] - When the webhook was last updated (read-only)
 * @property {string} [updated_by] - id of the user who last updated the webhook (read-only)
 */

/**
 * @typedef {object} CreateOrUpdateWebhook
 * @property {Partial<Webhook>} webhook - The webhook object to create or update.
 */

/**
 * @typedef {object} WebhookSigningSecret
 * @property {string} algorithm - The algorithm used to generate the signing secret like "sha256"
 * @property {string} secret - The signing secret used to verify webhook requests
 */

/**
 * Webhooks client for interacting with the Zendesk Webhooks API.
 * @see {@link https://developer.zendesk.com/api-reference/webhooks/webhooks-api/webhooks/}
 */
class Webhooks extends Client {
  constructor(options) {
    super(options);
    this.jsonAPINames = ['webhooks', 'webhook'];
    this.useDotJson = false;
  }

  /**
   * List all webhooks.
   * @returns {Promise<Webhook>} A promise that resolves to the list of webhooks.
   * @see {@link https://developer.zendesk.com/api-reference/webhooks/webhooks-api/webhooks/#list-webhooks}
   * @example const webhooks = await client.webhooks.list();
   */
  async list() {
    return this.getAll(['webhooks']);
  }

  /**
   * Retrieve a specific webhook by ID.
   * @param {string} webhookID - The ID of the webhook to retrieve.
   * @returns {Promise<{response: object, result: Webhook}>} A promise that resolves to the specified webhook.
   * @see {@link https://developer.zendesk.com/api-reference/webhooks/webhooks-api/webhooks/#show-webhook}
   * @example const webhook = await client.webhooks.show('webhookID123');
   */
  async show(webhookID) {
    return this.get(['webhooks', webhookID]);
  }

  /**
   * Create a new webhook.
   * @param {CreateOrUpdateWebhook} webhook - The webhook data to create.
   * @returns {Promise<{response: object, result: Webhook}>} A promise that resolves to the created webhook.
   * @see {@link https://developer.zendesk.com/api-reference/webhooks/webhooks-api/webhooks/#create-or-clone-webhook}
   * @example
   * const newWebhook = {
   *   // ... webhook data ...
   * };
   * const createdWebhook = await client.webhooks.create(newWebhook);
   */
  async create(webhook) {
    return this.post(['webhooks'], webhook);
  }

  /**
   * Update a specific webhook by ID.
   * @param {string} webhookID - The ID of the webhook to update.
   * @param {CreateOrUpdateWebhook} webhook - The updated webhook data.
   * @returns {Promise<{response: object, result: object}>} A promise that resolves to the updated webhook.
   * @see {@link https://developer.zendesk.com/api-reference/webhooks/webhooks-api/webhooks/#update-webhook}
   * @example
   * const updatedData = {
   *   // ... updated data ...
   * };
   * const updatedWebhook = await client.webhooks.update('webhookID123', updatedData);
   */
  async update(webhookID, webhook) {
    return this.put(['webhooks', webhookID], webhook);
  }

  /**
   * Delete a specific webhook by ID.
   * @param {string} webhookID - The ID of the webhook to delete.
   * @returns {Promise<object>} A promise that resolves when the webhook is deleted.
   * @see {@link https://developer.zendesk.com/api-reference/webhooks/webhooks-api/webhooks/#delete-webhook}
   * @example await client.webhooks.delete('webhookID123');
   */
  async delete(webhookID) {
    return super.delete(['webhooks', webhookID]);
  }

  // ... Previous code ...

  /**
   * Test a new or existing webhook.
   * @param {object} request - The request data for testing the webhook.
   * @param {string} [webhookID] - The ID of the webhook to be tested (for existing webhooks).
   * @returns {Promise<{response: object, result: object}>} A promise that resolves to the test result.
   * @see {@link https://developer.zendesk.com/api-reference/webhooks/webhooks-api/webhooks/#test-webhook}
   * @example
   * const requestData = {
   *   // ... request data ...
   * };
   * const testResult = await client.webhooks.test(requestData, 'webhookID123');
   */
  async test(request, webhookID) {
    const endpoint = webhookID
      ? `/webhooks/test?webhook_id=${webhookID}`
      : '/webhooks/test';
    return this.post(endpoint, request);
  }

  /**
   * List invocations for a specific webhook.
   * @param {string} webhookID - The ID of the webhook.
   * @returns {Promise<{response: object, result: object}>} A promise that resolves to the list of invocations.
   * @see {@link https://developer.zendesk.com/api-reference/webhooks/webhooks-api/webhooks/#list-webhook-invocations}
   * @example const invocations = await client.webhooks.listInvocations('webhookID123');
   */
  async listInvocations(webhookID) {
    return this.get(['webhooks', webhookID, 'invocations']);
  }

  /**
   * List invocation attempts for a specific webhook.
   * @param {string} webhookID - The ID of the webhook.
   * @param {string} invocationID - The ID of the webhook invocation.
   * @returns {Promise<{response: object, result: object}>} A promise that resolves to the list of invocation attempts.
   * @see {@link https://developer.zendesk.com/api-reference/webhooks/webhooks-api/webhooks/#list-webhook-invocation-attempts}
   * @example const attempts = await client.webhooks.listInvocationAttempts('webhookID123', 'invocationID123');
   */
  async listInvocationAttempts(webhookID, invocationID) {
    return this.get([
      'webhooks',
      webhookID,
      'invocations',
      invocationID,
      'attempts',
    ]);
  }

  /**
   * Retrieve the signing secret of a specific webhook.
   * @param {string} webhookID - The ID of the webhook.
   * @returns {Promise<{response: object, result: {signing_secret: WebhookSigningSecret}}>} A promise that resolves to the signing secret.
   * @see {@link https://developer.zendesk.com/api-reference/webhooks/webhooks-api/webhooks/#show-webhook-signing-secret}
   * @example const secret = await client.webhooks.getSigningSecret('webhookID123');
   */
  async getSigningSecret(webhookID) {
    return this.get(['webhooks', webhookID, 'signing_secret']);
  }

  /**
   * Reset the signing secret for a specific webhook.
   * @param {string} webhookID - The ID of the webhook.
   * @returns {Promise<{response: object, result: {signing_secret: WebhookSigningSecret}}>} A promise that resolves to the new signing secret.
   * @see {@link https://developer.zendesk.com/api-reference/webhooks/webhooks-api/webhooks/#reset-webhook-signing-secret}
   * @example const newSecret = await client.webhooks.resetSigningSecret('webhookID123');
   */
  async resetSigningSecret(webhookID) {
    return this.post(['webhooks', webhookID, 'signing_secret']);
  }

  /**
   * Patch a specific webhook by ID.
   * @param {string} webhookID - The ID of the webhook to patch.
   * @param {object} webhook - The data to patch.
   * @returns {Promise<{response: object, result: object}>} A promise that resolves to the patched webhook.
   * @see {@link https://developer.zendesk.com/api-reference/webhooks/webhooks-api/webhooks/#patch-webhook}
   * @example
   * const patchData = {
   *   // ... patch data ...
   * };
   * const patchedWebhook = await client.webhooks.patch('webhookID123', patchData);
   */
  async patch(webhookID, webhook) {
    return super.patch(['webhooks', webhookID], webhook);
  }
}

exports.Webhooks = Webhooks;
