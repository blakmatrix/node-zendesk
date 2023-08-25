// TopicComments.js: Client for the zendesk API.
const {Client} = require('./client');

class TopicComments extends Client {
  constructor(options) {
    super(options);
    this.jsonAPINames = ['topic_comments', 'topic_comment'];
    this.sideLoadMap = [{field: 'user_id', name: 'user', dataset: 'users'}];
  }

  // Listing TopicComments
  list(topicID, cb) {
    return this.getAll(['topics', topicID, 'comments'], cb);
  }

  listByUser(userID, cb) {
    return this.getAll(['users', userID, 'topic_comments'], cb);
  }

  // Viewing TopicComments
  show(topicID, commentID, cb) {
    return this.get(['topics', topicID, 'comments', commentID], cb);
  }

  showByUser(userID, commentID, cb) {
    return this.get(['users', userID, 'topic_comments', commentID], cb);
  }

  // Creating TopicComments
  create(topicID, comment, cb) {
    return this.post(['topics', topicID, 'comments'], comment, cb);
  }

  // Updating TopicComments
  update(topicID, commentID, comment, cb) {
    return this.put(['topics', topicID, 'comments', commentID], comment, cb);
  }

  // Deleting TopicComments
  delete(topicID, commentID, cb) {
    return this.delete(['topics', topicID, 'comments', commentID], cb);
  }
}

exports.TopicComments = TopicComments;
