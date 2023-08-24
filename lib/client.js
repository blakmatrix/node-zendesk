// Client.js - node-zendesk client initialization
'use strict';

const parts = [
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
  'Webhooks',
];
const helpcenterParts = [
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
  'UserSegments',
];
const voiceParts = [
  'PhoneNumbers',
  'GreetingCategories',
  'Greetings',
  'CurrentQueueActivity',
  'HistoricalQueueActivity',
  'AgentActivity',
  'Availabilities',
];
const servicesParts = [
  'Links', // This will be sent in undercase down to the client path
];
const npsParts = ['Invitations', 'Surveys'];

exports.createClient = function (options) {
  const nconf = require('nconf');
  const store = new nconf.Provider();
  nconf.use('memory');
  if (options.disableGlobalState !== true) {
    nconf.env().argv({
      s: {
        alias: 'subdomain',
      },
      u: {
        alias: 'username',
      },
      p: {
        alias: 'password',
      },
      t: {
        alias: 'token',
      },
      r: {
        alias: 'remoteUri',
      },
      hc: {
        alias: 'helpcenter',
      },
      v: {
        alias: 'voice',
      },
      ch: {
        alias: 'customHeaders',
      },
      serv: {
        alias: 'services',
      },
    });
  }

  options = store.defaults(options);

  let subdomain;
  // Allow subdomain to be supplied when global state disabled (library mode)
  if (options.stores.defaults.store.subdomain) {
    subdomain = options.stores.defaults.store.subdomain;
  }

  if (!subdomain) {
    subdomain = nconf.get('subdomain');
  }

  if (subdomain) {
    let endpoint;
    if (options.stores.defaults.store.helpcenter) {
      endpoint = '.zendesk.com/api/v2/help_center';
    } else if (options.stores.defaults.store.voice) {
      endpoint = '.zendesk.com/api/v2/channels/voice';
    } else if (options.stores.defaults.store.services) {
      endpoint = '.zendesk.com/api/services/jira';
    } else {
      endpoint = '.zendesk.com/api/v2';
    }

    options.stores.defaults.store.remoteUri = 'https://' + subdomain + endpoint;
  }

  const client = {};
  let partsToAdd;
  let clientPath;

  if (options.stores.defaults.store.helpcenter) {
    partsToAdd = helpcenterParts;
    clientPath = 'helpcenter/';
  } else if (options.stores.defaults.store.voice) {
    partsToAdd = voiceParts;
    clientPath = 'voice/';
  } else if (options.stores.defaults.store.services) {
    partsToAdd = servicesParts;
    clientPath = 'services/'; // This is where parts get added to to search in the "services" folder
  } else if (options.stores.defaults.store.nps) {
    partsToAdd = npsParts;
    clientPath = 'nps/';
  } else {
    partsToAdd = parts;
    clientPath = '';
  }

  for (const k of partsToAdd) {
    exports[k] = require('./client/' + clientPath + k.toLowerCase())[k];
  }

  for (const k of partsToAdd) {
    client[k.toLowerCase()] = new exports[k](options);
    client[k.toLowerCase()].on('debug::request', debug);
    client[k.toLowerCase()].on('debug::response', debug);
  }

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
