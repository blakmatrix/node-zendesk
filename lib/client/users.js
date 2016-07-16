//users.js: Client for the zendesk API.


var util        = require('util'),
    Client      = require('./client').Client,
    defaultUser = require('./helpers').defaultUser;


var Users = exports.Users = function (options) {
  this.jsonAPINames = ['users', 'user'];
  this.sideLoadMap = [
    { field: 'id',              name: 'group',       dataset: 'groups',      all: true },
    { field: 'id',              name: 'identity',   dataset: 'identities',  array: true,    dataKey: 'user_id' },
    { field: 'custom_role_id',  name: 'role',         dataset: 'roles'},
    { field: 'organization_id', name: 'organization', dataset: 'organizations'}
  ];
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

Users.prototype.createOrUpdate = function (user, cb) {
  this.request('POST', ['users', 'create_or_update'], user, cb);
};


Users.prototype.createOrUpdateMany = function (users, cb) {
  this.request('POST', ['users', 'create_or_update_many'], users, cb);
};

Users.prototype.update = function (id, user, cb) {
  this.request('PUT', ['users', id], user, cb);
};

Users.prototype.updateMany = function (/*Optional*/ids, users, cb) {
  var args = Array.prototype.slice.call(arguments);
  if(args.length == 2){
    cb = users;
    users = ids;
    this.request('PUT', ['users', 'update_many'], users, cb);
  } else if (!ids){
    this.request('PUT', ['users', 'update_many'], users, cb);
  } else if(typeof ids === 'string') {
    this.request('PUT', ['users', 'update_many', '?ids=' + ids.toString()], users, cb);
  } else if(typeof ids === 'object'){
    if(Array.isArray(ids)) {
      this.request('PUT', ['users', 'update_many', '?ids=' + ids.join(',')], users, cb);
    }
    else if(ids.hasOwnProperty('ids')){
      this.request('PUT', ['users', 'update_many', '?ids=' + ids.ids.toString()], users, cb);
    }
    else if(ids.hasOwnProperty('external_ids')){
      this.request('PUT', ['users', 'update_many', '?external_ids=' + ids.external_ids.toString()], users, cb);
    }
  }
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

//  ====================================== New Incremental Users Export with include
Users.prototype.incrementalInclude = function (startTime, include, cb) {
  this.request('GET', ['incremental', 'users', {start_time: startTime, include: include}],  cb);
};

//  ====================================== New Incremental Users Export
Users.prototype.incremental = function (startTime, cb) {
  this.request('GET', ['incremental', 'users', {start_time: startTime}],  cb);
};
//  ====================================== New Incremental Users Export Sample
Users.prototype.incrementalSample = function (startTime, cb) {
  this.request('GET', ['incremental', 'users', 'sample', {start_time: startTime}],  cb);
};
