//Subscriptions.js: Client for the zendesk API.


var util        = require('util'),
    Client      = require('../client').Client;

var Subscriptions = exports.Subscriptions = function (options) {
  this.jsonAPINames = [ 'subscriptions', 'subscription' ];
  Client.call(this, options);
};

// Inherit from Client base object
util.inherits(Subscriptions, Client);

// ######################################################## Subscriptions

// ====================================== Listing subscriptions by user
Subscriptions.prototype.listByUser = function (userID, cb) {
  return this.requestAll('GET', ['users', userID, 'subscriptions'], cb);//all
};

// ====================================== Listing subscriptions by article
Subscriptions.prototype.listByArticle = function (articleID, cb) {
  return this.requestAll('GET', ['articles', articleID, 'subscriptions'], cb);//all
};

// ====================================== Listing subscriptions by section
Subscriptions.prototype.listBySection = function (sectionID, cb) {
  return this.requestAll('GET', ['sections', sectionID, 'subscriptions'], cb);//all
};

// ====================================== Showing subscriptions by article
Subscriptions.prototype.showbyArticle = function (articleID, subscriptionID, cb) {
  return this.request('GET', ['articles', articleID, 'subscriptions', subscriptionID], cb);//all
};

// ====================================== Showing subscriptions by section
Subscriptions.prototype.showbySection = function (sectionID, subscriptionID, cb) {
  return this.request('GET', ['sections', sectionID, 'subscriptions', subscriptionID], cb);//all
};

// ====================================== Creating subscriptions by article
Subscriptions.prototype.createbyArticle = function (articleID, subscription, cb) {
  return this.request('POST', ['articles', articleID, 'subscriptions'], subscription, cb);//all
};

// ====================================== Creating subscriptions by section
Subscriptions.prototype.createbySection = function (sectionID, subscription, cb) {
  return this.request('POST', ['sections', sectionID, 'subscriptions'], subscription, cb);//all
};

// ====================================== Deleting subscriptions by article
Subscriptions.prototype.deletebyArticle = function (articleID, subscriptionID, cb) {
  return this.request('DELETE', ['articles', articleID, 'subscriptions', subscriptionID], cb);//all
};

// ====================================== Deleting subscriptions by section
Subscriptions.prototype.deletebySection = function (sectionID, subscriptionID, cb) {
  return this.request('DELETE', ['articles', sectionID, 'subscriptions', subscriptionID], cb);//all
};
