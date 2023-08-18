var exampleConfig = require('./exampleConfig');
var zd = require('../lib/client');

var client = zd.createClient({
  username:  process.env.ZENDESK_TEST_USERNAME || exampleConfig.auth.username,
  token:     process.env.ZENDESK_TEST_TOKEN || exampleConfig.auth.token,
  remoteUri: process.env.ZENDESK_TEST_REMOTEURI || exampleConfig.auth.remoteUri
});


var users = {
  "users": [
    {
      "name": "Roger Wilco",
      "email": "roge@example.org",
      "role": "agent"
    },
    {
      "name": "Woger Rilco",
      "email": "woge@example.org",
      "role": "admin"
    }
  ]
};

client.users.createMany(users, function (err, req, result) {
  if (err) {
    console.log(err);
    return;
  }
  client.jobstatuses.watch(result["job_status"].id, 500, 5, function(err, req, result){
    console.log(JSON.stringify(result, null, 2, true));
  });
});


