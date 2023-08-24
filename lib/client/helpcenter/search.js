// Search.js: Client for the zendesk help center API.

const util = require('node:util');
const {Client} = require('../client');

const Search = (exports.Search = function (options) {
  this.jsonAPINames = ['search', 'search'];
  Client.call(this, options);
});

// Inherit from Client base object
util.inherits(Search, Client);

// ######################################################## Votes

// ====================================== Searching Articles
Search.prototype.searchArticles = function (searchString, cb) {
  const searchContent =
    typeof searchString === 'object' ? searchString : {query: searchString};
  return this.request('GET', ['articles', 'search', searchContent], cb);
};

// ====================================== Searching Articles In Locale
Search.prototype.searchArticlesInLocale = function (searchString, locale, cb) {
  const searchContent = {query: searchString, locale};
  return this.request('GET', ['articles', 'search', searchContent], cb);
};

// ====================================== Searching Articles By Labels
Search.prototype.searchArticlesByLabels = function (labelNames, cb) {
  const searchContent =
    typeof labelNames === 'object' ? labelNames : {label_names: labelNames};
  return this.request('GET', ['articles', searchContent], cb);
};

// ====================================== Searching Questions
Search.prototype.searchQuestions = function (searchString, cb) {
  // Do not need requesetAll
  const searchContent =
    typeof searchString === 'object' ? searchString : {query: searchString};
  return this.request('GET', ['questions', 'search', searchContent], cb);
};
