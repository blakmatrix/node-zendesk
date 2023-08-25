// GroupMemberships.js: Client for the zendesk API.
const {Client} = require('./client');

class GroupMemberships extends Client {
  constructor(options) {
    super(options);
    this.jsonAPINames = ['group_memberships', 'group_membership'];
    this.sideLoadMap = [
      {field: 'group_id', name: 'groups', dataset: 'groups'},
      {field: 'user_id', name: 'user', dataset: 'users'},
    ];
  }

  // Listing GroupMemberships
  list(cb) {
    return this.getAll(['group_memberships', '?page[size]=100'], cb);
  }

  listByUser(userID, cb) {
    return this.getAll(
      ['users', userID, 'group_memberships', '?page[size]=100'],
      cb,
    );
  }

  listByGroup(groupID, cb) {
    return this.getAll(
      ['groups', groupID, 'memberships', '?page[size]=100'],
      cb,
    );
  }

  // Viewing GroupMemberships

  show(groupMembershipID, cb) {
    return this.get(['group_memberships', groupMembershipID], cb);
  }

  showByUser(userID, groupMembershipID, cb) {
    return this.get(
      ['users', userID, 'group_memberships', groupMembershipID],
      cb,
    );
  }

  // Creating GroupMemberships
  create(groupMembership, cb) {
    return this.post(['group_memberships'], groupMembership, cb);
  }

  createByUser(userID, groupMembership, cb) {
    return this.post(
      ['users', userID, 'group_memberships'],
      groupMembership,
      cb,
    );
  }

  // Deleting GroupMemberships
  delete(groupMembershipID, cb) {
    return this.delete(['group_memberships', groupMembershipID], cb);
  }

  deleteByUser(userID, groupMembershipID, cb) {
    return this.delete(
      ['users', userID, 'group_memberships', groupMembershipID],
      cb,
    );
  }

  // Set membership as default
  makeDefault(userID, groupMembershipID, cb) {
    return this.put(
      ['users', userID, 'group_memberships', groupMembershipID, 'make_default'],
      cb,
    );
  }
}

exports.GroupMemberships = GroupMemberships;
