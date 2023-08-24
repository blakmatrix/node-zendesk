// Groups.js: Client for the zendesk API.

const util = require('node:util');
const {Client} = require('./client');

const Groups = (exports.Groups = function (options) {
  this.jsonAPINames = ['groups', 'group'];
  this.sideLoadMap = [
    {field: 'user_id', name: 'users', dataset: 'users', all: true},
  ];
  Client.call(this, options);
});

// Inherit from Client base object
util.inherits(Groups, Client);

// ######################################################## Groups
// ====================================== Listing Groups
Groups.prototype.list = function (cb) {
  return this.requestAll('GET', ['groups', '?page[size]=100'], cb); // All
};

// ====================================== Viewing Groups
Groups.prototype.assignable = function (cb) {
  return this.requestAll(
    'GET',
    ['groups', 'assignable', '?page[size]=100'],
    cb,
  ); // All
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
  return this.request('DELETE', ['groups', groupID], cb);
};
