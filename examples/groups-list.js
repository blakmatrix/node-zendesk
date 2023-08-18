var exampleConfig = require('./exampleConfig');
var zd = require('../lib/client');

var client = zd.createClient({
  username:  process.env.ZENDESK_TEST_USERNAME || exampleConfig.auth.username,
  token:     process.env.ZENDESK_TEST_TOKEN || exampleConfig.auth.token,
  remoteUri: process.env.ZENDESK_TEST_REMOTEURI || exampleConfig.auth.remoteUri
});

client.groups.list(function (err, req, result) {
  if (err) {
    console.log(err);
    return;
  }
  console.log(JSON.stringify(result.map(function (grp) {return grp.name;}), null, 2, true));//gets the first page
  console.log("Total Groups: "+result.length);
});
