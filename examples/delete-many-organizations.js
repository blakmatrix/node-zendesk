#!/usr/bin/env node
/* eslint-disable no-await-in-loop */
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

/**
 *
 */
async function organizationsDelete() {
  let collector = [];
  try {
    const client = setupClient({debug: false});
    const allOrgs = await client.organizations.list();
    for (const element of allOrgs) {
      if (element.name.startsWith('testOrganization')) {
        collector.push(element);
      }

      if (collector.length >= 30) {
        const ids = collector.map(function (i) {
          return i.id;
        });
        await client.organizations.bulkDelete(ids);
        collector = [];
      }
    }
  } catch (error) {
    console.error(`Failed to delete organization: ${error.message}`);
  }
}

organizationsDelete();
