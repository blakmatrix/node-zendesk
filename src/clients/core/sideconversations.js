// File: sideconversations.js
const {Client} = require('../client');
const {ApiTypes} = require('../../constants');

/**
 * @typedef {object} Participant
 * @property {number} [user_id] - If the participant is an agent, the agent's user id
 * @property {string} [name] - The name of the participant
 * @property {string} [email] - The email address of the participant
 * @property {string} [slack_workspace_id] - If the participant is a Slack user or channel, the Slack workspace id
 * @property {string} [slack_channel_id] - If the participant is a Slack channel, the Slack channel id
 * @property {string} [support_group_id] - If the participant is a Support ticket, the support group id
 * @property {string} [support_agent_id] - If the participant is a Support ticket, the support agent id
 * @property {string} [msteams_channel_id] - If the participant is a Microsoft teams channel, the Teams channel id
 */

/**
 * @typedef {object} Message
 * @property {string} [subject] - The subject of the message
 * @property {string} [preview_text] - A plain text string describing the message
 * @property {string} [body] - The plain text version of the body of the message
 * @property {string} [html_body] - The HTML version of the body of the message
 * @property {Participant} [from] - The participant who sent the message. See Participants
 * @property {Participant[]} to - The list of participants the message was sent to. See Participants
 * @property {string[]} [attachment_ids] - List of tokens received from uploading files for comment attachments. The files are attached by creating or updating tickets with the tokens. See Attaching files in Tickets
 * @property {Object.<string, string>} [external_ids] - A key-value object where all values are strings. Used for message metadata
 */

/**
 * @typedef {object} UpdateSideConversation
 * @property {string} [subject] - The subject of the side conversation
 * @property {'open' | 'closed'} [state] - A plain text string describing the side conversation
 */

/**
 * @typedef {object} SideConversation
 * @property {string} created_at - The time the side conversation was created
 * @property {Object.<string, string>} [external_ids] - A key-value store of metadata. All values must be strings
 * @property {string} id - Automatically assigned when the side conversation is created
 * @property {string} message_added_at - The time of the last message on the side conversation
 * @property {Participant[]} participants - An array of participants in the side conversation. See Participants
 * @property {string} preview_text - A plain text text describing the side conversation
 * @property {string} [state] - The state of the side conversation
 * @property {string} state_updated_at - The time of the update of the state of the side conversation
 * @property {string} [subject] - The subject of the side conversation
 * @property {number} ticket_id - The parent ticket id of the side conversation
 * @property {string} updated_at - The time of the last update of the side conversation
 * @property {string} url - The API url of the side conversation
 */

/**
 * @typedef {object} SideConversationAttachment
 * @property {string} content_type - The content type of the attachment. This is read-only.
 * @property {number} height - The height of the attachment image. This is read-only.
 * @property {string} id - The id of the side conversation attachment. This is read-only.
 * @property {string} name - The name of the attachment.
 * @property {number} size - The size of the attachment. This is read-only.
 * @property {number} width - The width of the attachment image. This is read-only.
 */

/**
 * @typedef {object} CreateSideConversation
 * @property {Message} message - The side conversation object.
 * @property {Object.<string, string>} [external_ids] - A key-value object where all values are strings. Used for conversation metadata
 */

/**
 * @typedef {object} SideConversationResponse
 * @property {SideConversation} side_conversation - The side conversation object.
 */

class SideConversations extends Client {
  /**
   * @constructs SideConversations
   * @param {import('../client').ClientOptions} options - The client options.
   */
  constructor(options) {
    super(options, ApiTypes.core);
    this.jsonAPINames = ['side_conversations'];
  }

  /**
   * Create a Side Conversation.
   * @param {number} ticketId - The ID of the ticket.
   * @param {CreateSideConversation} message - The side conversation object.
   * @returns {Promise<{result: SideConversationResponse}>} The created ticket details.
   * @async
   * @throws {Error} If the details are not provided or invalid.
   * @see https://developer.zendesk.com/api-reference/ticketing/side_conversation/side_conversation/#create-side-conversation
   */
  async create(ticketId, message) {
    return this.post(['tickets', ticketId, 'side_conversations'], message);
  }

  /**
   * Reply to a Side Conversation.
   * @param {number} ticketId - The ID of the ticket.
   * @param {string} sideConversationId - The ID of the side conversation.
   * @param {{message: Message}} message - The reply object.
   * @returns {Promise<{result: SideConversationResponse}>} The created ticket details.
   * @async
   * @throws {Error} If the details are not provided or invalid.
   * @see https://developer.zendesk.com/api-reference/ticketing/side_conversation/side_conversation/#reply-to-side-conversation
   */
  async reply(ticketId, sideConversationId, message) {
    return this.post(
      ['tickets', ticketId, 'side_conversations', sideConversationId, 'reply'],
      message,
    );
  }

  /**
   * Update to a Side Conversation.
   * @param {number} ticketId - The ID of the ticket.
   * @param {string} sideConversationId - The ID of the side conversation.
   * @param {{side_conversation: Partial<UpdateSideConversation>}} update - The update object.
   * @returns {Promise<{result: SideConversationResponse}>} The updated ticket details.
   * @async
   * @throws {Error} If the details are not provided or invalid.
   * @see https://developer.zendesk.com/api-reference/ticketing/side_conversation/side_conversation/#update-side-conversation
   */
  async update(ticketId, sideConversationId, update) {
    return this.put(
      ['tickets', ticketId, 'side_conversations', sideConversationId],
      update,
    );
  }

  /**
   * List all the Side Conversations tickets.
   * @param ticketID
   * @returns {Promise<{result: Array<{ side_conversations: SideConversation[] }>}>} An array of tickets.
   * @async
   * @see https://developer.zendesk.com/api-reference/ticketing/side_conversation/side_conversation/#list-side-conversations
   * @example
   * const tickets = await client.sideconversations.list(123);
   */
  async list(ticketID) {
    return this.getAll(['tickets', ticketID, 'side_conversations']);
  }

  /**
   * Retrieve a specific ticket by its ID.
   * @param {number} ticketId - The ID of the ticket.
   * @param {string} sideConversationId - The ID of the side conversation.
   * @returns {Promise<{result: SideConversation}>} Details of the side conversation.
   * @async
   * @throws {Error} If the ticket ID is not provided or invalid.
   * @see https://developer.zendesk.com/api-reference/ticketing/side_conversation/side_conversation/#show-side-conversation
   * @example
   * const ticket = await client.sideconversations.show(12345, 12333);
   */
  async show(ticketId, sideConversationId) {
    return this.get([
      'tickets',
      ticketId,
      'side_conversations',
      sideConversationId,
    ]);
  }

  /**
   * Upload a file to be attached to a ticket comment.
   * @param {ArrayBuffer} file - The file data.
   * @param {object} options - The file options.
   * @param options.filename
   * @returns {Promise<SideConversationAttachment>} The attachment details.
   */
  async attachments(file, {filename}) {
    const form = new FormData();
    form.append('file', new Blob([file]), filename);
    return this.requestUpload(
      ['tickets', 'side_conversations', 'attachments'],
      form,
    );
  }
}

exports.SideConversations = SideConversations;
