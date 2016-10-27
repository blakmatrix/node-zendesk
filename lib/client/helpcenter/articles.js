//Articles.js: Client for the zendesk help center API.


var util        = require('util'),
  Client      = require('../client').Client
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
Articles.prototype.list = function (cb) {
  this.requestAll('GET', ['articles'], cb);//all
};

// ====================================== Listing Articles By Locale

Articles.prototype.listByLocale = function (locale,cb) {
  this.requestAll('GET', [locale, 'articles'], cb);//all
};

// ====================================== Listing Articles Under A Section

Articles.prototype.listBySection = function (sectionID,cb) {
  this.requestAll('GET', ['sections', sectionID, 'articles'], cb);//all
};

// ====================================== Listing Articles Under A Section by Locale

Articles.prototype.listBySectionByLocale = function (locale, sectionID,cb) {
  this.requestAll('GET', [locale, 'sections', sectionID, 'articles'], cb);//all
};

// ====================================== Listing Articles Under A Category

Articles.prototype.listByCategory = function (categoryID,cb) {
  this.requestAll('GET', ['categories', categoryID, 'articles'], cb);//all
};

// ====================================== Listing Articles Belongs To A User

Articles.prototype.listByUser = function (userID,cb) {
  this.requestAll('GET', ['users', userID, 'articles'], cb);//all
};

// ====================================== Listing Articles Since Start Time

Articles.prototype.listSinceStartTime = function (startTime,cb) {
  this.requestAll('GET', ['incremental', 'articles', {'start_time': startTime}], cb);//all
};

// ====================================== Listing Articles By Label

Articles.prototype.listByLabelNames = function (labelNames,cb) {
  this.requestAll('GET', ['articles', {'label_names': labelNames.toString()}], cb);//all
};


// ====================================== Viewing Articles
Articles.prototype.show = function (articleID, cb) {
  this.request('GET', ['articles', articleID], cb);
};

// ====================================== Viewing Articles By Locale
Articles.prototype.showWithLocale = function(locale, articleID, cb) {
  this.request('GET', [locale, 'articles', articleID], cb);
};

// ====================================== Creating Articles
Articles.prototype.create = function (sectionID, article, cb) {
  this.request('POST', ['sections', sectionID, 'articles'], article, cb);
};

// ====================================== Creating Articles With Specified Locale
Articles.prototype.createWithLocale = function (locale, sectionID, article, cb) {
  this.request('POST', [locale, 'sections', sectionID, 'articles'], article, cb);
}

// ====================================== Updating Articles
Articles.prototype.update = function (articleID, article, cb) {
  this.request('PUT', ['articles', articleID], article, cb);
};

// ====================================== Updating Articles With Specified Locale
Articles.prototype.updateWithLocale = function (locale, articleID, article, cb) {
  this.request('PUT', [locale, 'articles', articleID], article, cb);
};

// ====================================== Associating Attachments In Bulk
Articles.prototype.associateAttachmentsInBulk = function (articleID, attachmentIDsInBulk, cb) {
  this.request('POST', ['articles', articleID, 'bulk_attachments'], attachmentIDsInBulk, cb);
}

// ====================================== Deleting Articles
Articles.prototype.delete = function (articleID, cb) {
  this.request('DELETE', ['articles', articleID],  cb);
};
