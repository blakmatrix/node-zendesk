var exampleConfig = require('./exampleConfig');
var zd = require('../lib/client');

var client = zd.createClient({
  username:  exampleConfig.auth.username,
  token:     exampleConfig.auth.token,
  remoteUri: exampleConfig.auth.remoteUri
});

client.users.auth()
  .then(function(response) {
    var result = JSON.parse(response.body.toString());
    console.log(JSON.stringify(result.user, null, 2, true));
  })
  .catch(function(error) {
    console.log(error);
  });
