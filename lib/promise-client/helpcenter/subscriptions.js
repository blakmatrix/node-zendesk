//Subscriptions.js: Client for the zendesk API.

var util = require('util'),
  Client = require('../client').Client
//defaultgroups = require('./helpers').defaultgroups;


var Subscriptions = exports.Subscriptions = function (options) {
  this.jsonAPINames = [ 'subscriptions', 'subscription' ];
  Client.call(this, options);
};

// Inherit from Client base object
util.inherits(Subscriptions, Client);

// ######################################################## Subscriptions

// ====================================== Listing subscriptions by user
Subscriptions.prototype.listByUser = function (userID) {
  return this.requestAll('GET', ['users', userID, 'subscriptions']);//all
};

// ====================================== Listing subscriptions by article
Subscriptions.prototype.listByArticle = function (articleID) {
  return this.requestAll('GET', ['articles', articleID, 'subscriptions']);//all
};

// ====================================== Listing subscriptions by section
Subscriptions.prototype.listBySection = function (sectionID) {
  return this.requestAll('GET', ['sections', sectionID, 'subscriptions']);//all
};

// ====================================== Showing subscriptions by article
Subscriptions.prototype.showbyArticle = function (articleID, subscriptionID) {
  return this.request('GET', ['articles', articleID, 'subscriptions', subscriptionID]);//all
};

// ====================================== Showing subscriptions by section
Subscriptions.prototype.showbySection = function (sectionID, subscriptionID) {
  return this.request('GET', ['sections', sectionID, 'subscriptions', subscriptionID]);//all
};

// ====================================== Creating subscriptions by article
Subscriptions.prototype.createbyArticle = function (articleID, subscription) {
  return this.request('POST', ['articles', articleID, 'subscriptions'], subscription);//all
};

// ====================================== Creating subscriptions by section
Subscriptions.prototype.createbySection = function (sectionID, subscription) {
  return this.request('POST', ['sections', sectionID, 'subscriptions'], subscription);//all
};

// ====================================== Deleting subscriptions by article
Subscriptions.prototype.deletebyArticle = function (articleID, subscriptionID) {
  return this.request('DELETE', ['articles', articleID, 'subscriptions', subscriptionID]);//all
};

// ====================================== Deleting subscriptions by section
Subscriptions.prototype.deletebySection = function (sectionID, subscriptionID) {
  return this.request('DELETE', ['articles', sectionID, 'subscriptions', subscriptionID]);//all
};
