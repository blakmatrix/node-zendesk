var zd = require('../lib/client'),
    fs = require('fs');

var client = zd.createClient({
  username:  'username',
  token:     'oauth_token',
  remoteUri: 'https://remote.zendesk.com/api/v2',
  oauth: true
});

client.users.auth(function (err, req, result) {
  if (err) {
    console.log(err);
    return;
  }
  console.log(JSON.stringify(result.verified, null, 2, true));
});
