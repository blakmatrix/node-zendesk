#!/usr/bin/env node
const process = require('node:process');
const zd = require('../lib/client');
const exampleConfig = require('./exampleConfig');

const client = zd.createClient({
  username: process.env.ZENDESK_TEST_USERNAME || exampleConfig.auth.username,
  token: process.env.ZENDESK_TEST_TOKEN || exampleConfig.auth.token,
  remoteUri: process.env.ZENDESK_TEST_REMOTEURI || exampleConfig.auth.remoteUri,
});

const ticket = {
  ticket: {
    subject: 'My printer is on fire!',
    comment: {
      body: 'The smoke is very colorful.',
    },
  },
};

(async () => {
  try {
    const result = await client.tickets.create(ticket);
    console.log(JSON.stringify(result, null, 2, true));
  } catch (error) {
    handleError(error);
  }
})();

/**
 * Handles errors by logging them and exiting the process.
 * @param {Error} error - The error object to be handled.
 */
function handleError(error) {
  console.log(error);
  process.exit(-1);
}
