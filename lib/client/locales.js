// Locales.js: Client for the zendesk API.
const {Client} = require('./client');

class Locales extends Client {
  constructor(options) {
    super(options);
    this.jsonAPINames = ['locales', 'locale'];
  }

  // Listing Locales
  async list() {
    return this.getAll(['locales']);
  }

  // Viewing Locales
  async show(localeID) {
    return this.get(['locales', localeID]);
  }

  async showCurrent() {
    return this.get(['locales', 'current']);
  }

  async current() {
    return this.get(['locales', 'current']);
  }
}

exports.Locales = Locales;
