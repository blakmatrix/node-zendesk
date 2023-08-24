// AccountSettings.js: Client for the zendesk API.

const util = require('node:util');
const {Client} = require('./client');

const AccountSettings = (exports.AccountSettings = function (options) {
  this.jsonAPINames = ['settings'];
  Client.call(this, options);
});

// Inherit from Client base object
util.inherits(AccountSettings, Client);

// ######################################################## AccountSettings
// ====================================== Listing AccountSettings
AccountSettings.prototype.show = function (cb) {
  return this.request('GET', ['account', 'settings'], cb);
};
