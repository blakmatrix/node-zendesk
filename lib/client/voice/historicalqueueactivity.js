// HistoricalQueueActivity.js: Client for the zendesk API.

const util = require('node:util');
const {Client} = require('../client');

const HistoricalQueueActivity = (exports.HistoricalQueueActivity = function (
  options,
) {
  this.jsonAPINames = [
    'historical_queue_activity',
    'historical_queue_activities',
  ];
  Client.call(this, options);
});

// Inherit from Client base object
util.inherits(HistoricalQueueActivity, Client);

// ######################################################## HistoricalQueueActivity
// ====================================== Showing HistoricalQueueActivity
HistoricalQueueActivity.prototype.show = function (cb) {
  return this.request('GET', ['stats', 'historical_queue_activity'], cb);
};
