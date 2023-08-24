const process = require('node:process');
const zd = require('../lib/client');
const exampleConfig = require('./exampleConfig');

const client = zd.createClient({
  username: process.env.ZENDESK_TEST_USERNAME || exampleConfig.auth.username,
  token: process.env.ZENDESK_TEST_TOKEN || exampleConfig.auth.token,
  remoteUri: process.env.ZENDESK_TEST_REMOTEURI || exampleConfig.auth.remoteUri,
});

client.userfields.list(function (error, request, result) {
  if (error) {
    console.log(error);
    return;
  }

  console.log(
    JSON.stringify(
      result.map(function (userField) {
        return userField.key;
      }),
      null,
      2,
      true,
    ),
  ); // Gets the first page
  console.log('Total User Fields: ' + result.length);
});
