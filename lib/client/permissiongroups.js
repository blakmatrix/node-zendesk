// PermissionGroups.js: Client for the zendesk API.


var util        = require('util'),
  Client      = require('./client').Client;

var PermissionGroups = exports.PermissionGroups = function (options) {
  this.jsonAPINames = [ 'permission_groups' ];

  Client.call(this, options);
};

// Inherit from Client base object
util.inherits(PermissionGroups, Client);

// ######################################################## Permission Groups

// ====================================== Listing Permission Groups

PermissionGroups.prototype.list = function (cb) {
  return this.requestAll('GET', ['guide', 'permission_groups'], cb);//all
};

// ====================================== Viewing Permission Groups

PermissionGroups.prototype.show = function (groupID, cb) {
  return this.request('GET', ['guide', 'permission_groups', groupID], cb);
};

// ====================================== Creating Permission Groups
PermissionGroups.prototype.create = function (group, cb) {
  return this.request('POST', ['guide', 'permission_groups'], group, cb);
};

// ====================================== Updating Permission Groups
PermissionGroups.prototype.update = function (groupID, group, cb) {
  return this.request('PUT', ['guide', 'permission_groups', groupID], group, cb);
};

// ====================================== Deleting Permission Groups
PermissionGroups.prototype.delete = function (groupID, cb) {
  return this.request('DELETE', ['guide', 'permission_groups', groupID],  cb);
};
