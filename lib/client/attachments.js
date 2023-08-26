// Attachments.js: Client for the zendesk API.
const {Client} = require('./client');

class Attachments extends Client {
  // Constructor(options) {
  // super(options);
  // }

  // Creating Upload
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

  // Deleteing Upload
  async deleteUpload(token) {
    return this.delete(['uploads', token]);
  }

  // Show an Attachment
  async show(attachmentID) {
    return this.get(['attachments', attachmentID]);
  }

  // Delete an Attachment
  async delete(attachmentID) {
    return this.delete(['attachments', attachmentID]);
  }

  // Redacting Attachment Comments
  async redactAttachmentComment(ticketID, commentID, attachmentID) {
    return this.delete(
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
}

exports.Attachments = Attachments;
