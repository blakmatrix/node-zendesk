//Greetings.js: Client for the zendesk API.


var util = require('util'),
  Client = require('../client').Client;
//defaultgroups = require('../helpers').defaultgroups;


var Greetings = exports.Greetings = function(options) {
  this.jsonAPINames = [ 'greetings', 'greetings' ];
  Client.call(this, options);
};

// Inherit from Client base object
util.inherits(Greetings, Client);


// ====================================== List Greetings
Greetings.prototype.list = function() {
  return this.request('GET', ['greetings']);
};

// ====================================== List Greetings by ID
Greetings.prototype.show = function(greetingID) {
  return this.request('GET', ['greetings', greetingID]);
};

// ====================================== Create Greeting
Greetings.prototype.create = function(greeting) {
  return this.request('POST', ['greetings'], greeting);
};

// ====================================== Update Greeting
Greetings.prototype.update = function(greeting, greetingID) {
  return this.request('PUT', ['greetings', greetingID], greeting);
};

// ====================================== Delete Greeting
Greetings.prototype.delete = function(greetingID) {
  return this.request('DELETE', ['greetings', greetingID]);
};
