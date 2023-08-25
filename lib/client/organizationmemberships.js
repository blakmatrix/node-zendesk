// Organizations.js: Client for the zendesk API.
const {Client} = require('./client');

class OrganizationMemberships extends Client {
  constructor(options) {
    super(options);
    this.jsonAPINames = ['organization_membership', 'organization_memberships'];
  }

  // Listing Organization Memberships
  list(cb) {
    return this.getAll(['organization_memberships', '?page[size]=100'], cb);
  }

  listByUser(userID, cb) {
    return this.getAll(
      ['users', userID, 'organization_memberships', '?page[size]=100'],
      cb,
    );
  }

  listByOrganization(organiationID, cb) {
    return this.getAll(
      [
        'organizations',
        organiationID,
        'organization_memberships',
        '?page[size]=100',
      ],
      cb,
    );
  }

  // Viewing Organization Memberships
  show(organizationMembershipID, cb) {
    return this.get(['organization_memberships', organizationMembershipID], cb);
  }

  showByUser(userID, organizationMembershipID, cb) {
    return this.get(
      ['users', userID, 'organization_memberships', organizationMembershipID],
      cb,
    );
  }

  // Creating Organization Memberships
  create(organizationMembership, cb) {
    return this.put(['organization_memberships'], organizationMembership, cb);
  }

  createByUser(userID, organizationMembership, cb) {
    return this.put(
      ['users', userID, 'organization_memberships'],
      organizationMembership,
      cb,
    );
  }

  createMany(organizationMemberships, cb) {
    return this.put(
      ['organization_memberships', 'create_many'],
      organizationMemberships,
      cb,
    );
  }

  // Deleting Organization Memberships
  delete(organizationMembershipID, cb) {
    return this.delete(
      ['organization_memberships', organizationMembershipID],
      cb,
    );
  }

  deleteByUser(userID, organizationMembershipID, cb) {
    return this.delete(
      ['users', userID, 'organization_memberships', organizationMembershipID],
      cb,
    );
  }

  deleteMany(organizationMembershipIDs, cb) {
    return this.delete(
      ['organization_memberships', 'destroy_many'],
      organizationMembershipIDs,
      cb,
    );
  }

  // Make Default Organization Membership
  makeDefault(userID, organizationMembershipID, cb) {
    return this.put(
      [
        'users',
        userID,
        'organization_memberships',
        organizationMembershipID,
        'make_default',
      ],
      cb,
    );
  }
}

exports.OrganizationMemberships = OrganizationMemberships;
