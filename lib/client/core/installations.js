// Installations.js: Client for the zendesk API.
const {Client} = require('../client');

class Installations extends Client {
  constructor(options) {
    super(options);
    this.jsonAPINames = ['installations', 'installation'];
  }

  // Listing Installations
  async list() {
    return this.getAll(['apps', 'installations']);
  }

  // Viewing Installations
  async show(installationID) {
    return this.get(['apps', 'installations', installationID]);
  }

  // Creating Installations
  async create(installation) {
    return this.post(['apps', 'installations'], installation);
  }

  // Updating Installations
  async update(installationID, installation) {
    return this.put(['apps', 'installations', installationID], installation);
  }

  // Deleting Installations
  async delete(installationID) {
    return this.delete(['apps', 'installations', installationID]);
  }
}

exports.Installations = Installations;
