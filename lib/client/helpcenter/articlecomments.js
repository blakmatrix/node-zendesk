//ArticleComment.js: Client for the zendesk help center API.


var util        = require('util'),
    Client      = require('../client').Client;

var ArticleComments = exports.ArticleComments = function (options) {
  this.jsonAPINames = [ 'articlecomments', 'articlecomment' ];
  this.sideLoadMap = [
    { field: 'author_id', name: 'user', dataset: 'users' }
  ];
  Client.call(this, options);
};

// Inherit from Client base object
util.inherits(ArticleComments, Client);

// ######################################################## Article Comments

// ====================================== Listing Article Comments by UserID
ArticleComments.prototype.listByUser = function (userID, cb) {
  return this.requestAll('GET', ['users', userID, 'comments'], cb);//all
};

// ====================================== Listing Article Comments by ArticleID
ArticleComments.prototype.listByArticle = function (articleID, cb) {
  return this.requestAll('GET', ['articles', articleID, 'comments'], cb);//all
};

// ====================================== Showing an Article Comment
ArticleComments.prototype.show = function (articleID, commentID, cb) {
  return this.request('GET', ['articles', articleID, 'comments', commentID], cb);
};

// ====================================== Creating an Article Comment
ArticleComments.prototype.create = function (articleID, comment, cb) {
  return this.request('POST', ['articles', articleID, 'comments'], comment, cb);
};

// ====================================== Updating an Article Comment
ArticleComments.prototype.update = function (articleID, commentID, comment, cb) {
  return this.request('PUT', ['articles', articleID, 'comments', commentID], comment, cb);
};

// ====================================== Deleting an Article Comment
ArticleComments.prototype.delete = function (articleID, commentID, cb) {
  return this.request('DELETE', ['articles', articleID, 'comments', commentID], cb);
};
