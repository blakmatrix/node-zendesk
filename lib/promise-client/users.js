//users.js: Client for the zendesk API.


var util        = require('util'),
  Client      = require('./client').Client,
  defaultUser = require('./helpers').defaultUser;


var Users = exports.Users = function (options) {
  this.jsonAPINames = ['users', 'user'];
  this.sideLoadMap = [
    { field: 'id', name: 'group', dataset: 'groups', all: true },
    { field: 'id', name: 'identity', dataset: 'identities', array: true, dataKey: 'user_id' },
    { field: 'custom_role_id', name: 'role', dataset: 'roles'},
    { field: 'organization_id', name: 'organization', dataset: 'organizations' }
  ];
  Client.call(this, options);
};

// Inherit from Client base object
util.inherits(Users, Client);


Users.prototype.auth = function () {
  return this.request('GET', ['users', 'me']);
};


Users.prototype.list = function () {
  return this.requestAll('GET', ['users']);
};


Users.prototype.listByGroup = function (id) {
  return this.requestAll('GET', ['groups', id, 'users']);
};


Users.prototype.listByOrganization = function (id) {
  return this.requestAll('GET', ['organizations', id, 'users']);
};


Users.prototype.show = function (id) {
  return this.request('GET', ['users', id]);
};


Users.prototype.showMany = function (user_ids) {
  return this.request('GET', ['users', 'show_many', '?ids=' + user_ids.toString()]);
};


Users.prototype.create = function (user) {
  return this.request('POST', ['users'], user);
};


Users.prototype.createMany = function (users) {
  return this.request('POST', ['users', 'create_many'], users);
};

Users.prototype.createOrUpdate = function (user) {
  return this.request('POST', ['users', 'create_or_update'], user);
};


Users.prototype.createOrUpdateMany = function (users) {
  return this.request('POST', ['users', 'create_or_update_many'], users);
};

Users.prototype.update = function (id, user) {
  return this.request('PUT', ['users', id], user);
};

Users.prototype.updateMany = function (/*Optional*/ids, users) {
  var args = Array.prototype.slice.call(arguments);
  if(args.length == 2){
    return this.request('PUT', ['users', 'update_many'], ids, users);
  } 
  
  if (!ids){
    return this.request('PUT', ['users', 'update_many'], users);
  }
  
  if(typeof ids === 'string') {
    return this.request('PUT', ['users', 'update_many', '?ids=' + ids.toString()], users);
  }
  
  if(typeof ids === 'object'){
    if(Array.isArray(ids)) {
      return this.request('PUT', ['users', 'update_many', '?ids=' + ids.join(',')], users);
    }

    if(ids.hasOwnProperty('ids')){
      return this.request('PUT', ['users', 'update_many', '?ids=' + ids.ids.toString()], users);
    }

    if(ids.hasOwnProperty('external_ids')){
      return this.request('PUT', ['users', 'update_many', '?external_ids=' + ids.external_ids.toString()], users);
    }
  }
};

Users.prototype.suspend = function (id) {
  return this.request('PUT', ['users', id], {"user": {"suspended": true} });
};

Users.prototype.unsuspend = function (id) {
  return this.request('PUT', ['users', id], {"user": {"suspended": false} });
};

Users.prototype.delete = function (id) {
  return this.request('DELETE', ['users', id]);
};

Users.prototype.search = function (params) {
  return this.requestAll('GET', ['users', 'search', params]);
};

Users.prototype.me = function () {
  return this.request('GET', ['users', 'me']);
};

Users.prototype.merge = function (id, targetId) {
  return this.request('PUT', ['users', id, 'merge'], {"user": {"id": targetId} });
};

//  ====================================== New Incremental Users Export with include
Users.prototype.incrementalInclude = function (startTime, include) {
  return this.request('GET', ['incremental', 'users', {start_time: startTime, include: include}]);
};

//  ====================================== New Incremental Users Export
Users.prototype.incremental = function (startTime) {
  return this.request('GET', ['incremental', 'users', {start_time: startTime}]);
};
//  ====================================== New Incremental Users Export Sample
Users.prototype.incrementalSample = function (startTime) {
  return this.request('GET', ['incremental', 'users', 'sample', {start_time: startTime}]);
};
