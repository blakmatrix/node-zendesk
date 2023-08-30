// TopicSubscriptions.js: Client for the zendesk API.
const {Client} = require('../client');

class TopicSubscriptions extends Client {
  constructor(options) {
    super(options);
    this.jsonAPINames = ['topic_subscriptions', 'topic_subscription'];
  }

  // Listing TopicSubscriptions
  async list() {
    return this.getAll(['topic_subscriptions']);
  }

  async listByTopic(topicID) {
    return this.getAll(['topic', topicID, 'subscriptions']);
  }

  // Viewing TopicSubscriptions
  async show(topicSubscriptionsID) {
    return this.get(['topic_subscriptions', topicSubscriptionsID]);
  }

  // Creating TopicSubscriptions
  async create(topicId, topicSubscription) {
    return this.post(['topics', topicId, 'subscriptions'], topicSubscription);
  }

  // Deleting TopicSubscriptions
  async delete(topicSubscriptionsID) {
    return super.delete(['topic_subscriptions', topicSubscriptionsID]);
  }
}

exports.TopicSubscriptions = TopicSubscriptions;
