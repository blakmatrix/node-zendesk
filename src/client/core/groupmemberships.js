// GroupMemberships.js: Client for the zendesk API.
const {Client} = require('../client');

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
  async list() {
    return this.getAll(['group_memberships']);
  }

  async listByUser(userID) {
    return this.getAll(['users', userID, 'group_memberships']);
  }

  async listByGroup(groupID) {
    return this.getAll(['groups', groupID, 'memberships']);
  }

  // Viewing GroupMemberships

  async show(groupMembershipID) {
    return this.get(['group_memberships', groupMembershipID]);
  }

  async showByUser(userID, groupMembershipID) {
    return this.get(['users', userID, 'group_memberships', groupMembershipID]);
  }

  // Creating GroupMemberships
  async create(groupMembership) {
    return this.post(['group_memberships'], groupMembership);
  }

  async createByUser(userID, groupMembership) {
    return this.post(['users', userID, 'group_memberships'], groupMembership);
  }

  // Deleting GroupMemberships
  async delete(groupMembershipID) {
    return super.delete(['group_memberships', groupMembershipID]);
  }

  async deleteByUser(userID, groupMembershipID) {
    return super.delete([
      'users',
      userID,
      'group_memberships',
      groupMembershipID,
    ]);
  }

  // Set membership as default
  async makeDefault(userID, groupMembershipID) {
    return this.put([
      'users',
      userID,
      'group_memberships',
      groupMembershipID,
      'make_default',
    ]);
  }
}

exports.GroupMemberships = GroupMemberships;
