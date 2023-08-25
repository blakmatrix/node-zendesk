// JobStatuses.js: Client for the zendesk API.
const {Client} = require('./client');
const {getJobStatuses} = require('./helpers');

class JobStatuses extends Client {
  constructor(options) {
    super(options);
    this.jsonAPINames = ['jobstatuses'];
  }

  // Get JobStatuses
  show(jobStatusID, cb) {
    return this.get(['job_statuses', jobStatusID], cb);
  }

  watch(jobID, interval, maxAttempts, cb) {
    getJobStatuses(this.options, jobID, interval, maxAttempts, cb);
  }
}

exports.JobStatuses = JobStatuses;
