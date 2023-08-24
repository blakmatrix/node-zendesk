// Surveys.js: Client for the Zendesk NPS API.

const util = require('node:util');
const {Client} = require('../client');
// Defaultgroups = require('../helpers').defaultgroups;

const Surveys = (exports.Surveys = function (options) {
  this.jsonAPINames = ['agent activity'];
  Client.call(this, options);
});

// Inherit from Client base object
util.inherits(Surveys, Client);

// ######################################################## Surveys
// ====================================== Showing Agent Activity
Surveys.prototype.list = function (cb) {
  this.request('GET', ['nps', 'surveys'], cb);
};

// ====================================== Showing Agent Activity by ID
Surveys.prototype.show = function (surveyId, cb) {
  this.request('GET', ['nps', 'surveys', surveyId], cb);
};
