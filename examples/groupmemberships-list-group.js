const process = require('node:process');
const zd = require('../lib/client');
const exampleConfig = require('./exampleConfig');

const client = zd.createClient({
  username: process.env.ZENDESK_TEST_USERNAME || exampleConfig.auth.username,
  token: process.env.ZENDESK_TEST_TOKEN || exampleConfig.auth.token,
  remoteUri: process.env.ZENDESK_TEST_REMOTEURI || exampleConfig.auth.remoteUri,
});

client.groups.list().then(function (groups) {
  const group = groups[0];
  client.groupmemberships.listByGroup(group.id).then(function (memberships) {
    console.log(JSON.stringify(memberships));
  });
});
