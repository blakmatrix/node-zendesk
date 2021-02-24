// usersegments.js: Client for the zendesk help center API..


var util        = require('util'),
  Client      = require('../client').Client;


var UserSegments = exports.UserSegments = function (options) {
  this.jsonAPINames = ['usersegments', 'usersegment'];

  Client.call(this, options);
};

// Inherit from Client base object
util.inherits(UserSegments, Client);

// ######################################################## UserSegments
// ====================================== Listing User Segments
UserSegments.prototype.list = function (cb) {
  return this.requestAll('GET', ['user_segments'], cb); //all
};

// ====================================== Listing only User Segments applicable to the current account
UserSegments.prototype.listApplicable = function (cb) {
    return this.requestAll('GET', ['user_segments', 'applicable'], cb); //all
};

// ====================================== Listing Segment accessible for the specified user
UserSegments.prototype.listByUser = function (userID, cb) {
  return this.requestAll('GET', ['users', userID, 'user_segments'], cb);//all
};

// ====================================== Get User Segment By Id
UserSegments.prototype.show = function (userSegmentID, cb) {
  return this.request('GET', ['user_segments', userSegmentID], cb);
};

// ====================================== List Sections using a User Segment
UserSegments.prototype.listSections = function (userSegmentID, cb) {
  return this.requestAll('GET', ['user_segments', userSegmentID, 'sections'], cb); // all
};

// ====================================== List Sections using a User Segment
UserSegments.prototype.listTopics = function (userSegmentID, cb) {
  return this.requestAll('GET', ['user_segments', userSegmentID, 'topics'], cb); // all
};

// ====================================== Creating User Segment
UserSegments.prototype.create = function (userSegment, cb) {
  return this.request('POST', ['user_segments'], userSegment, cb);
};

// ====================================== Updating User Segment
UserSegments.prototype.update = function (userSegmentID, userSegment, cb) {
  return this.request('PUT', ['user_segments', userSegmentID], userSegment, cb);
};

// ====================================== Deleting User Segment
UserSegments.prototype.delete = function (userSegmentID, cb) {
  return this.request('DELETE', ['user_segments', userSegmentID],  cb);
};