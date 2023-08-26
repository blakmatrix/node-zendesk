// Organizations.js: Client for the zendesk API.
const {Client} = require('./client');

class OrganizationMemberships extends Client {
  constructor(options) {
    super(options);
    this.jsonAPINames = ['organization_membership', 'organization_memberships'];
  }

  // Listing Organization Memberships
  async list() {
    return this.getAll(['organization_memberships', '?page[size]=100']);
  }

  async listByUser(userID) {
    return this.getAll([
      'users',
      userID,
      'organization_memberships',
      '?page[size]=100',
    ]);
  }

  async listByOrganization(organiationID) {
    return this.getAll([
      'organizations',
      organiationID,
      'organization_memberships',
      '?page[size]=100',
    ]);
  }

  // Viewing Organization Memberships
  async show(organizationMembershipID) {
    return this.get(['organization_memberships', organizationMembershipID]);
  }

  async showByUser(userID, organizationMembershipID) {
    return this.get([
      'users',
      userID,
      'organization_memberships',
      organizationMembershipID,
    ]);
  }

  // Creating Organization Memberships
  async create(organizationMembership) {
    return this.put(['organization_memberships'], organizationMembership);
  }

  async createByUser(userID, organizationMembership) {
    return this.put(
      ['users', userID, 'organization_memberships'],
      organizationMembership,
    );
  }

  async createMany(organizationMemberships) {
    return this.put(
      ['organization_memberships', 'create_many'],
      organizationMemberships,
    );
  }

  // Deleting Organization Memberships
  async delete(organizationMembershipID) {
    return this.delete(['organization_memberships', organizationMembershipID]);
  }

  async deleteByUser(userID, organizationMembershipID) {
    return this.delete([
      'users',
      userID,
      'organization_memberships',
      organizationMembershipID,
    ]);
  }

  async deleteMany(organizationMembershipIDs) {
    return this.delete(
      ['organization_memberships', 'destroy_many'],
      organizationMembershipIDs,
    );
  }

  // Make Default Organization Membership
  async makeDefault(userID, organizationMembershipID) {
    return this.put([
      'users',
      userID,
      'organization_memberships',
      organizationMembershipID,
      'make_default',
    ]);
  }
}

exports.OrganizationMemberships = OrganizationMemberships;
