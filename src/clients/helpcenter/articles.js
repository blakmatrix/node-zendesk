// Articles.js: Client for the zendesk help center API.
const {Client} = require('../client');
const {ApiTypes} = require('../../constants');

/**
 * Articles are content items such as help topics or tech notes contained in sections
 * @typedef {object} Article
 * @property {number} [author_id] - The id of the user who wrote the article (set to the user who made the request on create by default)
 * @property {string} [body] - HTML body of the article. Unsafe tags and attributes may be removed before display
 * @property {boolean} [comments_disabled] - True if comments are disabled; false otherwise
 * @property {Array} [content_tag_ids] - The list of content tags attached to the article
 * @property {string} [created_at] - The time the article was created (read-only)
 * @property {boolean} [draft] - True if the translation for the current locale is a draft; false otherwise (read-only, can only be set when creating)
 * @property {string} [edited_at] - The time the article was last edited in its displayed locale (read-only)
 * @property {string} [html_url] - The url of the article in Help Center (read-only)
 * @property {number} [id] - Automatically assigned when the article is created (read-only)
 * @property {Array} [label_names] - An array of label names associated with this article
 * @property {string} locale - The locale that the article is being displayed in (required)
 * @property {boolean} [outdated] - Deprecated. Always false because the source translation is always the most up-to-date translation (read-only)
 * @property {Array} [outdated_locales] - Locales in which the article was marked as outdated (read-only)
 * @property {number} permission_group_id - The id of the permission group which defines who can edit and publish this article (required)
 * @property {number} [position] - The position of this article in the article list. 0 by default
 * @property {boolean} [promoted] - True if this article is promoted; false otherwise. false by default
 * @property {number} [section_id] - The id of the section to which this article belongs
 * @property {string} [source_locale] - The source (default) locale of the article (read-only)
 * @property {string} title - The title of the article (required)
 * @property {string} [updated_at] - The time the article was last updated (read-only)
 * @property {string} [url] - The API url of the article (read-only)
 * @property {number} [user_segment_id] - The id of the user segment which defines who can see this article
 * @property {Array} [user_segment_ids] - List of user segment ids which define who can view this article
 * @property {number} [vote_count] - The total number of upvotes and downvotes (read-only)
 * @property {number} [vote_sum] - The sum of upvotes (+1) and downvotes (-1), which may be positive or negative (read-only)
 */

class Articles extends Client {
  constructor(options) {
    super(options, ApiTypes.helpcenter);
    this.jsonAPINames = ['articles', 'article'];

    this.sideLoadMap = [
      {field: 'author_id', name: 'user', dataset: 'users'},
      {field: 'section_id', name: 'section', dataset: 'sections'},
      {field: 'category_id', name: 'category', dataset: 'categories'},
    ];
  }

  /**
   * List all the articles
   * @returns {Promise<Array<Article>>} An array of articles
   * @see {@link https://developer.zendesk.com/api-reference/help_center/help-center-api/articles/#list-articles}
   * @example
   * const articles = await client.helpcenter.articles.list();
   */
  async list() {
    return this.getAll(['articles']);
  }

  /**
   * List articles by locale
   * @param {string} locale - The locale to filter articles by
   * @returns {Promise<Array<Article>>} An array of articles
   * @see {@link https://developer.zendesk.com/api-reference/help_center/help-center-api/articles/#list-articles}
   * @example
   * const articles = await client.helpcenter.articles.listByLocale('en-us');
   */
  async listByLocale(locale) {
    return this.getAll([locale, 'articles']);
  }


  /**
   * List articles by section ID
   * @param {number} sectionID - The section ID to filter articles by
   * @returns {Promise<Array<Article>>} An array of articles
   * @see {@link https://developer.zendesk.com/api-reference/help_center/help-center-api/articles/#list-articles}
   * @example
   * const articles = await client.helpcenter.articles.listBySection(123456789);
   */
  async listBySection(sectionID) {
    return this.getAll(['sections', sectionID, 'articles']);
  }

  /**
   * List articles by section ID and locale
   * @param {string} locale - The locale to filter articles by
   * @param {number} sectionID - The section ID to filter articles by
   * @returns {Promise<Array<Article>>} An array of articles
   * @see {@link https://developer.zendesk.com/api-reference/help_center/help-center-api/articles/#list-articles}
   * @example
   * const articles = await client.helpcenter.articles.listBySectionByLocale('en-us', 123456789);
   */
  async listBySectionByLocale(locale, sectionID) {
    return this.getAll([locale, 'sections', sectionID, 'articles']);
  }

  /**
   * List articles by category ID
   * @param {number} categoryID - The category ID to filter articles by
   * @returns {Promise<Array<Article>>} An array of articles
   * @see {@link https://developer.zendesk.com/api-reference/help_center/help-center-api/articles/#list-articles}
   * @example
   * const articles = await client.helpcenter.articles.listByCategory(123456789);
   */
  async listByCategory(categoryID) {
    return this.getAll(['categories', categoryID, 'articles']);
  }

  /**
   * List articles by category ID and locale
   * @param {string} locale - The locale to filter articles by
   * @param {number} categoryID - The category ID to filter articles by
   * @returns {Promise<Array<Article>>} An array of articles
   * @see {@link https://developer.zendesk.com/api-reference/help_center/help-center-api/articles/#list-articles}
   * @example
   * const articles = await client.helpcenter.articles.listByCategoryByLocale('en-us', 123456789);
   */
  async listByCategoryByLocale(locale, categoryID) {
    return this.getAll([locale, 'categories', categoryID, 'articles']);
  }

  /**
   * List articles by user ID
   * @param {number} userID - The user ID to filter articles by
   * @returns {Promise<Array<Article>>} An array of articles
   * @see {@link https://developer.zendesk.com/api-reference/help_center/help-center-api/articles/#list-articles}
   * @example
   * const articles = await client.helpcenter.articles.listByUser(123456789);
   */
  async listByUser(userID) {
    return this.getAll(['users', userID, 'articles']);
  }

  // Listing Articles Since Start Time

  async listSinceStartTime(startTime) {
    return this.getAll(['incremental', 'articles', {start_time: startTime}]);
  }

  // Listing Articles By Label

  async listByLabelNames(labelNames) {
    return this.getAll(['articles', {label_names: labelNames.toString()}]);
  }

  // Viewing Articles
  async show(articleID) {
    return this.get(['articles', articleID]);
  }

  // Viewing Articles By Locale
  async showWithLocale(locale, articleID) {
    return this.get([locale, 'articles', articleID]);
  }

  // Creating Articles
  async create(sectionID, article) {
    return this.post(['sections', sectionID, 'articles'], article);
  }

  // Creating Articles With Specified Locale
  async createWithLocale(locale, sectionID, article) {
    return this.post([locale, 'sections', sectionID, 'articles'], article);
  }

  // Updating Articles
  async update(articleID, article) {
    return this.put(['articles', articleID], article);
  }

  // Updating Articles With Specified Locale
  async updateWithLocale(locale, articleID, article) {
    return this.put([locale, 'articles', articleID], article);
  }

  // Associating Attachments In Bulk
  async associateAttachmentsInBulk(articleID, attachmentIDsInBulk) {
    return this.post(
      ['articles', articleID, 'bulk_attachments'],
      attachmentIDsInBulk,
    );
  }

  // Deleting Articles
  async delete(articleID) {
    return super.delete(['articles', articleID]);
  }
}

exports.Articles = Articles;
