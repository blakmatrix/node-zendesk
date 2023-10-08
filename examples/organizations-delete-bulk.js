#!/usr/bin/env node
/* eslint-disable no-await-in-loop */

const process = require('node:process');
const dotenv = require('dotenv');
const zd = require('../src/index.js');

dotenv.config();

/**
 *
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
 *
 * @param organizations
 */
function getTestOrganizationIds(organizations) {
  return organizations
    .filter((org) => org.name.startsWith('test') || org.name.startsWith('Test'))
    .map((org) => org.id);
}

/**
 *
 * @param array
 * @param chunkSize
 */
function chunkArray(array, chunkSize) {
  const chunks = [];
  for (let i = 0; i < array.length; i += chunkSize) {
    chunks.push(array.slice(i, i + chunkSize));
  }

  return chunks;
}

/**
 *
 * @param client
 * @param jobID
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
 *
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
