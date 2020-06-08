//Forums.js: Client for the zendesk API.


var util        = require('util'),
    Client      = require('./client').Client;

var Forums = exports.Forums = function (options) {
  this.jsonAPINames = [ 'forums', 'forum' ];
  Client.call(this, options);
};

// Inherit from Client base object
util.inherits(Forums, Client);

// ######################################################## Forums
// ====================================== Listing Forums
Forums.prototype.list = function (cb) {
  return this.requestAll('GET', ['forums'], cb);//all
};

Forums.prototype.listByCategory = function (categoryID, cb) {
  return this.requestAll('GET', ['categories', categoryID, 'forums'], cb);//all
};


// ====================================== Viewing Forums

Forums.prototype.show = function (forumID, cb) {
  return this.request('GET', ['forums', forumID], cb);
};

// ====================================== Creating Forums
Forums.prototype.create = function (forum, cb) {
  return this.request('POST', ['forums'], forum, cb);
};

// ====================================== Updating Forums

Forums.prototype.update = function (forumID, forum, cb) {
  return this.request('PUT', ['forums', forumID], forum, cb);
};


// ====================================== Deleting Forums
Forums.prototype.delete = function (forumID, cb) {
  return this.request('DELETE', ['forums', forumID],  cb);
};
