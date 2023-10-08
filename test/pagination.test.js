import path from 'node:path';
import dotenv from 'dotenv';
import {beforeAll, afterAll, describe, expect, it} from 'vitest';
import {back as nockBack} from 'nock';
import {setupClient} from './setup.js';

dotenv.config();

describe('Zendesk Client Pagination', () => {
  const testOrganizations = [];

  const uniqueOrgName = (iteration) =>
    `Test Organization ${('The Quick Brown Foxx' + iteration).toString('hex')}`;

  const defaultClient = setupClient();

  /**
   *
   * @param iteration
   */
  async function createTestOrganization(iteration) {
    const {result: organization} = await defaultClient.organizations.create({
      organization: {name: uniqueOrgName(iteration)},
    });
    testOrganizations.push(organization);
  }

  beforeAll(async () => {
    nockBack.setMode('record');
    nockBack.fixtures = path.join(__dirname, '/fixtures');
    const {nockDone} = await nockBack('pagination_test_setup.json');
    await Promise.all([createTestOrganization(1), createTestOrganization(2)]);
    nockDone();
  });

  it(
    'should fetch all test items even with pagination applied/forced',
    async () => {
      const {nockDone} = await nockBack('pagination_test_execute.json');
      const paginatedClient = setupClient({query: {page: {size: 1}}});
      const organizations = await paginatedClient.organizations.list();
      const orgNames = organizations.map((org) => org.name);

      for (const testOrg of testOrganizations) {
        expect(orgNames).toContain(testOrg.name);
      }

      nockDone();
    },
    {timeout: 20_000},
  );

  afterAll(async () => {
    const {nockDone} = await nockBack('pagination_test_cleanup.json');
    await Promise.all(
      testOrganizations.map((org) =>
        defaultClient.organizations.delete(org.id),
      ),
    );
    nockDone();
  });
});
