// client.js - node-zendesk client initialization
'use strict';

var parts = [
    'Users',
    'Tickets',
    'TicketAudits',
    'TicketFields',
    'TicketForms',
    'TicketMetrics',
    'TicketImport',
    'TicketExport',
    'Views',
    'Requests',
    'UserIdentities',
    'Groups',
    'GroupMemberships',
    'CustomAgentRoles',
    'Organizations',
    'Search',
    'Tags',
    'Forums',
    'ForumSubscriptions',
    'Categories',
    'Topics',
    'TopicComments',
    'TopicSubscriptions',
    'TopicVotes',
    'AccountSettings',
    'ActivityStream',
    'Attachments',
    'JobStatuses',
    'Locales',
    'Macros',
    'SatisfactionRatings',
    'SuspendedTickets',
    'UserFields',
    'OrganizationFields',
    'OauthTokens',
    'Triggers',
    'SharingAgreement',
    'Brand',
    'OrganizationMemberships',
    'DynamicContent',
    'TicketEvents',
    'Imports',
    'Targets',
    'Sessions',
    'Installations',
    'Policies',
    'Automations',
    'PermissionGroups',
    'Webhooks'
  ],
  helpcenterParts = [
    'Articles',
    'Sections',
    'Categories',
    'Translations',
    'ArticleComments',
    'ArticleLabels',
    'ArticleAttachments',
    'Votes',
    'Search',
    'AccessPolicies',
    'Subscriptions',
    'UserSegments'
  ],
  voiceParts = [
    'PhoneNumbers',
    'GreetingCategories',
    'Greetings',
    'CurrentQueueActivity',
    'HistoricalQueueActivity',
    'AgentActivity',
    'Availabilities'
    ],
    servicesParts = [
      'Links' //This will be sent in undercase down to the client path
    ],
    npsParts = ['Invitations', 'Surveys'];

exports.createClient = function(options) {
  var nconf = require('nconf'),
    store = new nconf.Provider();
  nconf.use('memory');
  if (true !== options.disableGlobalState) {
    nconf.env().argv({
      s: {
        alias: 'subdomain'
      },
      u: {
        alias: 'username'
      },
      p: {
        alias: 'password'
      },
      t: {
        alias: 'token'
      },
      r: {
        alias: 'remoteUri'
      },
      hc: {
        alias: 'helpcenter'
      },
      v: {
        alias: 'voice'
      },
      'ch': {
        alias: 'customHeaders'
      },
      'serv': {
        alias: 'services'
      }
    });
  }

  options = store.defaults(options);

  var subdomain
  // Allow subdomain to be supplied when global state disabled (library mode)
  if (options.stores.defaults.store.subdomain) {
    subdomain = options.stores.defaults.store.subdomain
  }
  if (!subdomain) {
    subdomain = nconf.get('subdomain');
  }
  if (subdomain) {
    var endpoint;
    if (options.stores.defaults.store.helpcenter) {
      endpoint = '.zendesk.com/api/v2/help_center';
    } else if (options.stores.defaults.store.voice) {
      endpoint = '.zendesk.com/api/v2/channels/voice';
    } else if (options.stores.defaults.store.services){
      endpoint = '.zendesk.com/api/services/jira';
    } else {
      endpoint = '.zendesk.com/api/v2';
    }
    options.stores.defaults.store.remoteUri =
      'https://' + subdomain + endpoint;
  }

  var client = {},
    partsToAdd,
    clientPath;

  if (options.stores.defaults.store.helpcenter) {
    partsToAdd = helpcenterParts;
    clientPath = 'helpcenter/';
  } else if (options.stores.defaults.store.voice) {
    partsToAdd = voiceParts;
    clientPath = 'voice/';
  } else if (options.stores.defaults.store.services) {
    partsToAdd = servicesParts;
    clientPath = 'services/'; //This is where parts get added to to search in the "services" folder
  } else if (options.stores.defaults.store.nps) {
    partsToAdd = npsParts;
    clientPath = 'nps/';
  } else {
    partsToAdd = parts;
    clientPath = '';
  }

  partsToAdd.forEach(function (k) {
    exports[k] = require('./client/' + clientPath + k.toLowerCase())[k];
  });

  partsToAdd.forEach(function(k) {
    client[k.toLowerCase()] = new exports[k](options);
    client[k.toLowerCase()].on('debug::request', debug);
    client[k.toLowerCase()].on('debug::response', debug);
  });

  function debug(args) {
    if (options.get('debug')) {
      if (args.result) {
        args.result = String(args.result);
      }
      console.log(args);
    }
  }

  return client;
};
