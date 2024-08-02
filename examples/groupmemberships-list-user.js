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
async function listUserMemberships() {
  try {
    const users = await client.users.list();
    const user = users[0];

    if (!user) {
      console.log('No users found.');
      return;
    }

    const memberships = await client.groupmemberships.listByUser(user.id);
    console.log(JSON.stringify(memberships));
  } catch (error) {
    console.error('Error fetching user memberships:', error);
  }
}

listUserMemberships();
