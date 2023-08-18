var exampleConfig = require('./exampleConfig');
var zd = require('../lib/client');

var client = zd.createClient({
    username:  process.env.ZENDESK_TEST_USERNAME || exampleConfig.auth.username,
    token:     process.env.ZENDESK_TEST_TOKEN || exampleConfig.auth.token,
    remoteUri: process.env.ZENDESK_TEST_REMOTEURI || exampleConfig.auth.remoteUri
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
