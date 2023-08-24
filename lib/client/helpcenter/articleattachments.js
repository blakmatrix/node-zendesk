// ArticleAttachments.js: Client for the zendesk help center API.

const util = require('node:util');
const {Client} = require('../client');

const ArticleAttachments = (exports.ArticleAttachments = function (options) {
  this.jsonAPINames = ['articleattachments', 'articleattachment'];
  Client.call(this, options);
});

// Inherit from Client base object
util.inherits(ArticleAttachments, Client);

// ######################################################## Article Attachments
// ====================================== Listing Article Attachments
ArticleAttachments.prototype.list = function (articleID, cb) {
  return this.request('GET', ['articles', articleID, 'attachments'], cb); // All
};

// ====================================== Listing Article Inline Attachments
ArticleAttachments.prototype.listInline = function (articleID, cb) {
  return this.request(
    'GET',
    ['articles', articleID, 'attachments', 'inline'],
    cb,
  ); // All
};

// ====================================== Listing Article Block Attachments
ArticleAttachments.prototype.listBlock = function (articleID, cb) {
  return this.request(
    'GET',
    ['articles', articleID, 'attachments', 'block'],
    cb,
  ); // All
};

// ====================================== Showing Article Attachments
ArticleAttachments.prototype.show = function (attachmentID, cb) {
  return this.request('GET', ['articles', 'attachments', attachmentID], cb);
};

// ====================================== Creating Article Attachments
ArticleAttachments.prototype.create = function (articleID, cb) {
  if (cb) return cb('not implemented');
  return Promise.reject(new Error('not implemented'));
};

// ====================================== Creating Unassociated Article Attachments
ArticleAttachments.prototype.createUnassociated = function (articleID, cb) {
  if (cb) return cb('not implemented');
  return Promise.reject(new Error('not implemented'));
};

// ====================================== Deleting Article Attachments
ArticleAttachments.prototype.delete = function (attachmentID, cb) {
  return this.request('DELETE', ['articles', 'attachments', attachmentID], cb);
};
