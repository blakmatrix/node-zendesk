// ArticleAttachments.js: Client for the zendesk help center API.
const {Client} = require('../client');
const {ApiTypes} = require('../../constants');

class ArticleAttachments extends Client {
  constructor(options) {
    super(options, ApiTypes.helpcenter);
    this.jsonAPINames = ['articleattachments', 'articleattachment'];
  }

  // Article Attachments
  // Listing Article Attachments
  async list(articleID) {
    return this.get(['articles', articleID, 'attachments']);
  }

  // Listing Article Inline Attachments
  async listInline(articleID) {
    return this.get(['articles', articleID, 'attachments', 'inline']);
  }

  // Listing Article Block Attachments
  async listBlock(articleID) {
    return this.get(['articles', articleID, 'attachments', 'block']);
  }

  // Showing Article Attachments
  async show(attachmentID) {
    return this.get(['articles', 'attachments', attachmentID]);
  }

  // Creating Article Attachments
  async create(/* articleID */) {
    return new Error('not implemented');
  }

  // Creating Unassociated Article Attachments
  async createUnassociated(/* articleID */) {
    return new Error('not implemented');
  }

  // Deleting Article Attachments
  async delete(attachmentID) {
    return super.delete(['articles', 'attachments', attachmentID]);
  }
}

exports.ArticleAttachments = ArticleAttachments;
