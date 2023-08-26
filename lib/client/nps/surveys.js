// Surveys.js: Client for the Zendesk NPS API.
const {Client} = require('../client');

class Surveys extends Client {
  constructor(options) {
    super(options);
    this.jsonAPINames = ['agent activity'];
  }

  // Showing Agent Activity
  async list() {
    this.get(['nps', 'surveys']);
  }

  // Showing Agent Activity by ID
  async show(surveyId) {
    this.get(['nps', 'surveys', surveyId]);
  }
}

exports.Surveys = Surveys;
