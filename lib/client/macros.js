// Macros.js: Client for the zendesk API.

const util = require('node:util');
const {Client} = require('./client');

const Macros = (exports.Macros = function (options) {
  this.jsonAPINames = ['macros'];
  Client.call(this, options);
});

// Inherit from Client base object
util.inherits(Macros, Client);

// ######################################################## Macros
// ====================================== Listing Macros
Macros.prototype.list = function (cb) {
  return this.requestAll('GET', ['macros', 'active', '?page[size]=100'], cb); // All
};

Macros.prototype.listByParams = function (parameters, cb) {
  return this.requestAll('GET', ['macros', parameters + '&page[size]=100'], cb);
};

Macros.prototype.apply = function (macroID, cb) {
  return this.request('GET', ['macros', macroID, 'apply'], cb); // All
};

Macros.prototype.applyTicket = function (ticketID, macroID, cb) {
  return this.request(
    'GET',
    ['tickets', ticketID, 'macros', macroID, 'apply'],
    cb,
  ); // All
};

Macros.prototype.create = function (macro, cb) {
  return this.request('POST', ['macros'], macro, cb);
};

Macros.prototype.categories = function (cb) {
  return this.requestAll('GET', ['macros', 'categories'], cb);
};

// ====================================== Updating Tickets Fields
Macros.prototype.update = function (macroID, macro, cb) {
  return this.request('PUT', ['macros', macroID], macro, cb);
};

// ====================================== Deleting Macros
Macros.prototype.delete = function (macroID, cb) {
  return this.request('DELETE', ['macros', macroID], cb);
};

Macros.prototype.createMany = function (users, cb) {
  return this.request('POST', ['users', 'create_many'], users, cb);
};
