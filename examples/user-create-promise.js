var exampleConfig = require('./exampleConfig');
var zd = require('../lib/client');

var client = zd.createClient({
  username:  exampleConfig.auth.username,
  token:     exampleConfig.auth.token,
  remoteUri: exampleConfig.auth.remoteUri
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