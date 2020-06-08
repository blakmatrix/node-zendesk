var exampleConfig = require('./exampleConfig');
var zd = require('../lib/client');

var client = zd.createClient({
  username:  exampleConfig.auth.username,
  token:     exampleConfig.auth.token,
  remoteUri: exampleConfig.auth.remoteUri
});

client.tickets.list(function (err, statusList, body, responseList, resultList) {
  if (err) {
    console.log(err);
    return;
  }
  console.log(JSON.stringify(body, null, 2, true));//will display all tickets
});