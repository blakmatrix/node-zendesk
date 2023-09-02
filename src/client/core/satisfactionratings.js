// SatisfactionRatings.js: Client for the zendesk API.
const {Client} = require('../client');

class SatisfactionRatings extends Client {
  constructor(options) {
    super(options);
    this.jsonAPINames = ['satisfaction_ratings'];
  }

  // Listing SatisfactionRatings
  async list() {
    return this.getAll(['satisfaction_ratings']);
  }

  async received() {
    return this.getAll(['satisfaction_ratings', 'received']);
  }

  async show(satisfactionRatingID) {
    return this.get(['satisfaction_ratings', satisfactionRatingID]);
  }

  // Posting SatisfactionRatings
  async create(ticketID, satisfactionRating) {
    return this.post(
      ['tickets', ticketID, 'satisfaction_rating'],
      satisfactionRating,
    );
  }

  // New Incremental Export
  async incremental(startTime) {
    this.get(['satisfaction_ratings', {start_time: startTime}]);
  }
}

exports.SatisfactionRatings = SatisfactionRatings;
