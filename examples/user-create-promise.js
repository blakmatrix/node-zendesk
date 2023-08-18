var exampleConfig = require('./exampleConfig');
var zd = require('../lib/client');

var client = zd.createClient({
  username:  process.env.ZENDESK_TEST_USERNAME || exampleConfig.auth.username,
  token:     process.env.ZENDESK_TEST_TOKEN || exampleConfig.auth.token,
  remoteUri: process.env.ZENDESK_TEST_REMOTEURI || exampleConfig.auth.remoteUri
});

var user = {
  "user": {
    "name": "Foo Bar",
    "email": "FooBar@example.org"
  }
};

(async() => {
  try {
    const result = await client.users.create(user);
    console.log(JSON.stringify(result, null, 2, true));
  } catch (e) {
    console.log(e);
  }
})();
