//ArticleComment.js: Client for the zendesk help center API.


var util = require('util'),
  Client = require('../client').Client

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
ArticleComments.prototype.listByUser = function (userID) {
  return this.requestAll('GET', ['users', userID, 'comments']);//all
};

// ====================================== Listing Article Comments by ArticleID
ArticleComments.prototype.listByArticle = function (articleID) {
  return this.requestAll('GET', ['articles', articleID, 'comments']);//all
};

// ====================================== Showing an Article Comment
ArticleComments.prototype.show = function (articleID, commentID) {
  return this.request('GET', ['articles', articleID, 'comments', commentID]);
};

// ====================================== Creating an Article Comment
ArticleComments.prototype.create = function (articleID, comment) {
  return this.request('POST', ['articles', articleID, 'comments'], comment);
};

// ====================================== Updating an Article Comment
ArticleComments.prototype.update = function (articleID, commentID, comment) {
  return this.request('PUT', ['articles', articleID, 'comments', commentID], comment);
};

// ====================================== Deleting an Article Comment
ArticleComments.prototype.delete = function (articleID, commentID) {
  return this.request('DELETE', ['articles', articleID, 'comments', commentID]);
};
