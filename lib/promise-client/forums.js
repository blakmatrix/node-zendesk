//Forums.js: Client for the zendesk API.


var util        = require('util'),
    Client      = require('./client').Client,
    defaultgroups = require('./helpers').defaultgroups;


var Forums = exports.Forums = function (options) {
  this.jsonAPINames = [ 'forums', 'forum' ];
  Client.call(this, options);
};

// Inherit from Client base object
util.inherits(Forums, Client);

// ######################################################## Forums
// ====================================== Listing Forums
Forums.prototype.list = function list() {
  return this.requestAll('GET', ['forums']);//all
};

Forums.prototype.listByCategory = function listByCategory(categoryId) {
  return this.requestAll('GET', ['categories', categoryId, 'forums']);//all
};


// ====================================== Viewing Forums

Forums.prototype.show = function show(forumId) {
  return this.request('GET', ['forums', forumId]);
};

// ====================================== Creating Forums
Forums.prototype.create = function create(forum) {
  return this.request('POST', ['forums'], forum);
};

// ====================================== Updating Forums

Forums.prototype.update = function update(forumId, forum) {
  return this.request('PUT', ['forums', forumId], forum);
};


// ====================================== Deleting Forums
Forums.prototype.delete = function delete(forumId) {
  return this.request('DELETE', ['forums', forumId]);
};
