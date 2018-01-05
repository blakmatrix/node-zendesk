//JobStatuses.js: Client for the zendesk API.


var util           = require('util'),
    Client         = require('./client').Client,
    getJobStatuses = require('./helpers').getJobStatuses;


var JobStatuses = exports.JobStatuses = function (options) {
  this.jsonAPINames = [ 'jobstatuses' ];
  Client.call(this, options);
};

// Inherit from Client base object
util.inherits(JobStatuses, Client);


// ====================================== Get JobStatuses
JobStatuses.prototype.show = function (jobStatusID, cb) {
  this.request('GET', ['job_statuses', jobStatusID], cb);
};

JobStatuses.prototype.watch = function (jobID, interval, maxAttempts, cb) {
  getJobStatuses(this.options, jobID, interval, maxAttempts, cb);
};

