//GroupMemberships.js: Client for the zendesk API.


var util        = require('util'),
    Client      = require('./client').Client,
    defaultgroup_memberships = require('./helpers').defaultgroup_memberships;


var GroupMemberships = exports.GroupMemberships = function (options) {
  this.jsonAPINames  = [ 'group_memberships', 'group_membership' ];
  this.sideLoadMap = [
    { field: 'group_id',    name: 'groups',   dataset: 'groups'},
    { field: 'user_id',     name: 'user',     dataset: 'users'}
  ];
  Client.call(this, options);
};

// Inherit from Client base object
util.inherits(GroupMemberships, Client);

// ######################################################## GroupMemberships
// ====================================== Listing GroupMemberships
GroupMemberships.prototype.list = function () {
  return this.requestAll('GET', ['group_memberships']);//all
};

GroupMemberships.prototype.listByUser = function (userID) {
  return this.requestAll('GET', ['users', userID, 'group_memberships']);//all
};

GroupMemberships.prototype.listByGroup = function (groupID) {
  return this.requestAll('GET', ['groups', groupID, 'group_memberships']);//all
};


// ====================================== Viewing GroupMemberships

GroupMemberships.prototype.show = function (groupMembershipID) {
  return this.request('GET', ['group_memberships', groupMembershipID]);
};

GroupMemberships.prototype.showByUser = function (userID, groupMembershipID) {
  return this.request('GET', ['users', userID, 'group_memberships', groupMembershipID]);
};

// ====================================== Creating GroupMemberships
GroupMemberships.prototype.create = function (groupMembership) {
  return this.request('POST', ['group_memberships'], groupMembership);
};

GroupMemberships.prototype.createByUser = function (userID, groupMembership) {
  return this.request('POST', ['users', userID, 'group_memberships'], groupMembership);
};


// ====================================== Deleting GroupMemberships
GroupMemberships.prototype.delete = function (groupMembershipID) {
  return this.request('DELETE', ['group_memberships', groupMembershipID]);
};

GroupMemberships.prototype.deleteByUser = function (userID, groupMembershipID) {
  return this.request('DELETE', ['users', userID, 'group_memberships', groupMembershipID]);
};

// ====================================== Set membership as default
GroupMemberships.prototype.makeDefault = function (userID, groupMembershipID) {
  return this.request('PUT', ['users', userID, 'group_memberships', groupMembershipID, 'make_default']);
};
