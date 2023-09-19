#!/usr/bin/env node

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

async function bulkDeleteTestOrganizations() {
  const client = initializeZendeskClient();

  try {
    const organizations = await client.organizations.list();
    const orgIdsToDelete = getTestOrganizationIds(organizations);
    const {result} = await client.organizations.bulkDelete(orgIdsToDelete);

    if (result.message === 'No Content') {
      console.log('Test organizations deleted successfully.');
    } else {
      console.dir(result);
    }
  } catch (error) {
    console.error(`Failed to bulk delete test organizations: ${error.message}`);
  }
}

bulkDeleteTestOrganizations();
