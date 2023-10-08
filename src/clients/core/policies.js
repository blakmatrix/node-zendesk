// File: policies.js
const {Client} = require('../client');

/**
 * Represents the SLA Policies functionality of Zendesk.
 * @see {@link https://developer.zendesk.com/api-reference/ticketing/business-rules/sla_policies/}
 */
class Policies extends Client {
  /**
   * Constructs a new Policies instance.
   * @param {object} options - Options to configure the client.
   */
  constructor(options) {
    super(options);
    this.jsonAPINames = ['slas/policies'];
  }

  /**
   * List all the SLA Policies.
   * @returns {Promise<object>} - A promise that resolves to the list of policies.
   * @async
   * @see {@link https://developer.zendesk.com/api-reference/ticketing/business-rules/sla_policies/#list-sla-policies}
   * @example const policiesList = await client.policies.list();
   */
  async list() {
    return this.getAll(['slas/policies']);
  }

  /**
   * Show details of a specific SLA Policy.
   * @param {number} policyID - The ID of the SLA Policy.
   * @returns {Promise<object>} - A promise that resolves to the policy details.
   * @async
   * @see {@link https://developer.zendesk.com/api-reference/ticketing/business-rules/sla_policies/#show-sla-policy}
   * @example const policyDetails = await client.policies.show(25);
   */
  async show(policyID) {
    return this.get(['slas/policies', policyID]);
  }

  /**
   * Create a new SLA Policy.
   * @param {object} policy - The SLA Policy object to be created.
   * @returns {Promise<object>} - A promise that resolves to the newly created policy details.
   * @async
   * @see {@link https://developer.zendesk.com/api-reference/ticketing/business-rules/sla_policies/#create-sla-policy}
   * @example
   * const newPolicy = {
   *   title: "Incidents",
   *   description: "For urgent incidents, we will respond to tickets in 10 minutes",
   *   //... other policy properties
   * };
   * const createdPolicy = await client.policies.create(newPolicy);
   */
  async create(policy) {
    return this.post(['slas/policies'], policy);
  }

  /**
   * Update an existing SLA Policy.
   * @param {number} policyID - The ID of the SLA Policy to be updated.
   * @param {object} policy - The updated SLA Policy object.
   * @returns {Promise<object>} - A promise that resolves to the updated policy details.
   * @async
   * @see {@link https://developer.zendesk.com/api-reference/ticketing/business-rules/sla_policies/#update-sla-policy}
   * @example
   * const updatedPolicy = {
   *   title: "Urgent Incidents",
   *   //... other updated policy properties
   * };
   * const result = await client.policies.update(25, updatedPolicy);
   */
  async update(policyID, policy) {
    return this.put(['slas/policies', policyID], policy);
  }

  /**
   * Delete a specific SLA Policy.
   * @param {number} policyID - The ID of the SLA Policy to be deleted.
   * @returns {Promise<void>} - A promise that resolves when the policy has been deleted.
   * @async
   * @throws Will throw an error if the deletion is unsuccessful.
   * @see {@link https://developer.zendesk.com/api-reference/ticketing/business-rules/sla_policies/#delete-sla-policy}
   * @example await client.policies.delete(25);
   */
  async delete(policyID) {
    return super.delete(['slas/policies', policyID]);
  }

  /**
   * Reorder SLA Policies based on provided IDs.
   * @param {number[]} slaPolicyIds - Array of SLA policy IDs in the desired order.
   * @returns {Promise<object>} The response from the Zendesk API.
   * @async
   * @throws {Error} Throws an error if there's an issue with the request.
   * @see {@link https://developer.zendesk.com/api-reference/ticketing/business-rules/sla_policies/#reorder-sla-policies}
   * @example
   * const reorderedResponse = await client.policies.reorder([55, 12]);
   */
  async reorder(slaPolicyIds) {
    return this.put(['slas/policies/reorder'], {sla_policy_ids: slaPolicyIds});
  }

  /**
   * Retrieve a list of supported filter definition items.
   * @returns {Promise<object>} The response from the Zendesk API containing supported filter definitions.
   * @async
   * @throws {Error} Throws an error if there's an issue with the request.
   * @see {@link https://developer.zendesk.com/api-reference/ticketing/business-rules/sla_policies/#retrieve-supported-filter-definition-items}
   * @example
   * const definitions = await client.policies.getDefinitions();
   */
  async getDefinitions() {
    return this.get(['slas/policies/definitions']);
  }
}

exports.Policies = Policies;
