var exampleConfig = require('./exampleConfig');
console.log(exampleConfig);
var fs = require('fs');
var zd = require('../lib/client')

var client = zd.createClient({
  username:  exampleConfig.auth.username,
  token:     exampleConfig.auth.token,
  remoteUri: exampleConfig.auth.remoteUri
});

client.userfields.list(function (err, req, result) {
  if (err) {
    console.log(err);
    return;
  }
  console.log(JSON.stringify(result.map(function (user_field) {return user_field.key;}), null, 2, true));//gets the first page
  console.log("Total User Fields: "+result.length);
});
