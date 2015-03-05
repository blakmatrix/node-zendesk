//Articles.js: Client for the zendesk help center API.


var util        = require('util'),
    Client      = require('../client').Client
    //defaultgroups = require('./helpers').defaultgroups;


var Articles = exports.Articles = function (options) {
  this.jsonAPIName = 'articles';
  this.jsonAPIName2 = 'article';
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

// ====================================== Viewing Articles

Articles.prototype.show = function (articleID, cb) {
  this.request('GET', ['articles', articleID], cb);
};

// ====================================== Creating Articles
Articles.prototype.create = function (sectionID, article, cb) {
  this.request('POST',['sections', sectionID, 'articles'], article, cb);
};

// ====================================== Updating Articles

Articles.prototype.update = function (articleID, article, cb) {
  this.request('PUT', ['articles', articleID], article, cb);
};

// ====================================== Deleting Articles
Articles.prototype.delete = function (articleID, cb) {
  this.request('DELETE', ['articles', articleID],  cb);
};