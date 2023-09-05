/* eslint-disable camelcase */
import process from 'node:process';
import crypto from 'node:crypto';
import dotenv from 'dotenv';
import {/* afterAll, */ describe, expect, it, beforeAll, assert} from 'vitest';
import {createClient} from '../src/index.js';

const nockBack = require('nock').back

dotenv.config();

const username = process.env.ZENDESK_USERNAME;
const subdomain = process.env.ZENDESK_SUBDOMAIN;
const token = process.env.ZENDESK_TOKEN;

describe('Zendesk Client Organizations', () => {
  const organizationName = `node-zendesk Test Organization`;
  const randomExternalID = "69420"
  let testOrganization = {
    url: '',
    id: 0,
    name: '',
    shared_tickets: false,
    shared_comments: false,
    external_id: null,
    created_at: '',
    updated_at: '',
    domain_names: [],
    details: null,
    notes: null,
    group_id: null,
    tags: [],
    organization_fields: {},
  };

  beforeAll(async() =>  {
    nockBack.setMode('record')
    nockBack.fixtures = __dirname + '/fixtures'
  })

  //   Const testOrganizations = []; // Holds all created test organizations

  //   function generateOrganizationName() {
  //     const id = crypto.randomBytes(16).toString('hex');
  //     return `Test Organization ${id}`;
  //   }

  const setupClient = (config) => {
    return createClient({username, subdomain, token, ...config});
  };

  const client = setupClient();

  it('should successfully create a new organization with the expected name', async () => {
    const { nockDone, context } = await nockBack('organizations_test_create_organization.json');
    const {result: organization} = await client.organizations.create({
      organization: {name: organizationName, external_id: randomExternalID},
    });

    expect(organization.name).toBe(organizationName);
    testOrganization = organization;
    nockDone();
  });

  it('should include the new organization in the list of all organizations', async () => {
    const { nockDone, context } = await nockBack('organizations_test_has_organization.json');
    const result = await client.organizations.list();
    const organizations = result.map((organization) => organization.name);
    expect(organizations).toContain(testOrganization.name);
    nockDone();
  });

  it('should retrieve the details of the created organization using its ID', async () => {
    const { nockDone, context } = await nockBack('organizations_test_show_organization.json');
    const {result: organization} = await client.organizations.show(
      testOrganization.id,
    );
    expect(organization.name).toBe(testOrganization.name);
    nockDone()
  });

  it('should successfully update the notes', async () => {
    const { nockDone, context } = await nockBack('organizations_test_update_organization.json');
    const {result: organization} = await client.organizations.update(
      testOrganization.id,
      {
        organization: {notes: 'foo'},
      },
    );
    expect(organization.notes).toBe('foo');
    nockDone()
  });

  it('should find the organization when searching by the updated external ID', async () => {
    const { nockDone, context } = await nockBack('organizations_test_search_organization.json');
    const result = await client.organizations.search({
      external_id: testOrganization.external_id,
    });
    const organizations = result.map((organization) => organization.name);
    expect(organizations).toContain(testOrganization.name);
    nockDone()
  });

  // Autocomplete seems to not be instant, maybe for caching reasons?
  it('should return potential matches when autocompleting the organization name', async () => {
    const { nockDone, context } = await nockBack('organizations_test_autocomplete_organization.json');
    const result = await client.organizations.autocomplete({
      name: organizationName.slice(0, 4),
    });

    const organizations = result.map((organization) => organization.name);
    expect(Array.isArray(organizations)).toBe(true);
    nockDone()
  });

  // These need to use job status, which is not yet tested
  //   it('should create multiple organizations', async () => {
  //     const organizationName1 = generateOrganizationName();
  //     const organizationName2 = generateOrganizationName();

  //     const {result} = await client.organizations.createMany({
  //       organizations: [{name: organizationName1}, {name: organizationName2}],
  //     });
  //     console.dir(results)

  //     const orgNames = organizations.map((org) => org.name);
  //     expect(orgNames).toContain(organizationName1);
  //     expect(orgNames).toContain(organizationName2);

  //     // Storing the ids for cleanup later
  //     for (const org of organizations) {
  //       testOrganizations.push(org);
  //     }
  //   });

  //   it('should update multiple organizations', async () => {
  //     const ids = testOrganizations.map((org) => org.id);

  //     const {results: updatedOrganizations} =
  //       await client.organizations.updateMany({
  //         organizations: [
  //           {id: ids[0], notes: 'updatedFoo'},
  //           {id: ids[1], notes: 'updatedBar'},
  //         ],
  //       });

  //     const updatedNotes = updatedOrganizations.map((org) => org.notes);
  //     expect(updatedNotes).toContain('updatedFoo');
  //     expect(updatedNotes).toContain('updatedBar');
  //   });

  // Delete technically returns an error, but it's a 204 No Content error and ths not thrown
  it('should successfully delete the created organization', async () => {
    const { nockDone, context } = await nockBack('organizations_delete_organization.json');
    const {result} = await client.organizations.delete(testOrganization.id);
    assert(result);
    nockDone();
  });

  it('should throw an error when trying to delete an already deleted or non-existent organization', async () => {
    const { nockDone, context } = await nockBack('organizations_double_delete_organization.json');
    await expect(() =>
      client.organizations.delete(testOrganization.id),
    ).rejects.toThrowError('Item not found');
    nockDone();
  });

  //   AfterAll(async () => {
  //     for (const org of testOrganizations) {
  //       await client.organizations.delete(org.id);
  //     }
  //   });
});
