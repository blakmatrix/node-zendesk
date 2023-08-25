// TopicVotes.js: Client for the zendesk API.
const {Client} = require('./client');

class TopicVotes extends Client {
  constructor(options) {
    super(options);
    this.jsonAPINames = ['settings'];
  }

  // Listing TopicVotes
  list(topicID, cb) {
    return this.getAll(['topics', topicID, 'votes'], cb);
  }

  listByUser(userID, cb) {
    return this.getAll(['users', userID, 'topic_votes'], cb);
  }

  // Viewing TopicVotes
  show(topicID, cb) {
    return this.get(['topics', topicID, 'vote'], cb);
  }

  // Creating TopicVotes
  create(topicID, vote, cb) {
    return this.post(['topics', topicID, 'vote'], vote, cb);
  }

  // Deleting TopicVotes
  delete(topicID, cb) {
    return this.delete(['topics', topicID, 'vote'], cb);
  }
}

exports.TopicVotes = TopicVotes;
