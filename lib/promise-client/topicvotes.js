//TopicVotes.js: Client for the zendesk API.


var util        = require('util'),
  Client      = require('./client').Client,
  defaultgroups = require('./helpers').defaultgroups;


var TopicVotes = exports.TopicVotes = function (options) {
  this.jsonAPINames = [ 'topic_votes', 'topic_vote' ];
  Client.call(this, options);
};

// Inherit from Client base object
util.inherits(TopicVotes, Client);

// ######################################################## TopicVotes
// ====================================== Listing TopicVotes
TopicVotes.prototype.list = function (topicID) {
  return this.requestAll('GET', ['topics', topicID, 'votes']);//all
};

TopicVotes.prototype.listByUser = function (userID) {
  return this.requestAll('GET', ['users', userID, 'topic_votes']);//all
};


// ====================================== Viewing TopicVotes

TopicVotes.prototype.show = function (topicID) {
  return this.request('GET', ['topics', topicID, 'vote']);//all
};


// ====================================== Creating TopicVotes
TopicVotes.prototype.create = function (topicID, vote) {
  return this.request('POST', ['topics', topicID, 'vote'], vote);
};



// ====================================== Deleting TopicVotes
TopicVotes.prototype.delete = function (topicID) {
  return this.request('DELETE', ['topics', topicID, 'vote']);
};
