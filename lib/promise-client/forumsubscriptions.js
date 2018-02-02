//ForumSubscriptions.js: Client for the zendesk API.


var util        = require('util'),
    Client      = require('./client').Client,
    defaultgroups = require('./helpers').defaultgroups;


var ForumSubscriptions = exports.ForumSubscriptions = function (options) {
  this.jsonAPINames = [ 'forum_subscriptions', 'forum_subscription' ];
  Client.call(this, options);
};

// Inherit from Client base object
util.inherits(ForumSubscriptions, Client);

// ######################################################## ForumSubscriptions
// ====================================== Listing ForumSubscriptions
ForumSubscriptions.prototype.list = function list() {
  return this.requestAll('GET', ['forum_subscriptions']);//all
};

ForumSubscriptions.prototype.listByForum = function listByForum(forumID) {
  return this.requestAll('GET', ['forum', forumID, 'subscriptions']);//all
};

// ====================================== Viewing ForumSubscriptions

ForumSubscriptions.prototype.show = function show(forumSubscriptionId) {
  return this.request('GET', ['forum_subscriptions', forumSubscriptionId]);
};

// ====================================== Creating ForumSubscriptions
ForumSubscriptions.prototype.create = function create(forumSubscription) {
  return this.request('POST', ['forum_subscriptions'], forumSubscription);
};


// ====================================== Deleting ForumSubscriptions
ForumSubscriptions.prototype.delete = function (forumSubscriptionId) {
  return this.request('DELETE', ['forum_subscriptions', forumSubscriptionId]);
};
