// ArticleLabels.js: Client for the zendesk help center API.
const {Client} = require('../client');
const {ApiTypes} = require('../../constants');

class ArticleLabels extends Client {
  constructor(options) {
    super(options, ApiTypes.helpcenter);
    this.jsonAPINames = ['articlelabels', 'articlelabel'];
  }

  // Listing Article Labels
  async list() {
    return this.get(['articles', 'labels']);
  }

  // Listing Article Labels
  async listByArticle(articleID) {
    return this.get(['articles', articleID, 'labels']);
  }

  // Showing Article Labels
  async show(labelID) {
    return this.get(['articles', 'labels', labelID]);
  }

  // Creating Article Labels
  async create(articleID, label) {
    return this.post(['articles', articleID, 'labels'], label);
  }

  // Deleting Article Labels
  async delete(articleID, labelID) {
    return super.delete(['articles', articleID, 'labels', labelID]);
  }
}

exports.ArticleLabels = ArticleLabels;
