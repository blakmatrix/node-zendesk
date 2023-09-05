import process from 'node:process';
import crypto from 'node:crypto';
import dotenv from 'dotenv';
import {describe, expect, it, beforeAll} from 'vitest';
import {createClient} from '../src/index.js';


dotenv.config();

const {ZENDESK_USERNAME, ZENDESK_SUBDOMAIN, ZENDESK_TOKEN} = process.env;

const nockBack = require('nock').back

describe('Zendesk Client Pagination', () => {

  beforeAll(async() =>  {
    nockBack.setMode('record')
    nockBack.fixtures = __dirname + '/fixtures'
  })

  const setupClient = (config = {}) =>
    createClient({
      username: ZENDESK_USERNAME,
      subdomain: ZENDESK_SUBDOMAIN,
      token: ZENDESK_TOKEN,
      ...config,
    });

  const defaultClient = setupClient();
  const paginatedClient = setupClient({query: {page: {size: 1}}});
  let entities_to_test = {
    'organizations': {
      paginatedClient: paginatedClient.organizations,
      defaultClient: defaultClient.organizations
    },
    'users': {
      paginatedClient: paginatedClient.users,
      defaultClient: defaultClient.users
    }
  }

  it('Paginates Users', async() => {
    const { nockDone, context } = await nockBack('PaginatedUsers.json')
    let paginated_objects = await entities_to_test['users'].paginatedClient.list();
    let unpaginated_objects = await entities_to_test['users'].defaultClient.list();
    expect(paginated_objects.length).toBe(unpaginated_objects.length);
    nockDone();
  })

  it('Paginates Organizations', async() => {
    const { nockDone, context } = await nockBack('PaginatedOrganizations.json')
    let paginated_objects = await entities_to_test['organizations'].paginatedClient.list();
    let unpaginated_objects = await entities_to_test['organizations'].defaultClient.list();
    expect(paginated_objects.length).toBe(unpaginated_objects.length);
    nockDone();
  })
});
