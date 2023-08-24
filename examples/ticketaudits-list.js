const process = require('node:process');
const zd = require('../lib/client');
const exampleConfig = require('./exampleConfig');

const client = zd.createClient({
  username: process.env.ZENDESK_TEST_USERNAME || exampleConfig.auth.username,
  token: process.env.ZENDESK_TEST_TOKEN || exampleConfig.auth.token,
  remoteUri: process.env.ZENDESK_TEST_REMOTEURI || exampleConfig.auth.remoteUri,
});

client.tickets.list().then(function (tickets) {
  const ticket = tickets[0];
  client.ticketaudits.list(ticket.id).then(function (audits) {
    console.log(JSON.stringify(audits));
  });
});
