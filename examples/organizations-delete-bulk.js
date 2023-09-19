#!/usr/bin/env node
/* eslint-disable no-await-in-loop */

const process = require('node:process');
const dotenv = require('dotenv');
const zd = require('../src/index.js');

dotenv.config();

function initializeZendeskClient() {
  return zd.createClient({
    username: process.env.ZENDESK_USERNAME,
    subdomain: process.env.ZENDESK_SUBDOMAIN,
    token: process.env.ZENDESK_TOKEN,
    debug: false,
  });
}

function getTestOrganizationIds(organizations) {
  return organizations
    .filter((org) => org.name.startsWith('Test Organization'))
    .map((org) => org.id);
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function waitForJobsToComplete(client) {
  let jobCount = 30; // Assuming maximum allowed jobs at first
  while (jobCount >= 30) {
    // While the queue is full
    console.log('Waiting for job queue to clear...');
    await sleep(1000); // Wait for 1 second before checking again
    const jobs = await client.jobstatuses.list();
    jobCount = jobs.length;
  }
}

function chunkArray(array, chunkSize) {
  const chunks = [];
  for (let i = 0; i < array.length; i += chunkSize) {
    chunks.push(array.slice(i, i + chunkSize));
  }

  return chunks;
}

async function bulkDeleteTestOrganizations() {
  const client = initializeZendeskClient();

  try {
    const organizations = await client.organizations.list();
    const orgIdsToDelete = getTestOrganizationIds(organizations);
    const chunks = chunkArray(orgIdsToDelete, 30);

    for (const chunk of chunks) {
      await waitForJobsToComplete(client);

      const {result} = await client.organizations.bulkDelete(chunk);

      if (result.message === 'No Content') {
        console.log(
          `Successfully deleted chunk of ${chunk.length} organizations.`,
        );
      } else {
        console.dir(result);
      }
    }

    console.log('All test organizations deleted successfully.');
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
