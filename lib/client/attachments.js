// Attachments.js: Client for the zendesk API.
const {Client} = require('./client');

class Attachments extends Client {
  // Constructor(options) {
  // super(options);
  // }

  // Creating Upload
  upload(file, fileOptions, cb) {
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

    return this.requestUpload(['uploads', fileOption], file, cb);
  }

  // Deleteing Upload
  deleteUpload(token, cb) {
    return this.request('DELETE', ['uploads', token], cb);
  }

  // Show an Attachment
  show(attachmentID, cb) {
    return this.request('GET', ['attachments', attachmentID], cb);
  }

  // Delete an Attachment
  delete(attachmentID, cb) {
    return this.request('DELETE', ['attachments', attachmentID], cb);
  }

  // Redacting Attachment Comments
  redactAttachmentComment(ticketID, commentID, attachmentID, cb) {
    return this.request(
      'DELETE',
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
      cb,
    );
  }
}

exports.Attachments = Attachments;
