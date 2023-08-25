// ArticleLabels.js: Client for the zendesk help center API.
const {Client} = require('../client');

class ArticleLabels extends Client {
  constructor(options) {
    super(options);
    this.jsonAPINames = ['articlelabels', 'articlelabel'];
  }

  // Listing Article Labels
  list(cb) {
    return this.get(['articles', 'labels'], cb);
  }

  // Listing Article Labels
  listByArticle(articleID, cb) {
    return this.get(['articles', articleID, 'labels'], cb);
  }

  // Showing Article Labels
  show(labelID, cb) {
    return this.get(['articles', 'labels', labelID], cb);
  }

  // Creating Article Labels
  create(articleID, label, cb) {
    return this.post(['articles', articleID, 'labels'], label, cb);
  }

  // Deleting Article Labels
  delete(articleID, labelID, cb) {
    return this.delete(['articles', articleID, 'labels', labelID], cb);
  }
}

exports.ArticleLabels = ArticleLabels;
