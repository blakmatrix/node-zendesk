//JobStatuses.js: Client for the zendesk API.


var util        = require('util'),
    Client      = require('./client').Client,
    defaultgroups = require('./helpers').defaultgroups;


var JobStatuses = exports.JobStatuses = function (options) {
  Client.call(this, options);
};

// Inherit from Client base object
util.inherits(JobStatuses, Client);


// ====================================== Creating JobStatuses
JobStatuses.prototype.show = function (jobStatusID, cb) { //TODO
  this.request('POST', ['job_statuses', jobStatusID], cb);
};

