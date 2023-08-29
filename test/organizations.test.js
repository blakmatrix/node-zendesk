/* eslint-disable camelcase */
import process from 'node:process';
import crypto from 'node:crypto';
import dotenv from 'dotenv';
import {describe, expect, it} from 'vitest';
import {createClient} from '../src/index.js';

dotenv.config();

const username = process.env.ZENDESK_USERNAME;
const subdomain = process.env.ZENDESK_SUBDOMAIN;
const token = process.env.ZENDESK_TOKEN;

describe('Zendesk Client Organizations', () => {
  const id = crypto.randomBytes(16).toString('hex');
  const organizationName = `Test Organization ${id}`;
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

  const setupClient = (config) => {
    return createClient({username, subdomain, token, ...config});
  };

  const client = setupClient();

  //   It('should throw an error for an invalid subdomain', async () => {
  //     const client = createClient({
  //       username,
  //       token,
  //       subdomain: 'invalidSubdomain',
  //     });
  //     await expect(() => client.users.me()).rejects.toThrowError(
  //       'Item not found',
  //     );
  //   });

  it('should create an organization', async () => {
    const {result: organization} = await client.organizations.create({
      organization: {name: organizationName},
    });
    testOrganization = organization;
    expect(organization.name).toBe(organizationName);
  });

  it('should list an organizations', async () => {
    const client = setupClient();
    const result = await client.organizations.list();
    const organizations = result.map((organization) => organization.name);
    console.dir(organizations);
    expect(organizations).toContain(organizationName);
  });

  // Delete technically returns an error, but it's a 204 No Content error and ths not thrown
  it('should delete an organization', async () => {
    const client = setupClient();
    const {result} = await client.organizations.delete(testOrganization.id);
    expect(result.message).toBe('No Content');
  });

  // Await client.organizations.list();
  // await client.organizations.show(123);
  //   await client.organizations.createMany({
  //     organizations: [{name: 'foo'}, {name: 'bar'}],
  //   });
  // Await client.organizations.update(123, {organization: {notes: 'foo'}});
  //   Await client.organizations.updateMany({
  //     organizations: [
  //       {id: 123, notes: 'foo'},
  //       {id: 456, notes: 'bar'},
  //     ],
  //   });
  // await client.organizations.delete(123);
  //   await client.organizations.search({external_id: 123});
  //   await client.organizations.autocomplete({name: 'foo'});
});
