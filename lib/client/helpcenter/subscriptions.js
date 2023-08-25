// Subscriptions.js: Client for the zendesk API.
const {Client} = require('../client');

class Subscriptions extends Client {
  constructor(options) {
    super(options);
    this.jsonAPINames = ['subscriptions', 'subscription'];
  }

  // Listing subscriptions by user
  listByUser(userID, cb) {
    return this.getAll(['users', userID, 'subscriptions'], cb);
  }

  // Listing subscriptions by article
  listByArticle(articleID, cb) {
    return this.getAll(['articles', articleID, 'subscriptions'], cb);
  }

  // Listing subscriptions by section
  listBySection(sectionID, cb) {
    return this.getAll(['sections', sectionID, 'subscriptions'], cb);
  }

  // Showing subscriptions by article
  showbyArticle(articleID, subscriptionID, cb) {
    return this.get(
      ['articles', articleID, 'subscriptions', subscriptionID],
      cb,
    );
  }

  // Showing subscriptions by section
  showbySection(sectionID, subscriptionID, cb) {
    return this.get(
      ['sections', sectionID, 'subscriptions', subscriptionID],
      cb,
    );
  }

  // Creating subscriptions by article
  createbyArticle(articleID, subscription, cb) {
    return this.post(
      ['articles', articleID, 'subscriptions'],
      subscription,
      cb,
    );
  }

  // Creating subscriptions by section
  createbySection(sectionID, subscription, cb) {
    return this.post(
      ['sections', sectionID, 'subscriptions'],
      subscription,
      cb,
    );
  }

  // Deleting subscriptions by article
  deletebyArticle(articleID, subscriptionID, cb) {
    return this.delete(
      ['articles', articleID, 'subscriptions', subscriptionID],
      cb,
    );
  }

  // Deleting subscriptions by section
  deletebySection(sectionID, subscriptionID, cb) {
    return this.delete(
      ['articles', sectionID, 'subscriptions', subscriptionID],
      cb,
    );
  }
}

exports.Subscriptions = Subscriptions;
