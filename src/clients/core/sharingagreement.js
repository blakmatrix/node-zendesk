// SharingAgreement.js: Client for the zendesk API.

const {Client} = require('../client');

/**
 * Class representing the SharingAgreement API methods.
 * @see {@link https://developer.zendesk.com/api-reference/ticketing/tickets/sharing_agreements/}
 */
class SharingAgreement extends Client {
  constructor(options) {
    super(options);
    this.jsonAPINames = ['sharing-agreement'];
  }

  /**
   * List all Sharing Agreements.
   * @async
   * @returns {Promise<Array>} An array of Sharing Agreement objects.
   * @throws {Error} Throws an error if the request fails.
   * @example
   * const sharingAgreements = await client.sharingagreement.show();
   * @see {@link https://developer.zendesk.com/api-reference/ticketing/tickets/sharing_agreements/#list-sharing-agreements}
   */
  async show() {
    return this.get(['sharing_agreements']);
  }

  /**
   * Show a specific Sharing Agreement by its ID.
   * @async
   * @param {number} id The ID of the Sharing Agreement.
   * @returns {Promise<Object>} The Sharing Agreement object.
   * @throws {Error} Throws an error if the request fails.
   * @example
   * const sharingAgreement = await client.sharingagreement.showById(12345);
   * @see {@link https://developer.zendesk.com/api-reference/ticketing/tickets/sharing_agreements/#show-a-sharing-agreement}
   */
  async showById(id) {
    return this.get(['sharing_agreements', id]);
  }

  /**
   * Create a new Sharing Agreement.
   * @async
   * @param {Object} data The data for the new Sharing Agreement.
   * @returns {Promise<Object>} The created Sharing Agreement object.
   * @throws {Error} Throws an error if the request fails.
   * @example
   * const newSharingAgreement = {
   *   remote_subdomain: "Foo"
   * };
   * const createdAgreement = await client.sharingagreement.create(newSharingAgreement);
   * @see {@link https://developer.zendesk.com/api-reference/ticketing/tickets/sharing_agreements/#create-sharing-agreement}
   */
  async create(data) {
    return this.post(['sharing_agreements'], {sharing_agreement: data});
  }

  /**
   * Update an existing Sharing Agreement.
   * @async
   * @param {number} id The ID of the Sharing Agreement to update.
   * @param {Object} data The data to update the Sharing Agreement with. Only 'status' is allowed.
   * @returns {Promise<Object>} The updated Sharing Agreement object.
   * @throws {Error} Throws an error if the request fails.
   * @example
   * const updatedData = {
   *   status: "accepted"
   * };
   * const updatedAgreement = await client.sharingagreement.update(12345, updatedData);
   * @see {@link https://developer.zendesk.com/api-reference/ticketing/tickets/sharing_agreements/#update-a-sharing-agreement}
   */
  async update(id, data) {
    return this.put(['sharing_agreements', id], {sharing_agreement: data});
  }

  /**
   * Delete a specific Sharing Agreement by its ID.
   * @async
   * @param {number} id The ID of the Sharing Agreement.
   * @returns {Promise<void>}
   * @throws {Error} Throws an error if the request fails.
   * @example
   * await client.sharingagreement.delete(12345);
   * @see {@link https://developer.zendesk.com/api-reference/ticketing/tickets/sharing_agreements/#delete-a-sharing-agreement}
   */
  async delete(id) {
    return super.delete(['sharing_agreements', id]);
  }
}

exports.SharingAgreement = SharingAgreement;
