// Articles.js: Client for the zendesk help center API.
const {Client} = require('../client');
const {ApiTypes} = require('../../constants');

class Articles extends Client {
  constructor(options) {
    super(options, ApiTypes.helpcenter);
    this.jsonAPINames = ['articles', 'article'];

    this.sideLoadMap = [
      {field: 'author_id', name: 'user', dataset: 'users'},
      {field: 'section_id', name: 'section', dataset: 'sections'},
      {field: 'category_id', name: 'category', dataset: 'categories'},
    ];
  }

  // Listing Articles
  async list() {
    return this.getAll(['articles']);
  }

  // Listing Articles By Locale

  async listByLocale(locale) {
    return this.getAll([locale, 'articles']);
  }

  // Listing Articles Under A Section

  async listBySection(sectionID) {
    return this.getAll(['sections', sectionID, 'articles']);
  }

  // Listing Articles Under A Section by Locale

  async listBySectionByLocale(locale, sectionID) {
    return this.getAll([locale, 'sections', sectionID, 'articles']);
  }

  // Listing Articles Under A Category

  async listByCategory(categoryID) {
    return this.getAll(['categories', categoryID, 'articles']);
  }

  // Listing Articles Under A Category by Locale

  async listByCategoryByLocale(locale, categoryID) {
    return this.getAll([locale, 'categories', categoryID, 'articles']);
  }

  // Listing Articles Belongs To A User

  async listByUser(userID) {
    return this.getAll(['users', userID, 'articles']);
  }

  // Listing Articles Since Start Time

  async listSinceStartTime(startTime) {
    return this.getAll(['incremental', 'articles', {start_time: startTime}]);
  }

  // Listing Articles By Label

  async listByLabelNames(labelNames) {
    return this.getAll(['articles', {label_names: labelNames.toString()}]);
  }

  // Viewing Articles
  async show(articleID) {
    return this.get(['articles', articleID]);
  }

  // Viewing Articles By Locale
  async showWithLocale(locale, articleID) {
    return this.get([locale, 'articles', articleID]);
  }

  // Creating Articles
  async create(sectionID, article) {
    return this.post(['sections', sectionID, 'articles'], article);
  }

  // Creating Articles With Specified Locale
  async createWithLocale(locale, sectionID, article) {
    return this.post([locale, 'sections', sectionID, 'articles'], article);
  }

  // Updating Articles
  async update(articleID, article) {
    return this.put(['articles', articleID], article);
  }

  // Updating Articles With Specified Locale
  async updateWithLocale(locale, articleID, article) {
    return this.put([locale, 'articles', articleID], article);
  }

  // Associating Attachments In Bulk
  async associateAttachmentsInBulk(articleID, attachmentIDsInBulk) {
    return this.post(
      ['articles', articleID, 'bulk_attachments'],
      attachmentIDsInBulk,
    );
  }

  // Deleting Articles
  async delete(articleID) {
    return super.delete(['articles', articleID]);
  }
}

exports.Articles = Articles;
