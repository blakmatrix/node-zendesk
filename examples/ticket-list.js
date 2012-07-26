var zd = require('../lib/client'),
    fs = require('fs');

var client = zd.createClient({
  username:  'username',
  token:     'token',
  remoteUri: 'https://remote.zendesk.com/api/v2'
});

client.tickets.list(function (err, statusList, body, responseList, resultList) {
  if (err) {
    console.log(err);
    return;
  }
  console.log(JSON.stringify(body, null, 2, true));//will display all tickets
});