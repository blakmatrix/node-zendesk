//TopicComments.js: Client for the zendesk API.


var util        = require('util'),
    Client      = require('./client').Client,
    defaultgroups = require('./helpers').defaultgroups;


var TopicComments = exports.TopicComments = function (options) {
  this.jsonAPINames = [ 'topic_comments', 'topic_comment'];
  this.sideLoadMap = [
    { field: 'user_id', name: 'user', dataset: 'users'}
  ];

  Client.call(this, options);
};

// Inherit from Client base object
util.inherits(TopicComments, Client);

// ######################################################## TopicComments
// ====================================== Listing TopicComments
TopicComments.prototype.list = function (topicID, cb) {
  this.requestAll('GET', ['topics', topicID, 'comments'], cb);//all
};

TopicComments.prototype.listByUser = function (userID, cb) {
  this.requestAll('GET', ['users', userID, 'topic_comments'], cb);//all
};


// ====================================== Viewing TopicComments

TopicComments.prototype.show = function (topicID, commentID, cb) {
  this.request('GET', ['topics', topicID, 'comments', commentID], cb);
};

TopicComments.prototype.showByUser = function (userID, commentID, cb) {
  this.request('GET', ['users', userID, 'topic_comments', commentID], cb);
};

// ====================================== Creating TopicComments
TopicComments.prototype.create = function (topicID, comment, cb) {
  this.request('POST', ['topics', topicID, 'comments'], comment, cb);
};

// ====================================== Updating TopicComments

TopicComments.prototype.update = function (topicID, commentID, comment, cb) {
  this.request('PUT', ['topics', topicID, 'comments', commentID], comment, cb);
};


// ====================================== Deleting TopicComments
TopicComments.prototype.delete = function (topicID, commentID, cb) {
  this.request('DELETE', ['topics', topicID, 'comments', commentID], cb);
};
