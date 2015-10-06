//CurrentQueueActivity.js: Client for the Zendesk Voice API.


var util = require('util'),
	Client = require('../client').Client
	//defaultgroups = require('./helpers').defaultgroups;


var CurrentQueueActivity = exports.CurrentQueueActivity = function(options) {
	this.jsonAPINames = [ 'current_queue_activity', 'current_queue_activities' ];
	Client.call(this, options);
};

// Inherit from Client base object
util.inherits(CurrentQueueActivity, Client);

// ######################################################## Current Queue Activity
// ====================================== Get Current Queue Activity
CurrentQueueActivity.prototype.show = function(cb) {
	this.request('GET', ['stats', 'current_queue_activity'], cb);
};
