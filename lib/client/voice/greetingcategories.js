//GreetingCategories.js: Client for the zendesk API.


var util = require('util'),
    Client = require('../client').Client;

var GreetingCategories = exports.GreetingCategories = function(options) {
    this.jsonAPINames = [ 'greeting_categories', 'greeting_category' ];
    Client.call(this, options);
};

// Inherit from Client base object
util.inherits(GreetingCategories, Client);

// ######################################################## Greetings
// ====================================== List Greetings Categories
GreetingCategories.prototype.list = function(cb) {
    return this.request('GET', ['greeting_categories'], cb);
};

// ====================================== Get Greetings Category by ID
GreetingCategories.prototype.show = function(greetingCategoryID, cb) {
    return this.request('GET', ['greeting_category', greetingCategoryID], cb);
};

