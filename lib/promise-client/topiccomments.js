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
TopicComments.prototype.list = function (topicID) {
  return this.requestAll('GET', ['topics', topicID, 'comments']);//all
};

TopicComments.prototype.listByUser = function (userID) {
  return this.requestAll('GET', ['users', userID, 'topic_comments']);//all
};


// ====================================== Viewing TopicComments

TopicComments.prototype.show = function (topicID, commentID) {
  return this.request('GET', ['topics', topicID, 'comments', commentID]);
};

TopicComments.prototype.showByUser = function (userID, commentID) {
  return this.request('GET', ['users', userID, 'topic_comments', commentID]);
};

// ====================================== Creating TopicComments
TopicComments.prototype.create = function (topicID, comment) {
  return this.request('POST', ['topics', topicID, 'comments'], comment);
};

// ====================================== Updating TopicComments

TopicComments.prototype.update = function (topicID, commentID, comment) {
  return this.request('PUT', ['topics', topicID, 'comments', commentID], comment);
};


// ====================================== Deleting TopicComments
TopicComments.prototype.delete = function (topicID, commentID) {
  return this.request('DELETE', ['topics', topicID, 'comments', commentID]);
};
