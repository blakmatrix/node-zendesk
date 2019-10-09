// client.js - node-zendesk client initialization
"use strict";

const Users = require("./client/users")["Users"];
const Tickets = require("./client/tickets")["Tickets"];
const TicketAudits = require("./client/ticketaudits")["TicketAudits"];
const TicketFields = require("./client/ticketfields")["TicketFields"];
const TicketForms = require("./client/ticketforms")["TicketForms"];
const TicketMetrics = require("./client/ticketmetrics")["TicketMetrics"];
const TicketImport = require("./client/ticketimport")["TicketImport"];
const TicketExport = require("./client/ticketexport")["TicketExport"];
const Views = require("./client/views")["Views"];
const Requests = require("./client/requests")["Requests"];
const UserIdentities = require("./client/useridentities")["UserIdentities"];
const Groups = require("./client/groups")["Groups"];
const GroupMemberships = require("./client/groupmemberships")["GroupMemberships"];
const CustomAgentRoles = require("./client/customagentroles")["CustomAgentRoles"];
const Organizations = require("./client/organizations")["Organizations"];
const Search = require("./client/search")["Search"];
const Tags = require("./client/tags")["Tags"];
const Forums = require("./client/forums")["Forums"];
const ForumSubscriptions = require("./client/forumsubscriptions")["ForumSubscriptions"];
const Categories = require("./client/categories")["Categories"];
const Topics = require("./client/topics")["Topics"];
const TopicComments = require("./client/topiccomments")["TopicComments"];
const TopicSubscriptions = require("./client/topicsubscriptions")["TopicSubscriptions"];
const TopicVotes = require("./client/topicvotes")["TopicVotes"];
const AccountSettings = require("./client/accountsettings")["AccountSettings"];
const ActivityStream = require("./client/activitystream")["ActivityStream"];
const Attachments = require("./client/attachments")["Attachments"];
const JobStatuses = require("./client/jobstatuses")["JobStatuses"];
const Locales = require("./client/locales")["Locales"];
const Macros = require("./client/macros")["Macros"];
const SatisfactionRatings = require("./client/satisfactionratings")["SatisfactionRatings"];
const SuspendedTickets = require("./client/suspendedtickets")["SuspendedTickets"];
const UserFields = require("./client/userfields")["UserFields"];
const OrganizationFields = require("./client/organizationfields")["OrganizationFields"];
const OauthTokens = require("./client/oauthtokens")["OauthTokens"];
const Triggers = require("./client/triggers")["Triggers"];
const SharingAgreement = require("./client/sharingagreement")["SharingAgreement"];
const Brand = require("./client/brand")["Brand"];
const OrganizationMemberships = require("./client/organizationmemberships")["OrganizationMemberships"];
const DynamicContent = require("./client/dynamiccontent")["DynamicContent"];
const TicketEvents = require("./client/ticketevents")["TicketEvents"];
const Imports = require("./client/imports")["Imports"];
const Targets = require("./client/targets")["Targets"];
const Sessions = require("./client/sessions")["Sessions"];
const Installations = require("./client/installations")["Installations"];
const Policies = require("./client/policies")["Policies"];

var parts = [
    "Users",
    "Tickets",
    "TicketAudits",
    "TicketFields",
    "TicketForms",
    "TicketMetrics",
    "TicketImport",
    "TicketExport",
    "Views",
    "Requests",
    "UserIdentities",
    "Groups",
    "GroupMemberships",
    "CustomAgentRoles",
    "Organizations",
    "Search",
    "Tags",
    "Forums",
    "ForumSubscriptions",
    "Categories",
    "Topics",
    "TopicComments",
    "TopicSubscriptions",
    "TopicVotes",
    "AccountSettings",
    "ActivityStream",
    "Attachments",
    "JobStatuses",
    "Locales",
    "Macros",
    "SatisfactionRatings",
    "SuspendedTickets",
    "UserFields",
    "OrganizationFields",
    "OauthTokens",
    "Triggers",
    "SharingAgreement",
    "Brand",
    "OrganizationMemberships",
    "DynamicContent",
    "TicketEvents",
    "Imports",
    "Targets",
    "Sessions",
    "Installations",
    "Policies"
  ],
  helpcenterParts = [
    "Articles",
    "Sections",
    "Categories",
    "Translations",
    "ArticleComments",
    "ArticleLabels",
    "ArticleAttachments",
    "Votes",
    "Search",
    "AccessPolicies",
    "Subscriptions"
  ],
  voiceParts = [
    "PhoneNumbers",
    "GreetingCategories",
    "Greetings",
    "CurrentQueueActivity",
    "HistoricalQueueActivity",
    "AgentActivity",
    "Availabilities"
  ];

exports.createClient = function(options) {
  var nconf = require("nconf"),
    store = new nconf.Provider();
  nconf.use("memory");
  if (true !== options.disableGlobalState) {
    nconf.env().argv({
      s: {
        alias: "subdomain"
      },
      u: {
        alias: "username"
      },
      p: {
        alias: "password"
      },
      t: {
        alias: "token"
      },
      r: {
        alias: "remoteUri"
      },
      hc: {
        alias: "helpcenter"
      },
      v: {
        alias: "voice"
      }
    });
  }

  options = store.defaults(options);

  if (nconf.get("subdomain")) {
    var endpoint;
    if (options.stores.defaults.store.helpcenter) {
      endpoint = ".zendesk.com/api/v2/help_center";
    } else if (options.stores.defaults.store.voice) {
      endpoint = ".zendesk.com/api/v2/channels/voice";
    } else {
      endpoint = ".zendesk.com/api/v2";
    }
    options.stores.defaults.store.remoteUri = "https://" + nconf.get("subdomain") + endpoint;
  }

  var client = {},
    partsToAdd,
    clientPath;

  if (options.stores.defaults.store.helpcenter) {
    partsToAdd = helpcenterParts;
    clientPath = "helpcenter/";
  } else if (options.stores.defaults.store.voice) {
    partsToAdd = voiceParts;
    clientPath = "voice/";
  } else {
    partsToAdd = parts;
    clientPath = "";
  }

  client.Users = new Users(options);
  client.tickets = new Tickets(options);
  client.ticketAudits = new TicketAudits(options);
  client.ticketFields = new TicketFields(options);
  client.ticketForms = new TicketForms(options);
  client.ticketMetrics = new TicketMetrics(options);
  client.ticketImport = new TicketImport(options);
  client.ticketExport = new TicketExport(options);
  client.views = new Views(options);
  client.requests = new Requests(options);
  client.userIdentities = new UserIdentities(options);
  client.groups = new Groups(options);
  client.groupMemberships = new GroupMemberships(options);
  client.customAgentRoles = new CustomAgentRoles(options);
  client.organizations = new Organizations(options);
  client.search = new Search(options);
  client.tags = new Tags(options);
  client.forums = new Forums(options);
  client.forumSubscriptions = new ForumSubscriptions(options);
  client.categories = new Categories(options);
  client.topics = new Topics(options);
  client.topicComments = new TopicComments(options);
  client.topicSubscriptions = new TopicSubscriptions(options);
  client.topicVotes = new TopicVotes(options);
  client.accountSettings = new AccountSettings(options);
  client.activityStream = new ActivityStream(options);
  client.attachments = new Attachments(options);
  client.jobStatuses = new JobStatuses(options);
  client.locales = new Locales(options);
  client.macros = new Macros(options);
  client.satisfactionRatings = new SatisfactionRatings(options);
  client.suspendedTickets = new SuspendedTickets(options);
  client.userFields = new UserFields(options);
  client.organizationFields = new OrganizationFields(options);
  client.oauthTokens = new OauthTokens(options);
  client.triggers = new Triggers(options);
  client.sharingAgreement = new SharingAgreement(options);
  client.brand = new Brand(options);
  client.organizationMemberships = new OrganizationMemberships(options);
  client.dynamicContent = new DynamicContent(options);
  client.ticketEvents = new TicketEvents(options);
  client.imports = new Imports(options);
  client.targets = new Targets(options);
  client.sessions = new Sessions(options);
  client.installations = new Installations(options);
  client.policies = new Policies(options);

  console.log(client);
  console.debug(client);

  function debug(args) {
    if (options.get("debug")) {
      console.log(args);
    }
  }

  return client;
};
