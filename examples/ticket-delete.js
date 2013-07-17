var zd = require('../lib/client');


// note: credentials given via command line arguments, like
//       $ node examples/ticket-delete.js --debug --subdomain <company> --username <user> --token <token> --password <pw>

var ticketId = 12345;
var client = zd.createClient();
client.tickets.delete(ticketId, function(err) {
  if (err) return handleError(err);
});

function handleError(err) {
    console.log(err);
    process.exit(-1);
}
