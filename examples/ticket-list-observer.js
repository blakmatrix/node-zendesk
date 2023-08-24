const process = require('node:process');
const zd = require('../lib/client');
const exampleConfig = require('./exampleConfig');

const client = zd.createClient({
  username: process.env.ZENDESK_TEST_USERNAME || exampleConfig.auth.username,
  token: process.env.ZENDESK_TEST_TOKEN || exampleConfig.auth.token,
  remoteUri: process.env.ZENDESK_TEST_REMOTEURI || exampleConfig.auth.remoteUri,
});

const observer = {
  error: console.error,
  // eslint-disable-next-line max-params
  next(status, body, response, result, nextPage) {
    console.log(JSON.stringify(body, null, 2, true));
    console.log('Next page:', nextPage);
  },
  complete(statusList, body /* , responseList, resultList */) {
    console.log('Pagination complete.');
    console.log(body); // Will display all tickets
  },
};

client.tickets.list(observer);
