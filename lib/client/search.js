// Search.js: Client for the zendesk API.
const {Client} = require('./client');

class Search extends Client {
  constructor(options) {
    super(options);
    this.jsonAPINames = ['results'];
  }

  // Listing Search
  async query(searchTerm) {
    return this.get(['search', {query: searchTerm}]);
  }

  async queryAll(searchTerm) {
    return this.getAll(['search', {query: searchTerm}]);
  }

  async queryAnonymous(searchTerm) {
    return this.get(['portal', 'search', {query: searchTerm}]);
  }

  async queryAnonymousAll(searchTerm) {
    return this.getAll(['portal', 'search', {query: searchTerm}]);
  }
}

exports.Search = Search;
