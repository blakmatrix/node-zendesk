//Search.js: Client for the zendesk API.


var util        = require('util'),
    Client      = require('./client').Client,
    defaultgroups = require('./helpers').defaultgroups;


var Search = exports.Search = function (options) {
  this.jsonAPINames = [ 'results' ];
  Client.call(this, options);
};

// Inherit from Client base object
util.inherits(Search, Client);

// ######################################################## Search
// ====================================== Listing Search
Search.prototype.query = function (searchTerm) {
  return this.request('GET', ['search', {query: searchTerm}]);
};

Search.prototype.queryAll = function (searchTerm) {
  return this.requestAll('GET', ['search', {query: searchTerm}]);//all?
};

Search.prototype.queryAnonymous  = function (searchTerm) {
  return this.request('GET', ['portal', 'search', {query: searchTerm}]);
};


Search.prototype.queryAnonymousAll  = function (searchTerm) {
  return this.requestAll('GET', ['portal', 'search', {query: searchTerm}]);//all?
};

