// Usersegments.js: Client for the zendesk help center API..
const {Client} = require('../client');

class UserSegments extends Client {
  constructor(options) {
    super(options);
    this.jsonAPINames = ['usersegments', 'usersegment'];
  }

  // Listing User Segments
  list(cb) {
    return this.getAll(['user_segments'], cb);
  }

  // Listing only User Segments applicable to the current account
  listApplicable(cb) {
    return this.getAll(['user_segments', 'applicable'], cb);
  }

  // Listing Segment accessible for the specified user
  listByUser(userID, cb) {
    return this.getAll(['users', userID, 'user_segments'], cb);
  }

  // Get User Segment By Id
  show(userSegmentID, cb) {
    return this.get(['user_segments', userSegmentID], cb);
  }

  // List Sections using a User Segment
  listSections(userSegmentID, cb) {
    return this.getAll(['user_segments', userSegmentID, 'sections'], cb);
  }

  // List Sections using a User Segment
  listTopics(userSegmentID, cb) {
    return this.getAll(['user_segments', userSegmentID, 'topics'], cb);
  }

  // Creating User Segment
  create(userSegment, cb) {
    return this.post(['user_segments'], userSegment, cb);
  }

  // Updating User Segment
  update(userSegmentID, userSegment, cb) {
    return this.put(['user_segments', userSegmentID], userSegment, cb);
  }

  // Deleting User Segment
  delete(userSegmentID, cb) {
    return this.delete(['user_segments', userSegmentID], cb);
  }
}

exports.UserSegments = UserSegments;
