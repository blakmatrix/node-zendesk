// Index.js - node-zendesk client initialization
'use strict';

const MODULES = {
  core: [
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
  ],
  helpcenter: [
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
  ],
  voice: [
    'PhoneNumbers',
    'GreetingCategories',
    'Greetings',
    'CurrentQueueActivity',
    'HistoricalQueueActivity',
    'AgentActivity',
    'Availabilities',
  ],
  services: ['Links'],
  nps: ['Invitations', 'Surveys'],
};

const ENDPOINTS = {
  core: '.zendesk.com/api/v2',
  helpcenter: '.zendesk.com/api/v2/help_center',
  voice: '.zendesk.com/api/v2/channels/voice',
  services: '.zendesk.com/api/services/jira',
};

class ZendeskClient {
  constructor(options = {}) {
    this.config = options;
    this.client = {};
    this._initializeClientModules();
  }

  _getEndpoint(apiType) {
    return ENDPOINTS[apiType] || ENDPOINTS.core;
  }

  _initializeClientModules() {
    const {
      subdomain,
      apiType = ['core'],
      remoteUri: providedRemoteUri,
    } = this.config;

    // Ensure apiType is always an array
    const clientTypes = Array.isArray(apiType) ? apiType : [apiType];

    for (const type of clientTypes) {
      const endpoint = this._getEndpoint(type);
      const remoteUri = providedRemoteUri || `https://${subdomain}${endpoint}`;

      const clientModules = MODULES[type];

      for (const module of clientModules) {
        const moduleName = module.toLowerCase();
        const ModuleClass = require(`./client/${type}/${moduleName}`)[module];
        this.client[moduleName] = new ModuleClass({...this.config, remoteUri});
        this.client[moduleName].on('debug::request', this._debug.bind(this));
        this.client[moduleName].on('debug::response', this._debug.bind(this));
      }
    }
  }

  _debug(args) {
    if (this.config.debug) {
      if (args.result) {
        args.result = String(args.result);
      }

      console.log(args);
    }
  }
}

module.exports = {
  createClient: (options) => new ZendeskClient(options).client,
};
