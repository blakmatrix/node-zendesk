// Views.js: Client for the zendesk API.
const {Client} = require('../client');

class Views extends Client {
  constructor(options) {
    super(options);
    this.jsonAPINames = ['views', 'view'];
  }

  // Listing Views
  async list() {
    return this.getAll(['views', '?page[size]=100']);
  }

  // Listing Active Views
  async listActive() {
    return this.getAll(['views', 'active']);
  }

  // GET /api/v2/views/compact.json
  // A compacted list of shared and personal views available to the current user
  async listCompact() {
    return this.getAll(['views', 'compact']);
  }

  // Viewing Views
  async show(viewID) {
    return this.get(['views', viewID]);
  }

  // Create View
  // POST /api/v2/views.json
  async create(view) {
    return this.post(['views'], view);
  }

  // Update View
  // PUT /api/v2/views/{id}.json
  async update(viewID, viewData) {
    return this.put(['views', viewID], viewData);
  }

  // Executing Views
  // GET /api/v2/views/{id}/execute.json
  // :params can be http://developer.zendesk.com/documentation/rest_api/views.html#previewing-views
  async execute(viewID, parameters) {
    return this.getAll(['views', viewID, 'execute', parameters]);
  }

  // Getting Tickets from a view
  // GET /api/v2/views/{id}/tickets.json
  async tickets(viewID) {
    return this.getAll(['views', viewID, 'tickets']);
  }

  // Previewing Views
  // POST /api/v2/views/preview.json
  // :params can be http://developer.zendesk.com/documentation/rest_api/views.html#previewing-views
  async preview(parameters) {
    return this.requestAll('POST', ['views', 'preview'], parameters); // TODO: postAll
  }

  async showCount(viewID) {
    return this.get(['views', viewID, 'count']);
  }

  async showCounts(viewIDs) {
    return this.get(['views', 'count_many', {ids: viewIDs}]);
  }

  // Exporting Views
  // GET /api/v2/views/{id}/export.json
  async export(viewID) {
    return this.get(['views', viewID, 'export']);
  }
}

exports.Views = Views;
