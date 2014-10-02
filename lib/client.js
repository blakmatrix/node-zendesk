var parts = ['Users', 'Tickets', 'TicketAudits', 'TicketFields', 'TicketMetrics', 'Views',
             'Requests', 'UserIdentities', 'Groups', 'GroupMemberships',
             'CustomAgentRoles', 'Organizations', 'Search', 'Tags', 'Forums',
             'ForumSubscriptions', 'Categories', 'Topics', 'TopicComments',
             'TopicSubscriptions', 'TopicVotes', 'AccountSettings',
             'ActivityStream', 'Attachments', 'JobStatuses', 'Locales',
             'Macros', 'SatisfactionRatings', 'SuspendedTickets', 'UserFields', 'OrganizationFields', 'OauthTokens'];

parts.forEach(function (k) {
  exports[k] = require('./client/' + k.toLowerCase())[k];
});

exports.createClient = function (options) {
  var nconf = require('nconf');
  nconf.env().argv({
    "s": {
      alias: 'subdomain'
    },
    "u": {
      alias: 'username'
    },
    "p": {
      alias: 'password'
    },
    "t": {
      alias: 'token'
    },
    "r": {
      alias: 'remoteUri'
    }
  });

  if(nconf.get('subdomain')){
    nconf.overrides({
      'remoteUri': 'https://'+nconf.get('subdomain')+'.zendesk.com/api/v2'
    });
  }
  options = nconf.defaults(options);

  var client = {};
  parts.forEach(function (k) {
    client[k.toLowerCase()] = new exports[k](options);
    client[k.toLowerCase()].on('debug::request',  debug);
    client[k.toLowerCase()].on('debug::response', debug);
  });
  function debug(arguments) {
    if (options.get('debug')) {
      console.log(arguments);
    }
  }
  return client;
};
