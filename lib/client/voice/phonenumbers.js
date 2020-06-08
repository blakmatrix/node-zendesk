//PhoneNumbers.js: Client for the Zendesk Voice API.


var util = require('util'),
    Client = require('../client').Client;

var PhoneNumbers = exports.PhoneNumbers = function(options) {
    this.jsonAPINames = [ 'phone numbers', 'phone number' ];
    Client.call(this, options);
};

// Inherit from Client base object
util.inherits(PhoneNumbers, Client);

// ######################################################## PhoneNumbers
// ====================================== Searching Available PhoneNumbers
PhoneNumbers.prototype.search = function(searchTerm, cb) {
    return this.request('GET', ['phone_numbers', 'search', {query: searchTerm}], cb);
};

// ====================================== List PhoneNumbers
PhoneNumbers.prototype.list = function(cb) {
    return this.request('GET', ['phone_numbers'], cb);
};

// ====================================== Create PhoneNumbers
PhoneNumbers.prototype.create = function(cb) {
    return this.request('POST', ['phone_numbers'], phone_number, cb);
};

// ====================================== Update PhoneNumbers
PhoneNumbers.prototype.update = function(phoneID, phone_number, cb) {
    return this.request('PUT', ['phone_numbers', phoneID], phone_number, cb);
};

// ====================================== Get PhoneNumbers by ID
PhoneNumbers.prototype.show = function(phoneID, cb) {
    return this.request('GET', ['phone_numbers', phoneID], cb);
};

// ====================================== Delete PhoneNumbers
PhoneNumbers.prototype.delete = function(phoneID, cb) {
    return this.request('DELETE', ['phone_numbers', phoneID], cb);
};
