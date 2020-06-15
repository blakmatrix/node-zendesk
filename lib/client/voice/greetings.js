//Greetings.js: Client for the zendesk API.


var util = require('util'),
    Client = require('../client').Client;

var Greetings = exports.Greetings = function(options) {
    this.jsonAPINames = [ 'greetings', 'greetings' ];
    Client.call(this, options);
};

// Inherit from Client base object
util.inherits(Greetings, Client);


// ====================================== List Greetings
Greetings.prototype.list = function(cb) {
    return this.request('GET', ['greetings'], cb);
};

// ====================================== List Greetings by ID
Greetings.prototype.show = function(greetingID, cb) {
    return this.request('GET', ['greetings', greetingID], cb);
};

// ====================================== Create Greeting
Greetings.prototype.create = function(greeting, cb) {
    return this.request('POST', ['greetings'], greeting, cb);
};

// ====================================== Update Greeting
Greetings.prototype.update = function(greeting, greetingID, cb) {
    return this.request('PUT', ['greetings', greetingID], greeting, cb);
};

// ====================================== Delete Greeting
Greetings.prototype.delete = function(greetingID, cb) {
    return this.request('DELETE', ['greetings', greetingID], cb);
};
