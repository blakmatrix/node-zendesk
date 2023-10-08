// AgentActivity.js: Client for the Zendesk Voice API.
const {Client} = require('../client');
const {ApiTypes} = require('../../constants');

class AgentActivity extends Client {
  constructor(options) {
    super(options, ApiTypes.voice);
    this.jsonAPINames = ['agent activity'];
  }

  // Showing Agent Activity
  async show() {
    return this.get(['stats', 'agents_activity']);
  }
}

exports.AgentActivity = AgentActivity;
