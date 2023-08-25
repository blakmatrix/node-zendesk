// CurrentQueueActivity.js: Client for the Zendesk Voice API.
const {Client} = require('../client');

class CurrentQueueActivity extends Client {
  constructor(options) {
    super(options);
    this.jsonAPINames = ['current_queue_activity', 'current_queue_activities'];
  }

  // Get Current Queue Activity
  show(cb) {
    return this.get(['stats', 'current_queue_activity'], cb);
  }
}

exports.CurrentQueueActivity = CurrentQueueActivity;
