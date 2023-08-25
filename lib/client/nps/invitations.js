// Invitations.js: Client for the Zendesk NPS API.
const {Client} = require('../client');

class Invitations extends Client {
  constructor(options) {
    super(options);
    this.jsonAPINames = ['agent activity'];
  }

  // Showing Invitations
  list({surveyId}, cb) {
    this.get(['nps', 'surveys', surveyId, 'invitations'], cb);
  }

  // Showing Invitation by ID
  show({surveyId, invitationId}, cb) {
    this.get(['nps', 'surveys', surveyId, 'invitations', invitationId], cb);
  }

  /**
   * Create invitation https://developer.zendesk.com/rest_api/docs/nps-api/nps_invitations
   *
   * @param {object} params
   * @param {string} params.surveyId
   * @param {{
   *    invitation: {
   *      recipients: {
   *        name: string,
   *        email: string,
   *        language: string
   *      }[]
   *    }
   *  }} params.data
   * @param {Function} cb
   */
  create({surveyId, data}, cb) {
    this.post(['nps', 'surveys', surveyId, 'invitations'], data, cb);
  }
}

exports.Invitations = Invitations;
