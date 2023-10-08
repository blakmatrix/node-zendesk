// Surveys.js: Client for the Zendesk NPS API.
const {Client} = require('../client');
const {ApiTypes} = require('../../constants');

class Surveys extends Client {
  constructor(options) {
    super(options, ApiTypes.nps);
    this.jsonAPINames = ['agent activity'];
  }

  // Showing Agent Activity
  async list() {
    return this.get(['nps', 'surveys']);
  }

  // Showing Agent Activity by ID
  async show(surveyId) {
    return this.get(['nps', 'surveys', surveyId]);
  }
}

exports.Surveys = Surveys;
