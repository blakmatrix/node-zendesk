'use strict';

const util        = require('util'),
const Client      = require('./client').Client,

Attachments = exports.Attachments = function (options) {
  Client.call(this, options);
};

util.inherits(Attachments, Client);

Attachments.prototype = {
  
  upload: function (file, fileOptions, cb) {
    let fileOption = {
      filename: fileOptions.filename;
    }
    if (fileOptions.hasOwnProperty('token')) {
      fileOption.token = fileOptions.token
    }

    this.requestUpload(['uploads', fileOption], file, cb);
  },

  deleteUpload: function (token, cb) {
    this.request('DELETE', ['uploads', token],  cb);
  },

  show: function (attachmentID, cb) {
    this.request('GET', ['attachments', attachmentID],  cb);
  },

  delete: function (attachmentID, cb) {
    this.request('DELETE', ['attachments', attachmentID],  cb);
  },

  redactAttachmentComment = function (ticketID, commentID, attachmentID, cb) {
    this.request('DELETE', ['tickets', ticketID, 'comments', commentID, 'attachments', attachmentID, 'redact'], {}, cb);
  }
  
};
