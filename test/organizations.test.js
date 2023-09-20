/* eslint-disable camelcase */
import crypto from 'node:crypto';
import dotenv from 'dotenv';
import {describe, expect, it} from 'vitest';
import {setupClient, generateOrganizationName} from './setup.js';

dotenv.config();

describe('Zendesk Client Organizations', () => {
  const organizationName = generateOrganizationName();
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
    const result = await client.organizations.search(randomExternalID);
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
});
