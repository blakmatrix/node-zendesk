//installations.js: Client for the zendesk API.

var util        = require('util'),
  Client      = require('./client').Client;


var Installations = exports.Installations = function (options) {
  this.jsonAPINames = [ 'installations', 'installation' ];
  Client.call(this, options);
};

// Inherit from Client base object
util.inherits(Installations, Client);

// ######################################################## Installations
// ====================================== Listing Installations
Installations.prototype.list = function (cb) {
  return this.requestAll('GET', ['apps', 'installations'], cb);//all
};

// ====================================== Viewing Installations
Installations.prototype.show = function (installationID, cb) {
  return this.request('GET', ['apps', 'installations', installationID], cb);
};

// ====================================== Creating Installations
Installations.prototype.create = function (installation, cb) {
  return this.request('POST', ['apps', 'installations'], installation,  cb);
};

// ====================================== Updating Installations
Installations.prototype.update = function (installationID, installation, cb) {
  return this.request('PUT', ['apps', 'installations', installationID], installation,  cb);
};

// ====================================== Deleting Installations
Installations.prototype.delete = function (installationID, cb) {
  return this.request('DELETE', ['apps', 'installations', installationID],  cb);
};