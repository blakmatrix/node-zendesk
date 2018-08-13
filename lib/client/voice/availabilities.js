//Availabilities.js: Client for the Zendesk Voice API.


var util = require('util'),
    Client = require('../client').Client;

var Availabilities = exports.Availabilities = function(options) {
    this.jsonAPINames = [ 'availabilities', 'availability' ];
    Client.call(this, options);
};

// Inherit from Client base object
util.inherits(Availabilities, Client);

// ######################################################## Availabilitiess
// ====================================== Update Availabilities
Availabilities.prototype.update = function(agentID, availability, cb) {
    return this.request('PUT', ['availabilities', agentID], availability, cb);
};

// ====================================== Get Availabilities by ID
Availabilities.prototype.show = function(agentID, cb) {
    return this.request('GET', ['availabilities', agentID], cb);
};
