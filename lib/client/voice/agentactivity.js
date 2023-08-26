// AgentActivity.js: Client for the Zendesk Voice API.
const {Client} = require('../client');

class AgentActivity extends Client {
  constructor(options) {
    super(options);
    this.jsonAPINames = ['agent activity'];
  }

  // Showing Agent Activity
  async show() {
    return this.get(['stats', 'agents_activity']);
  }
}

exports.AgentActivity = AgentActivity;
