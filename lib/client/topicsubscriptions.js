// TopicSubscriptions.js: Client for the zendesk API.
const {Client} = require('./client');

class TopicSubscriptions extends Client {
  constructor(options) {
    super(options);
    this.jsonAPINames = ['topic_subscriptions', 'topic_subscription'];
  }

  // Listing TopicSubscriptions
  list(cb) {
    return this.getAll(['topic_subscriptions'], cb);
  }

  listByTopic(topicID, cb) {
    return this.getAll(['topic', topicID, 'subscriptions'], cb);
  }

  // Viewing TopicSubscriptions
  show(topicSubscriptionsID, cb) {
    return this.get(['topic_subscriptions', topicSubscriptionsID], cb);
  }

  // Creating TopicSubscriptions
  create(topicId, topicSubscription, cb) {
    return this.post(
      ['topics', topicId, 'subscriptions'],
      topicSubscription,
      cb,
    );
  }

  // Deleting TopicSubscriptions
  delete(topicSubscriptionsID, cb) {
    return this.delete(['topic_subscriptions', topicSubscriptionsID], cb);
  }
}

exports.TopicSubscriptions = TopicSubscriptions;
