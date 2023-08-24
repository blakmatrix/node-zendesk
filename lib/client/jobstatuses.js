// JobStatuses.js: Client for the zendesk API.

const util = require('node:util');
const {Client} = require('./client');
const {getJobStatuses} = require('./helpers');

const JobStatuses = (exports.JobStatuses = function (options) {
  this.jsonAPINames = ['jobstatuses'];
  Client.call(this, options);
});

// Inherit from Client base object
util.inherits(JobStatuses, Client);

// ====================================== Get JobStatuses
JobStatuses.prototype.show = function (jobStatusID, cb) {
  return this.request('GET', ['job_statuses', jobStatusID], cb);
};

JobStatuses.prototype.watch = function (jobID, interval, maxAttempts, cb) {
  getJobStatuses(this.options, jobID, interval, maxAttempts, cb);
};
