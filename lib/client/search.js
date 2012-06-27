//Search.js: Client for the zendesk API.


var util        = require('util'),
    Client      = require('./client').Client,
    defaultgroups = require('./helpers').defaultgroups;


var Search = exports.Search = function (options) {
  Client.call(this, options);
};

// Inherit from Client base object
util.inherits(Search, Client);

// ######################################################## Search
// ====================================== Listing Search
Search.prototype.query = function (searchTerm, cb) {
  this.request('GET', ['search', {query: searchTerm}], cb);//all?
};

Search.prototype.queryAnonymous  = function (searchTerm, cb) {
  this.request('GET', ['portal', 'search', {query: searchTerm}], cb);//all?
};

