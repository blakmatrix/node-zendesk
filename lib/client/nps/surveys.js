//Surveys.js: Client for the Zendesk NPS API.

var util = require('util'),
  Client = require('../client').Client;
//defaultgroups = require('../helpers').defaultgroups;

var Surveys = (exports.Surveys = function(options) {
  this.jsonAPINames = ['agent activity'];
  Client.call(this, options);
});

// Inherit from Client base object
util.inherits(Surveys, Client);

// ######################################################## Surveys
// ====================================== Showing Agent Activity
Surveys.prototype.list = function(cb) {
  this.request('GET', ['nps', 'surveys'], cb);
};

// ====================================== Showing Agent Activity by ID
Surveys.prototype.show = function(surveyId, cb) {
  this.request('GET', ['nps', 'surveys', surveyId], cb);
};
