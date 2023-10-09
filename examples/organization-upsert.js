#!/usr/bin/env node
const process = require('node:process');
const zd = require('../lib/client');
const exampleConfig = require('./exampleConfig');

const client = zd.createClient({
  username: process.env.ZENDESK_TEST_USERNAME || exampleConfig.auth.username,
  token: process.env.ZENDESK_TEST_TOKEN || exampleConfig.auth.token,
  remoteUri: process.env.ZENDESK_TEST_REMOTEURI || exampleConfig.auth.remoteUri,
});

const organization = {
  organization: {
    id: 35_436,
    name: 'My Organization',
  },
};

client.organizations.upsert(organization, function (error, request, result) {
  if (error) return handleError(error);
  console.log(JSON.stringify(result, null, 2, true));
});

/**
 * Handles errors by logging them and exiting the process.
 * @param {Error} error - The error object to be handled.
 */
function handleError(error) {
  console.log(error);
  process.exit(-1);
}
