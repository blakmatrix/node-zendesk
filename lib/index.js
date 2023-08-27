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
  default: '.zendesk.com/api/v2',
  helpcenter: '.zendesk.com/api/v2/help_center',
  voice: '.zendesk.com/api/v2/channels/voice',
  services: '.zendesk.com/api/services/jira',
};

class ZendeskClient {
  constructor(options = {}) {
    this.config = options;
    this._initializeClientModules();
  }

  _getEndpoint() {
    const {helpcenter, voice, services} = this.config;
    if (helpcenter) return ENDPOINTS.helpcenter;
    if (voice) return ENDPOINTS.voice;
    if (services) return ENDPOINTS.services;
    return ENDPOINTS.default;
  }

  _initializeClientModules() {
    const {
      subdomain,
      helpcenter,
      voice,
      services,
      nps,
      remoteUri: providedRemoteUri,
    } = this.config;

    const remoteUri =
      providedRemoteUri || `https://${subdomain}${this._getEndpoint()}`;
    this.config.remoteUri = remoteUri;

    const clientType = helpcenter
      ? 'helpcenter'
      : voice
      ? 'voice'
      : services
      ? 'services'
      : nps
      ? 'nps'
      : 'core';

    const clientModules = MODULES[clientType];
    this.client = {};

    for (const module of clientModules) {
      const moduleName = module.toLowerCase();
      const ModuleClass = require(`./client/${clientType}/${moduleName}`)[
        module
      ];
      this.client[moduleName] = new ModuleClass(this.config);
      this.client[moduleName].on('debug::request', this._debug.bind(this));
      this.client[moduleName].on('debug::response', this._debug.bind(this));
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
