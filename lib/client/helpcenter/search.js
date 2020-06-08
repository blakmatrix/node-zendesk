//Search.js: Client for the zendesk help center API.


var util        = require('util'),
    Client      = require('../client').Client;

var Search = exports.Search = function (options) {
  this.jsonAPINames = [ 'search', 'search' ];
  Client.call(this, options);
};

// Inherit from Client base object
util.inherits(Search, Client);

// ######################################################## Votes

// ====================================== Searching Articles
Search.prototype.searchArticles = function (searchString, cb) {
  var searchContent = typeof searchString === 'object' ? searchString : {query : searchString};
  return this.request('GET', ['articles', 'search', searchContent], cb);
};

// ====================================== Searching Articles In Locale
Search.prototype.searchArticlesInLocale = function (searchString, locale, cb) {
  var searchContent = {query : searchString, locale: locale};
  return this.request('GET', ['articles', 'search', searchContent], cb);
};

// ====================================== Searching Articles By Labels
Search.prototype.searchArticlesByLabels = function (labelNames, cb) {
  var searchContent = typeof labelNames === 'object' ? labelNames : {label_names : labelNames};
  return this.request('GET', ['articles', searchContent], cb);
};

// ====================================== Searching Questions
Search.prototype.searchQuestions = function (searchString, cb) {
  //Do not need requesetAll
  var searchContent = typeof searchString === 'object' ? searchString : {query : searchString};
  return this.request('GET', ['questions', 'search', searchContent], cb);
};
