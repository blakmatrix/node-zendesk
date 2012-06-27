//TopicComments.js: Client for the zendesk API.


var util        = require('util'),
    Client      = require('./client').Client,
    defaultgroups = require('./helpers').defaultgroups;


var TopicComments = exports.TopicComments = function (options) {
  Client.call(this, options);
};

// Inherit from Client base object
util.inherits(TopicComments, Client);

// ######################################################## TopicComments
// ====================================== Listing TopicComments
TopicComments.prototype.list = function (topicID, cb) {
  this.request('GET', ['topics', topicID, 'comments'], cb);//all
};

TopicComments.prototype.listByUser = function (userID, cb) {
  this.request('GET', ['users', userID, 'topic_comments'], cb);//all
};


// ====================================== Viewing TopicComments

TopicComments.prototype.show = function (topicID, commentID, cb) {
  this.request('GET', ['topics', topicID, 'comments', commentID], cb);//all
};

TopicComments.prototype.showByUser = function (userID, commentID, cb) {
  this.request('GET', ['users', userID, 'topic_comments', commentID], cb);//all
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
  this.request('DEL', ['topics', topicID, 'comments', commentID], cb);
};
