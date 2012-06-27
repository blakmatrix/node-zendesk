var parts = ['Users', 'Tickets', 'TicketAudits', 'TicketFields', 'Views',
             'UserIdentities', 'Groups', 'GroupMemberships',
             'CustomAgentRoles', 'Organizations', 'Search', 'Tags', 'Forums',
             'ForumSubscriptions', 'Categories', 'Topics', 'TopicComments',
             'TopicSubscriptions', 'TopicVotes', 'AccountSettings',
             'ActivityStream', 'Attachments', 'JobStatuses', 'Locales',
             'Macros', 'SatisfactionRatings', 'SuspendedTickets'];

parts.forEach(function (k) {
  exports[k] = require('./client/' + k.toLowerCase())[k];
});

exports.createClient = function (options) {
  var client = {};
  parts.forEach(function (k) {
    client[k.toLowerCase()] = new exports[k](options);
    client[k.toLowerCase()].on('debug::request',  debug);
    client[k.toLowerCase()].on('debug::response', debug);
  });
  function debug(arguments) {
    if (options.debug) {
      console.log(arguments);
    }
  }
  return client;
};