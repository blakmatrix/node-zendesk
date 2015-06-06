//Topics.js: Client for the zendesk API.


var util        = require('util'),
    Client      = require('./client').Client,
    defaultgroups = require('./helpers').defaultgroups;


var Topics = exports.Topics = function (options) {
  this.jsonAPINames = [ 'topics', 'topic' ];
  this.sideLoadMap = [
    { field: 'updater_id',      name: 'updater',      dataset: 'users'},
    { field: 'submitter_id',    name: 'submitter',    dataset: 'users'},
    { field: 'forum_id',        name: 'forum',        dataset: 'forums'}
  ];
  Client.call(this, options);
};

// Inherit from Client base object
util.inherits(Topics, Client);

// ######################################################## Topics
// ====================================== Listing Topics
Topics.prototype.list = function (cb) {
  this.requestAll('GET', ['topics'], cb);//all
};

Topics.prototype.listByForum = function (forumID, cb) {
  this.requestAll('GET', ['forums', forumID, 'topics'], cb);//all
};

Topics.prototype.listByUser = function (userID, cb) {
  this.requestAll('GET', ['users', userID, 'topics'], cb);//all
};


// ====================================== Viewing Topics

Topics.prototype.show = function (topicID, cb) {
  this.request('GET', ['topics', topicID], cb);
};

Topics.prototype.showMany = function (topicIDs, cb) {
  this.request('GET', ['topics', 'show_many', {ids: topicIDs}], cb);
};

// ====================================== Creating Topics
Topics.prototype.create = function (topic, cb) {
  this.request('POST', ['topics'], topic, cb);
};

// ====================================== Updating Topics

Topics.prototype.update = function (topicID, topic, cb) {
  this.request('PUT', ['topics', topicID], topic, cb);
};


// ====================================== Deleting Topics
Topics.prototype.delete = function (topicID, cb) {
  this.request('DELETE', ['topics', topicID],  cb);
};
