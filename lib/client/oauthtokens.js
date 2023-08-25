// Oauthtokens.js: Client for the zendesk API.
const {Client} = require('./client');

class OauthTokens extends Client {
  constructor(options) {
    super(options);
    this.jsonAPINames = ['oauthtokens', 'oauthtoken'];
  }

  show(id, cb) {
    return this.get('GET', ['oauth', 'tokens', id], cb);
  }

  current(cb) {
    return this.show('current', cb);
  }

  list(cb) {
    return this.getAll(['oauth', 'tokens', '?page[size]=100'], cb);
  }

  revoke(id, cb) {
    return this.delete(['oauth', 'tokens', id], cb);
  }

  create(token, cb) {
    return this.post(['oauth', 'tokens'], token, cb);
  }
}

exports.OauthTokens = OauthTokens;
