//SatisfactionRatings.js: Client for the zendesk API.


var util        = require('util'),
    Client      = require('./client').Client;

var SatisfactionRatings = exports.SatisfactionRatings = function (options) {
  this.jsonAPINames = [ 'satisfaction_ratings' ];
  Client.call(this, options);
};

// Inherit from Client base object
util.inherits(SatisfactionRatings, Client);

// ######################################################## SatisfactionRatings
// ====================================== Listing SatisfactionRatings
SatisfactionRatings.prototype.list = function (cb) {
  return this.requestAll('GET', ['satisfaction_ratings'], cb);//all
};

SatisfactionRatings.prototype.received = function (cb) {
  return this.requestAll('GET', ['satisfaction_ratings', 'received'], cb);//all
};

SatisfactionRatings.prototype.show = function (satisfactionRatingID, cb) {
  return this.request('GET', ['satisfaction_ratings', satisfactionRatingID], cb);//all
};

// ====================================== Posting SatisfactionRatings
SatisfactionRatings.prototype.create = function (ticketID, satisfactionRating, cb) {
  return this.request('POST', ['tickets', ticketID, 'satisfaction_rating'], satisfactionRating, cb);
};

//  ====================================== New Incremental Export
SatisfactionRatings.prototype.incremental = function (startTime, cb) {
  this.request('GET', ['satisfaction_ratings', {start_time: startTime}],  cb);
};
