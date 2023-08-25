// Macros.js: Client for the zendesk API.
const {Client} = require('./client');

class Macros extends Client {
  constructor(options) {
    super(options);
    this.jsonAPINames = ['macros'];
  }

  // Listing Macros
  list(cb) {
    return this.gettAll(['macros', 'active', '?page[size]=100'], cb);
  }

  listByParams(parameters, cb) {
    return this.gettAll(['macros', parameters + '&page[size]=100'], cb);
  }

  apply(macroID, cb) {
    return this.get(['macros', macroID, 'apply'], cb);
  }

  applyTicket(ticketID, macroID, cb) {
    return this.get(['tickets', ticketID, 'macros', macroID, 'apply'], cb);
  }

  create(macro, cb) {
    return this.post(['macros'], macro, cb);
  }

  categories(cb) {
    return this.gettAll(['macros', 'categories'], cb);
  }

  // Updating Tickets Fields
  update(macroID, macro, cb) {
    return this.put(['macros', macroID], macro, cb);
  }

  // Deleting Macros
  delete(macroID, cb) {
    return this.delete(['macros', macroID], cb);
  }

  createMany(users, cb) {
    return this.post(['users', 'create_many'], users, cb);
  }
}

exports.Macros = Macros;
