const process = require('node:process');
const zd = require('../src/index');
const exampleConfig = require('./exampleConfig');

function getZendeskConfig() {
  return {
    token: process.env.ZENDESK_TEST_TOKEN || exampleConfig.auth.token,
    subdomain:
      process.env.ZENDESK_TEST_SUBDOMAIN || exampleConfig.auth.subdomain,
    oauth: true,
    debug: true,
  };
}

const client = zd.createClient(getZendeskConfig());

async function checkOAuth() {
  try {
    const {result} = await client.users.auth();
    const user = result;
    console.log(user.verified);
  } catch (error) {
    console.error(`Failed to check OAuth: ${error.message}`);
  }
}

checkOAuth();
