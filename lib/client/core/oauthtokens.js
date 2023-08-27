// Oauthtokens.js: Client for the zendesk API.
const {Client} = require('../client');

class OauthTokens extends Client {
  constructor(options) {
    super(options);
    this.jsonAPINames = ['oauthtokens', 'oauthtoken'];
  }

  async show(id) {
    return this.get('GET', ['oauth', 'tokens', id]);
  }

  async current() {
    return this.show('current');
  }

  async list() {
    return this.getAll(['oauth', 'tokens', '?page[size]=100']);
  }

  async revoke(id) {
    return this.delete(['oauth', 'tokens', id]);
  }

  async create(token) {
    return this.post(['oauth', 'tokens'], token);
  }
}

exports.OauthTokens = OauthTokens;
