// client.js - node-zendesk client initialization
'use strict';

// Export client classes
exports.Users = require('./clinet/users').Users;
exports.Tickets = require('./clinet/tickets').Tickets;
exports.TicketAudits = require('./clinet/ticketaudits').TicketAudits;
exports.TicketFields = require('./clinet/ticketfields').TicketFields;
exports.TicketForms = require('./clinet/ticketforms').TicketForms;
exports.TicketMetrics = require('./clinet/ticketmetrics').TicketMetrics;
exports.TicketImport = require('./clinet/ticketimport').TicketImport;
exports.TicketExport = require('./clinet/ticketexport').TicketExport;
exports.Views = require('./clinet/views').Views;
exports.Requests = require('./clinet/requests').Requests;
exports.UserIdentities = require('./clinet/useridentities').UserIdentities;
exports.Groups = require('./clinet/groups').Groups;
exports.GroupMemberships = require('./clinet/groupmemberships').GroupMemberships;
exports.CustomAgentRoles = require('./clinet/customagentroles').CustomAgentRoles;
exports.Organizations = require('./clinet/organizations').Organizations;
exports.Search = require('./clinet/search').Search;
exports.Tags = require('./clinet/tags').Tags;
exports.Forums = require('./clinet/forums').Forums;
exports.ForumSubscriptions = require('./clinet/forumsubscriptions').ForumSubscriptions;
exports.Categories = require('./clinet/categories').Categories;
exports.Topics = require('./clinet/topics').Topics;
exports.TopicComments = require('./clinet/topiccomments').TopicComments;
exports.TopicSubscriptions = require('./clinet/topicsubscriptions').TopicSubscriptions;
exports.TopicVotes = require('./clinet/topicvotes').TopicVotes;
exports.AccountSettings = require('./clinet/accountsettings').AccountSettings;
exports.ActivityStream = require('./clinet/activitystream').ActivityStream;
exports.Attachments = require('./clinet/attachments').Attachments;
exports.JobStatuses = require('./clinet/jobstatuses').JobStatuses;
exports.Locales = require('./clinet/locales').Locales;
exports.Macros = require('./clinet/macros').Macros;
exports.SatisfactionRatings = require('./clinet/satisfactionratings').SatisfactionRatings;
exports.SuspendedTickets = require('./clinet/suspendedtickets').SuspendedTickets;
exports.UserFields = require('./clinet/userfields').UserFields;
exports.OrganizationFields = require('./clinet/organizationfields').OrganizationFields;
exports.OauthTokens = require('./clinet/oauthtokens').OauthTokens;
exports.Triggers = require('./clinet/triggers').Triggers;
exports.SharingAgreement = require('./clinet/sharingagreement').SharingAgreement;
exports.Brand = require('./clinet/brand').Brand;
exports.OrganizationMemberships = require('./clinet/organizationmemberships').OrganizationMemberships;
exports.DynamicContent = require('./clinet/dynamiccontent').DynamicContent;
exports.TicketEvents = require('./clinet/ticketevents').TicketEvents;
exports.Imports = require('./clinet/imports').Imports;
exports.Targets = require('./clinet/targets').Targets;
exports.Sessions = require('./clinet/sessions').Sessions;
exports.Installations = require('./clinet/installations').Installations;
exports.Policies = require('./clinet/policies').Policies;

// Export help center client classes
exports.Articles = require('./client/helpcenter/articles').Articles;
exports.Sections = require('./client/helpcenter/sections').Sections;
exports.Categories = require('./client/helpcenter/categories').Categories;
exports.Translations = require('./client/helpcenter/translations').Translations;
exports.ArticleComments = require('./client/helpcenter/articlecomments').ArticleComments;
exports.ArticleLabels = require('./client/helpcenter/articlelabels').ArticleLabels;
exports.ArticleAttachments = require('./client/helpcenter/articleattachments').ArticleAttachments;
exports.Votes = require('./client/helpcenter/votes').Votes;
exports.Search = require('./client/helpcenter/search').Search;
exports.AccessPolicies = require('./client/helpcenter/accesspolicies').AccessPolicies;
exports.Subscriptions = require('./client/helpcenter/subscriptions').Subscriptions;

// Export voice client classes
exports.PhoneNumbers = require('./client/voice/phonenumbers').PhoneNumbers;
exports.GreetingCategories = require('./client/voice/greetingcategories').GreetingCategories;
exports.Greetings = require('./client/voice/greetings').Greetings;
exports.CurrentQueueActivity = require('./client/voice/currentqueueactivity').CurrentQueueActivity;
exports.HistoricalQueueActivity = require('./client/voice/historicalqueueactivity').HistoricalQueueActivity;
exports.AgentActivity = require('./client/voice/agentactivity').AgentActivity;
exports.Availabilities = require('./client/voice/availabilities').Availabilities;

var parts = [
      'Users', 'Tickets', 'TicketAudits', 'TicketFields', 'TicketForms', 'TicketMetrics', 'TicketImport', 'TicketExport',
      'Views', 'Requests', 'UserIdentities', 'Groups', 'GroupMemberships',
      'CustomAgentRoles', 'Organizations', 'Search', 'Tags', 'Forums',
      'ForumSubscriptions', 'Categories', 'Topics', 'TopicComments',
      'TopicSubscriptions', 'TopicVotes', 'AccountSettings',
      'ActivityStream', 'Attachments', 'JobStatuses', 'Locales',
      'Macros', 'SatisfactionRatings', 'SuspendedTickets', 'UserFields',
      'OrganizationFields', 'OauthTokens', 'Triggers', 'SharingAgreement',
      'Brand', 'OrganizationMemberships', 'DynamicContent', 'TicketEvents',
      'Imports', 'Targets', 'Sessions', 'Installations', 'Policies'
    ],
    helpcenterParts = [
      'Articles', 'Sections', 'Categories', 'Translations',
      'ArticleComments', 'ArticleLabels', 'ArticleAttachments',
      'Votes', 'Search', 'AccessPolicies', 'Subscriptions'
    ],
    voiceParts = [
      'PhoneNumbers', 'GreetingCategories', 'Greetings', 'CurrentQueueActivity',
      'HistoricalQueueActivity', 'AgentActivity', 'Availabilities'
    ];

exports.createClient = function (options) {
  var nconf = require('nconf'),
      store = new nconf.Provider();
  nconf.use('memory');
  if (true !== options.disableGlobalState) {
    nconf.env().argv({
      's': {
        alias: 'subdomain'
      },
      'u': {
        alias: 'username'
      },
      'p': {
        alias: 'password'
      },
      't': {
        alias: 'token'
      },
      'r': {
        alias: 'remoteUri'
      },
      'hc': {
        alias: 'helpcenter'
      },
      'v': {
        alias: 'voice'
      }
    });
  }

  options = store.defaults(options);

  if (nconf.get('subdomain')) {
    var endpoint;
    if (options.stores.defaults.store.helpcenter) {
      endpoint = '.zendesk.com/api/v2/help_center';
    } else if (options.stores.defaults.store.voice){
      endpoint = '.zendesk.com/api/v2/channels/voice';
    } else {
      endpoint = '.zendesk.com/api/v2';
    }
    options.stores.defaults.store.remoteUri = 'https://' + nconf.get('subdomain') + endpoint;
  }

  var client = {}, partsToAdd;

  if (options.stores.defaults.store.helpcenter) {
    partsToAdd = helpcenterParts;
  } else if (options.stores.defaults.store.voice) {
    partsToAdd = voiceParts;
  } else {
    partsToAdd = parts;
  }

  partsToAdd.forEach(function (k) {
    client[k.toLowerCase()] = new exports[k](options);
    client[k.toLowerCase()].on('debug::request',  debug);
    client[k.toLowerCase()].on('debug::response', debug);
  });

  function debug(args) {
    if (options.get('debug')) {
      console.log(args);
    }
  }

  return client;
};
