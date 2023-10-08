/**
 * @readonly
 * @enum {string}
 */
const ApiTypes = {
  core: 'core',
  helpcenter: 'helpcenter',
  services: 'services',
  voice: 'voice',
  nps: 'nps',
};

/**
 * @type {Record<ApiTypes, string>}
 * @readonly
 */
const Endpoints = {
  core: '.zendesk.com/api/v2',
  nps: '.zendesk.com/api/v2/nps', // TODO ????
  helpcenter: '.zendesk.com/api/v2/help_center',
  services: '.zendesk.com/api/services/jira',
  voice: '.zendesk.com/api/v2/channels/voice',
};

module.exports = {ApiTypes, Endpoints};
