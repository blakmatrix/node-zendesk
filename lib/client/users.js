//users.js: Client for the zendesk API.


var util        = require('util'),
    Client      = require('./client').Client,
    defaultUser = require('./helpers').defaultUser;


var Users = exports.Users = function (options) {
  this.jsonAPIName = 'users';
  this.jsonAPIName2 = 'user';
  Client.call(this, options);
};

// Inherit from Client base object
util.inherits(Users, Client);


Users.prototype.auth = function (cb) {
  this.request('GET', ['users', 'me'], cb);
};


Users.prototype.list = function (cb) {
  this.requestAll('GET', ['users'], cb);
};


Users.prototype.listByGroup = function (id, cb) {
  this.requestAll('GET', ['groups', id, 'users'], cb);
};


Users.prototype.listByOrganization = function (id, cb) {
  this.requestAll('GET', ['organizations', id, 'users'], cb);
};


Users.prototype.show = function (id, cb) {
  this.request('GET', ['users', id], cb);
};


Users.prototype.showMany = function (user_ids, cb) {
  this.request('GET', ['users', 'show_many', '?ids=' + user_ids.toString()], cb);
};


Users.prototype.create = function (user, cb) {
  this.request('POST', ['users'], user, cb);
};


Users.prototype.createMany = function (users, cb) {
  this.request('POST', ['users', 'create_many'], users, cb);
};


Users.prototype.update = function (id, user, cb) {
  this.request('PUT', ['users', id], user, cb);
};


Users.prototype.suspend = function (id, cb) {
  this.request('PUT', ['users', id], {"user": {"suspended": true} }, cb);
};

Users.prototype.unsuspend = function (id, cb) {
  this.request('PUT', ['users', id], {"user": {"suspended": false} }, cb);
};

Users.prototype.delete = function (id, cb) {
  this.request('DELETE', ['users', id], cb);
};

Users.prototype.search = function (params, cb) {
  this.requestAll('GET', ['users', 'search', params], cb);
};

Users.prototype.me = function (cb) {
  this.request('GET', ['users', 'me'], cb);
};

Users.prototype.merge = function (id, targetId, cb) {
  this.request('PUT', ['users', id, 'merge'], {"user": {"id": targetId} }, cb);
};
