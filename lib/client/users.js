// Users.js: Client for the zendesk API.

const {Client} = require('./client');

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

  // Users

  async auth() {
    return this.get(['users', 'me']);
  }

  async list() {
    return this.getAll(['users', '?page[size]=100']);
  }

  async listWithFilter(type, value) {
    return this.getAll(['users', {[type]: value}, '?page[size]=100']);
  }

  async listByGroup(id) {
    return this.getAll(['groups', id, 'users', '?page[size]=100']);
  }

  async listByOrganization(id) {
    return this.getAll(['organizations', id, 'users', '?page[size]=100']);
  }

  async show(id) {
    return this.get(['users', id]);
  }

  async showMany(userIds) {
    return this.get(['users', 'show_many', '?ids=' + userIds.toString()]);
  }

  async create(user) {
    return this.post(['users'], user);
  }

  async createMany(users) {
    return this.post(['users', 'create_many'], users);
  }

  async createOrUpdate(user) {
    return this.post(['users', 'create_or_update'], user);
  }

  async createOrUpdateMany(users) {
    return this.post(['users', 'create_or_update_many'], users);
  }

  async update(id, user) {
    return this.put(['users', id], user);
  }

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

  async suspend(id) {
    return this.put(['users', id], {user: {suspended: true}});
  }

  async unsuspend(id) {
    return this.put(['users', id], {user: {suspended: false}});
  }

  async delete(id) {
    return this.delete(['users', id]);
  }

  async destroyMany(...args) {
    if (args.length < 2) {
      throw new Error('Not enough arguments; at least two expected.');
    }

    const ids = args[0];
    const users = args.length === 2 ? args[0] : args[1];

    if (args.length === 2) {
      return this.delete(['users', 'destroy_many'], users);
    }

    if (!ids) {
      return this.delete(['users', 'destroy_many'], users);
    }

    if (typeof ids === 'string') {
      return this.delete(
        ['users', 'destroy_many', '?ids=' + ids.toString()],
        users,
      );
    }

    if (typeof ids === 'object') {
      if (Array.isArray(ids)) {
        return this.delete(
          ['users', 'destroy_many', '?ids=' + ids.join(',')],
          users,
        );
      }

      if (ids.hasOwn(ids, 'ids')) {
        return this.delete(
          ['users', 'destroy_many', '?ids=' + ids.ids.toString()],
          users,
        );
      }

      if (ids.hasOwn(ids, 'external_ids')) {
        return this.delete(
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

  async search(parameters) {
    return this.getAll(['users', 'search', parameters]);
  }

  async me() {
    return this.get(['users', 'me']);
  }

  async merge(id, targetId) {
    return this.put(['users', id, 'merge'], {user: {id: targetId}});
  }

  async password(userId, oldPassword, newPassword) {
    return this.put(['users', userId, 'password'], {
      previous_password: oldPassword,
      password: newPassword,
    });
  }

  async incrementalInclude(startTime, include) {
    return this.getAll([
      'incremental',
      'users',
      {start_time: startTime, include},
    ]);
  }

  async incremental(startTime) {
    return this.getAll(['incremental', 'users', {start_time: startTime}]);
  }

  async incrementalSample(startTime) {
    return this.get([
      'incremental',
      'users',
      'sample',
      {start_time: startTime},
    ]);
  }

  // User Tags

  async listTags(userId) {
    return this.getAll(['users', userId, 'tags']);
  }

  async setTags(userId, tags) {
    return this.post(['users', userId, 'tags'], tags);
  }

  async addTags(userId, tags) {
    return this.put(['users', userId, 'tags'], tags);
  }

  async removeTags(userId, tags) {
    return this.delete(['users', userId, 'tags'], tags);
  }
}

exports.Users = Users;
