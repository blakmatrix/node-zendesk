// Forums.js: Client for the zendesk API.

const {Client} = require('./client');

class Forums extends Client {
  constructor(options) {
    super(options);
    this.jsonAPINames = ['forums', 'forum'];
  }

  // Listing Forums
  list(cb) {
    return this.getAll(['forums'], cb);
  }

  listByCategory(categoryID, cb) {
    return this.getAll(['categories', categoryID, 'forums'], cb);
  }

  // Viewing Forums
  show(forumID, cb) {
    return this.get(['forums', forumID], cb);
  }

  // Creating Forums
  create(forum, cb) {
    return this.post(['forums'], forum, cb);
  }

  // Updating Forums
  update(forumID, forum, cb) {
    return this.put(['forums', forumID], forum, cb);
  }

  // Deleting Forums
  delete(forumID, cb) {
    return this.delete(['forums', forumID], cb);
  }
}

exports.Forums = Forums;
