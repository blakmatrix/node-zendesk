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
async function listGroupMemberships() {
  try {
    const groups = await client.groups.list();
    const group = groups[0];

    if (!group) {
      console.log('No groups found.');
      return;
    }

    const memberships = await client.groupmemberships.listByGroup(group.id);
    console.log(JSON.stringify(memberships));
  } catch (error) {
    console.error('Error fetching group memberships:', error);
  }
}

listGroupMemberships();
