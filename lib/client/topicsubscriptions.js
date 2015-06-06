//TopicSubscriptions.js: Client for the zendesk API.


var util        = require('util'),
    Client      = require('./client').Client,
    defaultgroups = require('./helpers').defaultgroups;


var TopicSubscriptions = exports.TopicSubscriptions = function (options) {
  this.jsonAPINames = [ 'topic_subscriptions', 'topic_subscription' ];
  Client.call(this, options);
};

// Inherit from Client base object
util.inherits(TopicSubscriptions, Client);

// ######################################################## TopicSubscriptions
// ====================================== Listing TopicSubscriptions
TopicSubscriptions.prototype.list = function (cb) {
  this.requestAll('GET', ['topic_subscriptions'], cb);//all
};
TopicSubscriptions.prototype.listByTopic = function (topicID, cb) {
  this.requestAll('GET', ['topic', topicID, 'subscriptions'], cb);//all
};



// ====================================== Viewing TopicSubscriptions

TopicSubscriptions.prototype.show = function (topicSubscriptionsID, cb) {
  this.request('GET', ['topic_subscriptions', topicSubscriptionsID], cb);
};

// ====================================== Creating TopicSubscriptions
TopicSubscriptions.prototype.create = function (topicSubscription, cb) {
  this.request('POST', ['topic_subscriptions'], topicSubscription, cb);
};


// ====================================== Deleting TopicSubscriptions
TopicSubscriptions.prototype.delete = function (topicSubscriptionsID, cb) {
  this.request('DELETE', ['topic_subscriptions', topicSubscriptionsID],  cb);
};
