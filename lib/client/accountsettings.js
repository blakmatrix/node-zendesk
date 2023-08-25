// AccountSettings.js: Client for the zendesk API.

const {Client} = require('./client');

class AccountSettings extends Client {
  constructor(options) {
    super(options);
    this.jsonAPINames = ['settings'];
  }

  // Listing AccountSettings
  show(cb) {
    return this.get(['account', 'settings'], cb);
  }
}

exports.AccountSettings = AccountSettings;
