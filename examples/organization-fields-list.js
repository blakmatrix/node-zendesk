var zd = require('../lib/client'),
    fs = require('fs');

var client = zd.createClient({
  username: process.env.ZENDESK_USERNAME,
  password: process.env.ZENDESK_API_TOKEN,
  remoteUri: process.env.ZENDESK_REMOTE_URI
});

client.organizationfields.list(function (err, statusList, body, responseList, resultList) {
  if (err) {
    console.log(err);
    return;
  }
  console.log(JSON.stringify(body, null, 2, true));
});