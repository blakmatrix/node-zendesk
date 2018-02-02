//SatisfactionRatings.js: Client for the zendesk API.


var util        = require('util'),
    Client      = require('./client').Client,
    defaultgroups = require('./helpers').defaultgroups;


var SatisfactionRatings = exports.SatisfactionRatings = function (options) {
  this.jsonAPINames = [ 'satisfaction_ratings' ];
  Client.call(this, options);
};

// Inherit from Client base object
util.inherits(SatisfactionRatings, Client);

// ######################################################## SatisfactionRatings
// ====================================== Listing SatisfactionRatings
SatisfactionRatings.prototype.list = function () {
  return this.requestAll('GET', ['satisfaction_ratings']);//all
};

SatisfactionRatings.prototype.received = function () {
  return this.requestAll('GET', ['satisfaction_ratings', 'received']);//all
};

SatisfactionRatings.prototype.show = function (satisfactionRatingID) {
  return this.request('GET', ['satisfaction_ratings', satisfactionRatingID]);//all
};

// ====================================== Posting SatisfactionRatings
SatisfactionRatings.prototype.create = function (ticketID, satisfactionRating) {
  return this.request('POST', ['tickets', ticketID, 'satisfaction_rating'], satisfactionRating);
};
