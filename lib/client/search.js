// Search.js: Client for the zendesk API.
const {Client} = require('./client');

class Search extends Client {
  constructor(options) {
    super(options);
    this.jsonAPINames = ['results'];
  }

  // Listing Search
  query(searchTerm, cb) {
    return this.get(['search', {query: searchTerm}], cb);
  }

  queryAll(searchTerm, cb) {
    return this.getAll(['search', {query: searchTerm}], cb);
  }

  queryAnonymous(searchTerm, cb) {
    return this.get(['portal', 'search', {query: searchTerm}], cb);
  }

  queryAnonymousAll(searchTerm, cb) {
    return this.getAll(['portal', 'search', {query: searchTerm}], cb);
  }
}

exports.Search = Search;
