#!/usr/bin/env node
const process = require('node:process');
const dotenv = require('dotenv');
const zd = require('../src/index.js');

dotenv.config();

const setupClient = () => {
  return zd.createClient({
    token: process.env.ZENDESK_OAUTH_ACCESS_TOKEN,
    subdomain: process.env.ZENDESK_SUBDOMAIN,
    useOAuth: true,
  });
};

const client = setupClient();

/**
 * Checks the OAuth authentication for the Zendesk client and logs the verification status.
 * @returns {Promise<void>} A promise that resolves when the check is complete.
 */
async function checkOAuth() {
  try {
    const {result: user} = await client.users.auth();
    console.log(user.verified);
  } catch (error) {
    console.error(`Failed to check OAuth: ${error.message}`);
  }
}

checkOAuth();
