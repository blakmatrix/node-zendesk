// ArticleComment.js: Client for the zendesk help center API.
const {Client} = require('../client');

class ArticleComments extends Client {
  constructor(options) {
    super(options);
    this.jsonAPINames = ['articlecomments', 'articlecomment'];
    this.sideLoadMap = [{field: 'author_id', name: 'user', dataset: 'users'}];
  }

  // Article Comments

  // Listing Article Comments by UserID
  listByUser(userID, cb) {
    return this.getAll(['users', userID, 'comments'], cb);
  }

  // Listing Article Comments by ArticleID
  listByArticle(articleID, cb) {
    return this.getAll(['articles', articleID, 'comments'], cb);
  }

  // Showing an Article Comment
  show(articleID, commentID, cb) {
    return this.get(['articles', articleID, 'comments', commentID], cb);
  }

  // Creating an Article Comment
  create(articleID, comment, cb) {
    return this.post(['articles', articleID, 'comments'], comment, cb);
  }

  // Updating an Article Comment
  update(articleID, commentID, comment, cb) {
    return this.put(
      ['articles', articleID, 'comments', commentID],
      comment,
      cb,
    );
  }

  // Deleting an Article Comment
  delete(articleID, commentID, cb) {
    return this.delete(['articles', articleID, 'comments', commentID], cb);
  }
}

exports.ArticleComments = ArticleComments;
