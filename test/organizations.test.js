/* eslint-disable camelcase */
import process from 'node:process';
import crypto from 'node:crypto';
import dotenv from 'dotenv';
import {/* afterAll, */ describe, expect, it} from 'vitest';
import {createClient} from '../src/index.js';

dotenv.config();

const username = process.env.ZENDESK_USERNAME;
const subdomain = process.env.ZENDESK_SUBDOMAIN;
const token = process.env.ZENDESK_TOKEN;

describe('Zendesk Client Organizations', () => {
  const id = crypto.randomBytes(16).toString('hex');
  const organizationName = `Test Organization ${id}`;
  const randomExternalID = crypto.randomInt(1, 1000);
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
    const {result: organization} = await client.organizations.create({
      organization: {name: organizationName},
    });
    testOrganization = organization;
    expect(organization.name).toBe(organizationName);
  });

  it('should include the new organization in the list of all organizations', async () => {
    const result = await client.organizations.list();
    const organizations = result.map((organization) => organization.name);
    expect(organizations).toContain(organizationName);
  });

  it('should retrieve the details of the created organization using its ID', async () => {
    const {result: organization} = await client.organizations.show(
      testOrganization.id,
    );
    expect(organization.name).toBe(organizationName);
  });

  it('should successfully update the notes and external ID of the organization', async () => {
    const {result: organization} = await client.organizations.update(
      testOrganization.id,
      {
        organization: {notes: 'foo', external_id: randomExternalID},
      },
    );
    expect(organization.notes).toBe('foo');
    expect(organization.external_id).toBe(randomExternalID.toString());
  });

  it('should find the organization when searching by the updated external ID', async () => {
    const result = await client.organizations.search({
      external_id: randomExternalID,
    });
    const organizations = result.map((organization) => organization.name);
    expect(organizations).toContain(organizationName);
  });

  // Autocomplete seems to not be instant, maybe for caching reasons?
  it('should return potential matches when autocompleting the organization name', async () => {
    const result = await client.organizations.autocomplete({
      name: organizationName.slice(0, 4),
    });

    const organizations = result.map((organization) => organization.name);
    expect(Array.isArray(organizations)).toBe(true);
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
    const {result} = await client.organizations.delete(testOrganization.id);
    expect(result.message).toBe('No Content');
  });

  it('should throw an error when trying to delete an already deleted or non-existent organization', async () => {
    await expect(() =>
      client.organizations.delete(testOrganization.id),
    ).rejects.toThrowError('Item not found');
  });

  //   AfterAll(async () => {
  //     for (const org of testOrganizations) {
  //       await client.organizations.delete(org.id);
  //     }
  //   });
});
