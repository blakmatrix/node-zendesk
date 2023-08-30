// Organizations.js: Client for the zendesk API.
const {Client} = require('../client');

class Organizations extends Client {
  constructor(options) {
    super(options);
    this.jsonAPINames = ['organizations', 'organization'];
  }

  // Listing Organizations
  async list() {
    return this.getAll(['organizations', '?page[size]=100']);
  }

  // Viewing Organizations
  async show(organizationID) {
    return this.get(['organizations', organizationID]);
  }

  // Creating Organizations
  async create(organization) {
    return this.post(['organizations'], organization);
  }

  // Creating Many Organizations
  async createMany(organizations) {
    return this.post(['organizations', 'create_many'], organizations);
  }

  // Creating Or Updating Organizations
  async createOrUpdate(organization) {
    return this.post(['organizations', 'create_or_update'], organization);
  }

  // Updating Organizations
  async update(organizationID, organization) {
    return this.put(['organizations', organizationID], organization);
  }

  // Updating Many Organizations
  async updateMany(organizations) {
    return this.put(['organizations', 'update_many'], organizations);
  }

  // Creating Or Updating Organizations
  async upsert(organization) {
    return this.post(['organizations', 'create_or_update'], organization);
  }

  // Deleting Organizations
  async delete(organizationID) {
    return super.delete(['organizations', organizationID]);
  }

  // Search Organizations
  async search(parameters) {
    return this.getAll(['organizations', 'search', parameters]);
  }

  // Autocomplete Organizations
  async autocomplete(parameters) {
    return this.getAll(['organizations', 'autocomplete', parameters]);
  }

  // New Incremental Organization Export with include
  async incrementalInclude(startTime, include) {
    return this.getAll([
      'incremental',
      'organizations',
      {start_time: startTime, include},
    ]);
  }

  // New Incremental Organization Export
  async incremental(startTime) {
    return this.getAll([
      'incremental',
      'organizations',
      {start_time: startTime},
    ]);
  }

  // New Incremental Organization Export Sample
  async incrementalSample(startTime) {
    return this.get([
      'incremental',
      'organizations',
      'sample',
      {start_time: startTime},
    ]);
  }
}

exports.Organizations = Organizations;
