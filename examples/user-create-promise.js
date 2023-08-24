const process = require('node:process');
const zd = require('../lib/client');
const exampleConfig = require('./exampleConfig');

const client = zd.createClient({
  username: process.env.ZENDESK_TEST_USERNAME || exampleConfig.auth.username,
  token: process.env.ZENDESK_TEST_TOKEN || exampleConfig.auth.token,
  remoteUri: process.env.ZENDESK_TEST_REMOTEURI || exampleConfig.auth.remoteUri,
});

const user = {
  user: {
    name: 'Foo Bar',
    email: 'FooBar@example.org',
  },
};

(async () => {
  try {
    const result = await client.users.create(user);
    console.log(JSON.stringify(result, null, 2, true));
  } catch (error) {
    console.log(error);
  }
})();
