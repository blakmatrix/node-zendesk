var zd = require('../lib/client'),
    fs = require('fs');

var client = zd.createClient({
  username: process.env.ZENDESK_USERNAME,
  password: process.env.ZENDESK_API_TOKEN,
  remoteUri: process.env.ZENDESK_REMOTE_URI
});

client.userfields.list(function (err, req, result) {
  if (err) {
    console.log(err);
    return;
  }
  console.log(JSON.stringify(result.map(function (user_field) {return user_field.key;}), null, 2, true));//gets the first page
  console.log("Total User Fields: "+result.length);
});
