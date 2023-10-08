// CurrentQueueActivity.js: Client for the Zendesk Voice API.
const {Client} = require('../client');
const {ApiTypes} = require('../../constants');

class CurrentQueueActivity extends Client {
  constructor(options) {
    super(options, ApiTypes.voice);
    this.jsonAPINames = ['current_queue_activity', 'current_queue_activities'];
  }

  // Get Current Queue Activity
  async show() {
    return this.get(['stats', 'current_queue_activity']);
  }
}

exports.CurrentQueueActivity = CurrentQueueActivity;
