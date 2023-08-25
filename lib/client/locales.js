// Locales.js: Client for the zendesk API.
const {Client} = require('./client');

class Locales extends Client {
  constructor(options) {
    super(options);
    this.jsonAPINames = ['locales', 'locale'];
  }

  // Listing Locales
  list(cb) {
    return this.getAll(['locales'], cb);
  }

  // Viewing Locales
  show(localeID, cb) {
    return this.get(['locales', localeID], cb);
  }

  showCurrent(cb) {
    return this.get(['locales', 'current'], cb);
  }

  current(cb) {
    return this.get(['locales', 'current'], cb);
  }
}

exports.Locales = Locales;
