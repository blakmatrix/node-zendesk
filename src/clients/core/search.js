// Search.js: Client for the zendesk API.
const {Client} = require('../client');

/**
 * Client for the Zendesk Search API.
 * @see {@link https://developer.zendesk.com/api-reference/ticketing/ticket-management/search/}
 */
class Search extends Client {
  constructor(options) {
    super(options);
    this.jsonAPINames = ['results'];
  }

  /**
   * Search for the given term and retrieve results.
   * @async
   * @param {string} searchTerm - The term to search for.
   * @returns {Promise<Object>} A JSON object with the search results.
   * @see {@link https://developer.zendesk.com/api-reference/ticketing/ticket-management/search/#list-search-results}
   * @example
   * const results = await client.search.query('open tickets');
   */
  async query(searchTerm) {
    return this.get(['search', {query: searchTerm}]);
  }

  /**
   * Search for the given term and retrieve all results.
   * @async
   * @param {string} searchTerm - The term to search for.
   * @returns {Promise<Array>} An array of search results.
   * @example
   * const allResults = await client.search.queryAll('open tickets');
   */
  async queryAll(searchTerm) {
    return this.getAll(['search', {query: searchTerm}]);
  }

  /**
   * Anonymous search for the given term and retrieve results.
   * @async
   * @param {string} searchTerm - The term to search for.
   * @returns {Promise<Object>} A JSON object with the search results.
   * @example
   * const anonResults = await client.search.queryAnonymous('open tickets');
   */
  async queryAnonymous(searchTerm) {
    return this.get(['portal', 'search', {query: searchTerm}]);
  }

  /**
   * Anonymous search for the given term and retrieve all results.
   * @async
   * @param {string} searchTerm - The term to search for.
   * @returns {Promise<Array>} An array of search results.
   * @example
   * const allAnonResults = await client.search.queryAnonymousAll('open tickets');
   */
  async queryAnonymousAll(searchTerm) {
    return this.getAll(['portal', 'search', {query: searchTerm}]);
  }

  /**
   * Retrieve the count of search results for the given term.
   * @async
   * @param {string} searchTerm - The term to search for.
   * @returns {Promise<Object>} An Object with the number of items matching the query.
   * @see {@link https://developer.zendesk.com/api-reference/ticketing/ticket-management/search/#show-results-count}
   * @example
   * const { count } = await client.search.showResultsCount('open tickets');
   */
  async showResultsCount(searchTerm) {
    return this.get(['search', 'count', {query: searchTerm}]);
  }

  /**
   * Export the search results for the given term.
   * @async
   * @param {string} searchTerm - The term to search for.
   * @param {string} objectType - The type of object to return (ticket, organization, user, or group).
   * @param {number} [pageSize=100] - The number of results per page.
   * @returns {Promise<Array>} An array of search results.
   * @see {@link https://developer.zendesk.com/api-reference/ticketing/ticket-management/search/#export-search-results}
   * @example
   * const { results } = await client.search.exportResults('open tickets', 'ticket');
   */
  async exportResults(searchTerm, objectType, pageSize = 100) {
    return this.getAll([
      'search',
      'export',
      {query: searchTerm, 'filter[type]': objectType, 'page[size]': pageSize},
    ]);
  }
}

exports.Search = Search;
