const process = require('node:process');
const zd = require('../lib/client');
const exampleConfig = require('./exampleConfig');

const client = zd.createClient({
  username: process.env.ZENDESK_TEST_USERNAME || exampleConfig.auth.username,
  token: process.env.ZENDESK_TEST_TOKEN || exampleConfig.auth.token,
  remoteUri: process.env.ZENDESK_TEST_REMOTEURI || exampleConfig.auth.remoteUri,
});

client.organizations.list(function (error, request, result) {
  if (error) {
    console.log(error);
    return;
  }

  console.log(
    JSON.stringify(
      result.map(function (org) {
        return org.name;
      }),
      null,
      2,
      true,
    ),
  ); // Gets the first page
  console.log('Total Orgs: ' + result.length);
});
