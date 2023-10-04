const {Client} = require('../client');

/**
 * Client for interacting with the Zendesk User Identities API.
 * @see {@link https://developer.zendesk.com/api-reference/ticketing/users/user_identities/}
 */
class UserIdentities extends Client {
  constructor(options) {
    super(options);
    this.jsonAPINames = ['identities', 'identity'];
  }

  /**
   * List all identities for a given user.
   * @async
   * @param {number} userId - The ID of the user.
   * @returns {Promise<Object[]>} A list of user identities.
   * @throws {Error} Throws an error if the request fails.
   * @example const identities = await client.useridentities.list(12345);
   * @see {@link https://developer.zendesk.com/api-reference/ticketing/users/user_identities/#list-identities}
   */
  async list(userId) {
    return this.getAll(['users', userId, 'identities']);
  }

  /**
   * Show a specific identity for a given user.
   * @async
   * @param {number} userId - The ID of the user.
   * @param {number} userIdentityId - The ID of the user identity to show.
   * @returns {Promise<Object>} The user identity details.
   * @throws {Error} Throws an error if the request fails.
   * @example const identity = await client.useridentities.show(12345, 67890);
   * @see {@link https://developer.zendesk.com/api-reference/ticketing/users/user_identities/#show-identity}
   */
  async show(userId, userIdentityId) {
    return this.get(['users', userId, 'identities', userIdentityId]);
  }

  /**
   * Create a new identity for a given user.
   * @async
   * @param {number} userId - The ID of the user.
   * @param {Object} userIdentity - The user identity details to create.
   * @returns {Promise<Object>} The created user identity.
   * @throws {Error} Throws an error if the request fails.
   * @example const newIdentity = await client.useridentities.create(12345, {type: 'email', value: 'test@example.com'});
   * @see {@link https://developer.zendesk.com/api-reference/ticketing/users/user_identities/#create-identity}
   */
  async create(userId, userIdentity) {
    if (
      userIdentity &&
      typeof userIdentity === 'object' &&
      !Array.isArray(userIdentity) &&
      !Object.hasOwn(userIdentity, 'identity')
    ) {
      userIdentity = {identity: userIdentity};
    }

    return this.post(['users', userId, 'identities'], userIdentity);
  }

  /**
   * Update a specific identity for a given user.
   * @async
   * @param {number} userId - The ID of the user.
   * @param {number} userIdentityId - The ID of the user identity to update.
   * @param {Object} identity - The updated identity details.
   * @returns {Promise<Object>} The updated user identity.
   * @throws {Error} Throws an error if the request fails.
   * @example const updatedIdentity = await client.useridentities.update(12345, 67890, {verified: true});
   * @see {@link https://developer.zendesk.com/api-reference/ticketing/users/user_identities/#update-identity}
   */
  async update(userId, userIdentityId, identity) {
    return this.put(['users', userId, 'identities', userIdentityId], identity);
  }

  /**
   * Make a specific identity the primary identity for a given user.
   * @async
   * @param {number} userId - The ID of the user.
   * @param {number} userIdentityId - The ID of the user identity to make primary.
   * @returns {Promise<Object>} The updated user identity.
   * @throws {Error} Throws an error if the request fails.
   * @example await client.useridentities.makePrimary(12345, 67890);
   * @see {@link https://developer.zendesk.com/api-reference/ticketing/users/user_identities/#make-identity-primary}
   */
  async makePrimary(userId, userIdentityId) {
    return this.put([
      'users',
      userId,
      'identities',
      userIdentityId,
      'make_primary',
    ]);
  }

  /**
   * Verify a specific identity for a given user.
   * @async
   * @param {number} userId - The ID of the user.
   * @param {number} userIdentityId - The ID of the user identity to verify.
   * @returns {Promise<Object>} The verified user identity.
   * @throws {Error} Throws an error if the request fails.
   * @example await client.useridentities.verify(12345, 67890);
   * @see {@link https://developer.zendesk.com/api-reference/ticketing/users/user_identities/#verify-identity}
   */
  async verify(userId, userIdentityId) {
    return this.put(['users', userId, 'identities', userIdentityId, 'verify']);
  }

  /**
   * Request verification for a specific identity for a given user.
   * @async
   * @param {number} userId - The ID of the user.
   * @param {number} userIdentityId - The ID of the user identity to request verification for.
   * @returns {Promise<Object>} The user identity verification request details.
   * @throws {Error} Throws an error if the request fails.
   * @example await client.useridentities.requestVerification(12345, 67890);
   * @see {@link https://developer.zendesk.com/api-reference/ticketing/users/user_identities/#request-user-verification}
   */
  async requestVerification(userId, userIdentityId) {
    return this.put([
      'users',
      userId,
      'identities',
      userIdentityId,
      'request_verification',
    ]);
  }

  /**
   * Delete a specific identity for a given user.
   * @async
   * @param {number} userId - The ID of the user.
   * @param {number} userIdentityId - The ID of the user identity to delete.
   * @returns {Promise<void>}
   * @throws {Error} Throws an error if the request fails.
   * @example await client.useridentities.delete(12345, 67890);
   * @see {@link https://developer.zendesk.com/api-reference/ticketing/users/user_identities/#delete-identity}
   */
  async delete(userId, userIdentityId) {
    return super.delete(['users', userId, 'identities', userIdentityId]);
  }
}

exports.UserIdentities = UserIdentities;
