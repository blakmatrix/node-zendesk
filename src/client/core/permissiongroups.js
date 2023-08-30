// PermissionGroups.js: Client for the zendesk API.
const {Client} = require('../client');

class PermissionGroups extends Client {
  constructor(options) {
    super(options);
    this.jsonAPINames = ['permission_groups'];
  }

  // Listing Permission Groups
  async list() {
    return this.getAll(['guide', 'permission_groups']);
  }

  // Viewing Permission Groups
  async show(groupID) {
    return this.get(['guide', 'permission_groups', groupID]);
  }

  // Creating Permission Groups
  async create(group) {
    return this.post(['guide', 'permission_groups'], group);
  }

  // Updating Permission Groups
  async update(groupID, group) {
    return this.put(['guide', 'permission_groups', groupID], group);
  }

  // Deleting Permission Groups
  async delete(groupID) {
    return super.delete(['guide', 'permission_groups', groupID]);
  }
}

exports.PermissionGroups = PermissionGroups;
