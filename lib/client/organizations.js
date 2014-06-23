//Organizations.js: Client for the zendesk API.


var util        = require('util'),
    Client      = require('./client').Client,
    defaultgroups = require('./helpers').defaultgroups;


var Organizations = exports.Organizations = function (options) {
  this.jsonAPIName = 'organizations';
  this.jsonAPIName2 = 'organization';
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
