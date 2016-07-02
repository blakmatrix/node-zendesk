var exampleConfig = require('./exampleConfig');
var fs = require('fs');
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

client.users.create(user, function (err, req, result) {
  if (err) {
    console.log(err);
    return;
  }
  console.log(JSON.stringify(result, null, 2, true));
});