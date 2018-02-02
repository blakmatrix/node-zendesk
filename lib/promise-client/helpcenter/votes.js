//Votes.js: Client for the zendesk help center API.


var util = require('util'),
  Client = require('../client').Client
//defaultgroups = require('./helpers').defaultgroups;


var Votes = exports.Votes = function (options) {
  this.jsonAPINames = [ 'votes', 'vote' ];
  Client.call(this, options);
};

// Inherit from Client base object
util.inherits(Votes, Client);

// ######################################################## Votes

// ====================================== Listing Votes By User

Votes.prototype.listByUser = function (userID) {
  //Do not need requesetAll
  return this.request('GET', ['users', userID, 'votes']);
};

// ====================================== Listing Votes By Article

Votes.prototype.listByArticle = function (articleID) {
  //Do not need requesetAll
  return this.request('GET', ['articles', articleID, 'votes']);
};

// ====================================== Viewing Votes
Votes.prototype.show = function (voteID) {
  return this.request('GET', ['votes', voteID]);
};

// ====================================== Vote Up For Article
Votes.prototype.createUpVoteForArticle = function (articleID) {
  return this.request('POST', ['articles' , articleID, 'up']);
};

// ====================================== Vote Down For Article
Votes.prototype.createDownVoteForArticle = function (articleID) {
  return this.request('POST', ['articles' , articleID, 'down']);
};

// ====================================== Vote Up For Question
Votes.prototype.createUpVoteForQuestion = function (questionID) {
  return this.request('POST', ['questions' , questionID, 'up']);
};

// ====================================== Vote Down For Question
Votes.prototype.createDownVoteForQuestion = function (questionID) {
  return this.request('POST', ['questions' , questionID, 'down']);
};

// ====================================== Vote Up For Answer
Votes.prototype.createUpVoteForAnswer = function (answerID) {
  return this.request('POST', ['answers' , answerID, 'up']);
};

// ====================================== Vote Down For Answer
Votes.prototype.createDownVoteForAnswer = function (answerID) {
  return this.request('POST', ['answers' , answerID, 'down']);
};

// ====================================== Deleting Votes
Votes.prototype.delete = function (voteID) {
  return this.request('DELETE', ['votes', voteID]);
};
