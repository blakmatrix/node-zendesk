const process = require('node:process');
const zd = require('../lib/client');
const exampleConfig = require('./exampleConfig');

const client = zd.createClient({
  username: process.env.ZENDESK_TEST_USERNAME || exampleConfig.auth.username,
  token: process.env.ZENDESK_TEST_TOKEN || exampleConfig.auth.token,
  remoteUri: process.env.ZENDESK_TEST_REMOTEURI || exampleConfig.auth.remoteUri,
});

/**
 *
 */
async function listTagsForFirstUser() {
  try {
    const users = await client.users.list();
    const firstUser = users[0];

    if (!firstUser) {
      console.log('No users found.');
      return;
    }

    const tags = await client.users.listTags(firstUser.id);
    console.log(tags);
  } catch (error) {
    console.error(error);
  }
}

listTagsForFirstUser();
