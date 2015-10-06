//ArticleLabels.js: Client for the zendesk help center API.


var util        = require('util'),
  Client      = require('../client').Client

var ArticleLabels = exports.ArticleLabels = function (options) {
  this.jsonAPINames = [ 'articlelabels', 'articlelabel' ];
  Client.call(this, options);
};

// Inherit from Client base object
util.inherits(ArticleLabels, Client);

// ######################################################## Article Labels

// ====================================== Listing Article Labels
ArticleLabels.prototype.list = function (cb) {
  //We do not need requestAll as the response body is within the field "labels" : []
  this.request('GET', ['articles', 'labels'], cb);
};

// ====================================== Listing Article Labels
ArticleLabels.prototype.listByArticle = function (articleID, cb) {
  //We do not need requestAll as the response body is within the field "labels" : []
  this.request('GET', ['articles', articleID, 'labels'], cb);
};

// ====================================== Showing Article Labels
ArticleLabels.prototype.show = function (labelID, cb) {
  this.request('GET', ['articles', 'labels', labelID], cb);
};

// ====================================== Creating Article Labels
ArticleLabels.prototype.create = function (articleID, label, cb) {
  this.request('POST', ['articles', articleID, 'labels'], label, cb);
};

// ====================================== Deleting Article Labels
ArticleLabels.prototype.delete = function (articleID, labelID, cb) {
  this.request('DELETE', ['articles', articleID, 'labels', labelID], cb);
};
