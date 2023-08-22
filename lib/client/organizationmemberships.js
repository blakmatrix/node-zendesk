//Organizations.js: Client for the zendesk API.


var util        = require('util'),
    Client      = require('./client').Client;

var OrganizationMemberships = exports.OrganizationMemberships = function (options) {
  this.jsonAPINames = [ 'organization_membership', 'organization_memberships' ];
  Client.call(this, options);
};

// Inherit from Client base object
util.inherits(OrganizationMemberships, Client);

// ######################################################## Organizations
// ====================================== Listing Organization Memberships
OrganizationMemberships.prototype.list = function (cb) {
  return this.requestAll('GET', ['organization_memberships'], cb);//all
};

OrganizationMemberships.prototype.listByUser = function (userID, cb) {
  return this.requestAll('GET', ['users', userID, 'organization_memberships'], cb);//all
};

OrganizationMemberships.prototype.listByOrganization = function (organiationID, cb) {
  return this.requestAll('GET', ['organizations', organiationID, 'organization_memberships'], cb);//all
};

// ====================================== Viewing Organization Memberships
OrganizationMemberships.prototype.show = function (organizationMembershipID, cb) {
  return this.request('GET', ['organization_memberships', organizationMembershipID], cb);
};

OrganizationMemberships.prototype.showByUser = function (userID, organizationMembershipID, cb) {
  return this.request('GET', ['users', userID, 'organization_memberships', organizationMembershipID], cb);
};

// ====================================== Creating Organization Memberships
OrganizationMemberships.prototype.create = function (organizationMembership, cb) {
  return this.request('POST', ['organization_memberships'], organizationMembership, cb);
};

OrganizationMemberships.prototype.createByUser = function (userID, organizationMembership, cb) {
  return this.request('POST', ['users', userID, 'organization_memberships'], organizationMembership, cb);
};

OrganizationMemberships.prototype.createMany = function (organizationMemberships, cb) {
  return this.request('POST', ['organization_memberships', 'create_many'], organizationMemberships, cb);
};

// ====================================== Deleting Organization Memberships
OrganizationMemberships.prototype.delete = function (organizationMembershipID, cb) {
  return this.request('DELETE', ['organization_memberships', organizationMembershipID],  cb);
};

OrganizationMemberships.prototype.deleteByUser = function (userID, organizationMembershipID, cb) {
  return this.request('DELETE', ['users', userID, 'organization_memberships', organizationMembershipID],  cb);
};

OrganizationMemberships.prototype.deleteMany = function (organizationMembershipIDs, cb) {
  return this.request('DELETE', ['organization_memberships', 'destroy_many'], organizationMembershipIDs, cb);
};

// ====================================== Make Default Organization Membership
OrganizationMemberships.prototype.makeDefault = function (userID, organizationMembershipID, cb) {
  return this.request('PUT', ['users', userID, 'organization_memberships', organizationMembershipID, "make_default"],  cb);
};
