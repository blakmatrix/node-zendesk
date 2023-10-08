// File: attachments.js
const {Client} = require('../client');

/**
 * Represents the Attachments functionality of the Zendesk API.
 * @augments {Client}
 * @see [Zendesk Attachments API]{@link https://developer.zendesk.com/api-reference/ticketing/tickets/ticket-attachments/}
 */
class Attachments extends Client {
  // Constructor(options) {
  // super(options);
  // }

  /**
   * Upload a file to be attached to a ticket comment.
   * @param {Buffer} file - The file data.
   * @param {object} fileOptions - Options for the file.
   * @param {string} fileOptions.filename - Name of the file when attached to the ticket comment.
   * @param {boolean} fileOptions.binary - If the file is binary or not.
   * @param {string} [fileOptions.token] - Token received from previous uploads (if multiple files are being attached).
   * @returns {Promise<object>} Returns the server's response.
   * @async
   * @see {@link https://developer.zendesk.com/api-reference/ticketing/tickets/ticket-attachments/#upload-files}
   * @example
   * const response = await client.attachments.upload(fileBuffer, { filename: "example.png", binary: true });
   */
  async upload(file, fileOptions) {
    const fileOption = {
      filename: fileOptions.filename,
      binary: fileOptions.binary,
    };

    /**
     * When attaching multiple files, a token is returned in
     * the successful 201 response.
     * This token can be used in subsequent requests in order
     * to associate other attachments with a previous upload.
     * This token expires after 3 days.
     */

    if (Object.hasOwn(fileOptions, 'token')) {
      fileOption.token = fileOptions.token;
    }

    return this.requestUpload(['uploads', fileOption], file);
  }

  /**
   * Delete an uploaded file.
   * @param {string} token - The token of the uploaded attachment.
   * @returns {Promise<object>} Returns the server's response.
   * @async
   * @see {@link https://developer.zendesk.com/api-reference/ticketing/tickets/ticket-attachments/#delete-upload}
   * @example
   * const response = await client.attachments.deleteUpload("exampleToken");
   */
  async deleteUpload(token) {
    return super.delete(['uploads', token]);
  }

  /**
   * Retrieve details of a specific attachment.
   * @param {number} attachmentID - The ID of the attachment.
   * @returns {Promise<object>} Returns the details of the attachment.
   * @async
   * @see {@link https://developer.zendesk.com/api-reference/ticketing/tickets/ticket-attachments/#show-attachment}
   * @example
   * const attachmentDetails = await client.attachments.show(12345);
   */
  async show(attachmentID) {
    return this.get(['attachments', attachmentID]);
  }

  /**
   * Redact an attachment from an existing comment on a ticket.
   * @param {number} ticketID - The ID of the ticket.
   * @param {number} commentID - The ID of the comment.
   * @param {number} attachmentID - The ID of the attachment.
   * @returns {Promise<object>} Returns the server's response.
   * @async
   * @see {@link https://developer.zendesk.com/api-reference/ticketing/tickets/ticket-attachments/#redact-comment-attachment}
   * @example
   * const response = await client.attachments.redactAttachmentComment(1, 2, 3);
   */
  async redactAttachmentComment(ticketID, commentID, attachmentID) {
    return super.delete(
      [
        'tickets',
        ticketID,
        'comments',
        commentID,
        'attachments',
        attachmentID,
        'redact',
      ],
      {},
    );
  }

  /**
   * Toggles enabling or restricting agent access to attachments with detected malware.
   * @param {number} attachmentID - The ID of the attachment.
   * @param {boolean} malwareAccessOverride - Whether to override malware access. If true, agent can access attachment flagged as malware.
   * @returns {Promise<object>} The response from the Zendesk API.
   * @async
   * @throws {Error} Throws an error if the request fails.
   * @see {@link https://developer.zendesk.com/api-reference/ticketing/tickets/ticket-attachments/#update-attachment-for-malware}
   * @example
   * const result = await client.attachments.updateAttachmentForMalware(928374, true);
   * console.log(result);
   */
  async updateAttachmentForMalware(attachmentID, malwareAccessOverride) {
    const payload = {
      attachment: {
        malware_access_override: malwareAccessOverride,
      },
    };

    return this.put(['attachments', attachmentID], payload);
  }
}

exports.Attachments = Attachments;
