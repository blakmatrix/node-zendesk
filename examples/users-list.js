const process = require('node:process');
const zd = require('../lib/client');
const exampleConfig = require('./exampleConfig');

function getZendeskConfig() {
  return {
    username: process.env.ZENDESK_TEST_USERNAME || exampleConfig.auth.username,
    token: process.env.ZENDESK_TEST_TOKEN || exampleConfig.auth.token,
    remoteUri:
      process.env.ZENDESK_TEST_REMOTEURI || exampleConfig.auth.remoteUri,
  };
}

const client = zd.createClient(getZendeskConfig());

async function usersList() {
  try {
    const result = await client.users.list();
    console.log(
      JSON.stringify(
        result.map(function (user) {
          return user.name;
        }),
        null,
        2,
        true,
      ),
    ); // Gets the first page
    console.log('Total Users: ' + result.length);
  } catch (error) {
    console.error(`Failed to get list of users: ${error.message}`);
  }
}

usersList();
