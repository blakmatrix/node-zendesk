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
async function listUsersByFirstGroup() {
  try {
    const groups = await client.groups.list();
    const firstGroup = groups[0];

    if (!firstGroup) {
      console.log('No groups found.');
      return;
    }

    const users = await client.users.listByGroup(firstGroup.id);
    console.log(users);
  } catch (error) {
    console.error(error);
  }
}

listUsersByFirstGroup();
