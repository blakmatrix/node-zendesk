//Organizations.js: Client for the zendesk API.


var util        = require('util'),
    Client      = require('./client').Client,
    defaultgroups = require('./helpers').defaultgroups;


var Organizations = exports.Organizations = function (options) {
  this.jsonAPINames = [ 'organizations', 'organization' ];
  Client.call(this, options);
};

// Inherit from Client base object
util.inherits(Organizations, Client);

// ######################################################## Organizations

// ====================================== Listing Organizations
Organizations.prototype.list = function () {
  return this.requestAll('GET', ['organizations']);//all
};

// ====================================== Viewing Organizations
Organizations.prototype.show = function (organizationID) {
  return this.request('GET', ['organizations', organizationID]);
};

// ====================================== Creating Organizations
Organizations.prototype.create = function (organization) {
  return this.request('POST', ['organizations'], organization);
};

// ====================================== Creating Or Updating Organizations
Organizations.prototype.createOrUpdate = function (organization) {
  return this.request('POST', ['organizations', 'create_or_update'], organization);
};

// ====================================== Updating Organizations
Organizations.prototype.update = function (organizationID, organization) {
  return this.request('PUT', ['organizations', organizationID], organization);
};

// ====================================== Creating Or Updating Organizations
Organizations.prototype.upsert = function (organization) {
  return this.request('POST', ['organizations', 'create_or_update'], organization);
};

// ====================================== Deleting Organizations
Organizations.prototype.delete = function (organizationID) {
  return this.request('DELETE', ['organizations', organizationID]);
};

// ====================================== Search Organizations
Organizations.prototype.search = function (params) {
  return this.requestAll('GET', ['organizations', 'search', params]);
};

// ====================================== Autocomplete Organizations
Organizations.prototype.autocomplete = function (params) {
  return this.requestAll('GET', ['organizations', 'autocomplete', params]);
};

// ====================================== New Incremental Organization Export with include
Organizations.prototype.incrementalInclude = function (startTime, include) {
  return this.request('GET', ['incremental', 'organizations', {start_time: startTime, include: include}]);
};

// ====================================== New Incremental Organization Export
Organizations.prototype.incremental = function (startTime) {
  return this.request('GET', ['incremental', 'organizations', {start_time: startTime}]);
};

// ====================================== New Incremental Organization Export Sample
Organizations.prototype.incrementalSample = function (startTime) {
  return this.request('GET', ['incremental', 'organizations', 'sample', {start_time: startTime}]);
};

