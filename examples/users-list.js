var zd = require('../lib/client'),
    fs = require('fs');

var client = zd.createClient({
  username:  'username',
  token:     'token',
  remoteUri: 'https://remote.zendesk.com/api/v2'
});

client.users.list(function (err, req, result) {
  if (err) {
    console.log(err);
    return;
  }
  console.log(JSON.stringify(result.map(function (user) {return user.name;}), null, 2, true));//gets the first page
  console.log("Total Users: "+result.length);
});