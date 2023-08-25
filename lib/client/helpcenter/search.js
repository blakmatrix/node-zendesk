// Search.js: Client for the zendesk help center API.
const {Client} = require('../client');

class Search extends Client {
  constructor(options) {
    super(options);
    this.jsonAPINames = ['search', 'search'];
  }

  // Searching Articles
  searchArticles(searchString, cb) {
    const searchContent =
      typeof searchString === 'object' ? searchString : {query: searchString};
    return this.get(['articles', 'search', searchContent], cb);
  }

  // Searching Articles In Locale
  searchArticlesInLocale(searchString, locale, cb) {
    const searchContent = {query: searchString, locale};
    return this.get(['articles', 'search', searchContent], cb);
  }

  // Searching Articles By Labels
  searchArticlesByLabels(labelNames, cb) {
    const searchContent =
      typeof labelNames === 'object' ? labelNames : {label_names: labelNames};
    return this.get(['articles', searchContent], cb);
  }

  // Searching Questions
  searchQuestions(searchString, cb) {
    // Do not need requesetAll
    const searchContent =
      typeof searchString === 'object' ? searchString : {query: searchString};
    return this.get(['questions', 'search', searchContent], cb);
  }
}

exports.Search = Search;
