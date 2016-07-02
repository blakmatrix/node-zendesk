var exampleConfig = require('./exampleConfig');
var fs = require('fs');
var zd = require('../lib/client');

var client = zd.createClient({
  username:  exampleConfig.auth.username,
  token:     exampleConfig.auth.token,
  remoteUri: exampleConfig.auth.remoteUri
});

/* Optionally add prop token to associate attachment with upload */

client.attachments.upload(path.resolve(
  './examples/busey.gif'),
  {
    filename: 'busey.gif'
  },
  function (err, req, result) {
    if (err) {
      console.log(err);
      return;
    }
    console.log(JSON.stringify(result, null, 2, true));
  });
