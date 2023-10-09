#!/usr/bin/env node
/* eslint-disable no-await-in-loop */

const process = require('node:process');
const dotenv = require('dotenv');
const zd = require('../src/index.js');

dotenv.config();

/**
 * Initializes and returns a Zendesk client.
 * @returns {object} Zendesk client instance.
 */
function initializeZendeskClient() {
  return zd.createClient({
    username: process.env.ZENDESK_USERNAME,
    subdomain: process.env.ZENDESK_SUBDOMAIN,
    token: process.env.ZENDESK_TOKEN,
    debug: false,
  });
}

/**
 * Filters and returns organization IDs that start with "test" or "Test".
 * @param {Array} organizations - List of organizations.
 * @returns {Array} List of organization IDs.
 */
function getTestOrganizationIds(organizations) {
  return organizations
    .filter((org) => org.name.startsWith('test') || org.name.startsWith('Test'))
    .map((org) => org.id);
}

/**
 * Splits an array into chunks of a specified size.
 * @param {Array} array - The array to split.
 * @param {number} chunkSize - The size of each chunk.
 * @returns {Array} An array of chunks.
 */
function chunkArray(array, chunkSize) {
  const chunks = [];
  for (let i = 0; i < array.length; i += chunkSize) {
    chunks.push(array.slice(i, i + chunkSize));
  }

  return chunks;
}

/**
 * Monitors the completion of a job.
 * @param {object} client - The Zendesk client instance.
 * @param {string} jobID - The ID of the job to monitor.
 * @returns {Promise<void>} Resolves when the job is complete.
 */
async function monitorJobCompletion(client, jobID) {
  try {
    await client.jobstatuses.watch(jobID, 1000, 30);
  } catch (error) {
    console.error('Error watching job status:', error);
    throw error;
  }
}

/**
 * Performs a bulk deletion of test organizations.
 * @returns {Promise<void>} Resolves when all organizations are deleted.
 */
async function bulkDeleteTestOrganizations() {
  const client = initializeZendeskClient();

  try {
    const organizations = await client.organizations.list();
    const orgIdsToDelete = getTestOrganizationIds(organizations);
    const chunks = chunkArray(orgIdsToDelete, 30);

    for (const chunk of chunks) {
      const {result} = await client.organizations.bulkDelete(chunk);
      const {job_status} = result;

      if (job_status && job_status.id) {
        await monitorJobCompletion(client, job_status.id);
      }

      if (job_status && job_status.status) {
        console.log(
          `Successfully deleted chunk of ${chunk.length} organizations.`,
        );
      } else {
        console.dir(job_status);
      }
    }

    console.log('All organizations deleted successfully.');
  } catch (error) {
    if (error.message.includes('TooManyJobs')) {
      console.error(
        'Too many jobs are currently queued or running. Try again later.',
      );
    } else {
      console.error(
        `Failed to bulk delete test organizations: ${error.message}`,
      );
    }
  }
}

bulkDeleteTestOrganizations();
