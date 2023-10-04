// Index.js - node-zendesk client initialization
'use strict';

const ConsoleLogger = require('./logger');
const { ZendeskClientHelpcenter } = require('./clients/helpcenter');
const { ZendeskClientNps } = require('./clients/nps');
const { ZendeskClientServices } = require('./clients/services');
const { ZendeskClientVoice } = require('./clients/voice');

/**
 * @typedef {Object} ZendeskClientOptions
 * @property {string} ZendeskClientOptions.name
 * @property {string} ZendeskClientOptions.username - The username used for authentication.
 * @property {string} ZendeskClientOptions.token - The authentication token.
 * @property {string} [ZendeskClientOptions.subdomain] - The subdomain for the Zendesk account (e.g., 'mycompany' for 'mycompany.zendesk.com').
 *                                     If the `endpointUri` option is provided, `subdomain` will be ignored and the logic
 *                                     to manage multi-type endpoints will be disabled.
 * @property {string[]} [ZendeskClientOptions.apiType=['core']] - Type of Zendesk API to initialize (e.g., 'core', 'helpcenter').
 *                                    Determines which sub-client to use.
 * @property {string} [ZendeskClientOptions.endpointUri] - The base URI for the Zendesk API. Overrides and ignores `subdomain` if provided.
 * @property {function} [ZendeskClientOptions.get] - Function to get specific options. By default, accesses property from the options.
 * @property {boolean} [ZendeskClientOptions.oauth] - Flag to indicate if OAuth is used.
 * @property {string} [ZendeskClientOptions.asUser] - Optional header for making requests on behalf of a user.
 * @property {object} [ZendeskClientOptions.customHeaders] - Any additional custom headers for the request.
 * @property {boolean} [ZendeskClientOptions.throttle] - Flag to enable throttling of requests.
 * @property {boolean} [ZendeskClientOptions.debug=false] - Flag to enable or disable debug logging.
 * @property {object} [ZendeskClientOptions.logger=ConsoleLogger] - Optional logger for logging. Should have methods like `info`, `error`, etc. Defaults to a basic console logger.
 * @property {object} [ZendeskClientOptions.transportConfig] - Configuration for custom transport functionality.
 * @property {function} [ZendeskClientOptions.transportConfig.transportFn] - Custom function to perform the request. By default, it uses `fetch`. It should return a response object.
 * @property {function} [ZendeskClientOptions.transportConfig.responseAdapter] - Custom function to adapt the response from `transportFn` into a consistent format. By default, it adapts for `fetch` response.
 */


/**
 * Represents the main client to interface with the Zendesk API.
 * This class acts as a high-level interface, making it easier to interact with specific Zendesk APIs.
 *
 * @class
 * @property {ZendeskClientOptions} config - Configuration options for the client.
 * @property {ConsoleLogger} logger - Logger for logging.
 */
class ZendeskClient {
  /**
   * @constructs ZendeskClient
   * @param {ZendeskClientOptions} options - Configuration options for the client.
   * @example
   * const zendeskOptions = {
   *     username: 'exampleUser',
   *     token: 'exampleToken',
   *     subdomain: 'mycompany'
   * };
   * const zendeskClient = createClient(zendeskOptions);
   * const data = await zendeskClient.someResource.someMethod();
   */
  constructor(options = {}) {
    this.config = options;
    this.logger = options.logger ?? new ConsoleLogger();
    this.helpcenter = new ZendeskClientHelpcenter(this);
    this.services = new ZendeskClientServices(this);
    this.voice = new ZendeskClientVoice(this);
    this.nps = new ZendeskClientNps(this);
  }

  /**
   * @template {T} [T=import('./client/client.js').Client]
   * @param {{ new (options: ZendeskClientOptions): T }} clazz
   * @return {T}
   * @private
   */
  _instantiate(clazz) {
    /**
     * @private
     */
    this.instances = this.instances ?? {};

    // if the instance already exists, return it
    if (this.instances[clazz]) {
      return this.instances[clazz];
    }

    const client = new clazz(this.config);
    client.on('debug::request', this._debug.bind(this));
    client.on('debug::response', this._debug.bind(this));
    client.on('debug::result', this._debug.bind(this));
    this.instances[clazz] = client;

    return client;
  }

  get accountsettings() {
    const { AccountSettings } = require('./clients/core/accountsettings');
    return this._instantiate(AccountSettings);
  }

  get activitystream() {
    const { ActivityStream } = require('./clients/core/activitystream');
    return this._instantiate(ActivityStream);
  }

  get attachments() {
    const { Attachments } = require('./clients/core/attachments');
    return this._instantiate(Attachments);
  }

  get automations() {
    const { Automations } = require('./clients/core/automations');
    return this._instantiate(Automations);
  }

  get brand() {
    const { Brand } = require('./clients/core/brand');
    return this._instantiate(Brand);
  }

  get customagentroles() {
    const { CustomAgentRoles } = require('./clients/core/customagentroles');
    return this._instantiate(CustomAgentRoles);
  }

  get dynamiccontent() {
    const { DynamicContent } = require('./clients/core/dynamiccontent');
    return this._instantiate(DynamicContent);
  }

  get dynamiccontentvariants() {
    const { DynamicContentVariants } = require('./clients/core/dynamiccontentvariants');
    return this._instantiate(DynamicContentVariants);
  }

  get groupmemberships() {
    const { GroupMemberships } = require('./clients/core/groupmemberships');
    return this._instantiate(GroupMemberships);
  }

  get groups() {
    const { Groups } = require('./clients/core/groups');
    return this._instantiate(Groups);
  }

  get imports() {
    const { Imports } = require('./clients/core/imports');
    return this._instantiate(Imports);
  }

  get installations() {
    const { Installations } = require('./clients/core/installations');
    return this._instantiate(Installations);
  }

  get jobstatuses() {
    const { JobStatuses } = require('./clients/core/jobstatuses');
    return this._instantiate(JobStatuses);
  }

  get locales() {
    const { Locales } = require('./clients/core/locales');
    return this._instantiate(Locales);
  }

  get macros() {
    const { Macros } = require('./clients/core/macros');
    return this._instantiate(Macros);
  }

  get oauthtokens() {
    const { OauthTokens } = require('./clients/core/oauthtokens');
    return this._instantiate(OauthTokens);
  }

  get organizationfields() {
    const { OrganizationFields } = require('./clients/core/organizationfields');
    return this._instantiate(OrganizationFields);
  }

  get organizationmemberships() {
    const { OrganizationMemberships } = require('./clients/core/organizationmemberships');
    return this._instantiate(OrganizationMemberships);
  }

  get organizations() {
    const { Organizations } = require('./clients/core/organizations');
    return this._instantiate(Organizations);
  }

  get permissiongroups() {
    const { PermissionGroups } = require('./clients/core/permissiongroups');
    return this._instantiate(PermissionGroups);
  }

  get policies() {
    const { Policies } = require('./clients/core/policies');
    return this._instantiate(Policies);
  }

  get requests() {
    const { Requests } = require('./clients/core/requests');
    return this._instantiate(Requests);
  }

  get satisfactionratings() {
    const { SatisfactionRatings } = require('./clients/core/satisfactionratings');
    return this._instantiate(SatisfactionRatings);
  }

  get search() {
    const { Search } = require('./clients/core/search');
    return this._instantiate(Search);
  }

  get sessions() {
    const { Sessions } = require('./clients/core/sessions');
    return this._instantiate(Sessions);
  }

  get sharingagreement() {
    const { SharingAgreement } = require('./clients/core/sharingagreement');
    return this._instantiate(SharingAgreement);
  }

  get suspendedtickets() {
    const { SuspendedTickets } = require('./clients/core/suspendedtickets');
    return this._instantiate(SuspendedTickets);
  }

  get tags() {
    const { Tags } = require('./clients/core/tags');
    return this._instantiate(Tags);
  }

  get targets() {
    const { Targets } = require('./clients/core/targets');
    return this._instantiate(Targets);
  }

  get ticketaudits() {
    const { TicketAudits } = require('./clients/core/ticketaudits');
    return this._instantiate(TicketAudits);
  }

  get ticketevents() {
    const { TicketEvents } = require('./clients/core/ticketevents');
    return this._instantiate(TicketEvents);
  }

  get ticketexport() {
    const { TicketExport } = require('./clients/core/ticketexport');
    return this._instantiate(TicketExport);
  }

  get ticketfields() {
    const { TicketFields } = require('./clients/core/ticketfields');
    return this._instantiate(TicketFields);
  }

  get ticketforms() {
    const { TicketForms } = require('./clients/core/ticketforms');
    return this._instantiate(TicketForms);
  }

  get ticketimport() {
    const { TicketImport } = require('./clients/core/ticketimport');
    return this._instantiate(TicketImport);
  }

  get ticketmetrics() {
    const { TicketMetrics } = require('./clients/core/ticketmetrics');
    return this._instantiate(TicketMetrics);
  }

  get tickets() {
    const { Tickets } = require('./clients/core/tickets');
    return this._instantiate(Tickets);
  }

  get triggers() {
    const { Triggers } = require('./clients/core/triggers');
    return this._instantiate(Triggers);
  }

  get userfields() {
    const { UserFields } = require('./clients/core/userfields');
    return this._instantiate(UserFields);
  }

  get useridentities() {
    const { UserIdentities } = require('./clients/core/useridentities');
    return this._instantiate(UserIdentities);
  }

  get users() {
    const { Users } = require('./clients/core/users');
    return this._instantiate(Users);
  }

  get views() {
    const { Views } = require('./clients/core/views');
    return this._instantiate(Views);
  }

  get webhooks() {
    const { Webhooks } = require('./clients/core/webhooks');
    return this._instantiate(Webhooks);
  }

  get agentactivity() {
    const { AgentActivity } = require('./clients/voice/agentactivity');
    return this._instantiate(AgentActivity);
  }

  get availabilities() {
    const { Availabilities } = require('./clients/voice/availabilities');
    return this._instantiate(Availabilities);
  }

  /**
   * @private
   */
  _debug(args) {
    if (this.config.debug) {
      if (args.result) {
        args.result = String(args.result);
      }

      this.logger.debug(args);
    }
  }
}

/**
 * @function createClient
 * @param {ZendeskClientOptions} options
 * @return {ZendeskClient}
 */
function createClient(options) {
  return new ZendeskClient(options);
}

module.exports = {
  createClient
};
