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

  auth(cb) {
    return this.get(['users', 'me'], cb);
  }

  list(cb) {
    return this.getAll(['users', '?page[size]=100'], cb);
  }

  listWithFilter(type, value, cb) {
    return this.getAll(['users', {[type]: value}, '?page[size]=100'], cb);
  }

  listByGroup(id, cb) {
    return this.getAll(['groups', id, 'users', '?page[size]=100'], cb);
  }

  listByOrganization(id, cb) {
    return this.getAll(['organizations', id, 'users', '?page[size]=100'], cb);
  }

  show(id, cb) {
    return this.get(['users', id], cb);
  }

  showMany(userIds, cb) {
    return this.get(['users', 'show_many', '?ids=' + userIds.toString()], cb);
  }

  create(user, cb) {
    return this.post(['users'], user, cb);
  }

  createMany(users, cb) {
    return this.post(['users', 'create_many'], users, cb);
  }

  createOrUpdate(user, cb) {
    return this.post(['users', 'create_or_update'], user, cb);
  }

  createOrUpdateMany(users, cb) {
    return this.post(['users', 'create_or_update_many'], users, cb);
  }

  update(id, user, cb) {
    return this.put(['users', id], user, cb);
  }

  updateMany(...args /* Optional ids, users, cb */) {
    if (args.length < 2) {
      throw new Error('Not enough arguments; at least two expected.');
    }

    const ids = args[0];
    const users = args.length === 2 ? args[0] : args[1];
    const cb = args.length === 2 ? args[1] : args[2];

    if (args.length === 2) {
      return this.put(['users', 'update_many'], users, cb);
    }

    if (!ids) {
      return this.put(['users', 'update_many'], users, cb);
    }

    if (typeof ids === 'string') {
      return this.put(
        ['users', 'update_many', '?ids=' + ids.toString()],
        users,
        cb,
      );
    }

    if (typeof ids === 'object') {
      if (Array.isArray(ids)) {
        return this.put(
          ['users', 'update_many', '?ids=' + ids.join(',')],
          users,
          cb,
        );
      }

      if (ids.hasOwn(ids, 'ids')) {
        return this.put(
          ['users', 'update_many', '?ids=' + ids.ids.toString()],
          users,
          cb,
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
          cb,
        );
      }
    }
  }

  suspend(id, cb) {
    return this.put(['users', id], {user: {suspended: true}}, cb);
  }

  unsuspend(id, cb) {
    return this.put(['users', id], {user: {suspended: false}}, cb);
  }

  delete(id, cb) {
    return this.delete(['users', id], cb);
  }

  destroyMany(...args) {
    if (args.length < 2) {
      throw new Error('Not enough arguments; at least two expected.');
    }

    const ids = args[0];
    const users = args.length === 2 ? args[0] : args[1];
    const cb = args.length === 2 ? args[1] : args[2];

    if (args.length === 2) {
      return this.delete(['users', 'destroy_many'], users, cb);
    }

    if (!ids) {
      return this.delete(['users', 'destroy_many'], users, cb);
    }

    if (typeof ids === 'string') {
      return this.delete(
        ['users', 'destroy_many', '?ids=' + ids.toString()],
        users,
        cb,
      );
    }

    if (typeof ids === 'object') {
      if (Array.isArray(ids)) {
        return this.delete(
          ['users', 'destroy_many', '?ids=' + ids.join(',')],
          users,
          cb,
        );
      }

      if (ids.hasOwn(ids, 'ids')) {
        return this.delete(
          ['users', 'destroy_many', '?ids=' + ids.ids.toString()],
          users,
          cb,
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
          cb,
        );
      }
    }
  }

  search(parameters, cb) {
    return this.getAll(['users', 'search', parameters], cb);
  }

  me(cb) {
    return this.get(['users', 'me'], cb);
  }

  merge(id, targetId, cb) {
    return this.put(['users', id, 'merge'], {user: {id: targetId}}, cb);
  }

  password(userId, oldPassword, newPassword, cb) {
    return this.put(
      ['users', userId, 'password'],
      {previous_password: oldPassword, password: newPassword},
      cb,
    );
  }

  incrementalInclude(startTime, include, cb) {
    return this.getAll(
      ['incremental', 'users', {start_time: startTime, include}],
      cb,
    );
  }

  incremental(startTime, cb) {
    return this.getAll(['incremental', 'users', {start_time: startTime}], cb);
  }

  incrementalSample(startTime, cb) {
    return this.get(
      ['incremental', 'users', 'sample', {start_time: startTime}],
      cb,
    );
  }

  // User Tags

  listTags(userId, cb) {
    return this.getAll(['users', userId, 'tags'], cb);
  }

  setTags(userId, tags, cb) {
    return this.post(['users', userId, 'tags'], tags, cb);
  }

  addTags(userId, tags, cb) {
    return this.put(['users', userId, 'tags'], tags, cb);
  }

  removeTags(userId, tags, cb) {
    return this.delete(['users', userId, 'tags'], tags, cb);
  }
}

exports.Users = Users;
