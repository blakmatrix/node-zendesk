// TopicVotes.js: Client for the zendesk API.

const util = require('node:util');
const {Client} = require('./client');

const TopicVotes = (exports.TopicVotes = function (options) {
  this.jsonAPINames = ['topic_votes', 'topic_vote'];
  Client.call(this, options);
});

// Inherit from Client base object
util.inherits(TopicVotes, Client);

// ######################################################## TopicVotes
// ====================================== Listing TopicVotes
TopicVotes.prototype.list = function (topicID, cb) {
  return this.requestAll('GET', ['topics', topicID, 'votes'], cb); // All
};

TopicVotes.prototype.listByUser = function (userID, cb) {
  return this.requestAll('GET', ['users', userID, 'topic_votes'], cb); // All
};

// ====================================== Viewing TopicVotes

TopicVotes.prototype.show = function (topicID, cb) {
  return this.request('GET', ['topics', topicID, 'vote'], cb); // All
};

// ====================================== Creating TopicVotes
TopicVotes.prototype.create = function (topicID, vote, cb) {
  return this.request('POST', ['topics', topicID, 'vote'], vote, cb);
};

// ====================================== Deleting TopicVotes
TopicVotes.prototype.delete = function (topicID, cb) {
  return this.request('DELETE', ['topics', topicID, 'vote'], cb);
};
