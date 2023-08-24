// Search.js: Client for the zendesk API.

const util = require('node:util');
const {Client} = require('./client');

const Search = (exports.Search = function (options) {
  this.jsonAPINames = ['results'];
  Client.call(this, options);
});

// Inherit from Client base object
util.inherits(Search, Client);

// ######################################################## Search
// ====================================== Listing Search
Search.prototype.query = function (searchTerm, cb) {
  return this.request('GET', ['search', {query: searchTerm}], cb);
};

Search.prototype.queryAll = function (searchTerm, cb) {
  return this.requestAll('GET', ['search', {query: searchTerm}], cb); // All?
};

Search.prototype.queryAnonymous = function (searchTerm, cb) {
  return this.request('GET', ['portal', 'search', {query: searchTerm}], cb);
};

Search.prototype.queryAnonymousAll = function (searchTerm, cb) {
  return this.requestAll('GET', ['portal', 'search', {query: searchTerm}], cb); // All?
};
