class AuthorizationHandler {
  constructor(options) {
    this.options = options;
  }

  createAuthorizationHeader() {
    if (this.isOAuth()) {
      return this.createOAuthHeader();
    }

    return this.createBasicAuthHeader();
  }

  isOAuth() {
    return this.options.get('useOAuth');
  }

  createOAuthHeader() {
    const token = this.options.get('token');

    if (!token) {
      throw new Error('OAuth is enabled, but token is missing.');
    }

    return `Bearer ${token}`;
  }

  createBasicAuthHeader() {
    const username = this.options.get('username');
    const passwordOrToken = this.getPasswordOrToken();

    if (!username || !passwordOrToken) {
      throw new Error('Missing credentials for Basic Authentication.');
    }

    const encoded = this.encodeCredentials(`${username}${passwordOrToken}`);
    return `Basic ${encoded}`;
  }

  getPasswordOrToken() {
    const password = this.options.get('password');
    if (password) {
      return `:${password}`;
    }

    return `/token:${this.options.get('token')}`;
  }

  encodeCredentials(credentials) {
    return require('node:buffer').Buffer.from(credentials).toString('base64');
  }
}

exports.AuthorizationHandler = AuthorizationHandler;
