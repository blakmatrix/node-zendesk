//HistoricalQueueActivity.js: Client for the zendesk API.


var util = require('util'),
    Client = require('../client').Client;
    //defaultgroups = require('../helpers').defaultgroups;


var HistoricalQueueActivity = exports.HistoricalQueueActivity = function(options) {
    this.jsonAPINames = [ 'historical_queue_activity', 'historical_queue_activities' ];
    Client.call(this, options);
};

// Inherit from Client base object
util.inherits(HistoricalQueueActivity, Client);

// ######################################################## HistoricalQueueActivity
// ====================================== Showing HistoricalQueueActivity
HistoricalQueueActivity.prototype.show = function(cb) {
    this.request('GET', ['stats', 'historical_queue_activity'], cb);
};
