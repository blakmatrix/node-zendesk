const TERMINAL_STATUSES = new Set(['completed', 'failed', 'killed']);

class JobMonitor {
  constructor(options) {
    this.client = require('../index').createClient(options);
  }

  /**
   * Checks the status of a job.
   *
   * @param {string} jobID - The ID of the job to monitor.
   * @returns {Promise<Object>} - Promise resolving to the job status.
   */
  async checkJobStatus(jobID) {
    const {result} = await this.client.jobstatuses.show(jobID);
    const {job_status} = result;
    return job_status;
  }

  /**
   * Continuously checks the status of a job using intervals and invokes a callback when the job status changes.
   *
   * @param {string} jobID - The ID of the job to monitor.
   * @param {number} [interval=500] - The interval in milliseconds at which to check the job status.
   * @param {number} [maxAttempts=5] - The maximum number of attempts to check the job status.
   * @returns {Promise<Object>} - Promise resolving to the job result.
   */
  async monitorJobStatus(jobID, interval = 500, maxAttempts = 5) {
    let attempts = 0;

    return new Promise((resolve, reject) => {
      const nIntervId = setInterval(async () => {
        try {
          const jobStatus = await this.checkJobStatus(jobID);

          if (TERMINAL_STATUSES.has(jobStatus.status)) {
            clearInterval(nIntervId);
            // This.client.emit('debug::result', `Job ${jobID} completed!`);
            resolve(jobStatus);
          } else {
            // This.client.emit(
            //   'debug::result',
            //   `[${jobStatus.message || 'pending'}] Job progress: ${
            //     jobStatus.progress || 0
            //   } out of ${jobStatus.total}`,
            // );
          }
        } catch (error) {
          if (error && error.statusCode === 404 && attempts < maxAttempts) {
            ++attempts;
            // This.client.emit(
            //   'debug::result',
            //   `Waiting for job to become available(attempt: ${attempts})...`,
            // );
          } else {
            clearInterval(nIntervId);
            reject(error);
          }
        }
      }, interval);
    });
  }
}

module.exports = JobMonitor;
