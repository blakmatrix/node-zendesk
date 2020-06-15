//ActivityStream.js: Client for the zendesk API.


var util        = require('util'),
    Client      = require('./client').Client;


var ActivityStream = exports.ActivityStream = function (options) {
  this.jsonAPINames = [ 'activities', 'activity' ];
  Client.call(this, options);
};

// Inherit from Client base object
util.inherits(ActivityStream, Client);

// ######################################################## ActivityStream
// ====================================== Listing ActivityStream
ActivityStream.prototype.list = function (cb) {
  return this.requestAll('GET', ['activities'], cb);//all
};


// ====================================== Viewing ActivityStream

ActivityStream.prototype.show = function (activityID, cb) {
  return this.request('GET', ['activities', activityID], cb);
};

