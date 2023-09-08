// File: policies.js
const {Client} = require('../client');

/**
 * Represents the SLA Policies functionality of Zendesk.
 * @see {@link https://developer.zendesk.com/api-reference/ticketing/business-rules/sla_policies/}
 */
class Policies extends Client {
  /**
   * Constructs a new Policies instance.
   * @param {Object} options - Options to configure the client.
   */
  constructor(options) {
    super(options);
    this.jsonAPINames = ['slas/policies'];
  }

  /**
   * List all the SLA Policies.
   * @async
   * @returns {Promise<Object>} - A promise that resolves to the list of policies.
   * @example const policiesList = await client.policies.list();
   * @see {@link https://developer.zendesk.com/api-reference/ticketing/business-rules/sla_policies/#list-sla-policies}
   */
  async list() {
    return this.getAll(['slas/policies']);
  }

  /**
   * Show details of a specific SLA Policy.
   * @async
   * @param {number} policyID - The ID of the SLA Policy.
   * @returns {Promise<Object>} - A promise that resolves to the policy details.
   * @example const policyDetails = await client.policies.show(25);
   * @see {@link https://developer.zendesk.com/api-reference/ticketing/business-rules/sla_policies/#show-sla-policy}
   */
  async show(policyID) {
    return this.get(['slas/policies', policyID]);
  }

  /**
   * Create a new SLA Policy.
   * @async
   * @param {Object} policy - The SLA Policy object to be created.
   * @returns {Promise<Object>} - A promise that resolves to the newly created policy details.
   * @example
   * const newPolicy = {
   *   title: "Incidents",
   *   description: "For urgent incidents, we will respond to tickets in 10 minutes",
   *   //... other policy properties
   * };
   * const createdPolicy = await client.policies.create(newPolicy);
   * @see {@link https://developer.zendesk.com/api-reference/ticketing/business-rules/sla_policies/#create-sla-policy}
   */
  async create(policy) {
    return this.post(['slas/policies'], policy);
  }

  /**
   * Update an existing SLA Policy.
   * @async
   * @param {number} policyID - The ID of the SLA Policy to be updated.
   * @param {Object} policy - The updated SLA Policy object.
   * @returns {Promise<Object>} - A promise that resolves to the updated policy details.
   * @example
   * const updatedPolicy = {
   *   title: "Urgent Incidents",
   *   //... other updated policy properties
   * };
   * const result = await client.policies.update(25, updatedPolicy);
   * @see {@link https://developer.zendesk.com/api-reference/ticketing/business-rules/sla_policies/#update-sla-policy}
   */
  async update(policyID, policy) {
    return this.put(['slas/policies', policyID], policy);
  }

  /**
   * Delete a specific SLA Policy.
   * @async
   * @param {number} policyID - The ID of the SLA Policy to be deleted.
   * @returns {Promise<void>} - A promise that resolves when the policy has been deleted.
   * @throws Will throw an error if the deletion is unsuccessful.
   * @example await client.policies.delete(25);
   * @see {@link https://developer.zendesk.com/api-reference/ticketing/business-rules/sla_policies/#delete-sla-policy}
   */
  async delete(policyID) {
    return super.delete(['slas/policies', policyID]);
  }

  /**
   * Reorder SLA Policies based on provided IDs.
   * @async
   * @param {number[]} slaPolicyIds - Array of SLA policy IDs in the desired order.
   * @returns {Promise<Object>} The response from the Zendesk API.
   * @throws {Error} Throws an error if there's an issue with the request.
   * @example
   * const reorderedResponse = await client.policies.reorder([55, 12]);
   * @see {@link https://developer.zendesk.com/api-reference/ticketing/business-rules/sla_policies/#reorder-sla-policies}
   */
  async reorder(slaPolicyIds) {
    return this.put(['slas/policies/reorder'], {sla_policy_ids: slaPolicyIds});
  }

  /**
   * Retrieve a list of supported filter definition items.
   * @async
   * @returns {Promise<Object>} The response from the Zendesk API containing supported filter definitions.
   * @throws {Error} Throws an error if there's an issue with the request.
   * @example
   * const definitions = await client.policies.getDefinitions();
   * @see {@link https://developer.zendesk.com/api-reference/ticketing/business-rules/sla_policies/#retrieve-supported-filter-definition-items}
   */
  async getDefinitions() {
    return this.get(['slas/policies/definitions']);
  }
}

exports.Policies = Policies;
