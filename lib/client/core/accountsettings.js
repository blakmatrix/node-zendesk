// AccountSettings.js: Client for the zendesk API.

const {Client} = require('../client');

class AccountSettings extends Client {
  constructor(options) {
    super(options);
    this.jsonAPINames = ['settings'];
  }

  // Listing AccountSettings
  async show() {
    return this.get(['account', 'settings']);
  }
}

exports.AccountSettings = AccountSettings;
