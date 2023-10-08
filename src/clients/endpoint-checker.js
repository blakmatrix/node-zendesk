/**
 * A class responsible for checking if given endpoints support cursor pagination.
 *
 * This class provides utility methods to check if certain endpoints
 * are supported based on regex patterns. It prepares and utilizes a
 * set of regex patterns derived from a static list of endpoint strings.
 */
class EndpointChecker {
  /**
   * Creates a new instance of the EndpointChecker.
   */
  constructor() {
    /**
     * @private
     * @type {Set<string>}
     * A set containing the supported endpoints.
     * {@link https://support.zendesk.com/hc/en-us/articles/5591904358938-New-limits-for-offset-based-pagination
     */
    this.SUPPORTED_ENDPOINTS = new Set([
      'views',
      'users',
      'triggers/active',
      'triggers',
      'tickets_audits',
      'tickets',
      'tickets/incremental/.*',
      'incremental/tickets/.*',
      'ticket_metrics',
      'ticket/.+/audits',
      'tags',
      'suspended_tickets',
      'skips',
      'satisfaction_ratings',
      'requests/.+/comments',
      'recipient_addresses',
      'organizations/.+/subscriptions',
      'organizations/.+/tickets',
      'organizations/.+/users',
      'organizations',
      'oauth/tokens',
      'oauth/global_clients',
      'oauth/clients',
      'macros',
      'groups/assignable',
      'groups/.+/memberships',
      'groups',
      'group_memberships',
      'deleted_tickets',
      'automations',
      'activities',
      'help_center/.+/articles',
      'help_center/.+/articles/.+/comments',
      'help_center/.+/articles/.+/labels',
      'help_center/.+/articles/.+/subscriptions',
      'help_center/.+/articles/.+/votes',
      'help_center/.+/categories/.+/articles',
      'help_center/.+/categories/.+/sections',
      'help_center/.+/sections',
      'help_center/.+/sections/.+/subscriptions',
      'help_center/.+/sections/.+/articles',
      'help_center/articles/.+/translations',
      'help_center/articles/labels',
      'help_center/categories/.+/translations',
      'help_center/incremental/articles',
      'help_center/sections/.+/translations',
      'help_center/user_segments',
      'help_center/user_segments/.+/topics',
      'help_center/user_segments/applicable',
      'help_center/users/.+/comments',
      'help_center/users/.+/subscriptions',
      'help_center/users/.+/user_segments',
      'help_center/users/.+/votes',
      'help_center/users/.+/articles',
      'community/topics',
      'community/posts/.+/comments',
      'community/posts/.+/comments/.+/votes',
      'community/posts/.+/subscriptions',
      'community/posts/.+/votes',
      'community/topics/.+/subscriptions',
      'community/users/.+/posts',
      'community/users/.+/comments',
    ]);

    /**
     * @private
     * @type {Set<RegExp>}
     * A set containing the regex patterns derived from the supported endpoints.
     */
    this.SUPPORTED_REGEXES = new Set();

    this._initSupportedRegexes();
  }

  /**
   * Initializes the SUPPORTED_REGEXES set by converting each endpoint
   * in SUPPORTED_ENDPOINTS into its corresponding regex pattern.
   * @private
   */
  _initSupportedRegexes() {
    for (const pattern of this.SUPPORTED_ENDPOINTS) {
      const regex = new RegExp(
        `^${pattern.replaceAll('/', '\\/').replaceAll(/{.+}/g, '.+')}$`,
      );
      this.SUPPORTED_REGEXES.add(regex);
    }
  }

  /**
   * Checks if the given endpoint supports cursor pagination.
   *
   * @param {string} endpoint - The endpoint string to be checked.
   * @returns {boolean} - Returns true if the endpoint supports cursor pagination, otherwise false.
   */
  supportsCursorPagination(endpoint) {
    for (const regex of this.SUPPORTED_REGEXES) {
      if (regex.test(endpoint)) {
        return true;
      }
    }

    return false;
  }
}

exports.EndpointChecker = EndpointChecker;
