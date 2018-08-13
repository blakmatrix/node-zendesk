//AgentActivity.js: Client for the Zendesk Voice API.


var util = require('util'),
    Client = require('../client').Client;

var AgentActivity = exports.AgentActivity = function(options) {
    this.jsonAPINames = [ 'agent activity' ];
    Client.call(this, options);
};

// Inherit from Client base object
util.inherits(AgentActivity, Client);

// ######################################################## AgentActivity
// ====================================== Showing Agent Activity
AgentActivity.prototype.show = function(cb) {
    return this.request('GET', ['stats', 'agents_activity'], cb);
};
