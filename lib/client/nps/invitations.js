//Invitations.js: Client for the Zendesk NPS API.

const util = require('util'),
  Client = require('../client').Client;
//defaultgroups = require('../helpers').defaultgroups;

const Invitations = (exports.Invitations = function(options) {
  this.jsonAPINames = ['agent activity'];
  Client.call(this, options);
});

// Inherit from Client base object
util.inherits(Invitations, Client);

// ######################################################## Invitations
// ====================================== Showing Invitations
Invitations.prototype.list = function({ surveyId }, cb) {
  this.request('GET', ['nps', 'surveys', surveyId, 'invitations'], cb);
};

// ====================================== Showing Invitation by ID
Invitations.prototype.show = function({ surveyId, invitationId }, cb) {
  this.request(
    'GET',
    ['nps', 'surveys', surveyId, 'invitations', invitationId],
    cb
  );
};

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
Invitations.prototype.create = function({ surveyId, data }, cb) {
  this.request('POST', ['nps', 'surveys', surveyId, 'invitations'], data, cb);
};
