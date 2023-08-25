// Surveys.js: Client for the Zendesk NPS API.
const {Client} = require('../client');

class Surveys extends Client {
  constructor(options) {
    super(options);
    this.jsonAPINames = ['agent activity'];
  }

  // Showing Agent Activity
  list(cb) {
    this.get(['nps', 'surveys'], cb);
  }

  // Showing Agent Activity by ID
  show(surveyId, cb) {
    this.get(['nps', 'surveys', surveyId], cb);
  }
}

exports.Surveys = Surveys;
