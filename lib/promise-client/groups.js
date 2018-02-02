//Groups.js: Client for the zendesk API.


var util        = require('util'),
    Client      = require('./client').Client,
    defaultgroups = require('./helpers').defaultgroups;


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
Groups.prototype.list = function () {
  return this.requestAll('GET', ['groups']);//all
};


// ====================================== Viewing Groups
Groups.prototype.assignable = function () {
  return this.request('GET', ['groups', 'assignable']);//all
};

Groups.prototype.show = function (groupID) {
  return this.request('GET', ['groups', groupID]);
};

// ====================================== Creating Groups
Groups.prototype.create = function (group) {
  return this.request('POST', ['groups'], group);
};

// ====================================== Updating Groups

Groups.prototype.update = function (groupID, group) {
  return this.request('PUT', ['groups', groupID], group);
};


// ====================================== Deleting Groups
Groups.prototype.delete = function (groupID) {
  return this.request('DELETE', ['groups', groupID]);
};
