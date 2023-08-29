// ForumSubscriptions.js: Client for the zendesk API.

const {Client} = require('../client');

class ForumSubscriptions extends Client {
  constructor(options) {
    super(options);
    this.jsonAPINames = ['forum_subscriptions', 'forum_subscription'];
  }

  // Listing ForumSubscriptions
  async list() {
    return this.getAll(['forum_subscriptions']);
  }

  async listByForum(forumID) {
    return this.getAll(['forum', forumID, 'subscriptions']);
  }

  // Viewing ForumSubscriptions
  async show(forumSubscriptionID) {
    return this.get(['forum_subscriptions', forumSubscriptionID]);
  }

  // Creating ForumSubscriptions
  async create(forumSubscription) {
    return this.post(['forum_subscriptions'], forumSubscription);
  }

  // Deleting ForumSubscriptions
  async delete(forumSubscriptionID) {
    return super.delete(['forum_subscriptions', forumSubscriptionID]);
  }
}

exports.ForumSubscriptions = ForumSubscriptions;
