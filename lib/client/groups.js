// Groups.js: Client for the zendesk API.
const {Client} = require('./client');

class Groups extends Client {
  constructor(options) {
    super(options);
    this.jsonAPINames = ['groups', 'group'];
    this.sideLoadMap = [
      {field: 'user_id', name: 'users', dataset: 'users', all: true},
    ];
  }

  // Listing Groups
  list(cb) {
    return this.getAll(['groups', '?page[size]=100'], cb);
  }

  // Viewing Groups
  assignable(cb) {
    return this.getAll(['groups', 'assignable', '?page[size]=100'], cb);
  }

  show(groupID, cb) {
    return this.get(['groups', groupID], cb);
  }

  // Creating Groups
  create(group, cb) {
    return this.post(['groups'], group, cb);
  }

  // Updating Groups

  update(groupID, group, cb) {
    return this.put(['groups', groupID], group, cb);
  }

  // Deleting Groups
  delete(groupID, cb) {
    return this.delete(['groups', groupID], cb);
  }
}

exports.Groups = Groups;
