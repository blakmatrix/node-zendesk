// File: users.js
const {Client} = require('../client');

/**
 * Client for the Zendesk Users API.
 * @see {@link https://developer.zendesk.com/api-reference/ticketing/users/users/}
 */
class Users extends Client {
  constructor(options) {
    super(options);

    this.jsonAPINames = ['users', 'user'];
    this.sideLoadMap = [
      {field: 'id', name: 'group', dataset: 'groups', all: true},
      {
        field: 'id',
        name: 'identity',
        dataset: 'identities',
        array: true,
        dataKey: 'user_id',
      },
      {field: 'custom_role_id', name: 'role', dataset: 'roles'},
      {
        field: 'organization_id',
        name: 'organization',
        dataset: 'organizations',
      },
    ];
  }

  /**
   * Authenticates the current user.
   * @async
   * @returns {Promise<Object>} The authenticated user's details.
   * @example
   * const user = await client.users.auth();
   * @see {@link https://developer.zendesk.com/api-reference/ticketing/users/users/#show-the-currently-authenticated-user}
   */
  async auth() {
    return this.get(['users', 'me']);
  }

  /**
   * Lists all users.
   * @async
   * @returns {Promise<Array<Object>>} An array of user objects.
   * @example
   * const users = await client.users.list();
   * @see {@link https://developer.zendesk.com/api-reference/ticketing/users/users/#list-users}
   */
  async list() {
    return this.getAll(['users']);
  }

  /**
   * Lists users with a specific filter.
   * @async
   * @param {string} type - The type of filter.
   * @param {string|number} value - The value for the filter.
   * @returns {Promise<Array<Object>>} An array of user objects.
   * @example
   * const users = await client.users.listWithFilter('type', 'value');
   * @see {@link https://developer.zendesk.com/api-reference/ticketing/users/users/#list-users}
   */
  async listWithFilter(type, value) {
    return this.getAll(['users', {[type]: value}]);
  }

  /**
   * Lists users by group ID.
   * @async
   * @param {number} id - The ID of the group.
   * @returns {Promise<Array<Object>>} An array of user objects.
   * @example
   * const users = await client.users.listByGroup(12345);
   * @see {@link https://developer.zendesk.com/api-reference/ticketing/users/users/#list-users}
   */
  async listByGroup(id) {
    return this.getAll(['groups', id, 'users']);
  }

  /**
   * Lists users by organization ID.
   * @async
   * @param {number} id - The ID of the organization.
   * @returns {Promise<Array<Object>>} An array of user objects.
   * @example
   * const users = await client.users.listByOrganization(12345);
   * @see {@link https://developer.zendesk.com/api-reference/ticketing/users/users/#list-users}
   */
  async listByOrganization(id) {
    return this.getAll(['organizations', id, 'users']);
  }

  /**
   * Shows details of a user by ID.
   * @async
   * @param {number} id - The ID of the user.
   * @returns {Promise<Object>} The user's details.
   * @example
   * const user = await client.users.show(12345);
   * @see {@link https://developer.zendesk.com/api-reference/ticketing/users/users/#show-user}
   */
  async show(id) {
    return this.get(['users', id]);
  }

  /**
   * Shows details of multiple users by their IDs.
   * @async
   * @param {Array<number>} userIds - An array of user IDs.
   * @returns {Promise<Array<Object>>} An array of user details.
   * @example
   * const users = await client.users.showMany([12345, 67890]);
   * @see {@link https://developer.zendesk.com/api-reference/ticketing/users/users/#show-many-users}
   */
  async showMany(userIds) {
    return this.get(['users', 'show_many', {ids: userIds}]);
  }

  /**
   * Creates a new user.
   * @async
   * @param {Object} user - The user details.
   * @returns {Promise<Object>} The created user's details.
   * @example
   * const newUser = await client.users.create({name: 'John Doe', email: 'john@example.com'});
   * @see {@link https://developer.zendesk.com/api-reference/ticketing/users/users/#create-user}
   */
  async create(user) {
    return this.post(['users'], user);
  }

  /**
   * Creates multiple users.
   * @async
   * @param {Array<Object>} users - An array of user details.
   * @returns {Promise<Array<Object>>} An array of created user details.
   * @example
   * const newUsers = await client.users.createMany([{name: 'John Doe', email: 'john@example.com'}, {name: 'Jane Smith', email: 'jane@example.com'}]);
   * @see {@link https://developer.zendesk.com/api-reference/ticketing/users/users/#create-many-users}
   */
  async createMany(users) {
    return this.post(['users', 'create_many'], users);
  }

  /**
   * Creates or updates a user.
   * @async
   * @param {Object} user - The user details.
   * @returns {Promise<Object>} The created or updated user's details.
   * @example
   * const user = await client.users.createOrUpdate({name: 'John Doe', email: 'john@example.com'});
   * @see {@link https://developer.zendesk.com/api-reference/ticketing/users/users/#create-or-update-user}
   */
  async createOrUpdate(user) {
    return this.post(['users', 'create_or_update'], user);
  }

  /**
   * Creates or updates multiple users.
   * @async
   * @param {Array<Object>} users - An array of user details.
   * @returns {Promise<Array<Object>>} An array of created or updated user details.
   * @example
   * const users = await client.users.createOrUpdateMany([{name: 'John Doe', email: 'john@example.com'}, {name: 'Jane Smith', email: 'jane@example.com'}]);
   * @see {@link https://developer.zendesk.com/api-reference/ticketing/users/users/#create-or-update-many-users}
   */
  async createOrUpdateMany(users) {
    return this.post(['users', 'create_or_update_many'], users);
  }

  /**
   * Updates a user by ID.
   * @async
   * @param {number} id - The ID of the user.
   * @param {Object} user - The updated user details.
   * @returns {Promise<Object>} The updated user's details.
   * @example
   * const updatedUser = await client.users.update(12345, {name: 'Johnathan Doe'});
   * @see {@link https://developer.zendesk.com/api-reference/ticketing/users/users/#update-user}
   */
  async update(id, user) {
    return this.put(['users', id], user);
  }

  /**
   * Updates multiple users.
   * @async
   * @param {...*} args - Arguments including optional IDs and user details.
   * @returns {Promise<Array<Object>>} An array of updated user details.
   * @throws {Error} Throws an error if not enough arguments are provided.
   * @example
   * const updatedUsers = await client.users.updateMany([12345, 67890], [{name: 'John Doe'}, {name: 'Jane Smith'}]);
   * @see {@link https://developer.zendesk.com/api-reference/ticketing/users/users/#update-many-users}
   */
  async updateMany(...args /* Optional ids, users, cb */) {
    if (args.length < 2) {
      throw new Error('Not enough arguments; at least two expected.');
    }

    const ids = args[0];
    const users = args.length === 2 ? args[0] : args[1];

    if (args.length === 2) {
      return this.put(['users', 'update_many'], users);
    }

    if (!ids) {
      return this.put(['users', 'update_many'], users);
    }

    if (typeof ids === 'string') {
      return this.put(
        ['users', 'update_many', '?ids=' + ids.toString()],
        users,
      );
    }

    if (typeof ids === 'object') {
      if (Array.isArray(ids)) {
        return this.put(
          ['users', 'update_many', '?ids=' + ids.join(',')],
          users,
        );
      }

      if (ids.hasOwn(ids, 'ids')) {
        return this.put(
          ['users', 'update_many', '?ids=' + ids.ids.toString()],
          users,
        );
      }

      if (ids.hasOwn(ids, 'external_ids')) {
        return this.put(
          [
            'users',
            'update_many',
            '?external_ids=' + ids.external_ids.toString(),
          ],
          users,
        );
      }
    }
  }

  /**
   * Suspends a user by ID.
   * @async
   * @param {number} id - The ID of the user to suspend.
   * @returns {Promise<Object>} The suspended user's details.
   * @example
   * await client.users.suspend(12345);
   * @see {@link https://developer.zendesk.com/api-reference/ticketing/users/users/#suspend-user}
   */
  async suspend(id) {
    return this.put(['users', id], {user: {suspended: true}});
  }

  /**
   * Unsuspends a user by ID.
   * @async
   * @param {number} id - The ID of the user to unsuspend.
   * @returns {Promise<Object>} The unsuspended user's details.
   * @example
   * await client.users.unsuspend(12345);
   * @see {@link https://developer.zendesk.com/api-reference/ticketing/users/users/#unsuspend-user}
   */
  async unsuspend(id) {
    return this.put(['users', id], {user: {suspended: false}});
  }

  /**
   * Deletes a user by ID.
   * @async
   * @param {number} id - The ID of the user to delete.
   * @returns {Promise<void>}
   * @throws {Error} Throws an error if the user cannot be deleted.
   * @example
   * await client.users.delete(12345);
   * @see {@link https://developer.zendesk.com/api-reference/ticketing/users/users/#delete-user}
   */
  async delete(id) {
    return super.delete(['users', id]);
  }

  /**
   * Deletes multiple users.
   * @async
   * @param {...*} args - Arguments including optional IDs and user details.
   * @returns {Promise<void>}
   * @throws {Error} Throws an error if not enough arguments are provided.
   * @example
   * await client.users.destroyMany([12345, 67890]);
   * @see {@link https://developer.zendesk.com/api-reference/ticketing/users/users/#delete-many-users}
   */
  async destroyMany(...args) {
    if (args.length < 2) {
      throw new Error('Not enough arguments; at least two expected.');
    }

    const ids = args[0];
    const users = args.length === 2 ? args[0] : args[1];

    if (args.length === 2) {
      return super.delete(['users', 'destroy_many'], users);
    }

    if (!ids) {
      return super.delete(['users', 'destroy_many'], users);
    }

    if (typeof ids === 'string') {
      return super.delete(
        ['users', 'destroy_many', '?ids=' + ids.toString()],
        users,
      );
    }

    if (typeof ids === 'object') {
      if (Array.isArray(ids)) {
        return super.delete(
          ['users', 'destroy_many', '?ids=' + ids.join(',')],
          users,
        );
      }

      if (ids.hasOwn(ids, 'ids')) {
        return super.delete(
          ['users', 'destroy_many', '?ids=' + ids.ids.toString()],
          users,
        );
      }

      if (ids.hasOwn(ids, 'external_ids')) {
        return super.delete(
          [
            'users',
            'destroy_many',
            '?external_ids=' + ids.external_ids.toString(),
          ],
          users,
        );
      }
    }
  }

  /**
   * Searches for users based on specific parameters.
   * @async
   * @param {Object} parameters - The search parameters.
   * @returns {Promise<Array<Object>>} An array of user objects that match the search criteria.
   * @example
   * const users = await client.users.search({query: 'john@example.com'});
   * @see {@link https://developer.zendesk.com/api-reference/ticketing/users/users/#search-users}
   */
  async search(parameters) {
    return this.getAll(['users', 'search', parameters]);
  }

  /**
   * Retrieves details of the currently authenticated user.
   * @async
   * @returns {Promise<import('../client.js').ApiResponse<any>>} The authenticated user's details.
   * @example
   * const user = await client.users.me();
   * @see {@link https://developer.zendesk.com/api-reference/ticketing/users/users/#show-the-currently-authenticated-user}
   */
  async me() {
    return this.get(['users', 'me']);
  }

  /**
   * Merges a user into another user.
   * @async
   * @param {number} id - The ID of the user to be merged.
   * @param {number} targetId - The ID of the user into which the first user will be merged.
   * @returns {Promise<Object>} The details of the merged user.
   * @example
   * await client.users.merge(12345, 67890);
   * @see {@link https://developer.zendesk.com/api-reference/ticketing/users/users/#merge-user-into-another-user}
   */
  async merge(id, targetId) {
    return this.put(['users', id, 'merge'], {user: {id: targetId}});
  }

  /**
   * Changes the password of a user.
   * @async
   * @param {number} userId - The ID of the user whose password is to be changed.
   * @param {string} oldPassword - The current password of the user.
   * @param {string} newPassword - The new password for the user.
   * @returns {Promise<Object>} The user's details after the password change.
   * @example
   * await client.users.password(12345, 'oldPassword123', 'newPassword456');
   * @see {@link https://developer.zendesk.com/api-reference/ticketing/users/users/#change-password}
   */
  async password(userId, oldPassword, newPassword) {
    return this.put(['users', userId, 'password'], {
      previous_password: oldPassword,
      password: newPassword,
    });
  }

  /**
   * Retrieves users incrementally with included related data.
   * @async
   * @param {number} startTime - The start time for the incremental export.
   * @param {string} include - The related data to include.
   * @returns {Promise<Array<Object>>} An array of user objects with included data.
   * @example
   * const users = await client.users.incrementalInclude(1632614395, 'relatedData');
   * @see {@link https://developer.zendesk.com/api-reference/ticketing/users/users/#incremental-export-users}
   */
  async incrementalInclude(startTime, include) {
    return this.getAll([
      'incremental',
      'users',
      {start_time: startTime, include},
    ]);
  }

  /**
   * Retrieves users incrementally.
   * @async
   * @param {number} startTime - The start time for the incremental export.
   * @returns {Promise<Array<Object>>} An array of user objects.
   * @example
   * const users = await client.users.incremental(1632614395);
   * @see {@link https://developer.zendesk.com/api-reference/ticketing/users/users/#incremental-export-users}
   */
  async incremental(startTime) {
    return this.getAll(['incremental', 'users', {start_time: startTime}]);
  }

  /**
   * Retrieves a sample of users incrementally.
   * @async
   * @param {number} startTime - The start time for the incremental export.
   * @returns {Promise<Array<Object>>} A sample array of user objects.
   * @example
   * const usersSample = await client.users.incrementalSample(1632614395);
   * @see {@link https://developer.zendesk.com/api-reference/ticketing/users/users/#incremental-sample-export-users}
   */
  async incrementalSample(startTime) {
    return this.get([
      'incremental',
      'users',
      'sample',
      {start_time: startTime},
    ]);
  }

  /**
   * Lists tags associated with a user.
   * @async
   * @param {number} userId - The ID of the user.
   * @returns {Promise<Array<string>>} An array of tags associated with the user.
   * @example
   * const tags = await client.users.listTags(12345);
   * @see {@link https://developer.zendesk.com/api-reference/ticketing/users/user-tags/#list-tags}
   */
  async listTags(userId) {
    return this.getAll(['users', userId, 'tags']);
  }

  /**
   * Sets tags for a user.
   * @async
   * @param {number} userId - The ID of the user.
   * @param {Array<string>} tags - An array of tags to set for the user.
   * @returns {Promise<Object>} The user's details with the updated tags.
   * @example
   * await client.users.setTags(12345, ['tag1', 'tag2']);
   * @see {@link https://developer.zendesk.com/api-reference/ticketing/users/user-tags/#set-tags}
   */
  async setTags(userId, tags) {
    return this.post(['users', userId, 'tags'], tags);
  }

  /**
   * Adds tags to a user.
   * @async
   * @param {number} userId - The ID of the user.
   * @param {Array<string>} tags - An array of tags to add to the user.
   * @returns {Promise<Object>} The user's details with the added tags.
   * @example
   * await client.users.addTags(12345, ['tag3', 'tag4']);
   * @see {@link https://developer.zendesk.com/api-reference/ticketing/users/user-tags/#add-tags}
   */
  async addTags(userId, tags) {
    return this.put(['users', userId, 'tags'], tags);
  }

  /**
   * Removes tags from a user.
   * @async
   * @param {number} userId - The ID of the user.
   * @param {Array<string>} tags - An array of tags to remove from the user.
   * @returns {Promise<void>}
   * @example
   * await client.users.removeTags(12345, ['tag3', 'tag4']);
   * @see {@link https://developer.zendesk.com/api-reference/ticketing/users/user-tags/#remove-tags}
   */
  async removeTags(userId, tags) {
    return super.delete(['users', userId, 'tags'], tags);
  }
}

exports.Users = Users;
