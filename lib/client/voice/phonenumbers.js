// PhoneNumbers.js: Client for the Zendesk Voice API.
const {Client} = require('../client');

class PhoneNumbers extends Client {
  constructor(options) {
    super(options);
    this.jsonAPINames = ['phone numbers', 'phone number'];
  }

  // Searching Available PhoneNumbers
  search(searchTerm, cb) {
    return this.get(['phone_numbers', 'search', {query: searchTerm}], cb);
  }

  // List PhoneNumbers
  list(cb) {
    return this.get(['phone_numbers'], cb);
  }

  // Create PhoneNumbers
  create(phone_number, cb) {
    return this.post(['phone_numbers'], phone_number, cb);
  }

  // Update PhoneNumbers
  update(phoneID, phone_number, cb) {
    return this.put(['phone_numbers', phoneID], phone_number, cb);
  }

  // Get PhoneNumbers by ID
  show(phoneID, cb) {
    return this.get(['phone_numbers', phoneID], cb);
  }

  // Delete PhoneNumbers
  delete(phoneID, cb) {
    return this.delete(['phone_numbers', phoneID], cb);
  }
}

exports.PhoneNumbers = PhoneNumbers;
