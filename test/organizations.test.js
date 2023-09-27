import path from 'node:path';
import dotenv from 'dotenv';
import {/* afterAll, */ describe, expect, it, beforeAll} from 'vitest';
import {back as nockBack} from 'nock';
import {setupClient} from './setup.js';

dotenv.config();

describe('Zendesk Client Organizations', () => {
  const organizationName = `xTestx Organization node-zendesk`;
  const randomExternalID = '69420';

  let testOrganization = {};

  const client = setupClient();

  beforeAll(async () => {
    nockBack.setMode('record');
    nockBack.fixtures = path.join(__dirname, '/fixtures');
  });

  it('should successfully create a new organization with the expected name', async () => {
    const {nockDone} = await nockBack('organizations_test_create.json');
    const {result: organization} = await client.organizations.create({
      organization: {name: organizationName},
    });
    testOrganization = organization;
    expect(organization.name).toBe(organizationName);
    nockDone();
  });

  it('should include the new organization in the list of all organizations', async () => {
    const {nockDone} = await nockBack('organizations_test_list_all.json');
    const result = await client.organizations.list();
    const organizations = result.map((organization) => organization.name);
    expect(organizations).toContain(organizationName);
    nockDone();
  });

  it('should retrieve the details of the created organization using its ID', async () => {
    const {nockDone} = await nockBack('organizations_test_show_single.json');
    const {result: organization} = await client.organizations.show(
      testOrganization.id,
    );
    expect(organization.name).toBe(organizationName);
    nockDone();
  });

  it('should successfully update the notes and external ID of the organization', async () => {
    const {nockDone} = await nockBack(
      'organizations_test_update_organization.json',
    );
    const {result: organization} = await client.organizations.update(
      testOrganization.id,
      {
        organization: {notes: 'foo', external_id: randomExternalID},
      },
    );
    expect(organization.notes).toBe('foo');
    expect(organization.external_id).toBe(randomExternalID.toString());
    nockDone();
  });

  it('should find the organization when searching by the updated external ID', async () => {
    const {nockDone} = await nockBack(
      'organizations_test_search_organization.json',
    );
    const result = await client.organizations.search(randomExternalID);
    const organizations = result.map((organization) => organization.name);
    expect(organizations).toContain(organizationName);
    nockDone(); // #TODO_FARRIN Help 400 bad request here.
  });

  // Autocomplete seems to not be instant, maybe for caching reasons?
  it('should return potential matches when autocompleting the organization name', async () => {
    const {nockDone} = await nockBack(
      'organizations_test_autocomplete_organization.json',
    );
    const result = await client.organizations.autocomplete({
      name: organizationName.slice(0, 4),
    });

    const organizations = result.map((organization) => organization.name);
    expect(Array.isArray(organizations)).toBe(true);
    nockDone();
  });

  // Delete technically returns an error, but it's a 204 No Content error and ths not thrown
  it('should successfully delete the created organization', async () => {
    const {nockDone} = await nockBack(
      'organizations_test_delete_organization.json',
    );
    const {result} = await client.organizations.delete(testOrganization.id);
    expect(result.message).toBe('No Content'); // #TODO_FARRIN help, Please see if 204 statusText Null is correct in main library
    nockDone();
  });

  it('should throw an error when trying to delete an already deleted or non-existent organization', async () => {
    const {nockDone} = await nockBack(
      'organizations_test_delete_not_found_organization.json',
    );
    await expect(() =>
      client.organizations.delete(69_420 * 69_420),
    ).rejects.toThrowError('Item not found');
    nockDone();
  });
});
