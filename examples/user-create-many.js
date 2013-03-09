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


var users = {
  "users": [
    {
      "name": "Roger Wilco",
      "email": "roge@example.org",
      "role": "agent"
    },
    {
      "name": "Woger Rilco",
      "email": "woge@example.org",
      "role": "admin"
    }
  ]
};

client.users.createMany(users, function (err, req, result) {
  if (err) {
    console.log(err);
    return;
  }
  client.jobstatuses.watch(result["job_status"].id, 500, 5, function(err, req, result){
    console.log(JSON.stringify(result, null, 2, true));
  });
});


