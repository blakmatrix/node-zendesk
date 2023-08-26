// SharingAgreement.js: Client for the zendesk API.

const {Client} = require('./client');

class SharingAgreement extends Client {
  constructor(options) {
    super(options);
    this.jsonAPINames = ['sharing-agreement'];
  }

  // Listing SharingAgreement
  async show() {
    return this.get(['sharing_agreements']);
  }
}

exports.SharingAgreement = SharingAgreement;
