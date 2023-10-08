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
   * @param {number} userId - The ID of the user.
   * @returns {Promise<object[]>} A list of user identities.
   * @async
   * @throws {Error} Throws an error if the request fails.
   * @see {@link https://developer.zendesk.com/api-reference/ticketing/users/user_identities/#list-identities}
   * @example const identities = await client.useridentities.list(12345);
   */
  async list(userId) {
    return this.getAll(['users', userId, 'identities']);
  }

  /**
   * Show a specific identity for a given user.
   * @param {number} userId - The ID of the user.
   * @param {number} userIdentityId - The ID of the user identity to show.
   * @returns {Promise<object>} The user identity details.
   * @async
   * @throws {Error} Throws an error if the request fails.
   * @see {@link https://developer.zendesk.com/api-reference/ticketing/users/user_identities/#show-identity}
   * @example const identity = await client.useridentities.show(12345, 67890);
   */
  async show(userId, userIdentityId) {
    return this.get(['users', userId, 'identities', userIdentityId]);
  }

  /**
   * Create a new identity for a given user.
   * @param {number} userId - The ID of the user.
   * @param {object} userIdentity - The user identity details to create.
   * @returns {Promise<object>} The created user identity.
   * @async
   * @throws {Error} Throws an error if the request fails.
   * @see {@link https://developer.zendesk.com/api-reference/ticketing/users/user_identities/#create-identity}
   * @example const newIdentity = await client.useridentities.create(12345, {type: 'email', value: 'test@example.com'});
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
   * @param {number} userId - The ID of the user.
   * @param {number} userIdentityId - The ID of the user identity to update.
   * @param {object} identity - The updated identity details.
   * @returns {Promise<object>} The updated user identity.
   * @async
   * @throws {Error} Throws an error if the request fails.
   * @see {@link https://developer.zendesk.com/api-reference/ticketing/users/user_identities/#update-identity}
   * @example const updatedIdentity = await client.useridentities.update(12345, 67890, {verified: true});
   */
  async update(userId, userIdentityId, identity) {
    return this.put(['users', userId, 'identities', userIdentityId], identity);
  }

  /**
   * Make a specific identity the primary identity for a given user.
   * @param {number} userId - The ID of the user.
   * @param {number} userIdentityId - The ID of the user identity to make primary.
   * @returns {Promise<object>} The updated user identity.
   * @async
   * @throws {Error} Throws an error if the request fails.
   * @see {@link https://developer.zendesk.com/api-reference/ticketing/users/user_identities/#make-identity-primary}
   * @example await client.useridentities.makePrimary(12345, 67890);
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
   * @param {number} userId - The ID of the user.
   * @param {number} userIdentityId - The ID of the user identity to verify.
   * @returns {Promise<object>} The verified user identity.
   * @async
   * @throws {Error} Throws an error if the request fails.
   * @see {@link https://developer.zendesk.com/api-reference/ticketing/users/user_identities/#verify-identity}
   * @example await client.useridentities.verify(12345, 67890);
   */
  async verify(userId, userIdentityId) {
    return this.put(['users', userId, 'identities', userIdentityId, 'verify']);
  }

  /**
   * Request verification for a specific identity for a given user.
   * @param {number} userId - The ID of the user.
   * @param {number} userIdentityId - The ID of the user identity to request verification for.
   * @returns {Promise<object>} The user identity verification request details.
   * @async
   * @throws {Error} Throws an error if the request fails.
   * @see {@link https://developer.zendesk.com/api-reference/ticketing/users/user_identities/#request-user-verification}
   * @example await client.useridentities.requestVerification(12345, 67890);
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
   * @param {number} userId - The ID of the user.
   * @param {number} userIdentityId - The ID of the user identity to delete.
   * @returns {Promise<void>}
   * @async
   * @throws {Error} Throws an error if the request fails.
   * @see {@link https://developer.zendesk.com/api-reference/ticketing/users/user_identities/#delete-identity}
   * @example await client.useridentities.delete(12345, 67890);
   */
  async delete(userId, userIdentityId) {
    return super.delete(['users', userId, 'identities', userIdentityId]);
  }
}

exports.UserIdentities = UserIdentities;
