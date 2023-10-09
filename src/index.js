// Index.js - node-zendesk client initialization
'use strict';

const ConsoleLogger = require('./logger');
const {ZendeskClientHelpcenter} = require('./clients/helpcenter');
const {ZendeskClientServices} = require('./clients/services');
const {ZendeskClientVoice} = require('./clients/voice');

/**
 * @typedef {object} ZendeskClientOptions
 * @property {string} [token] - Authentication token.
 * @property {string} [username] - Username for authentication.
 * @property {string} [subdomain] - Subdomain for the Zendesk account (e.g., 'mycompany' for 'mycompany.zendesk.com'). If `endpointUri` is provided, this is ignored.
 * @property {string[]} [apiType=['core']] - Type of Zendesk API (e.g., 'core', 'helpcenter'). Determines the sub-client to use.
 * @property {string} [endpointUri] - Base URI for the Zendesk API. Overrides `subdomain` if provided.
 * @property {Function} [get] - Function to retrieve specific options. Defaults to accessing properties from the options.
 * @property {boolean} [oauth] - Indicates if OAuth is used.
 * @property {string} [asUser] - Optional header for requests on behalf of a user.
 * @property {object} [customHeaders] - Additional custom headers for the request.
 * @property {boolean} [throttle] - Enables request throttling.
 * @property {boolean} [debug=false] - Enables or disables debug logging.
 * @property {object} [logger=ConsoleLogger] - Logger for logging. Defaults to a basic console logger.
 * @property {object} [transportConfig] - Configuration for custom transport.
 * @property {Function} [transportConfig.transportFn] - Custom request function. Defaults to `fetch`.
 * @property {Function} [transportConfig.responseAdapter] - Adapts the response from `transportFn`. Defaults to adapting for `fetch`.
 */

/**
 * Represents the main client to interface with the Zendesk API.
 * This class acts as a high-level interface, making it easier to interact with specific Zendesk APIs.
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
  }

  /**
   * @template {T} [T=import('./client/client.js').Client]
   * @param {new(options: ZendeskClientOptions) => T} ServiceClass - The service class to instantiate.
   * @returns {T} An instance of the service class.
   * @private
   */
  _instantiate(ServiceClass) {
    /**
     * @private
     */
    this.instances = this.instances ?? {};

    // If the instance already exists, return it
    if (this.instances[ServiceClass]) {
      return this.instances[ServiceClass];
    }

    const client = new ServiceClass(this.config);
    client.on('debug::request', this._debug.bind(this));
    client.on('debug::response', this._debug.bind(this));
    client.on('debug::result', this._debug.bind(this));
    this.instances[ServiceClass] = client;

    return client;
  }

  get accountsettings() {
    const {AccountSettings} = require('./clients/core/accountsettings');
    return this._instantiate(AccountSettings);
  }

  get activitystream() {
    const {ActivityStream} = require('./clients/core/activitystream');
    return this._instantiate(ActivityStream);
  }

  get attachments() {
    const {Attachments} = require('./clients/core/attachments');
    return this._instantiate(Attachments);
  }

  get automations() {
    const {Automations} = require('./clients/core/automations');
    return this._instantiate(Automations);
  }

  get brand() {
    const {Brand} = require('./clients/core/brand');
    return this._instantiate(Brand);
  }

  get customagentroles() {
    const {CustomAgentRoles} = require('./clients/core/customagentroles');
    return this._instantiate(CustomAgentRoles);
  }

  get dynamiccontent() {
    const {DynamicContent} = require('./clients/core/dynamiccontent');
    return this._instantiate(DynamicContent);
  }

  get dynamiccontentvariants() {
    const {
      DynamicContentVariants,
    } = require('./clients/core/dynamiccontentvariants');
    return this._instantiate(DynamicContentVariants);
  }

  get groupmemberships() {
    const {GroupMemberships} = require('./clients/core/groupmemberships');
    return this._instantiate(GroupMemberships);
  }

  get groups() {
    const {Groups} = require('./clients/core/groups');
    return this._instantiate(Groups);
  }

  get imports() {
    const {Imports} = require('./clients/core/imports');
    return this._instantiate(Imports);
  }

  get installations() {
    const {Installations} = require('./clients/core/installations');
    return this._instantiate(Installations);
  }

  get jobstatuses() {
    const {JobStatuses} = require('./clients/core/jobstatuses');
    return this._instantiate(JobStatuses);
  }

  get locales() {
    const {Locales} = require('./clients/core/locales');
    return this._instantiate(Locales);
  }

  get macros() {
    const {Macros} = require('./clients/core/macros');
    return this._instantiate(Macros);
  }

  get oauthtokens() {
    const {OauthTokens} = require('./clients/core/oauthtokens');
    return this._instantiate(OauthTokens);
  }

  get organizationfields() {
    const {OrganizationFields} = require('./clients/core/organizationfields');
    return this._instantiate(OrganizationFields);
  }

  get organizationmemberships() {
    const {
      OrganizationMemberships,
    } = require('./clients/core/organizationmemberships');
    return this._instantiate(OrganizationMemberships);
  }

  get organizations() {
    const {Organizations} = require('./clients/core/organizations');
    return this._instantiate(Organizations);
  }

  get permissiongroups() {
    const {PermissionGroups} = require('./clients/core/permissiongroups');
    return this._instantiate(PermissionGroups);
  }

  get policies() {
    const {Policies} = require('./clients/core/policies');
    return this._instantiate(Policies);
  }

  get requests() {
    const {Requests} = require('./clients/core/requests');
    return this._instantiate(Requests);
  }

  get satisfactionratings() {
    const {SatisfactionRatings} = require('./clients/core/satisfactionratings');
    return this._instantiate(SatisfactionRatings);
  }

  get search() {
    const {Search} = require('./clients/core/search');
    return this._instantiate(Search);
  }

  get sessions() {
    const {Sessions} = require('./clients/core/sessions');
    return this._instantiate(Sessions);
  }

  get sharingagreement() {
    const {SharingAgreement} = require('./clients/core/sharingagreement');
    return this._instantiate(SharingAgreement);
  }

  get suspendedtickets() {
    const {SuspendedTickets} = require('./clients/core/suspendedtickets');
    return this._instantiate(SuspendedTickets);
  }

  get tags() {
    const {Tags} = require('./clients/core/tags');
    return this._instantiate(Tags);
  }

  get targets() {
    const {Targets} = require('./clients/core/targets');
    return this._instantiate(Targets);
  }

  get ticketaudits() {
    const {TicketAudits} = require('./clients/core/ticketaudits');
    return this._instantiate(TicketAudits);
  }

  get ticketevents() {
    const {TicketEvents} = require('./clients/core/ticketevents');
    return this._instantiate(TicketEvents);
  }

  get ticketexport() {
    const {TicketExport} = require('./clients/core/ticketexport');
    return this._instantiate(TicketExport);
  }

  get ticketfields() {
    const {TicketFields} = require('./clients/core/ticketfields');
    return this._instantiate(TicketFields);
  }

  get ticketforms() {
    const {TicketForms} = require('./clients/core/ticketforms');
    return this._instantiate(TicketForms);
  }

  get ticketimport() {
    const {TicketImport} = require('./clients/core/ticketimport');
    return this._instantiate(TicketImport);
  }

  get ticketmetrics() {
    const {TicketMetrics} = require('./clients/core/ticketmetrics');
    return this._instantiate(TicketMetrics);
  }

  get tickets() {
    const {Tickets} = require('./clients/core/tickets');
    return this._instantiate(Tickets);
  }

  get triggers() {
    const {Triggers} = require('./clients/core/triggers');
    return this._instantiate(Triggers);
  }

  get userfields() {
    const {UserFields} = require('./clients/core/userfields');
    return this._instantiate(UserFields);
  }

  get useridentities() {
    const {UserIdentities} = require('./clients/core/useridentities');
    return this._instantiate(UserIdentities);
  }

  get users() {
    const {Users} = require('./clients/core/users');
    return this._instantiate(Users);
  }

  get views() {
    const {Views} = require('./clients/core/views');
    return this._instantiate(Views);
  }

  get webhooks() {
    const {Webhooks} = require('./clients/core/webhooks');
    return this._instantiate(Webhooks);
  }

  get agentactivity() {
    const {AgentActivity} = require('./clients/voice/agentactivity');
    return this._instantiate(AgentActivity);
  }

  get availabilities() {
    const {Availabilities} = require('./clients/voice/availabilities');
    return this._instantiate(Availabilities);
  }

  /**
   * @param {object} args - Arguments for debugging.
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
 * Creates and returns an instance of the ZendeskClient class.
 * @function
 * @param {ZendeskClientOptions} options - Configuration options for the Zendesk client.
 * @returns {ZendeskClient} An instance of the ZendeskClient class.
 */
function createClient(options) {
  return new ZendeskClient(options);
}

module.exports = {
  ZendeskClient,
  createClient,
};
