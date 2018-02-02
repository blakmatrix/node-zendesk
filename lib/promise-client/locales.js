//Locales.js: Client for the zendesk API.


var util        = require('util'),
    Client      = require('./client').Client,
    defaultgroups = require('./helpers').defaultgroups;


var Locales = exports.Locales = function (options) {
  this.jsonAPINames = [ 'locales', 'locale' ];
  Client.call(this, options);
};

// Inherit from Client base object
util.inherits(Locales, Client);

// ######################################################## Locales
// ====================================== Listing Locales
Locales.prototype.list = function () {
  return this.requestAll('GET', ['locales']);//all
};


// ====================================== Viewing Locales

Locales.prototype.show = function (localeID) {
  return this.request('GET', ['locales', localeID]);
};

Locales.prototype.showCurrent = function () {
  return this.request('GET', ['locales', 'current']);
};
Locales.prototype.current = function () {
  return this.request('GET', ['locales', 'current']);
};
