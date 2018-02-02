//Articles.js: Client for the zendesk help center API.

var util = require('util'),
  Client = require('../client').Client
//defaultgroups = require('./helpers').defaultgroups;


var Articles = exports.Articles = function (options) {
  this.jsonAPINames = [ 'articles', 'article' ];

  this.sideLoadMap = [
    { field: 'author_id', name: 'user', dataset: 'users' },
    { field: 'section_id', name: 'section', dataset: 'sections' },
    { field: 'category_id', name: 'category', dataset: 'categories' }
  ];

  Client.call(this, options);
};

// Inherit from Client base object
util.inherits(Articles, Client);

// ######################################################## Articles
// ====================================== Listing Articles
Articles.prototype.list = function () {
  return this.requestAll('GET', ['articles']);//all
};

// ====================================== Listing Articles By Locale

Articles.prototype.listByLocale = function (locale) {
  return this.requestAll('GET', [locale, 'articles']);//all
};

// ====================================== Listing Articles Under A Section

Articles.prototype.listBySection = function (sectionID) {
  return this.requestAll('GET', ['sections', sectionID, 'articles']);//all
};

// ====================================== Listing Articles Under A Section by Locale

Articles.prototype.listBySectionByLocale = function (locale, sectionID) {
  return this.requestAll('GET', [locale, 'sections', sectionID, 'articles']);//all
};

// ====================================== Listing Articles Under A Category

Articles.prototype.listByCategory = function (categoryID) {
  return this.requestAll('GET', ['categories', categoryID, 'articles']);//all
};

// ====================================== Listing Articles Belongs To A User

Articles.prototype.listByUser = function (userID) {
  return this.requestAll('GET', ['users', userID, 'articles']);//all
};

// ====================================== Listing Articles Since Start Time

Articles.prototype.listSinceStartTime = function (startTime) {
  return this.requestAll('GET', ['incremental', 'articles', {'start_time': startTime}]);//all
};

// ====================================== Listing Articles By Label

Articles.prototype.listByLabelNames = function (labelNames) {
  return this.requestAll('GET', ['articles', {'label_names': labelNames.toString()}]);//all
};


// ====================================== Viewing Articles
Articles.prototype.show = function (articleID) {
  return this.request('GET', ['articles', articleID]);
};

// ====================================== Viewing Articles By Locale
Articles.prototype.showWithLocale = function(locale, articleID) {
  return this.request('GET', [locale, 'articles', articleID]);
};

// ====================================== Creating Articles
Articles.prototype.create = function (sectionID, article) {
  return this.request('POST', ['sections', sectionID, 'articles'], article);
};

// ====================================== Creating Articles With Specified Locale
Articles.prototype.createWithLocale = function (locale, sectionID, article) {
  return this.request('POST', [locale, 'sections', sectionID, 'articles'], article);
}

// ====================================== Updating Articles
Articles.prototype.update = function (articleID, article) {
  return this.request('PUT', ['articles', articleID], article);
};

// ====================================== Updating Articles With Specified Locale
Articles.prototype.updateWithLocale = function (locale, articleID, article) {
  return this.request('PUT', [locale, 'articles', articleID], article);
};

// ====================================== Associating Attachments In Bulk
Articles.prototype.associateAttachmentsInBulk = function (articleID, attachmentIDsInBulk) {
  return this.request('POST', ['articles', articleID, 'bulk_attachments'], attachmentIDsInBulk);
}

// ====================================== Deleting Articles
Articles.prototype.delete = function (articleID) {
  return this.request('DELETE', ['articles', articleID]);
};
