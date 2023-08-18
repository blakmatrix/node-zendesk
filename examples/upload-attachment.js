var exampleConfig = require('./exampleConfig');
var path = require('path');
var zd = require('../lib/client');

var client = zd.createClient({
  username:  process.env.ZENDESK_TEST_USERNAME || exampleConfig.auth.username,
  token:     process.env.ZENDESK_TEST_TOKEN || exampleConfig.auth.token,
  remoteUri: process.env.ZENDESK_TEST_REMOTEURI || exampleConfig.auth.remoteUri
});

/* Optionally add prop token to associate attachment with upload */

client.attachments.upload(path.resolve(
  './examples/busey.gif'),
  {
    filename: 'busey.gif'
  },
  function (err, req, result) {
    if (err) {
      console.log(err);
      return;
    }
    console.log(JSON.stringify(result, null, 2, true));
  });
