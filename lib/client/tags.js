// Tags.js: Client for the zendesk API.

const util = require('node:util');
const {Client} = require('./client');

const Tags = (exports.Tags = function (options) {
  this.jsonAPINames = ['tags'];
  Client.call(this, options);
});

// Inherit from Client base object
util.inherits(Tags, Client);

// ######################################################## Tags
// ====================================== Listing Tags
Tags.prototype.list = function (cb) {
  return this.requestAll('GET', ['tags', '?page[size]=100'], cb); // All
};
