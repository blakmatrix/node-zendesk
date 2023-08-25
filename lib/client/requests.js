// Requests.js: A Request is a Ticket object as seen by an end-user
//
// ################
// From http://developer.zendesk.com/documentation/rest_api/requests.html
// ################
//
// A request is an end-user's perspective on a ticket. End-users can only see
// public comments and certain fields of a ticket. Use this API to let end-users
// view, update, and create tickets they have access to.
//
// Authentication
//
// You must use the following authentication credentials with this API:
// * Use the end-user's email address, not an agent's email address as is the
//  case with all other API end-points.
//
// * Use your API token as the password, and append /token to the email address.
//  To get your API token, go to Manage > Channels in Zendesk, and then click
//  the Edit link in the API channel.

const {Client} = require('./client');

class Requests extends Client {
  constructor(options) {
    super(options);
    this.jsonAPINames = ['requests', 'request'];
    this.sideLoadMap = [
      {field: 'assignee_id', name: 'assignee', dataset: 'users'},
      {field: 'requester_id', name: 'requester', dataset: 'users'},
      {
        field: 'organization_id',
        name: 'organization',
        dataset: 'organizations',
      },
    ];
  }

  // Listing Requests
  list(cb) {
    return this.getAll(['requests'], cb);
  }

  listOpen(cb) {
    return this.getAll(['requests', 'open'], cb);
  }

  listSolved(cb) {
    return this.getAll(['requests', 'solved'], cb);
  }

  listCCD(orgID, cb) {
    return this.getAll(['requests', 'ccd'], cb);
  }

  listByUser(userID, cb) {
    return this.getAll(['users', userID, 'requests'], cb);
  }

  listByOrganization(orgID, cb) {
    return this.getAll(['organizations', orgID, 'requests'], cb);
  }

  // Viewing Requests
  getRequest(requestID, cb) {
    return this.get(['requests', requestID], cb);
  }

  // Creating Requests
  create(request, cb) {
    return this.post(['requests'], request, cb);
  }

  // Updating Requests
  update(requestID, request, cb) {
    return this.put(['requests', requestID], request, cb);
  }

  // Listing Comments
  listComments(requestID, cb) {
    return this.getAll(
      ['requests', requestID, 'comments', '?page[size]=100'],
      cb,
    );
  }

  // Get Comment
  getComment(requestID, commentID, cb) {
    return this.getAll(['requests', requestID, 'comments', commentID], cb);
  }
}

exports.Requests = Requests;
