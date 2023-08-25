// Organizations.js: Client for the zendesk API.
const {Client} = require('./client');

class Organizations extends Client {
  constructor(options) {
    super(options);
    this.jsonAPINames = ['organizations', 'organization'];
  }

  // Listing Organizations
  list(cb) {
    return this.getAll(['organizations', '?page[size]=100'], cb);
  }

  // Viewing Organizations
  show(organizationID, cb) {
    return this.get(['organizations', organizationID], cb);
  }

  // Creating Organizations
  create(organization, cb) {
    return this.post(['organizations'], organization, cb);
  }

  // Creating Many Organizations
  createMany(organizations, cb) {
    return this.post(['organizations', 'create_many'], organizations, cb);
  }

  // Creating Or Updating Organizations
  createOrUpdate(organization, cb) {
    return this.post(['organizations', 'create_or_update'], organization, cb);
  }

  // Updating Organizations
  update(organizationID, organization, cb) {
    return this.put(['organizations', organizationID], organization, cb);
  }

  // Updating Many Organizations
  updateMany(organizations, cb) {
    return this.put(['organizations', 'update_many'], organizations, cb);
  }

  // Creating Or Updating Organizations
  upsert(organization, cb) {
    return this.post(['organizations', 'create_or_update'], organization, cb);
  }

  // Deleting Organizations
  delete(organizationID, cb) {
    return this.delete(['organizations', organizationID], cb);
  }

  // Search Organizations
  search(parameters, cb) {
    return this.getAll(['organizations', 'search', parameters], cb);
  }

  // Autocomplete Organizations
  autocomplete(parameters, cb) {
    return this.getAll(['organizations', 'autocomplete', parameters], cb);
  }

  // New Incremental Organization Export with include
  incrementalInclude(startTime, include, cb) {
    return this.getAll(
      ['incremental', 'organizations', {start_time: startTime, include}],
      cb,
    );
  }

  // New Incremental Organization Export
  incremental(startTime, cb) {
    return this.getAll(
      ['incremental', 'organizations', {start_time: startTime}],
      cb,
    );
  }

  // New Incremental Organization Export Sample
  incrementalSample(startTime, cb) {
    return this.get(
      ['incremental', 'organizations', 'sample', {start_time: startTime}],
      cb,
    );
  }
}

exports.Organizations = Organizations;
