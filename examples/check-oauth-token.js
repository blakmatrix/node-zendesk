const process = require('node:process');
const zd = require('../src/index');
const exampleConfig = require('./exampleConfig');

/**
 * Retrieves the Zendesk configuration from environment variables or example config.
 * @returns {object} The Zendesk configuration object.
 */
function getZendeskConfig() {
  return {
    token:
      process.env.ZENDESK_OAUTH_TOKEN || exampleConfig.auth.oauthAccessToken,
    subdomain:
      process.env.ZENDESK_TEST_SUBDOMAIN || exampleConfig.auth.subdomain,
    useOAuth: true,
  };
}

const client = zd.createClient(getZendeskConfig());

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
