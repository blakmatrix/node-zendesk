//GreetingCategories.js: Client for the zendesk API.


var util = require('util'),
    Client = require('../client').Client;
    //defaultgroups = require('../helpers').defaultgroups;


var GreetingCategories = exports.GreetingCategories = function(options) {
    this.jsonAPIName = 'greeting_categories';
    this.jsonAPIName2 = 'greeting_category';
    Client.call(this, options);
};

// Inherit from Client base object
util.inherits(GreetingCategories, Client);

// ######################################################## Greetings
// ====================================== List Greetings Categories
GreetingCategories.prototype.list = function(cb) {
    this.request('GET', ['greeting_categories'], cb);
};

// ====================================== Get Greetings Category by ID
GreetingCategories.prototype.show = function(greetingCategoryID, cb) {
    this.request('GET', ['greeting_category', greetingCategoryID], cb);
};

