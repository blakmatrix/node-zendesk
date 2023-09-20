import crypto from 'node:crypto';
import dotenv from 'dotenv';
import {beforeAll, afterAll, describe, expect, it} from 'vitest';
import {setupClient} from './setup.js';

dotenv.config();

describe('Zendesk Client Pagination', () => {
  const testOrganizations = [];

  const uniqueOrgName = () =>
    `Test Organization ${crypto.randomBytes(16).toString('hex')}`;

  const defaultClient = setupClient();

  async function createTestOrganization() {
    const {result: organization} = await defaultClient.organizations.create({
      organization: {name: uniqueOrgName()},
    });
    testOrganizations.push(organization);
  }

  beforeAll(async () => {
    await Promise.all([createTestOrganization(), createTestOrganization()]);
  });

  it(
    'should fetch all test items even with pagination applied/forced',
    async () => {
      const paginatedClient = setupClient({query: {page: {size: 1}}});
      const organizations = await paginatedClient.organizations.list();
      const orgNames = organizations.map((org) => org.name);

      for (const testOrg of testOrganizations) {
        expect(orgNames).toContain(testOrg.name);
      }
    },
    {timeout: 20_000},
  );

  afterAll(async () => {
    await Promise.all(
      testOrganizations.map((org) =>
        defaultClient.organizations.delete(org.id),
      ),
    );
  });
});
