// Forums.js: Client for the zendesk API.

const {Client} = require('../client');

class Forums extends Client {
  constructor(options) {
    super(options);
    this.jsonAPINames = ['forums', 'forum'];
  }

  // Listing Forums
  async list() {
    return this.getAll(['forums']);
  }

  async listByCategory(categoryID) {
    return this.getAll(['categories', categoryID, 'forums']);
  }

  // Viewing Forums
  async show(forumID) {
    return this.get(['forums', forumID]);
  }

  // Creating Forums
  async create(forum) {
    return this.post(['forums'], forum);
  }

  // Updating Forums
  async update(forumID, forum) {
    return this.put(['forums', forumID], forum);
  }

  // Deleting Forums
  async delete(forumID) {
    return super.delete(['forums', forumID]);
  }
}

exports.Forums = Forums;
