// CurrentQueueActivity.js: Client for the Zendesk Voice API.

const util = require('node:util');
const {Client} = require('../client');

const CurrentQueueActivity = (exports.CurrentQueueActivity = function (
  options,
) {
  this.jsonAPINames = ['current_queue_activity', 'current_queue_activities'];
  Client.call(this, options);
});

// Inherit from Client base object
util.inherits(CurrentQueueActivity, Client);

// ######################################################## Current Queue Activity
// ====================================== Get Current Queue Activity
CurrentQueueActivity.prototype.show = function (cb) {
  return this.request('GET', ['stats', 'current_queue_activity'], cb);
};
