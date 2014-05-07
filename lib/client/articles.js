//Topics.js: Client for the zendesk API.


var util        = require('util'),
    Client      = require('./client').Client;


var Articles = exports.Articles = function (options) {
  this.jsonAPIName2 = 'articles';
  Client.call(this, options);
};

// Inherit from Client base object
util.inherits(Articles, Client);

// ######################################################## Articles
// ====================================== Listing Articles
Articles.prototype.list = function (cb) {
  this.requestAll('GET', ['help_center', 'articles'], cb);//all
};

Articles.prototype.listArticlesInSection = function(sectionID, cb) {
  this.requestAll('GET', ['help_center', 'sections', sectionID, 'articles'], cb);
};

Articles.prototype.listArticlesForAgent = function(agentID, cb) {
  this.requestAll('GET', ['help_center', 'users', agentID, 'articles'], cb);
};

// ====================================== Viewing Articles
Articles.prototype.show = function(articleID, cb) {
  this.request('GET', ['help_center', 'articles', articleID], cb);
};

Articles.prototype.showTranslation = function(articleID, locale, cb) {
  this.request('GET', ['help_center', 'articles', articleID, 'translations', locale], cb);
};

// ====================================== Searching Articles
Articles.prototype.search = function(searchTerm, cb) {
  this.requestAll('GET', ['help_center', 'articles', 'search', {query: searchTerm}], cb);
};

// ====================================== Deleting Articles
Articles.prototype.delete = function(articleID, cb) {
  this.request('DELETE', ['help_center', 'articles', articleID], cb);
};
