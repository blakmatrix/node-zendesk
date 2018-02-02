//ArticleLabels.js: Client for the zendesk help center API.

var util = require('util'),
  Client = require('../client').Client

var ArticleLabels = exports.ArticleLabels = function (options) {
  this.jsonAPINames = [ 'articlelabels', 'articlelabel' ];
  Client.call(this, options);
};

// Inherit from Client base object
util.inherits(ArticleLabels, Client);

// ######################################################## Article Labels

// ====================================== Listing Article Labels
ArticleLabels.prototype.list = function () {
  //We do not need requestAll as the response body is within the field "labels" : []
  return this.request('GET', ['articles', 'labels']);
};

// ====================================== Listing Article Labels
ArticleLabels.prototype.listByArticle = function (articleID) {
  //We do not need requestAll as the response body is within the field "labels" : []
  return this.request('GET', ['articles', articleID, 'labels']);
};

// ====================================== Showing Article Labels
ArticleLabels.prototype.show = function (labelID) {
  return this.request('GET', ['articles', 'labels', labelID]);
};

// ====================================== Creating Article Labels
ArticleLabels.prototype.create = function (articleID, label) {
  return this.request('POST', ['articles', articleID, 'labels'], label);
};

// ====================================== Deleting Article Labels
ArticleLabels.prototype.delete = function (articleID, labelID) {
  return this.request('DELETE', ['articles', articleID, 'labels', labelID]);
};
