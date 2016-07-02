var exampleConfig = require('./exampleConfig');
var fs = require('fs');
var zd = require('../lib/client');

var client = zd.createClient({
  username:  exampleConfig.auth.username,
  token:     exampleConfig.auth.token,
  remoteUri: exampleConfig.auth.remoteUri
});

client.users.auth(function (err, res, result) {
  if (err) {
    //console.log(err);
    return;
  }
  console.log(JSON.stringify(result.verified, null, 2, true));
});
