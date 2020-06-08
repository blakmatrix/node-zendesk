//requests.js: A Request is a Ticket object as seen by an end-user
//
// ########################################################################
// From http://developer.zendesk.com/documentation/rest_api/requests.html
// ########################################################################
//
// A request is an end-user's perspective on a ticket. End-users can only see
// public comments and certain fields of a ticket. Use this API to let end-users
// view, update, and create tickets they have access to.
//
// Authentication
//
// You must use the following authentication credentials with this API:
//  * Use the end-user's email address, not an agent's email address as is the
//    case with all other API end-points.
//
//  * Use your API token as the password, and append /token to the email address.
//    To get your API token, go to Manage > Channels in Zendesk, and then click
//    the Edit link in the API channel.

var util        = require('util'),
    Client      = require('./client').Client;

var Requests = exports.Requests = function (options) {
  this.jsonAPINames = [ 'requests', 'request' ];
  this.sideLoadMap = [
    { field: 'assignee_id',     name: 'assignee',     dataset: 'users'},
    { field: 'requester_id',    name: 'requester',    dataset: 'users'},
    { field: 'organization_id', name: 'organization', dataset: 'organizations'},
  ];
  Client.call(this, options);
};

// Inherit from Client base object
util.inherits(Requests, Client);

// ######################################################## Requests
// ====================================== Listing Requests
Requests.prototype.list = function (cb) {
  return this.requestAll('GET', ['requests'], cb);//all
};

Requests.prototype.listOpen = function (cb) {
  return this.requestAll('GET', ['requests', 'open'], cb);//all
};

Requests.prototype.listSolved = function (cb) {
  return this.requestAll('GET', ['requests', 'solved'], cb);//all
};

Requests.prototype.listCCD = function (orgID, cb) {
  return this.requestAll('GET', ['requests', 'ccd'], cb);//all
};

Requests.prototype.listByUser = function (userID, cb) {
  return this.requestAll('GET', ['users', userID, 'requests'], cb);//all
};

Requests.prototype.listByOrganization = function (orgID, cb) {
  return this.requestAll('GET', ['organizations', orgID, 'requests'], cb);//all
};

// ====================================== Viewing Requests
Requests.prototype.getRequest = function (requestID, cb) {
  return this.request('GET', ['requests', requestID], cb);
};

// ====================================== Creating Requests
Requests.prototype.create = function (request, cb) {
  return this.request('POST', ['requests'], request,  cb);
};

// ====================================== Updating Requests
Requests.prototype.update = function (requestID, request, cb) {
  return this.request('PUT', ['requests', requestID], request,  cb);
};

// ====================================== Listing Comments
Requests.prototype.listComments = function (requestID, cb) {
  return this.requestAll('GET', ['requests', requestID, 'comments'], cb);//all
};

// ====================================== Get Comment
Requests.prototype.getComment = function (requestID, commentID, cb) {
  return this.requestAll('GET', ['requests', requestID, 'comments', commentID], cb);
};
