const {Client} = require('../client');

/**
 * Client for the Satisfaction Ratings section of the Zendesk API.
 * @see {@link https://developer.zendesk.com/api-reference/ticketing/ticket-management/satisfaction_ratings/}
 */
class SatisfactionRatings extends Client {
  /**
   * Creates a new SatisfactionRatings instance.
   * @param {object} options - Options for initializing the client.
   */
  constructor(options) {
    super(options);
    this.jsonAPINames = ['satisfaction_ratings'];
  }

  /**
   * Lists all satisfaction ratings.
   * @returns {Array} A list of satisfaction ratings.
   * @async
   * @see {@link https://developer.zendesk.com/api-reference/ticketing/ticket-management/satisfaction_ratings/#list-satisfaction-ratings}
   * @example const ratings = await client.satisfactionratings.list();
   */
  async list() {
    return this.getAll(['satisfaction_ratings']);
  }

  /**
   * Lists all received satisfaction ratings.
   * @returns {Array} A list of received satisfaction ratings.
   * @async
   * @example const ratingsReceived = await client.satisfactionratings.received();
   */
  async received() {
    return this.getAll(['satisfaction_ratings', 'received']);
  }

  /**
   * Retrieves details of a specific satisfaction rating.
   * @param {number} satisfactionRatingID - The ID of the satisfaction rating to retrieve.
   * @returns {object} Details of the satisfaction rating.
   * @async
   * @see {@link https://developer.zendesk.com/api-reference/ticketing/ticket-management/satisfaction_ratings/#show-satisfaction-rating}
   * @example const ratingDetails = await client.satisfactionratings.show(12345);
   */
  async show(satisfactionRatingID) {
    return this.get(['satisfaction_ratings', satisfactionRatingID]);
  }

  /**
   * Creates a satisfaction rating for a ticket.
   * @param {number} ticketID - The ID of the ticket.
   * @param {object} satisfactionRating - The details of the satisfaction rating to create.
   * @returns {object} The created satisfaction rating.
   * @async
   * @throws Will throw an error if the requester is not an end user of the ticket or if the ticket is not solved.
   * @see {@link https://developer.zendesk.com/api-reference/ticketing/ticket-management/satisfaction_ratings/#create-a-satisfaction-rating}
   * @example
   * const rating = {
   *   satisfaction_rating: { score: "good", comment: "Awesome support." }
   * };
   * const newRating = await client.satisfactionratings.create(12345, rating);
   */
  async create(ticketID, satisfactionRating) {
    return this.post(
      ['tickets', ticketID, 'satisfaction_rating'],
      satisfactionRating,
    );
  }

  /**
   * Incrementally exports satisfaction ratings based on a start time.
   * @param {number} startTime - The start time for the incremental export (Unix epoch time).
   * @returns {Array} A list of satisfaction ratings from the specified start time.
   * @async
   * @see {@link https://developer.zendesk.com/api-reference/live-chat/chat-api/incremental_export/#start-time}
   * @example const ratingsExported = await client.satisfactionratings.incremental(1498151194);
   */
  async incremental(startTime) {
    this.get(['satisfaction_ratings', {start_time: startTime}]);
  }
}

exports.SatisfactionRatings = SatisfactionRatings;
