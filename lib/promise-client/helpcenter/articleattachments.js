//ArticleAttachments.js: Client for the zendesk help center API.


var util = require('util'),
  Client = require('../client').Client
//defaultgroups = require('./helpers').defaultgroups;


var ArticleAttachments = exports.ArticleAttachments = function (options) {
  this.jsonAPINames = [ 'articleattachments', 'articleattachment'];
  Client.call(this, options);
};

// Inherit from Client base object
util.inherits(ArticleAttachments, Client);

// ######################################################## Article Attachments
// ====================================== Listing Article Attachments
ArticleAttachments.prototype.list = function (articleID) {
  return this.request('GET', ['articles', articleID, 'attachments']);//all
};

// ====================================== Listing Article Inline Attachments
ArticleAttachments.prototype.listInline = function (articleID) {
  return this.request('GET', ['articles', articleID, 'attachments', 'inline']);//all
};

// ====================================== Listing Article Block Attachments
ArticleAttachments.prototype.listBlock = function (articleID) {
  return this.request('GET', ['articles', articleID, 'attachments', 'block']);//all
};

// ====================================== Showing Article Attachments
ArticleAttachments.prototype.show = function (attachmentID) {
  return this.request('GET', ['articles', 'attachments', attachmentID]);
};

// ====================================== Creating Article Attachments
ArticleAttachments.prototype.create = function (articleID) {
  return new Promise(resolve => resolve('not implemented'));
};

// ====================================== Creating Unassociated Article Attachments
ArticleAttachments.prototype.createUnassociated = function (articleID) {
  return new Promise(resolve => resolve('not implemented'));
};

// ====================================== Deleting Article Attachments
ArticleAttachments.prototype.delete = function (attachmentID) {
  return this.request('DELETE', ['articles', 'attachments', attachmentID]);
};
