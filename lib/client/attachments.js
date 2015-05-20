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
Attachments.prototype.upload = function (file, fileOptions, cb) {
  if (fileOptions.hasOwnProperty('token')) {
    this.requestUpload(['uploads', {filename: fileOptions.filename, token: fileOptions.token}], file, cb);
  } else {
    this.requestUpload(['uploads', {filename: fileOptions.filename}], file, cb);
  }
};

// ====================================== Deleteing Upload
Attachments.prototype.deleteUpload = function (token, cb) {
  this.request('DELETE', ['uploads', token],  cb);
};

// ====================================== Show an Attachment
Attachments.prototype.show = function (attachmentID, cb) {
  this.request('GET', ['attachments', attachmentID],  cb);
};

// ====================================== Delete an Attachment
Attachments.prototype.delete = function (attachmentID, cb) {
  this.request('DELETE', ['attachments', attachmentID],  cb);
};

// ====================================== Redacting Attachment Comments
Attachments.prototype.redactAttachmentComment = function (ticketID, commentID, attachmentID, cb) {
  this.request('DELETE', ['tickets', ticketID, 'comments', commentID, 'attachments', attachmentID, 'redact'], {}, cb);
};