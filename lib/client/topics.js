// Topics.js: Client for the zendesk API.
const {Client} = require('./client');

class Topics extends Client {
  constructor(options) {
    super(options);
    this.jsonAPINames = ['topics', 'topic'];
    this.sideLoadMap = [
      {field: 'updater_id', name: 'updater', dataset: 'users'},
      {field: 'submitter_id', name: 'submitter', dataset: 'users'},
      {field: 'forum_id', name: 'forum', dataset: 'forums'},
    ];
  }

  // Listing Topics
  list(cb) {
    return this.getAll(['topics'], cb);
  }

  listByForum(forumID, cb) {
    return this.getAll(['forums', forumID, 'topics'], cb);
  }

  listByUser(userID, cb) {
    return this.getAll(['users', userID, 'topics'], cb);
  }

  // Viewing Topics

  show(topicID, cb) {
    return this.get(['topics', topicID], cb);
  }

  showMany(topicIDs, cb) {
    return this.get(['topics', 'show_many', {ids: topicIDs}], cb);
  }

  // Creating Topics
  create(topic, cb) {
    return this.post(['topics'], topic, cb);
  }

  // Updating Topics

  update(topicID, topic, cb) {
    return this.put(['topics', topicID], topic, cb);
  }

  // Deleting Topics
  delete(topicID, cb) {
    return this.delete(['topics', topicID], cb);
  }
}

exports.Topics = Topics;
