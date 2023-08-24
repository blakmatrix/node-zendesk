// Targetfailures.js: Client for the zendesk API.

const util = require('node:util');
const {Client} = require('./client');

const TargetFailures = (exports.TargetFailures = function (options) {
  this.jsonAPINames = ['targetfailures', 'targetsfailures'];
  Client.call(this, options);
});

// Inherit from Client base object
util.inherits(TargetFailures, Client);

// ######################################################## Target Failures
// ====================================== Listing Target Failures
TargetFailures.prototype.list = function (cb) {
  this.requestAll('GET', ['target_failures'], cb); // All
};

// ====================================== Viewing Target Failure
TargetFailures.prototype.show = function (targetFailureID, cb) {
  this.request('GET', ['target_failures', targetFailureID], cb);
};
