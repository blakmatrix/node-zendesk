// TopicVotes.js: Client for the zendesk API.
const {Client} = require('../client');

class TopicVotes extends Client {
  constructor(options) {
    super(options);
    this.jsonAPINames = ['settings'];
  }

  // Listing TopicVotes
  async list(topicID) {
    return this.getAll(['topics', topicID, 'votes']);
  }

  async listByUser(userID) {
    return this.getAll(['users', userID, 'topic_votes']);
  }

  // Viewing TopicVotes
  async show(topicID) {
    return this.get(['topics', topicID, 'vote']);
  }

  // Creating TopicVotes
  async create(topicID, vote) {
    return this.post(['topics', topicID, 'vote'], vote);
  }

  // Deleting TopicVotes
  async delete(topicID) {
    return this.delete(['topics', topicID, 'vote']);
  }
}

exports.TopicVotes = TopicVotes;
