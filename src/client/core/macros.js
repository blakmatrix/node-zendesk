// Macros.js: Client for the zendesk API.
const {Client} = require('../client');

class Macros extends Client {
  constructor(options) {
    super(options);
    this.jsonAPINames = ['macros'];
  }

  // Listing Macros
  async list() {
    return this.gettAll(['macros', 'active', '?page[size]=100']);
  }

  async listByParams(parameters) {
    return this.gettAll(['macros', parameters + '&page[size]=100']);
  }

  async apply(macroID) {
    return this.get(['macros', macroID, 'apply']);
  }

  async applyTicket(ticketID, macroID) {
    return this.get(['tickets', ticketID, 'macros', macroID, 'apply']);
  }

  async create(macro) {
    return this.post(['macros'], macro);
  }

  async categories() {
    return this.gettAll(['macros', 'categories']);
  }

  // Updating Tickets Fields
  async update(macroID, macro) {
    return this.put(['macros', macroID], macro);
  }

  // Deleting Macros
  async delete(macroID) {
    return this.delete(['macros', macroID]);
  }

  async createMany(users) {
    return this.post(['users', 'create_many'], users);
  }
}

exports.Macros = Macros;
