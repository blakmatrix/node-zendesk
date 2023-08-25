// Installations.js: Client for the zendesk API.
const {Client} = require('./client');

class Installations extends Client {
  constructor(options) {
    super(options);
    this.jsonAPINames = ['installations', 'installation'];
  }

  // Listing Installations
  list(cb) {
    return this.getAll(['apps', 'installations'], cb);
  }

  // Viewing Installations
  show(installationID, cb) {
    return this.get(['apps', 'installations', installationID], cb);
  }

  // Creating Installations
  create(installation, cb) {
    return this.post(['apps', 'installations'], installation, cb);
  }

  // Updating Installations
  update(installationID, installation, cb) {
    return this.put(
      ['apps', 'installations', installationID],
      installation,
      cb,
    );
  }

  // Deleting Installations
  delete(installationID, cb) {
    return this.delete(['apps', 'installations', installationID], cb);
  }
}

exports.Installations = Installations;
