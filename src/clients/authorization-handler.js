/**
 * Handles the creation of authorization headers based on the provided configuration.
 * Supports both OAuth and Basic Authentication methods.
 */
class AuthorizationHandler {
  /**
   * Creates a new instance of the AuthorizationHandler.
   * @param {Map} options - A Map object containing the necessary configuration options.
   */
  constructor(options) {
    this.options = options;
  }

  /**
   * Determines the authentication method and creates the appropriate authorization header.
   * @returns {string} The resulting authorization header string.
   */
  createAuthorizationHeader() {
    if (this.isOAuth()) {
      return this.createOAuthHeader();
    }

    return this.createBasicAuthHeader();
  }

  /**
   * Checks if OAuth should be used for authentication.
   * @returns {boolean} True if OAuth is the chosen method; false otherwise.
   */
  isOAuth() {
    return this.options.get('useOAuth');
  }

  /**
   * Creates the OAuth authorization header.
   * @returns {string} The OAuth authorization header.
   * @throws {Error} When the token is missing in the options.
   */
  createOAuthHeader() {
    const token = this.options.get('token');

    if (!token) {
      throw new Error('OAuth is enabled, but token is missing.');
    }

    return `Bearer ${token}`;
  }

  /**
   * Creates the Basic Authentication authorization header.
   * @returns {string} The Basic Authentication header.
   * @throws {Error} When username or password/token is missing in the options.
   */
  createBasicAuthHeader() {
    const username = this.options.get('username');
    const passwordOrToken = this.getPasswordOrToken();

    if (!username || !passwordOrToken) {
      throw new Error('Missing credentials for Basic Authentication.');
    }

    const encoded = this.encodeCredentials(`${username}${passwordOrToken}`);
    return `Basic ${encoded}`;
  }

  /**
   * Retrieves the password or token for Basic Authentication.
   * The method first checks for a password and if none is found, it fetches the token.
   * @returns {string} The password or token prefixed with the appropriate separator.
   */
  getPasswordOrToken() {
    const password = this.options.get('password');
    if (password) {
      return `:${password}`;
    }

    return `/token:${this.options.get('token')}`;
  }

  /**
   * Encodes the provided credentials using base64 encoding.
   * @param {string} credentials - The credentials to be encoded.
   * @returns {string} The base64 encoded string of the provided credentials.
   */
  encodeCredentials(credentials) {
    return require('node:buffer').Buffer.from(credentials).toString('base64');
  }
}

exports.AuthorizationHandler = AuthorizationHandler;
