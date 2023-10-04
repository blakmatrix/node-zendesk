import { expect } from 'vitest';

class JobInitiator {
  async initiate(initiateFunction) {
    const {result} = await initiateFunction();
    return result;
  }
}

class JobStatusVerifier {
  verifyInitialStatus(result) {
    expect(result.job_status).toHaveProperty('id');
    expect(result.job_status.status).toBe('queued');
  }

  verifyFinalStatus(finalJobResults) {
    expect(finalJobResults.status).toBe('completed');
  }
}

class JobWatcher {
  constructor(client) {
    this.client = client;
  }

  async watch(jobStatusId) {
    return this.client.jobstatuses.watch(jobStatusId, 1000, 30);
  }
}

export class JobRunner {
  constructor(client) {
    this.client = client;
    this.initiator = new JobInitiator();
    this.verifier = new JobStatusVerifier();
    this.watcher = new JobWatcher(client);
  }

  async run(initiateFunction, validateJobDetails) {
    const result = await this.initiator.initiate(initiateFunction);

    this.verifier.verifyInitialStatus(result);

    const finalJobResults = await this.watcher.watch(result.job_status.id);

    this.verifier.verifyFinalStatus(finalJobResults);

    await validateJobDetails(finalJobResults);
  }
}
