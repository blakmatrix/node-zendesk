// ArticleComment.js: Client for the zendesk help center API.
const {Client} = require('../client');
const {ApiTypes} = require('../../constants');

class ArticleComments extends Client {
  constructor(options) {
    super(options, ApiTypes.helpcenter);
    this.jsonAPINames = ['articlecomments', 'articlecomment'];
    this.sideLoadMap = [{field: 'author_id', name: 'user', dataset: 'users'}];
  }

  // Article Comments

  // Listing Article Comments by UserID
  async listByUser(userID) {
    return this.getAll(['users', userID, 'comments']);
  }

  // Listing Article Comments by ArticleID
  async listByArticle(articleID) {
    return this.getAll(['articles', articleID, 'comments']);
  }

  // Showing an Article Comment
  async show(articleID, commentID) {
    return this.get(['articles', articleID, 'comments', commentID]);
  }

  // Creating an Article Comment
  async create(articleID, comment) {
    return this.post(['articles', articleID, 'comments'], comment);
  }

  // Updating an Article Comment
  async update(articleID, commentID, comment) {
    return this.put(['articles', articleID, 'comments', commentID], comment);
  }

  // Deleting an Article Comment
  async delete(articleID, commentID) {
    return super.delete(['articles', articleID, 'comments', commentID]);
  }
}

exports.ArticleComments = ArticleComments;
