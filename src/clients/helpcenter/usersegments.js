// Usersegments.js: Client for the zendesk help center API..
const {Client} = require('../client');
const { ApiTypes } = require('../../constants');

class UserSegments extends Client {
  constructor(options) {
    super(options, ApiTypes.helpcenter);
    this.jsonAPINames = ['usersegments', 'usersegment'];
  }

  // Listing User Segments
  async list() {
    return this.getAll(['user_segments']);
  }

  // Listing only User Segments applicable to the current account
  async listApplicable() {
    return this.getAll(['user_segments', 'applicable']);
  }

  // Listing Segment accessible for the specified user
  async listByUser(userID) {
    return this.getAll(['users', userID, 'user_segments']);
  }

  // Get User Segment By Id
  async show(userSegmentID) {
    return this.get(['user_segments', userSegmentID]);
  }

  // List Sections using a User Segment
  async listSections(userSegmentID) {
    return this.getAll(['user_segments', userSegmentID, 'sections']);
  }

  // List Sections using a User Segment
  async listTopics(userSegmentID) {
    return this.getAll(['user_segments', userSegmentID, 'topics']);
  }

  // Creating User Segment
  async create(userSegment) {
    return this.post(['user_segments'], userSegment);
  }

  // Updating User Segment
  async update(userSegmentID, userSegment) {
    return this.put(['user_segments', userSegmentID], userSegment);
  }

  // Deleting User Segment
  async delete(userSegmentID) {
    return super.delete(['user_segments', userSegmentID]);
  }
}

exports.UserSegments = UserSegments;
