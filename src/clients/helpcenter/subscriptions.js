// Subscriptions.js: Client for the zendesk API.
const {Client} = require('../client');
const { ApiTypes } = require('../../constants');

class Subscriptions extends Client {
  constructor(options) {
    super(options, ApiTypes.helpcenter);
    this.jsonAPINames = ['subscriptions', 'subscription'];
  }

  // Listing subscriptions by user
  async listByUser(userID) {
    return this.getAll(['users', userID, 'subscriptions']);
  }

  // Listing subscriptions by article
  async listByArticle(articleID) {
    return this.getAll(['articles', articleID, 'subscriptions']);
  }

  // Listing subscriptions by section
  async listBySection(sectionID) {
    return this.getAll(['sections', sectionID, 'subscriptions']);
  }

  // Showing subscriptions by article
  async showbyArticle(articleID, subscriptionID) {
    return this.get(['articles', articleID, 'subscriptions', subscriptionID]);
  }

  // Showing subscriptions by section
  async showbySection(sectionID, subscriptionID) {
    return this.get(['sections', sectionID, 'subscriptions', subscriptionID]);
  }

  // Creating subscriptions by article
  async createbyArticle(articleID, subscription) {
    return this.post(['articles', articleID, 'subscriptions'], subscription);
  }

  // Creating subscriptions by section
  async createbySection(sectionID, subscription) {
    return this.post(['sections', sectionID, 'subscriptions'], subscription);
  }

  // Deleting subscriptions by article
  async deletebyArticle(articleID, subscriptionID) {
    return super.delete([
      'articles',
      articleID,
      'subscriptions',
      subscriptionID,
    ]);
  }

  // Deleting subscriptions by section
  async deletebySection(sectionID, subscriptionID) {
    return super.delete([
      'articles',
      sectionID,
      'subscriptions',
      subscriptionID,
    ]);
  }
}

exports.Subscriptions = Subscriptions;
