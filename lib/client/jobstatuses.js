// JobStatuses.js: Client for the zendesk API.
const {Client} = require('./client');
const {getJobStatuses} = require('../helpers');

class JobStatuses extends Client {
  constructor(options) {
    super(options);
    this.jsonAPINames = ['jobstatuses'];
  }

  // Get JobStatuses
  async show(jobStatusID) {
    return this.get(['job_statuses', jobStatusID]);
  }

  async watch(jobID, interval, maxAttempts) {
    getJobStatuses(this.options, jobID, interval, maxAttempts);
  }
}

exports.JobStatuses = JobStatuses;
