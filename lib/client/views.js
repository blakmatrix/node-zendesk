//Views.js: Client for the zendesk API.


var util        = require('util'),
    Client      = require('./client').Client,
    defaultUser = require('./helpers').defaultUser;


var Views = exports.Views = function (options) {
  Client.call(this, options);
};

// Inherit from Client base object
util.inherits(Views, Client);

// ######################################################## Views
// ====================================== Listing Views
Views.prototype.list = function (cb) {
  this.requestAll('GET', ['views'], cb);//all
};

// ====================================== Listing Active Views
Views.prototype.listActive = function (cb) {
  this.requestAll('GET', ['views', 'active'], cb);//all
};



// ====================================== Viewing Views
Views.prototype.show = function (viewID, cb) {
  this.request('GET', ['views', viewID], cb);
};

Views.prototype.showCount = function (viewID, cb) {
  this.request('GET', ['views', viewID, 'count'], cb);
};

Views.prototype.showCounts = function (viewIDs, cb) {
  this.request('GET', ['views', 'count_many', {ids: viewIDs}], cb);
};
