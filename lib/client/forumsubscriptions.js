// ForumSubscriptions.js: Client for the zendesk API.

const {Client} = require('./client');

class ForumSubscriptions extends Client {
  constructor(options) {
    super(options);
    this.jsonAPINames = ['forum_subscriptions', 'forum_subscription'];
  }

  // Listing ForumSubscriptions
  list(cb) {
    return this.getAll(['forum_subscriptions'], cb);
  }

  listByForum(forumID, cb) {
    return this.getAll(['forum', forumID, 'subscriptions'], cb);
  }

  // Viewing ForumSubscriptions
  show(forumSubscriptionID, cb) {
    return this.get(['forum_subscriptions', forumSubscriptionID], cb);
  }

  // Creating ForumSubscriptions
  create(forumSubscription, cb) {
    return this.post(['forum_subscriptions'], forumSubscription, cb);
  }

  // Deleting ForumSubscriptions
  delete(forumSubscriptionID, cb) {
    return this.delete(['forum_subscriptions', forumSubscriptionID], cb);
  }
}

exports.ForumSubscriptions = ForumSubscriptions;
