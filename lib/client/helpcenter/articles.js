// Articles.js: Client for the zendesk help center API.
const {Client} = require('../client');

class Articles extends Client {
  constructor(options) {
    super(options);
    this.jsonAPINames = ['articles', 'article'];

    this.sideLoadMap = [
      {field: 'author_id', name: 'user', dataset: 'users'},
      {field: 'section_id', name: 'section', dataset: 'sections'},
      {field: 'category_id', name: 'category', dataset: 'categories'},
    ];
  }

  // Listing Articles
  list(cb) {
    return this.getAll(['articles'], cb);
  }

  // Listing Articles By Locale

  listByLocale(locale, cb) {
    return this.getAll([locale, 'articles'], cb);
  }

  // Listing Articles Under A Section

  listBySection(sectionID, cb) {
    return this.getAll(['sections', sectionID, 'articles'], cb);
  }

  // Listing Articles Under A Section by Locale

  listBySectionByLocale(locale, sectionID, cb) {
    return this.getAll([locale, 'sections', sectionID, 'articles'], cb);
  }

  // Listing Articles Under A Category

  listByCategory(categoryID, cb) {
    return this.getAll(['categories', categoryID, 'articles'], cb);
  }

  // Listing Articles Under A Category by Locale

  listByCategoryByLocale(locale, categoryID, cb) {
    return this.getAll([locale, 'categories', categoryID, 'articles'], cb);
  }

  // Listing Articles Belongs To A User

  listByUser(userID, cb) {
    return this.getAll(['users', userID, 'articles'], cb);
  }

  // Listing Articles Since Start Time

  listSinceStartTime(startTime, cb) {
    return this.getAll(
      ['incremental', 'articles', {start_time: startTime}],
      cb,
    );
  }

  // Listing Articles By Label

  listByLabelNames(labelNames, cb) {
    return this.getAll(['articles', {label_names: labelNames.toString()}], cb);
  }

  // Viewing Articles
  show(articleID, cb) {
    return this.get(['articles', articleID], cb);
  }

  // Viewing Articles By Locale
  showWithLocale(locale, articleID, cb) {
    return this.get([locale, 'articles', articleID], cb);
  }

  // Creating Articles
  create(sectionID, article, cb) {
    return this.post(['sections', sectionID, 'articles'], article, cb);
  }

  // Creating Articles With Specified Locale
  createWithLocale(locale, sectionID, article, cb) {
    return this.post([locale, 'sections', sectionID, 'articles'], article, cb);
  }

  // Updating Articles
  update(articleID, article, cb) {
    return this.put(['articles', articleID], article, cb);
  }

  // Updating Articles With Specified Locale
  updateWithLocale(locale, articleID, article, cb) {
    return this.put([locale, 'articles', articleID], article, cb);
  }

  // Associating Attachments In Bulk
  associateAttachmentsInBulk(articleID, attachmentIDsInBulk, cb) {
    return this.post(
      ['articles', articleID, 'bulk_attachments'],
      attachmentIDsInBulk,
      cb,
    );
  }

  // Deleting Articles
  delete(articleID, cb) {
    return this.delete(['articles', articleID], cb);
  }
}

exports.Articles = Articles;
