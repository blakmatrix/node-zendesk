// ActivityStream.js: Client for the zendesk API.

const util = require('node:util');
const {Client} = require('./client');

const ActivityStream = (exports.ActivityStream = function (options) {
  this.jsonAPINames = ['activities', 'activity'];
  Client.call(this, options);
});

// Inherit from Client base object
util.inherits(ActivityStream, Client);

// ######################################################## ActivityStream
// ====================================== Listing ActivityStream
ActivityStream.prototype.list = function (cb) {
  return this.requestAll('GET', ['activities', '?page[size]=100'], cb); // All
};

// ====================================== Viewing ActivityStream

ActivityStream.prototype.show = function (activityID, cb) {
  return this.request('GET', ['activities', activityID], cb);
};
