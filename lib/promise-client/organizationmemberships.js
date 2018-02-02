//Organizations.js: Client for the zendesk API.


var util        = require('util'),
    Client      = require('./client').Client,
    defaultgroups = require('./helpers').defaultgroups;


var OrganizationMemberships = exports.OrganizationMemberships = function (options) {
  this.jsonAPINames = [ 'organization_membership', 'organization_memberships' ];
  Client.call(this, options);
};

// Inherit from Client base object
util.inherits(OrganizationMemberships, Client);

// ######################################################## Organizations
// ====================================== Listing Organization Memberships
OrganizationMemberships.prototype.list = function () {
  return this.requestAll('GET', ['organization_memberships']);//all
};

OrganizationMemberships.prototype.listByUser = function (userID) {
  return this.requestAll('GET', ['users', userID, 'organization_memberships']);//all
};

OrganizationMemberships.prototype.listByOrganization = function (organiationID) {
  return this.requestAll('GET', ['organizations', organiationID, 'organization_memberships']);//all
};

// ====================================== Viewing Organization Memberships
OrganizationMemberships.prototype.show = function (organizationMembershipID) {
  return this.request('GET', ['organization_memberships', organizationMembershipID]);
};

OrganizationMemberships.prototype.showByUser = function (userID, organizationMembershipID) {
  return this.request('GET', ['users', userID, 'organization_memberships', organizationMembershipID]);
};

// ====================================== Creating Organization Memberships
OrganizationMemberships.prototype.create = function (organizationMembership) {
  return this.request('POST', ['organization_memberships'], organizationMembership);
};

OrganizationMemberships.prototype.createByUser = function (userID, organizationMembership) {
  return this.request('POST', ['users', userID, 'organization_memberships'], organizationMembership);
};

OrganizationMemberships.prototype.createMany = function (organizationMemberships) {
  return this.request('POST', ['organization_memberships', 'create_many'], organizationMemberships);
};

// ====================================== Deleting Organization Memberships
OrganizationMemberships.prototype.delete = function (organizationMembershipID) {
  return this.request('DELETE', ['organization_memberships', organizationMembershipID]);
};

OrganizationMemberships.prototype.deleteByUser = function (userID, organizationMembershipID) {
  return this.request('DELETE', ['users', userID, 'organization_memberships', organizationMembershipID]);
};

OrganizationMemberships.prototype.deleteMany = function (organizationMembershipIDs) {
  return this.request('DELETE', ['organization_memberships', 'destroy_many'], organizationMembershipID);
};

// ====================================== Make Default Organization Membership
OrganizationMemberships.prototype.makeDefault = function (userID, organizationMembershipID) {
  return this.request('PUT', ['users', userID, 'organization_memberships', organizationMembershipID, "make_default"]);
};
