// upload-attachment.js - example to upload an attachment
'use strict';

var zd = require('../lib/client'),
    path = require('path'),
client = zd.createClient({
  username:  'username',
  token:     'token',
  remoteUri: 'https://remote.zendesk.com/api/v2'
});

client.attachments.upload(path.resolve(
  './examples/busey.gif'),
  {
    filename: 'busey.gif' //,
    //token: 'tokenROFL' // set to apply to record
  },
  function (err, req, result) {
    if (err) {
      console.log(err);
      return;
    }
    console.log(JSON.stringify(result, null, 2, true));
  });
