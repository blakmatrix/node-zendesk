const process = require('node:process');
const zd = require('../lib/client');
const exampleConfig = require('./exampleConfig');

const client = zd.createClient({
  username: process.env.ZENDESK_TEST_USERNAME || exampleConfig.auth.username,
  token: process.env.ZENDESK_TEST_TOKEN || exampleConfig.auth.token,
  remoteUri: process.env.ZENDESK_TEST_REMOTEURI || exampleConfig.auth.remoteUri,
});

client.tickets.list(
  function (error, statusList, body /* , responseList, resultList */) {
    if (error) {
      console.log(error);
      return;
    }

    console.log(JSON.stringify(body, null, 2, true)); // Will display all tickets
  },
);
