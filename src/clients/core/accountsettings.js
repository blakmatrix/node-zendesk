// AccountSettings.js: Client for the zendesk API.

const {Client} = require('../client');

/**
 * @typedef {object} AccountSettingsActiveFeatures
 * @property {boolean=} on_hold_status - Account can use status hold
 * @property {boolean=} user_tagging - Enable user tags
 * @property {boolean=} ticket_tagging - Allow tagging tickets
 * @property {boolean=} topic_suggestion - Allow topic suggestions in tickets
 * @property {boolean=} voice - Voice support
 * @property {boolean=} facebook_login
 * @property {boolean=} google_login
 * @property {boolean=} twitter_login
 * @property {boolean=} forum_analytics - Forum and search analytics
 * @property {boolean=} business_hours
 * @property {boolean=} agent_forwarding
 * @property {boolean=} chat
 * @property {boolean=} chat_about_my_ticket
 * @property {boolean=} customer_satisfaction
 * @property {boolean=} satisfaction_prediction
 * @property {boolean=} csat_reason_code
 * @property {boolean=} markdown - Markdown in ticket comments
 * @property {boolean=} bcc_archiving - Account has a bcc_archive_address set
 * @property {boolean=} allow_ccs - Allow CCs on tickets
 * @property {boolean=} explore - Has account plan setting 'explore'
 * @property {boolean=} good_data_and_explore - Has account plan setting 'good_data_and_explore'
 * @property {boolean=} explore_on_support_pro_plan - Allowed to show explore role controls
 * @property {boolean=} sandbox - Account has a sandbox
 * @property {boolean=} suspended_ticket_notification
 * @property {boolean=} twitter - Account monitors at least one X (formerly Twitter) handle
 * @property {boolean=} facebook - Account is actively linked to at least one Facebook page
 * @property {boolean=} feedback_tabs - Feedback tab has been configured before
 * @property {boolean=} dynamic_contents - Account has at least one dynamic content
 * @property {boolean=} light_agents - Account has at least one light agent
 * @property {boolean=} is_abusive - Account exceeded trial limits
 * @property {boolean=} rich_content_in_email - Account supports incoming HTML email
 * @property {boolean=} fallback_composer - Fallback composer for Asian languages
 * @property {boolean=} custom_objects_activated - Account has custom objects feature activated
 * @property {boolean=} organization_access_enabled - Displays the Organizations page
 */

/**
 * @typedef {object} AccountSettingsAgents
 * @property {boolean} agent_workspace - Toggles the Agent Workspace experience
 * @property {boolean} aw_self_serve_migration_enabled - Toggles the AW Self-serve migration control setting
 */

/**
 * @typedef {object} AccountSettingsApi
 * @property {boolean} accepted_api_agreement - Account has accepted the API agreement
 * @property {'true' | 'false'} api_token_access - Allow the account to use the API with API tokens
 */

/**
 * @typedef {object} AccountSettingsApps
 * @property {boolean} use - The account can use apps
 * @property {boolean} create_private - The account can create private apps
 */

/**
 * @typedef {object} AccountSettingsBilling
 * @property {'internal' | 'zuora'} backend - Backend Billing system either 'internal' or 'zuora'
 */

/**
 * @typedef {object} AccountSettingsBranding
 * @property {string} header_color - HEX of the header color
 * @property {string} page_background_color - HEX of the page background color
 * @property {string} tab_background_color - HEX of tab background color
 * @property {string} text_color - HEX of the text color, usually matched to contrast well with `header_color`
 * @property {string | null} header_logo_url - The URL for the custom header logo
 * @property {string | null} favicon_url - The URL for the custom favicon
 */

/**
 * @typedef {object} AccountSettingsBrands
 * @property {number} default_brand_id - The id of the brand that is assigned to tickets by default
 * @property {boolean} require_brand_on_new_tickets - Require agents to select a brand before saving tickets
 * @property {boolean} end_user_across_brand_requests - When enabled, allows end users to access their own ticket requests in all of the help centers of a given account, regardless of the brand the ticket was originally created in
 */

/**
 * @typedef {object} AccountSettingsChat
 * @property {boolean} enabled - Chat is enabled
 * @property {number=} maximum_requests - The maximum number of chat requests an agent may handle at one time
 * @property {string} welcome_message - The message automatically sent to end-users when they begin chatting with agent
 */

/**
 * @typedef {object} AccountSettingsDeviceMetadata
 * @property {boolean} enabled - If true, displays the device metadata
 * @property {boolean} hide_ip - If true, hides the unique number assigned to the device currently being used. This may not reflect the end user's originating IP address
 * @property {boolean} hide_location - If true, hides the city and country associated with the device IP address
 */

/**
 * @typedef {object} AccountSettingsGSuite
 * @property {boolean} has_google_apps
 * @property {boolean} has_google_apps_admin - Account has at least one G Suite admin
 */

/**
 * @typedef {object} AccountSettingsKnowledge
 * @property {string} default_search_filters_brands - Specifies the default brand filters applied when searching knowledge base content
 * @property {string} default_search_filters_categories - The default category filters applied during knowledge searches. An empty string means no category filters are set
 * @property {string} default_search_filters_external_content_sources - Lists default external content sources to filter by in knowledge searches. An empty string means no external sources are filtered
 * @property {string} default_search_filters_locales - Local or language filters applied
 * @property {boolean} search_articles - If true, searching for help center articles is enabled
 * @property {boolean} search_community_posts - If true, searching in community form posts is enabled
 * @property {boolean} search_external_content - If true, searching external content sources outside the help center and community is enabled
 * @property {boolean} require_article_templates - If true, mandates the use of predefined templates when creating new knowledge articles
 * @property {boolean} generative_answers - If true, AI-powered generative answers are enabled to assist agents with suggested responses
 */

/**
 * @typedef {object} AccountSettingsLimits
 * @property {number} attachment_size - The maximum ticket attachment file size (in bytes)
 */

/**
 * @typedef {object} AccountSettingsLocalization
 * @property {array} locale_ids - Array of locale IDs enabled for the account
 * @property {string} time_zone - The time zone for the account
 * @property {string} iana_time_zone - The IANA (Internet Assigned Numbers Authority) time zone designation for the account
 * @property {string} default_locale_identifier - The default locale for the account
 * @property {boolean} uses_12_hour_clock - Toggles what time format is used for the account
 */

/**
 * @typedef {object} AccountSettingsLotus
 * @property {boolean} prefer_lotus - Prefers the current version of Zendesk Support rather than Zendesk Classic
 */

/**
 * @typedef {object} AccountSettingsReminders
 * @property {string} message - Mandatory message for each reminder
 * @property {number=} timeout - Reminder timeout in seconds, available and mandatory for the 2nd and 3rd reminders, if configured
 * @property {null | number=} ticket_status_id - Ticket status id, available and mandatory for the 2nd and 3rd reminders, if configured. The field can be null to indicate no status change
 * @property {string[]} tags - Array of strings, tags added to ticket with each reminder. Can be empty
 */

/**
 * @typedef {object} AccountSettingsMessagingInactivity
 * @property {boolean} enabled - Auto-release capacity is enabled
 * @property {number} timeout - Auto-release capacity timeout in minutes
 * @property {number} ticket_status_id - Ticket status ID
 * @property {boolean} end_session - Whether messaging session should end with the final reminder
 * @property {AccountSettingsReminders[]} reminders - Reminders settings
 * @property {object} default_localized_messages - Localized default reminder messages in the account language
 */

/**
 * @typedef {object} AccountSettingsMetrics
 * @property {string} account_size - An account size category computed from the number of billable agents
 */

/**
 * @typedef {object} AccountSettingsRouting
 * @property {boolean} enabled - Toggles auto-routing functionality
 * @property {string} autorouting_tag - Items tagged with this value will be auto-routed
 * @property {number} max_email_capacity - Max number of email tickets that can be auto-assigned
 * @property {number} max_messaging_capacity - Max number of messaging tickets that can be auto-assigned
 * @property {boolean} reassignment_messaging_enabled - Whether the account is enabled with reassignment in messaging channel
 * @property {number} reassignment_messaging_timeout - The amount of time before the chat is assigned to another agent
 * @property {number} reassignment_talk_timeout - The amount of time before the call is assigned to another agent
 */

/**
 * @typedef {object} AccountSettingsRules
 * @property {boolean} macro_most_used - Display the most-used macros in the `Apply macro` list. Defaults to true
 * @property {string} macro_order - Default macro display order. Possible values are 'alphabetical' or 'position'
 * @property {object} skill_based_filtered_views - Array of view ids
 * @property {boolean} enable_macro_suggestions - Display up to three of the suggested macros in the `Apply macro` list. Defaults to false
 */

/**
 * @typedef {object} AccountSettingsStatistics
 * @property {boolean} forum - Allow users to view forum statistics
 * @property {boolean} search - Allow users to view search statistics
 */

/**
 * @typedef {object} AccountSettingsTicketForm
 * @property {string} ticket_forms_instructions
 */

/**
 * @typedef {object} AccountSettingsTickets
 * @property {boolean} comments_public_by_default - Comments from agents are public by default
 * @property {boolean} is_first_comment_private_enabled - Allow first comment on tickets to be private
 * @property {boolean} list_newest_comments_first - When viewing a ticket, show the newest comments and events first
 * @property {boolean} collaboration - CCs may be added to a ticket
 * @property {boolean} private_attachments - Users must sign in to access attachments
 * @property {boolean} email_attachments - Attachments should be sent as real attachments when under the size limit
 * @property {boolean} agent_collision - Clients should provide an indicator when a ticket is being viewed by ther agent
 * @property {boolean} list_empty_views - Clients should display views with no matching tickets in menus
 * @property {number} maximum_personal_views_to_list - Maximum number of personal views clients should display in menus
 * @property {boolean} tagging - Tickets may be tagged
 * @property {boolean} markdown_ticket_comments - Whether agent comments should be processed with Markdown
 * @property {boolean} emoji_autocompletion - Whether agent comments should allow for Emoji rendering
 * @property {boolean} agent_ticket_deletion - Whether agents can delete tickets
 * @property {boolean} assign_default_organization - Whether a ticket is assigned to the requester's default organization in multi-organization mode
 * @property {boolean} agent_invitation_enabled - Whether agent invitation should be allowed for tickets
 * @property {boolean} chat_sla_enablement - Whether the proper SLA behavior should be applied to chat tickets
 * @property {boolean} modern_ticket_reassignment - If true, turns on modern ticket reassignment for solved tickets
 * @property {boolean} show_modern_ticket_reassignment - If true, shows UI components for modern ticket reassignment for solved tickets
 * @property {string} default_solved_ticket_reassignment_strategy - Default solved ticket reassignment strategy
 */

/**
 * @typedef {object} AccountSettingsX
 * @property {'always' | 'optional' | 'never'} shorten_url - Possible values: 'always', 'optional', 'never'
 */

/**
 * @typedef {object} AccountSettingsUser
 * @property {boolean} tagging - Users may be tagged
 * @property {boolean} time_zone_selection - Whether user can view time zone for profile
 * @property {boolean} language_selection - Whether to display language drop down for a user
 * @property {boolean} agent_created_welcome_emails - Whether a user created by an agent receives a welcome email
 * @property {boolean} end_user_phone_number_validation - Whether a user's phone number is validated
 * @property {boolean} have_gravatars_enabled - Whether user gravatars are displayed in the UI
 */

/**
 * @typedef {object} AccountSettingsVoice
 * @property {boolean} enabled - Voice is enabled
 * @property {boolean} maintenance
 * @property {boolean} logging
 * @property {boolean} outbound_enabled
 * @property {boolean} agent_confirmation_when_forwarding
 * @property {boolean} agent_wrap_up_after_calls
 * @property {number} maximum_queue_size
 * @property {number} maximum_queue_wait_time
 * @property {boolean} only_during_business_hours
 * @property {boolean} recordings_public
 * @property {boolean} uk_mobile_forwarding
 */

/**
 * @typedef {object} AccountSetting
 * @property {AccountSettingsActiveFeatures & { [key: string]: boolean }} active_features - Toggles the Agent Workspace experience
 * @property {AccountSettingsAgents} agents - Configuration for the agent workspace
 * @property {AccountSettingsApi} api - API configuration options
 * @property {AccountSettingsApps} apps - Apps configuration options
 * @property {AccountSettingsBilling} billing - Billing configuration options
 * @property {AccountSettingsBranding} branding - Branding settings
 * @property {AccountSettingsBrands} brands - Brand settings
 * @property {object} cdn - CDN settings
 * @property {AccountSettingsChat} chat - Zendesk Chat settings
 * @property {object} cross_sell - Cross Sell settings
 * @property {AccountSettingsDeviceMetadata} device_metadata - End user device settings
 * @property {object} email - Email settings
 * @property {AccountSettingsGSuite} google_apps - Google Apps configuration
 * @property {object} groups - Group configuration
 * @property {AccountSettingsKnowledge} knowledge - Account's knowledge management and search capabilities
 * @property {AccountSettingsLimits} limits - Account limits configuration
 * @property {AccountSettingsLocalization} localization - Internationalization configuration settings
 * @property {AccountSettingsLotus} lotus - Support UI settings
 * @property {AccountSettingsMessagingInactivity} messaging_inactivity - Auto-release capacity settings
 * @property {AccountSettingsMetrics} metrics - Account metrics settings
 * @property {object} onboarding - Onboarding settings
 * @property {AccountSettingsRouting} routing - Configuration for routing
 * @property {AccountSettingsRules} rule - Rules settings for triggers, macros, views, and automations
 * @property {object} side_conversations - Side conversations settings
 * @property {AccountSettingsStatistics} statistics - Account statistics settings
 * @property {AccountSettingsTicketForm} ticket_form - Ticket form settings
 * @property {AccountSettingsTickets} tickets - Tickets settings
 * @property {AccountSettingsX} twitter - X (formerly Twitter) settings
 * @property {AccountSettingsUser} user - User settings
 * @property {AccountSettingsVoice} voice - Zendesk Talk settings
 */

/**
 * The AccountSettings class provides methods for interacting with account settings in the Zendesk JSON API.
 * {@link https://developer.zendesk.com/api-reference/ticketing/account-configuration/account_settings/ | See the Zendesk API documentation for more details}.
 */
class AccountSettings extends Client {
  constructor(options) {
    super(options);
    this.jsonAPINames = ['settings'];
  }

  /**
   * Retrieves the account settings.
   * @returns {Promise<{response: object, result: { settings: AccountSetting } }>} A promise that resolves to the account settings.
   * {@link https://developer.zendesk.com/api-reference/ticketing/account-configuration/account_settings/#show-settings | See the Zendesk API documentation for more details}.
   * @example
   * const settings = await client.accountsettings.show();
   */
  async show() {
    return this.get(['account', 'settings']);
  }

  /**
   * Updates the account settings.
   * @param {object} settings - The settings to update.
   * @returns {Promise<{response: object, result: { settings: AccountSettings }}>} A promise that resolves to the updated account settings.
   * {@link https://developer.zendesk.com/api-reference/ticketing/account-configuration/account_settings/#update-account-settings | See the Zendesk API documentation for more details}.
   * @example
   * const settings = await client.accountsettings.update({ "settings": { "active_features": { "customer_satisfaction": false }}});
   */
  async update(settings) {
    return this.put(['account', 'settings'], settings);
  }
}

exports.AccountSettings = AccountSettings;
