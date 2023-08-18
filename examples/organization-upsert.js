var exampleConfig = require('./exampleConfig');
var zd = require('../lib/client');

var client = zd.createClient({
  username:  process.env.ZENDESK_TEST_USERNAME || exampleConfig.auth.username,
  token:     process.env.ZENDESK_TEST_TOKEN || exampleConfig.auth.token,
  remoteUri: process.env.ZENDESK_TEST_REMOTEURI || exampleConfig.auth.remoteUri
});

var organization = {
  "organization": {
    "id":   35436,
    "name": "My Organization",
  }
};

client.organizations.upsert(organization,  function(err, req, result) {
  if (err) return handleError(err);
  console.log(JSON.stringify(result, null, 2, true));
});

function handleError(err) {
    console.log(err);
    process.exit(-1);
}
