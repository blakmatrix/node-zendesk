// Userfields.js: Client for the zendesk API.
const {Client} = require('./client');

class UserFields extends Client {
  constructor(options) {
    super(options);
    this.jsonAPINames = ['user_fields', 'user_field'];
  }

  // Listing UserFields
  list(cb) {
    return this.getAll(['user_fields'], cb);
  }

  // Viewing UserFields
  show(userFieldID, cb) {
    return this.get(['user_fields', userFieldID], cb);
  }

  // Creating UserFields
  create(userField, cb) {
    return this.post(['user_fields'], userField, cb);
  }

  // Updating UserFields
  update(userFieldID, userField, cb) {
    return this.put(['user_fields', userFieldID], userField, cb);
  }

  // Deleting UserFields
  delete(userFieldID, cb) {
    return this.delete(['user_fields', userFieldID], cb);
  }
}

exports.UserFields = UserFields;
