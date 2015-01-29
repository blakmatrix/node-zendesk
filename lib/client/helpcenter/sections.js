//Sections.js: Client for the zendesk API.


var util        = require('util'),
    Client      = require('../client').Client
    //defaultgroups = require('./helpers').defaultgroups;


var Sections = exports.Sections = function (options) {
  this.jsonAPIName = 'sections';
  this.jsonAPIName2 = 'section';
  Client.call(this, options);
};

// Inherit from Client base object
util.inherits(Sections, Client);

// ######################################################## Sections
// ====================================== Listing Sections
Sections.prototype.list = function (cb) {
  this.requestAll('GET', ['sections'], cb);//all
};

// ====================================== Listing Sections In A Category

Sections.prototype.listByCategory = function (categoryID, cb) {
  this.requestAll('GET', ['categories', categoryID, 'sections'], cb);//all
};

// ====================================== Viewing Sections

Sections.prototype.show = function (sectionID, cb) {
  this.request('GET', ['sections', sectionID], cb);
};

// ====================================== Creating Sections
Sections.prototype.create = function (categoryId, section, cb) {
  this.request('POST', ['categories', categoryId, 'sections'], section, cb);
};

// ====================================== Updating Sections

Sections.prototype.update = function (sectionID, section, cb) {
  this.request('PUT', ['sections', sectionID], section, cb);
};

// ====================================== Deleting Sections
Sections.prototype.delete = function (sectionID, cb) {
  this.request('DELETE', ['sections', sectionID],  cb);
};