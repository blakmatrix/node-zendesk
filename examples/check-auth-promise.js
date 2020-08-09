var exampleConfig = require('./exampleConfig');
var zd = require('../lib/client');

var client = zd.createClient({
  username:  exampleConfig.auth.username,
  token:     exampleConfig.auth.token,
  remoteUri: exampleConfig.auth.remoteUri
});

client.users.auth()
  .then(function(response) {
    var result = response;
    console.dir(result.verified)
  })
  .catch(function(error) {
    console.log(error);
  });
