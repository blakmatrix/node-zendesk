//PhoneNumbers.js: Client for the Zendesk Voice API.


var util = require('util'),
  Client = require('../client').Client;
//defaultgroups = require('../helpers').defaultgroups;


var PhoneNumbers = exports.PhoneNumbers = function(options) {
  this.jsonAPINames = [ 'phone numbers', 'phone number' ];
  Client.call(this, options);
};

// Inherit from Client base object
util.inherits(PhoneNumbers, Client);

// ######################################################## PhoneNumbers
// ====================================== Searching Available PhoneNumbers
PhoneNumbers.prototype.search = function(searchTerm) {
  return this.request('GET', ['phone_numbers', 'search', {query: searchTerm}]);
};

// ====================================== List PhoneNumbers
PhoneNumbers.prototype.list = function() {
  return this.request('GET', ['phone_numbers']);
};

// ====================================== Create PhoneNumbers
PhoneNumbers.prototype.create = function() {
  return this.request('POST', ['phone_numbers'], phone_number);
};

// ====================================== Update PhoneNumbers
PhoneNumbers.prototype.update = function(phoneID, phone_number) {
  return this.request('PUT', ['phone_numbers', phoneID], phone_number);
};

// ====================================== Get PhoneNumbers by ID
PhoneNumbers.prototype.show = function(phoneID) {
  return this.request('GET', ['phone_numbers', phoneID]);
};

// ====================================== Delete PhoneNumbers
PhoneNumbers.prototype.delete = function(phoneID) {
  return this.request('DELETE', ['phone_numbers', phoneID]);
};
