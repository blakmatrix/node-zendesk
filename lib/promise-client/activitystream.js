//ActivityStream.js: Client for the zendesk API.


var util        = require('util'),
    Client      = require('./client').Client,
    defaultgroups = require('./helpers').defaultgroups;


var ActivityStream = exports.ActivityStream = function (options) {
  this.jsonAPINames = [ 'activities', 'activity' ];
  Client.call(this, options);
};

// Inherit from Client base object
util.inherits(ActivityStream, Client);

// ######################################################## ActivityStream
// ====================================== Listing ActivityStream
ActivityStream.prototype.list = function list() {
  return this.requestAll('GET', ['activities']);//all
};


// ====================================== Viewing ActivityStream

ActivityStream.prototype.show = function (activityId) {
  return this.request('GET', ['activities', activityId]);
};

