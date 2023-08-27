// CustomAgentRoles.js: Client for the zendesk API.
const {Client} = require('../client');

class CustomAgentRoles extends Client {
  constructor(options) {
    super(options);
    this.jsonAPINames = ['custom_roles'];
  }

  // Listing CustomAgentRoles
  list = function (cb) {
    return this.getAll(['custom_roles'], cb);
  };
}

exports.CustomAgentRoles = CustomAgentRoles;
