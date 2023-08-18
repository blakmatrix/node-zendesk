var exampleConfig = require('./exampleConfig');
var zd = require('../lib/client');

var client = zd.createClient({
    username:  process.env.ZENDESK_TEST_USERNAME || exampleConfig.auth.username,
    token:     process.env.ZENDESK_TEST_TOKEN || exampleConfig.auth.token,
    remoteUri: process.env.ZENDESK_TEST_REMOTEURI || exampleConfig.auth.remoteUri
});

client.groups.list()
    .then(function(result) {
        client.users.listByGroup(result[0].id).then( function(users) {
            console.log(users);
        })
    })
    .catch(function(error) {
        console.log(error);
    });
