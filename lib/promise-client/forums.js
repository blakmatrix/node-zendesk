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
Forums.prototype.list = function (cb) {
  this.requestAll('GET', ['forums'], cb);//all
};

Forums.prototype.listByCategory = function (categoryID, cb) {
  this.requestAll('GET', ['categories', categoryID, 'forums'], cb);//all
};


// ====================================== Viewing Forums

Forums.prototype.show = function (forumID, cb) {
  this.request('GET', ['forums', forumID], cb);
};

// ====================================== Creating Forums
Forums.prototype.create = function (forum, cb) {
  this.request('POST', ['forums'], forum, cb);
};

// ====================================== Updating Forums

Forums.prototype.update = function (forumID, forum, cb) {
  this.request('PUT', ['forums', forumID], forum, cb);
};


// ====================================== Deleting Forums
Forums.prototype.delete = function (forumID, cb) {
  this.request('DELETE', ['forums', forumID],  cb);
};
