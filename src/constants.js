const MODULES = {
  core: [
    'AccountSettings',
    'ActivityStream',
    'Attachments',
    'Automations',
    'Brand',
    'CustomAgentRoles',
    'DynamicContent',
    'DynamicContentVariants',
    'GroupMemberships',
    'Groups',
    'Imports',
    'Installations',
    'JobStatuses',
    'Locales',
    'Macros',
    'OauthTokens',
    'OrganizationFields',
    'OrganizationMemberships',
    'Organizations',
    'PermissionGroups',
    'Policies',
    'Requests',
    'SatisfactionRatings',
    'Search',
    'Sessions',
    'SharingAgreement',
    'SuspendedTickets',
    'Tags',
    'Targets',
    'TicketAudits',
    'TicketEvents',
    'TicketExport',
    'TicketFields',
    'TicketForms',
    'TicketImport',
    'TicketMetrics',
    'Tickets',
    'TopicComments',
    'Topics',
    'TopicSubscriptions',
    'TopicVotes',
    'Triggers',
    'UserFields',
    'UserIdentities',
    'Users',
    'Views',
    'Webhooks',
  ],
  helpcenter: [
    'AccessPolicies',
    'ArticleAttachments',
    'ArticleComments',
    'ArticleLabels',
    'Articles',
    'Categories',
    'Search',
    'Sections',
    'Subscriptions',
    'Translations',
    'UserSegments',
    'Votes',
  ],
  nps: ['Invitations', 'Surveys'],
  services: ['Links'],
  voice: [
    'AgentActivity',
    'Availabilities',
    'CurrentQueueActivity',
    'GreetingCategories',
    'Greetings',
    'HistoricalQueueActivity',
    'PhoneNumbers',
  ],
};

const ENDPOINTS = {
  core: '.zendesk.com/api/v2',
  helpcenter: '.zendesk.com/api/v2/help_center',
  services: '.zendesk.com/api/services/jira',
  voice: '.zendesk.com/api/v2/channels/voice',
};

const MODULE_BASE_PATHS = {
  core: './client/core/',
  helpcenter: './client/helpcenter/',
  nps: './client/nps/',
  services: './client/services/',
  voice: './client/voice/',
};

const MODULE_MAP = {};

for (const apiType in MODULES) {
  if (Object.prototype.hasOwnProperty.call(MODULES, apiType)) {
    MODULE_MAP[apiType] = {};

    for (const moduleName of MODULES[apiType]) {
      const modulePath = `${
        MODULE_BASE_PATHS[apiType]
      }${moduleName.toLowerCase()}`;
      MODULE_MAP[apiType][moduleName.toLowerCase()] = require(modulePath);
    }
  }
}

module.exports = {MODULES, MODULE_BASE_PATHS, MODULE_MAP, ENDPOINTS};
