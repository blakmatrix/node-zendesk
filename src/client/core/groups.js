// Groups.js: Client for the zendesk API.
const {Client} = require('../client');

class Groups extends Client {
  constructor(options) {
    super(options);
    this.jsonAPINames = ['groups', 'group'];
    this.sideLoadMap = [
      {field: 'user_id', name: 'users', dataset: 'users', all: true},
    ];
  }

  // Listing Groups
  async list() {
    return this.getAll(['groups', '?page[size]=100']);
  }

  // Viewing Groups
  async assignable() {
    return this.getAll(['groups', 'assignable', '?page[size]=100']);
  }

  async show(groupID) {
    return this.get(['groups', groupID]);
  }

  // Creating Groups
  async create(group) {
    return this.post(['groups'], group);
  }

  // Updating Groups

  async update(groupID, group) {
    return this.put(['groups', groupID], group);
  }

  // Deleting Groups
  async delete(groupID) {
    return super.delete(['groups', groupID]);
  }
}

exports.Groups = Groups;
