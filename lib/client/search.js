//Search.js: Client for the zendesk API.


var util        = require('util'),
    Client      = require('./client').Client;

var Search = exports.Search = function (options) {
  this.jsonAPINames = [ 'results' ];
  Client.call(this, options);
};

// Inherit from Client base object
util.inherits(Search, Client);

// ######################################################## Search
// ====================================== Listing Search
Search.prototype.query = function (searchTerm, cb) {
  return this.request('GET', ['search', {query: searchTerm}], cb);
};

Search.prototype.queryAll = function (searchTerm, cb) {
  return this.requestAll('GET', ['search', {query: searchTerm}], cb);//all?
};

Search.prototype.queryAnonymous  = function (searchTerm, cb) {
  return this.request('GET', ['portal', 'search', {query: searchTerm}], cb);
};


Search.prototype.queryAnonymousAll  = function (searchTerm, cb) {
  return this.requestAll('GET', ['portal', 'search', {query: searchTerm}], cb);//all?
};

