//ArticleAttachments.js: Client for the zendesk help center API.


var util        = require('util'),
  Client      = require('../client').Client;

var ArticleAttachments = exports.ArticleAttachments = function (options) {
  this.jsonAPINames = [ 'articleattachments', 'articleattachment'];
  Client.call(this, options);
};

// Inherit from Client base object
util.inherits(ArticleAttachments, Client);

// ######################################################## Article Attachments
// ====================================== Listing Article Attachments
ArticleAttachments.prototype.list = function (articleID, cb) {
  return this.request('GET', ['articles', articleID, 'attachments'], cb);//all
};

// ====================================== Listing Article Inline Attachments
ArticleAttachments.prototype.listInline = function (articleID, cb) {
  return this.request('GET', ['articles', articleID, 'attachments', 'inline'], cb);//all
};

// ====================================== Listing Article Block Attachments
ArticleAttachments.prototype.listBlock = function (articleID, cb) {
  return this.request('GET', ['articles', articleID, 'attachments', 'block'], cb);//all
};

// ====================================== Showing Article Attachments
ArticleAttachments.prototype.show = function (attachmentID, cb) {
  return this.request('GET', ['articles', 'attachments', attachmentID], cb);
};

// ====================================== Creating Article Attachments
ArticleAttachments.prototype.create = function (articleID, cb) {
  if (cb) return cb('not implemented');
  return Promise.reject('not implemented');
};

// ====================================== Creating Unassociated Article Attachments
ArticleAttachments.prototype.createUnassociated = function (articleID, cb) {
  if (cb) return cb('not implemented');
  return Promise.reject('not implemented');
};

// ====================================== Deleting Article Attachments
ArticleAttachments.prototype.delete = function (attachmentID, cb) {
  return this.request('DELETE', ['articles', 'attachments', attachmentID], cb);
};
