// PermissionGroups.js: Client for the zendesk API.
const {Client} = require('./client');

class PermissionGroups extends Client {
  constructor(options) {
    super(options);
    this.jsonAPINames = ['permission_groups'];
  }

  // Listing Permission Groups
  list(cb) {
    return this.getAll(['guide', 'permission_groups'], cb);
  }

  // Viewing Permission Groups
  show(groupID, cb) {
    return this.get(['guide', 'permission_groups', groupID], cb);
  }

  // Creating Permission Groups
  create(group, cb) {
    return this.post(['guide', 'permission_groups'], group, cb);
  }

  // Updating Permission Groups
  update(groupID, group, cb) {
    return this.put(['guide', 'permission_groups', groupID], group, cb);
  }

  // Deleting Permission Groups
  delete(groupID, cb) {
    return this.delete(['guide', 'permission_groups', groupID], cb);
  }
}

exports.PermissionGroups = PermissionGroups;
