var zd = require('../lib/client'),
    fs = require('fs'),
    subdomain = 'remote',
    username  = 'username',
    token     = 'token';

var client = zd.createClient({
  username:  username,
  token:     token,
  remoteUri: 'https://'+subdomain+'.zendesk.com/api/v2'
});

var query = "status<solved+requester:user@domain.com+type:ticket";

client.search.query(query, function (err, req, result) {
  if (err) {
    console.log(err);
    return;
  }
  console.log(JSON.stringify(result, null, 2, true));
});