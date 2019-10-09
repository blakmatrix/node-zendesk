// client.js - node-zendesk client initialization
"use strict";

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

  exports.Users = require("./client/users")["Users"];
  client.Users = new exports.Users(options);

  exports.Tickets = require("./client/tickets")["Tickets"];
  client.tickets = new exports.Tickets(options);

  exports.TicketAudits = require("./client/ticketaudits")["TicketAudits"];
  client.ticketAudits = new exports.TicketAudits(options);

  exports.TicketFields = require("./client/ticketfields")["TicketFields"];
  client.ticketFields = new exports.TicketFields(options);

  exports.TicketForms = require("./client/ticketforms")["TicketForms"];
  client.ticketForms = new exports.TicketForms(options);

  exports.TicketMetrics = require("./client/ticketmetrics")["TicketMetrics"];
  client.ticketMetrics = new exports.TicketMetrics(options);

  exports.TicketImport = require("./client/ticketimport")["TicketImport"];
  client.ticketImport = new exports.TicketImport(options);

  exports.TicketExport = require("./client/ticketexport")["TicketExport"];
  client.ticketExport = new exports.TicketExport(options);

  exports.Views = require("./client/views")["Views"];
  client.views = new exports.Views(options);

  exports.Requests = require("./client/requests")["Requests"];
  client.requests = new exports.Requests(options);

  exports.UserIdentities = require("./client/useridentities")["UserIdentities"];
  client.userIdentities = new exports.UserIdentities(options);

  exports.Groups = require("./client/groups")["Groups"];
  client.groups = new exports.Groups(options);

  exports.GroupMemberships = require("./client/groupmemberships")["GroupMemberships"];
  client.groupMemberships = new exports.GroupMemberships(options);

  exports.CustomAgentRoles = require("./client/customagentroles")["CustomAgentRoles"];
  client.customAgentRoles = new exports.CustomAgentRoles(options);

  exports.Organizations = require("./client/organizations")["Organizations"];
  client.organizations = new exports.Organizations(options);

  exports.Search = require("./client/search")["Search"];
  client.search = new exports.Search(options);

  exports.Tags = require("./client/tags")["Tags"];
  client.tags = new exports.Tags(options);

  exports.Forums = require("./client/forums")["Forums"];
  client.forums = new exports.Forums(options);

  exports.ForumSubscriptions = require("./client/forumsubscriptions")["ForumSubscriptions"];
  client.forumSubscriptions = new exports.ForumSubscriptions(options);

  exports.Categories = require("./client/categories")["Categories"];
  client.categories = new exports.Categories(options);

  exports.Topics = require("./client/topics")["Topics"];
  client.topics = new exports.Topics(options);

  exports.TopicComments = require("./client/topiccomments")["TopicComments"];
  client.topicComments = new exports.TopicComments(options);

  exports.TopicSubscriptions = require("./client/topicsubscriptions")["TopicSubscriptions"];
  client.topicSubscriptions = new exports.TopicSubscriptions(options);

  exports.TopicVotes = require("./client/topicvotes")["TopicVotes"];
  client.topicVotes = new exports.TopicVotes(options);

  exports.AccountSettings = require("./client/accountsettings")["AccountSettings"];
  client.accountSettings = new exports.AccountSettings(options);

  exports.ActivityStream = require("./client/activitystream")["ActivityStream"];
  client.activityStream = new exports.ActivityStream(options);

  exports.Attachments = require("./client/attachments")["Attachments"];
  client.attachments = new exports.Attachments(options);

  exports.JobStatuses = require("./client/jobstatuses")["JobStatuses"];
  client.jobStatuses = new exports.JobStatuses(options);

  exports.Locales = require("./client/locales")["Locales"];
  client.locales = new exports.Locales(options);

  exports.Macros = require("./client/macros")["Macros"];
  client.macros = new exports.Macros(options);

  exports.SatisfactionRatings = require("./client/satisfactionratings")["SatisfactionRatings"];
  client.satisfactionRatings = new exports.SatisfactionRatings(options);

  exports.SuspendedTickets = require("./client/suspendedtickets")["SuspendedTickets"];
  client.suspendedTickets = new exports.SuspendedTickets(options);

  exports.UserFields = require("./client/userfields")["UserFields"];
  client.userFields = new exports.UserFields(options);

  exports.OrganizationFields = require("./client/organizationfields")["OrganizationFields"];
  client.organizationFields = new exports.OrganizationFields(options);

  exports.OauthTokens = require("./client/oauthtokens")["OauthTokens"];
  client.oauthTokens = new exports.OauthTokens(options);

  exports.Triggers = require("./client/triggers")["Triggers"];
  client.triggers = new exports.Triggers(options);

  exports.SharingAgreement = require("./client/sharingagreement")["SharingAgreement"];
  client.sharingAgreement = new exports.SharingAgreement(options);

  exports.Brand = require("./client/brand")["Brand"];
  client.brand = new exports.Brand(options);

  exports.OrganizationMemberships = require("./client/organizationmemberships")["OrganizationMemberships"];
  client.organizationMemberships = new exports.OrganizationMemberships(options);

  exports.DynamicContent = require("./client/dynamiccontent")["DynamicContent"];
  client.dynamicContent = new exports.DynamicContent(options);

  exports.TicketEvents = require("./client/ticketevents")["TicketEvents"];
  client.ticketEvents = new exports.TicketEvents(options);

  exports.Imports = require("./client/imports")["Imports"];
  client.imports = new exports.Imports(options);

  exports.Targets = require("./client/targets")["Targets"];
  client.targets = new exports.Targets(options);

  exports.Sessions = require("./client/sessions")["Sessions"];
  client.sessions = new exports.Sessions(options);

  exports.Installations = require("./client/installations")["Installations"];
  client.installations = new exports.Installations(options);

  exports.Policies = require("./client/policies")["Policies"];
  client.policies = new exports.Policies(options);

  console.log(client);

  // exports.Tickets = require("./client/tickets")["Tickets"];
  // client.tickets = new exports.Tickets(options);

  // partsToAdd.forEach(function(k) {
  //   console.log(k, "./client/" + clientPath + k.toLowerCase());
  //   // exports[k] = require(clientPath + k.toLowerCase())[k];
  //   exports[k] = require("./client/" + clientPath + k.toLowerCase())[k];
  // });

  // partsToAdd.forEach(function(k) {
  //   client[k.toLowerCase()] = new exports[k](options);
  //   client[k.toLowerCase()].on("debug::request", debug);
  //   client[k.toLowerCase()].on("debug::response", debug);
  // });

  function debug(args) {
    if (options.get("debug")) {
      console.log(args);
    }
  }

  return client;
};
