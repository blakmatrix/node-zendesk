// Greetings.js: Client for the zendesk API.
const {Client} = require('../client');
const { ApiTypes } = require('../../constants');

class Greetings extends Client {
  constructor(options) {
    super(options, ApiTypes.voice);
    this.jsonAPINames = ['greetings', 'greetings'];
  }

  // List Greetings
  async list() {
    return this.get(['greetings']);
  }

  // List Greetings by ID
  async show(greetingID) {
    return this.get(['greetings', greetingID]);
  }

  // Create Greeting
  async create(greeting) {
    return this.post('POST', ['greetings'], greeting);
  }

  // Update Greeting
  async update(greeting, greetingID) {
    return this.put('PUT', ['greetings', greetingID], greeting);
  }

  // Delete Greeting
  async delete(greetingID) {
    return super.delete('DELETE', ['greetings', greetingID]);
  }
}

exports.Greetings = Greetings;
