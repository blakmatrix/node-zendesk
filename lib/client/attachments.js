//Attachments.js: Client for the zendesk API.


var util        = require('util'),
    Client      = require('./client').Client,
    defaultgroups = require('./helpers').defaultgroups;


var Attachments = exports.Attachments = function (options) {
  Client.call(this, options);
};

// Inherit from Client base object
util.inherits(Attachments, Client);



// ====================================== Creating Attachments
Attachments.prototype.upload = function (file, file_token, cb) { //TODO
  this.request('POST', ['uploads'], file, file_token, cb);
};

