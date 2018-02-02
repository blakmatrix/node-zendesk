//Attachments.js: Client for the zendesk API.
'use strict';

var util        = require('util'),
    Client      = require('./client').Client,
    defaultgroups = require('./helpers').defaultgroups,
Attachments = exports.Attachments = function (options) {
  Client.call(this, options);
};

// Inherit from Client base object
util.inherits(Attachments, Client);

// ====================================== Creating Upload
Attachments.prototype.upload = function upload(file, fileOptions) {
  const fileOption = {
    filename: fileOptions.filename
  }

  /**
  * When attaching multiple files, a token is returned in
  * the successful 201 response.
  * This token can be used in subsequent requests in order
  * to associate other attachments with a previous upload.
  * This token expires after 3 days.
  */

  if (fileOptions.hasOwnProperty('token')) {
    fileOption.token = fileOptions.token
  }

  return this.requestUpload(['uploads', fileOption], file);
};

// ====================================== Deleteing Upload
Attachments.prototype.deleteUpload = function deleteUpload(token) {
  return this.request('DELETE', ['uploads', token]);
};

// ====================================== Show an Attachment
Attachments.prototype.show = function show(attachmentId) {
  return this.request('GET', ['attachments', attachmentId]);
};

// ====================================== Delete an Attachment
Attachments.prototype.delete = function delete(attachmentId) {
  return this.request('DELETE', ['attachments', attachmentId]);
};

// ====================================== Redacting Attachment Comments
Attachments.prototype.redactAttachmentComment = function redactAttachmentComment(ticketID, commentID, attachmentId) {
  return this.request(
    'DELETE',
    ['tickets', ticketID, 'comments', commentID, 'attachments', attachmentId, 'redact'],
    {}
  );
};