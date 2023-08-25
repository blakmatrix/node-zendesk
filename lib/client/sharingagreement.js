// SharingAgreement.js: Client for the zendesk API.

const {Client} = require('./client');

class SharingAgreement extends Client {
  constructor(options) {
    super(options);
    this.jsonAPINames = ['sharing-agreement'];
  }

  // Listing SharingAgreement
  show(cb) {
    return this.get(['sharing_agreements'], cb);
  }
}

exports.SharingAgreement = SharingAgreement;
