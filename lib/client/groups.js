//Groups.js: Client for the zendesk API.


var util        = require('util'),
    Client      = require('./client').Client;

var Groups = exports.Groups = function (options) {
  this.jsonAPINames = [ 'groups', 'group' ];
  this.sideLoadMap = [
    { field: 'user_id', name: 'users', dataset: 'users', all: true }
  ];
  Client.call(this, options);
};

// Inherit from Client base object
util.inherits(Groups, Client);

// ######################################################## Groups
// ====================================== Listing Groups
Groups.prototype.list = function (cb) {
  return this.requestAll('GET', ['groups'], cb);//all
};


// ====================================== Viewing Groups
Groups.prototype.assignable = function (cb) {
  return this.request('GET', ['groups', 'assignable'], cb);//all
};

Groups.prototype.show = function (groupID, cb) {
  return this.request('GET', ['groups', groupID], cb);
};

// ====================================== Creating Groups
Groups.prototype.create = function (group, cb) {
  return this.request('POST', ['groups'], group, cb);
};

// ====================================== Updating Groups

Groups.prototype.update = function (groupID, group, cb) {
  return this.request('PUT', ['groups', groupID], group, cb);
};


// ====================================== Deleting Groups
Groups.prototype.delete = function (groupID, cb) {
  return this.request('DELETE', ['groups', groupID],  cb);
};
