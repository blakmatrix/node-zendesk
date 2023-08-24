// GroupMemberships.js: Client for the zendesk API.

const util = require('node:util');
const {Client} = require('./client');

const GroupMemberships = (exports.GroupMemberships = function (options) {
  this.jsonAPINames = ['group_memberships', 'group_membership'];
  this.sideLoadMap = [
    {field: 'group_id', name: 'groups', dataset: 'groups'},
    {field: 'user_id', name: 'user', dataset: 'users'},
  ];
  Client.call(this, options);
});

// Inherit from Client base object
util.inherits(GroupMemberships, Client);

// ######################################################## GroupMemberships
// ====================================== Listing GroupMemberships
GroupMemberships.prototype.list = function (cb) {
  return this.requestAll('GET', ['group_memberships', '?page[size]=100'], cb); // All
};

GroupMemberships.prototype.listByUser = function (userID, cb) {
  return this.requestAll(
    'GET',
    ['users', userID, 'group_memberships', '?page[size]=100'],
    cb,
  ); // All
};

GroupMemberships.prototype.listByGroup = function (groupID, cb) {
  return this.requestAll(
    'GET',
    ['groups', groupID, 'memberships', '?page[size]=100'],
    cb,
  ); // All
};

// ====================================== Viewing GroupMemberships

GroupMemberships.prototype.show = function (groupMembershipID, cb) {
  return this.request('GET', ['group_memberships', groupMembershipID], cb);
};

GroupMemberships.prototype.showByUser = function (
  userID,
  groupMembershipID,
  cb,
) {
  return this.request(
    'GET',
    ['users', userID, 'group_memberships', groupMembershipID],
    cb,
  );
};

// ====================================== Creating GroupMemberships
GroupMemberships.prototype.create = function (groupMembership, cb) {
  return this.request('POST', ['group_memberships'], groupMembership, cb);
};

GroupMemberships.prototype.createByUser = function (
  userID,
  groupMembership,
  cb,
) {
  return this.request(
    'POST',
    ['users', userID, 'group_memberships'],
    groupMembership,
    cb,
  );
};

// ====================================== Deleting GroupMemberships
GroupMemberships.prototype.delete = function (groupMembershipID, cb) {
  return this.request('DELETE', ['group_memberships', groupMembershipID], cb);
};

GroupMemberships.prototype.deleteByUser = function (
  userID,
  groupMembershipID,
  cb,
) {
  return this.request(
    'DELETE',
    ['users', userID, 'group_memberships', groupMembershipID],
    cb,
  );
};

// ====================================== Set membership as default
GroupMemberships.prototype.makeDefault = function (
  userID,
  groupMembershipID,
  cb,
) {
  return this.request(
    'PUT',
    ['users', userID, 'group_memberships', groupMembershipID, 'make_default'],
    cb,
  );
};
