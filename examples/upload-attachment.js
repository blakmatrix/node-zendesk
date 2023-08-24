const process = require('node:process');
const path = require('node:path');
const zd = require('../lib/client');
const exampleConfig = require('./exampleConfig');

const client = zd.createClient({
  username: process.env.ZENDESK_TEST_USERNAME || exampleConfig.auth.username,
  token: process.env.ZENDESK_TEST_TOKEN || exampleConfig.auth.token,
  remoteUri: process.env.ZENDESK_TEST_REMOTEURI || exampleConfig.auth.remoteUri,
});

/* Optionally add prop token to associate attachment with upload */

client.attachments.upload(
  path.resolve('./examples/busey.gif'),
  {
    filename: 'busey.gif',
  },
  function (error, request, result) {
    if (error) {
      console.log(error);
      return;
    }

    console.log(JSON.stringify(result, null, 2, true));
  },
);
