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
ForumSubscriptions.prototype.list = function (cb) {
  this.requestAll('GET', ['forum_subscriptions'], cb);//all
};
ForumSubscriptions.prototype.listByForum = function (forumID, cb) {
  this.requestAll('GET', ['forum', forumID, 'subscriptions'], cb);//all
};



// ====================================== Viewing ForumSubscriptions

ForumSubscriptions.prototype.show = function (forumSubscriptionID, cb) {
  this.request('GET', ['forum_subscriptions', forumSubscriptionID], cb);
};

// ====================================== Creating ForumSubscriptions
ForumSubscriptions.prototype.create = function (forumSubscription, cb) {
  this.request('POST', ['forum_subscriptions'], forumSubscription, cb);
};


// ====================================== Deleting ForumSubscriptions
ForumSubscriptions.prototype.delete = function (forumSubscriptionID, cb) {
  this.request('DELETE', ['forum_subscriptions', forumSubscriptionID],  cb);
};
