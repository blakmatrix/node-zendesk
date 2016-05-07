var exampleConfig = require('./exampleConfig');
var fs = require('fs');
var zd = require('../lib/client');

var client = zd.createClient({
  username:  exampleConfig.auth.username,
  token:     exampleConfig.auth.token,
  remoteUri: exampleConfig.auth.remoteUri
});

var ticketId = 12345;
var client = zd.createClient();
client.tickets.delete(ticketId, function(err) {
  if (err) return handleError(err);
});

function handleError(err) {
    console.log(err);
    process.exit(-1);
}
