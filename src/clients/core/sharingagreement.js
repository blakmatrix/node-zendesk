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
   * @returns {Promise<Array>} An array of Sharing Agreement objects.
   * @async
   * @throws {Error} Throws an error if the request fails.
   * @see {@link https://developer.zendesk.com/api-reference/ticketing/tickets/sharing_agreements/#list-sharing-agreements}
   * @example
   * const sharingAgreements = await client.sharingagreement.show();
   */
  async show() {
    return this.get(['sharing_agreements']);
  }

  /**
   * Show a specific Sharing Agreement by its ID.
   * @param {number} id The ID of the Sharing Agreement.
   * @returns {Promise<object>} The Sharing Agreement object.
   * @async
   * @throws {Error} Throws an error if the request fails.
   * @see {@link https://developer.zendesk.com/api-reference/ticketing/tickets/sharing_agreements/#show-a-sharing-agreement}
   * @example
   * const sharingAgreement = await client.sharingagreement.showById(12345);
   */
  async showById(id) {
    return this.get(['sharing_agreements', id]);
  }

  /**
   * Create a new Sharing Agreement.
   * @param {object} data The data for the new Sharing Agreement.
   * @returns {Promise<object>} The created Sharing Agreement object.
   * @async
   * @throws {Error} Throws an error if the request fails.
   * @see {@link https://developer.zendesk.com/api-reference/ticketing/tickets/sharing_agreements/#create-sharing-agreement}
   * @example
   * const newSharingAgreement = {
   *   remote_subdomain: "Foo"
   * };
   * const createdAgreement = await client.sharingagreement.create(newSharingAgreement);
   */
  async create(data) {
    return this.post(['sharing_agreements'], {sharing_agreement: data});
  }

  /**
   * Update an existing Sharing Agreement.
   * @param {number} id The ID of the Sharing Agreement to update.
   * @param {object} data The data to update the Sharing Agreement with. Only 'status' is allowed.
   * @returns {Promise<object>} The updated Sharing Agreement object.
   * @async
   * @throws {Error} Throws an error if the request fails.
   * @see {@link https://developer.zendesk.com/api-reference/ticketing/tickets/sharing_agreements/#update-a-sharing-agreement}
   * @example
   * const updatedData = {
   *   status: "accepted"
   * };
   * const updatedAgreement = await client.sharingagreement.update(12345, updatedData);
   */
  async update(id, data) {
    return this.put(['sharing_agreements', id], {sharing_agreement: data});
  }

  /**
   * Delete a specific Sharing Agreement by its ID.
   * @param {number} id The ID of the Sharing Agreement.
   * @returns {Promise<void>}
   * @async
   * @throws {Error} Throws an error if the request fails.
   * @see {@link https://developer.zendesk.com/api-reference/ticketing/tickets/sharing_agreements/#delete-a-sharing-agreement}
   * @example
   * await client.sharingagreement.delete(12345);
   */
  async delete(id) {
    return super.delete(['sharing_agreements', id]);
  }
}

exports.SharingAgreement = SharingAgreement;
