// Userfields.js: Client for the zendesk API.
const {Client} = require('../client');

class UserFields extends Client {
  constructor(options) {
    super(options);
    this.jsonAPINames = ['user_fields', 'user_field'];
  }

  // Listing UserFields
  async list() {
    return this.getAll(['user_fields']);
  }

  // Viewing UserFields
  async show(userFieldID) {
    return this.get(['user_fields', userFieldID]);
  }

  // Creating UserFields
  async create(userField) {
    return this.post(['user_fields'], userField);
  }

  // Updating UserFields
  async update(userFieldID, userField) {
    return this.put(['user_fields', userFieldID], userField);
  }

  // Deleting UserFields
  async delete(userFieldID) {
    return this.delete(['user_fields', userFieldID]);
  }
}

exports.UserFields = UserFields;
