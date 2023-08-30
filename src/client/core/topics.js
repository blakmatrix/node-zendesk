// Topics.js: Client for the zendesk API.
const {Client} = require('../client');

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
  async list() {
    return this.getAll(['topics']);
  }

  async listByForum(forumID) {
    return this.getAll(['forums', forumID, 'topics']);
  }

  async listByUser(userID) {
    return this.getAll(['users', userID, 'topics']);
  }

  // Viewing Topics

  async show(topicID) {
    return this.get(['topics', topicID]);
  }

  async showMany(topicIDs) {
    return this.get(['topics', 'show_many', {ids: topicIDs}]);
  }

  // Creating Topics
  async create(topic) {
    return this.post(['topics'], topic);
  }

  // Updating Topics

  async update(topicID, topic) {
    return this.put(['topics', topicID], topic);
  }

  // Deleting Topics
  async delete(topicID) {
    return super.delete(['topics', topicID]);
  }
}

exports.Topics = Topics;
