#!/usr/bin/env node
const process = require('node:process');
const dotenv = require('dotenv');
const zd = require('../src/index.js');

dotenv.config();

const setupClient = (config) => {
  return zd.createClient({
    username: process.env.ZENDESK_USERNAME,
    subdomain: process.env.ZENDESK_SUBDOMAIN,
    token: process.env.ZENDESK_TOKEN,
    ...config,
  });
};

// Placeholder organization ID for development/testing.
// IMPORTANT: Replace with a valid organization ID before running in production.
const organizationID = 1_234_567_890;

/**
 *
 */
async function organizationsDelete() {
  try {
    const client = setupClient({debug: false});
    const {result} = await client.organizations.delete(organizationID);
    if (result.message === 'No Content') {
      console.log('Organization deleted');
    } else {
      console.dir(result);
    }
  } catch (error) {
    console.error(`Failed to delete organization: ${error.message}`);
  }
}

organizationsDelete();
