// SatisfactionRatings.js: Client for the zendesk API.
const {Client} = require('./client');

class SatisfactionRatings extends Client {
  constructor(options) {
    super(options);
    this.jsonAPINames = ['satisfaction_ratings'];
  }

  // Listing SatisfactionRatings
  list(cb) {
    return this.getAll(['satisfaction_ratings', '?page[size]=100'], cb);
  }

  received(cb) {
    return this.getAll(
      ['satisfaction_ratings', 'received', '?page[size]=100'],
      cb,
    );
  }

  show(satisfactionRatingID, cb) {
    return this.get(['satisfaction_ratings', satisfactionRatingID], cb);
  }

  // Posting SatisfactionRatings
  create(ticketID, satisfactionRating, cb) {
    return this.post(
      ['tickets', ticketID, 'satisfaction_rating'],
      satisfactionRating,
      cb,
    );
  }

  // New Incremental Export
  incremental(startTime, cb) {
    this.get(['satisfaction_ratings', {start_time: startTime}], cb);
  }
}

exports.SatisfactionRatings = SatisfactionRatings;
