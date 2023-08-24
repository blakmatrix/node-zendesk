// Links.js: Client for the zendesk services API.

const util = require('node:util');
const {Client} = require('../client');

const Links = (exports.Links = function (options) {
  this.jsonAPINames = ['links'];
  this.sideLoadMap = [{field: 'ticket_id', name: 'ticket', dataset: 'tickets'}];
  Client.call(this, options);
});

// Inherit from Client base object
util.inherits(Links, Client);

// ######################################################## Links
// ====================================== Listing Linnks
Links.prototype.list = function (cb) {
  this.requestAll('GET', ['links'], cb); // All
};

// ====================================== Viewing Links
Links.prototype.show = function (ticket_ids, cb) {
  this.request('GET', ['links', '?ticket_id=' + ticket_ids.toString()], cb);
};
