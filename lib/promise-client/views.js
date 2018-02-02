//Views.js: Client for the zendesk API.


var util        = require('util'),
    Client      = require('./client').Client,
    defaultUser = require('./helpers').defaultUser;


var Views = exports.Views = function (options) {
  this.jsonAPINames = [ 'views', 'view' ];
  Client.call(this, options);
};

// Inherit from Client base object
util.inherits(Views, Client);

// ######################################################## Views
// ====================================== Listing Views
Views.prototype.list = function () {
  return this.requestAll('GET', ['views']);//all
};

// ====================================== Listing Active Views
Views.prototype.listActive = function () {
  return this.requestAll('GET', ['views', 'active']);//all
};

// GET /api/v2/views/compact.json
// A compacted list of shared and personal views available to the current user
Views.prototype.listCompact = function () {
  return this.requestAll('GET', ['views', 'compact']);//all
};

// ====================================== Viewing Views
Views.prototype.show = function (viewID) {
  return this.request('GET', ['views', viewID]);
};

// Create View
// POST /api/v2/views.json
Views.prototype.create = function (view) {
  return this.request('POST', ['views'], view);
};

// Update View
// PUT /api/v2/views/{id}.json
Views.prototype.update = function (viewID, viewData) {
  return this.request('PUT', ['views', viewID], viewData);
};

// Executing Views
// GET /api/v2/views/{id}/execute.json
// :params can be http://developer.zendesk.com/documentation/rest_api/views.html#previewing-views
Views.prototype.execute = function (viewID, params) {
  return this.requestAll('GET', ['views', viewID, 'execute', params]);
};

// Getting Tickets from a view
// GET /api/v2/views/{id}/tickets.json
Views.prototype.tickets = function (viewID) {
  return this.requestAll('GET', ['views', viewID, 'tickets']);
};

// Previewing Views
// POST /api/v2/views/preview.json
// :params can be http://developer.zendesk.com/documentation/rest_api/views.html#previewing-views
Views.prototype.preview = function (params) {
  return this.requestAll('POST', ['views', 'preview'], params);
};

Views.prototype.showCount = function (viewID) {
  return this.request('GET', ['views', viewID, 'count']);
};

Views.prototype.showCounts = function (viewIDs) {
  return this.request('GET', ['views', 'count_many', {ids: viewIDs}]);
};

// Exporting Views
// GET /api/v2/views/{id}/export.json
Views.prototype.export = function (viewID) {
  return this.request('GET', ['views', viewID, 'export']);
};
