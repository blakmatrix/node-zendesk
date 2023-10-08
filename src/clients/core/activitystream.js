// File: activitystream.js

const {Client} = require('../client');

/**
 * `ActivityStream` provides methods to interact with Zendesk ticket activities.
 * This class extends the base Client class and is tailored to fetch activity data.
 * @class
 * @augments {Client}
 * @see {@link https://developer.zendesk.com/api-reference/ticketing/tickets/activity_stream/ | Zendesk Activity Stream API}
 * @example
 * const client = new Client({ /* ...options... * / });
 * const activities = await client.activitystream.list();
 */
class ActivityStream extends Client {
  /**
   * Creates an instance of the ActivityStream client.
   * @param {object} options - Configuration options for the client.
   */
  constructor(options) {
    super(options);
    this.jsonAPINames = ['activities', 'activity'];
  }

  /**
   * Lists all ticket activities from the Zendesk API.
   * @returns {Array<object>} An array of activity objects.
   * @async
   * @see {@link https://developer.zendesk.com/api-reference/ticketing/tickets/activity_stream/#list-activities | Zendesk API - List Activities}
   * @example
   * const activities = await client.activitystream.list();
   */
  async list() {
    return this.getAll('GET', ['activities']);
  }

  /**
   * Retrieves a specific ticket activity by its ID.
   * @param {number} activityID - The unique ID of the activity to fetch.
   * @returns {Promise<object>} A promise that resolves to the activity object corresponding to the provided activityID.
   * @async
   * @see {@link https://developer.zendesk.com/api-reference/ticketing/tickets/activity_stream/#show-activity | Zendesk API - Show Activity}
   * @example
   * const activity = await client.activitystream.show(12345);  // Where 12345 is an activity ID.
   */
  async show(activityID) {
    return this.get(['activities', activityID]);
  }

  /**
   * Returns an approximate count of ticket activities in the last 30 days affecting the agent making the request.
   * If the count exceeds 100,000, the count will return a cached result which updates every 24 hours.
   *
   * The count[refreshed_at] property is a timestamp that indicates when the count was last updated.
   * Note: When the count exceeds 100,000, count[refreshed_at] may occasionally be null. This indicates
   * that the count is being updated in the background, and count[value] is limited to 100,000 until the update is complete.
   * @returns {Promise<object>} A promise that resolves to an object containing the activity count and the refreshed_at timestamp.
   * @async
   * @see {@link https://developer.zendesk.com/api-reference/ticketing/tickets/activity_stream/#count-activities | Zendesk API - Count Activities}
   * @example
   * const activityCount = await client.activitystream.count();
   * console.log(activityCount); // { count: { refreshed_at: "2020-04-06T02:18:17Z", value: 102 } }
   */
  async count() {
    return this.get(['activities', 'count']);
  }
}

exports.ActivityStream = ActivityStream;
