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
Installations.prototype.list = function () {
  return this.requestAll('GET', ['apps', 'installations']);//all
};

// ====================================== Viewing Installations
Installations.prototype.show = function (installationID) {
  return this.request('GET', ['apps', 'installations', installationID]);
};

// ====================================== Creating Installations
Installations.prototype.create = function (installation) {
  return this.request('POST', ['apps', 'installations'], installation);
};

// ====================================== Updating Installations
Installations.prototype.update = function (installationID, installation) {
  return this.request('PUT', ['apps', 'installations', installationID], installation);
};

// ====================================== Deleting Installations
Installations.prototype.delete = function (installationID) {
  return this.request('DELETE', ['apps', 'installations', installationID]);
};
