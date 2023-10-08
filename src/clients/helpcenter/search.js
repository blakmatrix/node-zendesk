// Search.js: Client for the zendesk help center API.
const {Client} = require('../client');
const {ApiTypes} = require('../../constants');

class Search extends Client {
  constructor(options) {
    super(options, ApiTypes.helpcenter);
    this.jsonAPINames = ['search', 'search'];
  }

  // Searching Articles
  async searchArticles(searchString) {
    const searchContent =
      typeof searchString === 'object' ? searchString : {query: searchString};
    return this.get(['articles', 'search', searchContent]);
  }

  // Searching Articles In Locale
  async searchArticlesInLocale(searchString, locale) {
    const searchContent = {query: searchString, locale};
    return this.get(['articles', 'search', searchContent]);
  }

  // Searching Articles By Labels
  async searchArticlesByLabels(labelNames) {
    const searchContent =
      typeof labelNames === 'object' ? labelNames : {label_names: labelNames};
    return this.get(['articles', searchContent]);
  }

  // Searching Questions
  async searchQuestions(searchString) {
    // Do not need requesetAll
    const searchContent =
      typeof searchString === 'object' ? searchString : {query: searchString};
    return this.get(['questions', 'search', searchContent]);
  }
}

exports.Search = Search;
