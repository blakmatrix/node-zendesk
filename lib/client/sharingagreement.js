//sharingAgreement.js: Client for the zendesk API.


var util        = require('util'),
    Client      = require('./client').Client,
    defaultgroups = require('./helpers').defaultgroups;


var SharingAgreement = exports.SharingAgreement = function (options) {
  this.jsonAPINames = [ 'sharing-agreement' ];
  Client.call(this, options);
};

// Inherit from Client base object
util.inherits(SharingAgreement, Client);

// ######################################################## SharingAgreement
// ====================================== Listing SharingAgreement
SharingAgreement.prototype.show = function (cb) {
  this.request('GET', ['sharing_agreements'], cb);
};


