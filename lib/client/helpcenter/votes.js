//Votes.js: Client for the zendesk help center API.


var util        = require('util'),
  Client      = require('../client').Client
//defaultgroups = require('./helpers').defaultgroups;


var Votes = exports.Votes = function (options) {
  this.jsonAPINames = [ 'votes', 'vote' ];
  Client.call(this, options);
};

// Inherit from Client base object
util.inherits(Votes, Client);

// ######################################################## Votes

// ====================================== Listing Votes By User

Votes.prototype.listByUser = function (userID, cb) {
  //Do not need requesetAll
  this.request('GET', ['users', userID, 'votes'], cb);
};

// ====================================== Listing Votes By Article

Votes.prototype.listByArticle = function (articleID, cb) {
  //Do not need requesetAll
  this.request('GET', ['articles', articleID, 'votes'], cb);
};

// ====================================== Viewing Votes
Votes.prototype.show = function (voteID, cb) {
  this.request('GET', ['votes', voteID], cb);
};

// ====================================== Vote Up For Article
Votes.prototype.createUpVoteForArticle = function (articleID, cb) {
  this.request('POST', ['articles' , articleID, 'up'], cb);
};

// ====================================== Vote Down For Article
Votes.prototype.createDownVoteForArticle = function (articleID, cb) {
  this.request('POST', ['articles' , articleID, 'down'], cb);
};

// ====================================== Vote Up For Question
Votes.prototype.createUpVoteForQuestion = function (questionID, cb) {
  this.request('POST', ['questions' , questionID, 'up'], cb);
};

// ====================================== Vote Down For Question
Votes.prototype.createDownVoteForQuestion = function (questionID, cb) {
  this.request('POST', ['questions' , questionID, 'down'], cb);
};

// ====================================== Vote Up For Answer
Votes.prototype.createUpVoteForAnswer = function (answerID, cb) {
  this.request('POST', ['answers' , answerID, 'up'], cb);
};

// ====================================== Vote Down For Answer
Votes.prototype.createDownVoteForAnswer = function (answerID, cb) {
  this.request('POST', ['answers' , answerID, 'down'], cb);
};

// ====================================== Deleting Votes
Votes.prototype.delete = function (voteID, cb) {
  this.request('DELETE', ['votes', voteID],  cb);
};
