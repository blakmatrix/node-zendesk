// TopicComments.js: Client for the zendesk API.
const {Client} = require('../client');

class TopicComments extends Client {
  constructor(options) {
    super(options);
    this.jsonAPINames = ['topic_comments', 'topic_comment'];
    this.sideLoadMap = [{field: 'user_id', name: 'user', dataset: 'users'}];
  }

  // Listing TopicComments
  async list(topicID) {
    return this.getAll(['topics', topicID, 'comments']);
  }

  async listByUser(userID) {
    return this.getAll(['users', userID, 'topic_comments']);
  }

  // Viewing TopicComments
  async show(topicID, commentID) {
    return this.get(['topics', topicID, 'comments', commentID]);
  }

  async showByUser(userID, commentID) {
    return this.get(['users', userID, 'topic_comments', commentID]);
  }

  // Creating TopicComments
  async create(topicID, comment) {
    return this.post(['topics', topicID, 'comments'], comment);
  }

  // Updating TopicComments
  async update(topicID, commentID, comment) {
    return this.put(['topics', topicID, 'comments', commentID], comment);
  }

  // Deleting TopicComments
  async delete(topicID, commentID) {
    return super.delete(['topics', topicID, 'comments', commentID]);
  }
}

exports.TopicComments = TopicComments;
