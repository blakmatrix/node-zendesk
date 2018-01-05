//Tags.js: Client for the zendesk API.


var util        = require('util'),
    Client      = require('./client').Client,
    defaultgroups = require('./helpers').defaultgroups;


var Tags = exports.Tags = function (options) {
  this.jsonAPINames = [ 'tags' ];
  Client.call(this, options);
};

// Inherit from Client base object
util.inherits(Tags, Client);

// ######################################################## Tags
// ====================================== Listing Tags
Tags.prototype.list = function (cb) {
  this.requestAll('GET', ['tags'], cb);//all
};


