// Views.js: Client for the zendesk API.
const {Client} = require('./client');

class Views extends Client {
  constructor(options) {
    super(options);
    this.jsonAPINames = ['views', 'view'];
  }

  // Listing Views
  list(cb) {
    return this.getAll(['views', '?page[size]=100'], cb);
  }

  // Listing Active Views
  listActive(cb) {
    return this.getAll(['views', 'active'], cb);
  }

  // GET /api/v2/views/compact.json
  // A compacted list of shared and personal views available to the current user
  listCompact(cb) {
    return this.getAll(['views', 'compact'], cb);
  }

  // Viewing Views
  show(viewID, cb) {
    return this.get(['views', viewID], cb);
  }

  // Create View
  // POST /api/v2/views.json
  create(view, cb) {
    return this.post(['views'], view, cb);
  }

  // Update View
  // PUT /api/v2/views/{id}.json
  update(viewID, viewData, cb) {
    return this.put(['views', viewID], viewData, cb);
  }

  // Executing Views
  // GET /api/v2/views/{id}/execute.json
  // :params can be http://developer.zendesk.com/documentation/rest_api/views.html#previewing-views
  execute(viewID, parameters, cb) {
    return this.getAll(['views', viewID, 'execute', parameters], cb);
  }

  // Getting Tickets from a view
  // GET /api/v2/views/{id}/tickets.json
  tickets(viewID, cb) {
    return this.getAll(['views', viewID, 'tickets'], cb);
  }

  // Previewing Views
  // POST /api/v2/views/preview.json
  // :params can be http://developer.zendesk.com/documentation/rest_api/views.html#previewing-views
  preview(parameters, cb) {
    return this.requestAll('POST', ['views', 'preview'], parameters, cb); // TODO: postAll
  }

  showCount(viewID, cb) {
    return this.get(['views', viewID, 'count'], cb);
  }

  showCounts(viewIDs, cb) {
    return this.get(['views', 'count_many', {ids: viewIDs}], cb);
  }

  // Exporting Views
  // GET /api/v2/views/{id}/export.json
  export(viewID, cb) {
    return this.get(['views', viewID, 'export'], cb);
  }
}

exports.Views = Views;
