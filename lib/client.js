var parts = ['Users', 'Tickets', 'TicketAudits', 'TicketFields', 'Views',
             'Requests', 'UserIdentities', 'Groups', 'GroupMemberships',
             'CustomAgentRoles', 'Organizations', 'Search', 'Tags', 'Forums',
             'ForumSubscriptions', 'Categories', 'Topics', 'TopicComments',
             'TopicSubscriptions', 'TopicVotes', 'AccountSettings',
             'ActivityStream', 'Attachments', 'JobStatuses', 'Locales',
             'Macros', 'SatisfactionRatings', 'SuspendedTickets', 'UserFields', 'OrganizationFields'];

var helpcenterParts = ['Articles', 'Sections', 'Categories', 'Translations', 'ArticleComments', 'ArticleLabels', 'Votes', 'Search', 'AccessPolicies'];

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
    },
    "hc": {
      alias: 'helpcenter'
    }
  });

  options = nconf.defaults(options);

  if(nconf.get("helpcenter")){
    this.helpCenter = true;
  }

  if(nconf.get('subdomain')){
    if(this.helpCenter){
      nconf.overrides({
        'remoteUri': 'https://'+nconf.get('subdomain')+'.zendesk.com/hc/api/v2'
      });
    }
    else{
      nconf.overrides({
        'remoteUri': 'https://'+nconf.get('subdomain')+'.zendesk.com/api/v2'
      });
    }
  }

  var client = {};

  if(this.helpCenter){
    helpcenterParts.forEach(function (k) {
      exports[k] = require('./client/helpcenter/' + k.toLowerCase())[k];
    });
    helpcenterParts.forEach(function (k) {
      client[k.toLowerCase()] = new exports[k](options);
      client[k.toLowerCase()].on('debug::request',  debug);
      client[k.toLowerCase()].on('debug::response', debug);
    });
  }
  else{
    parts.forEach(function (k) {
      exports[k] = require('./client/' + k.toLowerCase())[k];
    });
    parts.forEach(function (k) {
      client[k.toLowerCase()] = new exports[k](options);
      client[k.toLowerCase()].on('debug::request',  debug);
      client[k.toLowerCase()].on('debug::response', debug);
    });
  }
  function debug(arguments) {
    if (options.get('debug')) {
      console.log(arguments);
    }
  }
  return client;
};
