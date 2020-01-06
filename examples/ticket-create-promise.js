const exampleConfig = require('./exampleConfig');
const zd = require('../lib/client');

const client = zd.createClient({
  username:  exampleConfig.auth.username,
  token:     exampleConfig.auth.token,
  remoteUri: exampleConfig.auth.remoteUri
});

const ticket = {
  "ticket":
    {
      "subject":"My printer is on fire!",
      "comment": {
        "body": "The smoke is very colorful."
      }
    }
  };

(async () => {
  try {
    const result = await client.tickets.create(ticket);
    console.log(JSON.stringify(result, null, 2, true));
  } catch (err) {
    handleError(err);
  }
})();

function handleError(err) {
    console.log(err);
    process.exit(-1);
}
