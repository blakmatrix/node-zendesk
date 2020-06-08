//TopicVotes.js: Client for the zendesk API.


var util        = require('util'),
    Client      = require('./client').Client;

var TopicVotes = exports.TopicVotes = function (options) {
  this.jsonAPINames = [ 'topic_votes', 'topic_vote' ];
  Client.call(this, options);
};

// Inherit from Client base object
util.inherits(TopicVotes, Client);

// ######################################################## TopicVotes
// ====================================== Listing TopicVotes
TopicVotes.prototype.list = function (topicID, cb) {
  return this.requestAll('GET', ['topics', topicID, 'votes'], cb);//all
};

TopicVotes.prototype.listByUser = function (userID, cb) {
  return this.requestAll('GET', ['users', userID, 'topic_votes'], cb);//all
};


// ====================================== Viewing TopicVotes

TopicVotes.prototype.show = function (topicID, cb) {
  return this.request('GET', ['topics', topicID, 'vote'], cb);//all
};


// ====================================== Creating TopicVotes
TopicVotes.prototype.create = function (topicID, vote, cb) {
  return this.request('POST', ['topics', topicID, 'vote'], vote, cb);
};



// ====================================== Deleting TopicVotes
TopicVotes.prototype.delete = function (topicID, cb) {
  return this.request('DELETE', ['topics', topicID, 'vote'], cb);
};
