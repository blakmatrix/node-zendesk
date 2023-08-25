// ArticleAttachments.js: Client for the zendesk help center API.
const {Client} = require('../client');

class ArticleAttachments extends Client {
  constructor(options) {
    super(options);
    this.jsonAPINames = ['articleattachments', 'articleattachment'];
  }

  // Article Attachments
  // Listing Article Attachments
  list(articleID, cb) {
    return this.get(['articles', articleID, 'attachments'], cb);
  }

  // Listing Article Inline Attachments
  listInline(articleID, cb) {
    return this.get(['articles', articleID, 'attachments', 'inline'], cb);
  }

  // Listing Article Block Attachments
  listBlock(articleID, cb) {
    return this.get(['articles', articleID, 'attachments', 'block'], cb);
  }

  // Showing Article Attachments
  show(attachmentID, cb) {
    return this.get(['articles', 'attachments', attachmentID], cb);
  }

  // Creating Article Attachments
  create(articleID, cb) {
    if (cb) return cb('not implemented');
    return Promise.reject(new Error('not implemented'));
  }

  // Creating Unassociated Article Attachments
  createUnassociated(articleID, cb) {
    if (cb) return cb('not implemented');
    return Promise.reject(new Error('not implemented'));
  }

  // Deleting Article Attachments
  delete(attachmentID, cb) {
    return this.delete(['articles', 'attachments', attachmentID], cb);
  }
}

exports.ArticleAttachments = ArticleAttachments;
