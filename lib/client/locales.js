// Locales.js: Client for the zendesk API.

const util = require('node:util');
const {Client} = require('./client');

const Locales = (exports.Locales = function (options) {
  this.jsonAPINames = ['locales', 'locale'];
  Client.call(this, options);
});

// Inherit from Client base object
util.inherits(Locales, Client);

// ######################################################## Locales
// ====================================== Listing Locales
Locales.prototype.list = function (cb) {
  return this.requestAll('GET', ['locales'], cb); // All
};

// ====================================== Viewing Locales

Locales.prototype.show = function (localeID, cb) {
  return this.request('GET', ['locales', localeID], cb);
};

Locales.prototype.showCurrent = function (cb) {
  return this.request('GET', ['locales', 'current'], cb);
};

Locales.prototype.current = function (cb) {
  return this.request('GET', ['locales', 'current'], cb);
};
