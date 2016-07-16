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
Organizations.prototype.list = function (cb) {
  this.requestAll('GET', ['organizations'], cb);//all
};


// ====================================== Viewing Organizations

Organizations.prototype.show = function (organizationID, cb) {
  this.request('GET', ['organizations', organizationID], cb);
};

// ====================================== Creating Organizations
Organizations.prototype.create = function (organization, cb) {
  this.request('POST', ['organizations'], organization, cb);
};

// ====================================== Updating Organizations

Organizations.prototype.update = function (organizationID, organization, cb) {
  this.request('PUT', ['organizations', organizationID], organization, cb);
};


// ====================================== Deleting Organizations
Organizations.prototype.delete = function (organizationID, cb) {
  this.request('DELETE', ['organizations', organizationID],  cb);
};

// ====================================== Search Organizations
Organizations.prototype.search = function (params, cb) {
  this.requestAll('GET', ['organizations', 'search', params], cb);
};

// ====================================== Autocomplete Organizations
Organizations.prototype.autocomplete = function (params, cb) {
  this.requestAll('GET', ['organizations', 'autocomplete', params], cb);
};

//  ====================================== New Incremental Organization Export with include
Organizations.prototype.incrementalInclude = function (startTime, include, cb) {
  this.request('GET', ['incremental', 'organizations', {start_time: startTime, include: include}],  cb);
};

//  ====================================== New Incremental Organization Export
Organizations.prototype.incremental = function (startTime, cb) {
  this.request('GET', ['incremental', 'organizations', {start_time: startTime}],  cb);
};
//  ====================================== New Incremental Organization Export Sample
Organizations.prototype.incrementalSample = function (startTime, cb) {
  this.request('GET', ['incremental', 'organizations', 'sample', {start_time: startTime}],  cb);
};

