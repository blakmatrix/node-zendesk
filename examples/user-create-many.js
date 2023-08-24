const process = require('node:process');
const zd = require('../lib/client');
const exampleConfig = require('./exampleConfig');

const client = zd.createClient({
  username: process.env.ZENDESK_TEST_USERNAME || exampleConfig.auth.username,
  token: process.env.ZENDESK_TEST_TOKEN || exampleConfig.auth.token,
  remoteUri: process.env.ZENDESK_TEST_REMOTEURI || exampleConfig.auth.remoteUri,
});

const users = {
  users: [
    {
      name: 'Roger Wilco',
      email: 'roge@example.org',
      role: 'agent',
    },
    {
      name: 'Woger Rilco',
      email: 'woge@example.org',
      role: 'admin',
    },
  ],
};

client.users.createMany(users, function (error, request, result) {
  if (error) {
    console.log(error);
    return;
  }

  client.jobstatuses.watch(
    result.job_status.id,
    500,
    5,
    function (error_, request, result) {
      console.log(JSON.stringify(result, null, 2, true));
    },
  );
});
