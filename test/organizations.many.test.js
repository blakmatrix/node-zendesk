/* eslint-disable no-await-in-loop */
import process from 'node:process';
import crypto from 'node:crypto';
import dotenv from 'dotenv';
import {describe, expect, it} from 'vitest';
import {createClient} from '../src/index.js';

dotenv.config();

const username = process.env.ZENDESK_USERNAME;
const subdomain = process.env.ZENDESK_SUBDOMAIN;
const token = process.env.ZENDESK_TOKEN;

describe('Zendesk Client Organizations(many)', () => {
  const testOrganizations = [];

  let organizationsToCreate = [];

  function generateOrganizationName() {
    const id = crypto.randomBytes(16).toString('hex');
    return `Test Organization ${id}`;
  }

  function generateMultipleOrganizations(n) {
    const organizations = [];
    for (let i = 0; i < n; i++) {
      organizations.push({
        name: generateOrganizationName(),
      });
    }

    return organizations;
  }

  const setupClient = (config) => {
    return createClient({username, subdomain, token, ...config});
  };

  const client = setupClient();

  async function executeJob(initiateFunction, validateJobDetails) {
    const {result} = await initiateFunction();

    expect(result.job_status).toHaveProperty('id');
    expect(result.job_status.status).toBe('queued');

    const finalJobResults = await client.jobstatuses.watch(
      result.job_status.id,
      1000,
      30,
    );
    expect(finalJobResults.status).toBe('completed');

    await validateJobDetails(finalJobResults);
  }

  it(
    'should create multiple organizations',
    async () => {
      await executeJob(
        async () => {
          organizationsToCreate = generateMultipleOrganizations(30);
          return client.organizations.createMany({
            organizations: organizationsToCreate,
          });
        },
        async (finalJobResults) => {
          const createdOrgIDs = finalJobResults.results.map((org) => org.id);
          const orgDetails = await client.organizations.showMany(createdOrgIDs);

          expect(orgDetails.length).toBe(createdOrgIDs.length);

          for (const org of organizationsToCreate) {
            const orgDetail = orgDetails.find(
              (detail) => detail.name === org.name,
            );
            expect(orgDetail).toBeTruthy();
            testOrganizations.push(orgDetail);
          }
        },
      );
    },
    {timeout: 20_000},
  );

  it(
    'should update multiple organizations',
    async () => {
      await executeJob(
        async () => {
          const ids = testOrganizations.map((org) => org.id);
          return client.organizations.updateMany({
            organizations: [
              {id: ids[0], notes: 'updatedFoo'},
              {id: ids[1], notes: 'updatedBar'},
            ],
          });
        },
        async (finalUpdateJobResults) => {
          const updatedOrgIDs = finalUpdateJobResults.results.map(
            (org) => org.id,
          );
          const updatedOrgDetails =
            await client.organizations.showMany(updatedOrgIDs);

          const updatedNotes = updatedOrgDetails.map((org) => org.notes);
          expect(updatedNotes).toContain('updatedFoo');
          expect(updatedNotes).toContain('updatedBar');
        },
      );
    },
    {timeout: 20_000},
  );
  it(
    'should bulk delete organizations',
    async () => {
      await executeJob(
        async () => {
          const ids = testOrganizations.map((org) => org.id);
          return client.organizations.bulkDelete(ids);
        },
        async (finalDeleteJobResults) => {
          // Assuming the deletion job also returns the IDs of the deleted items
          const deletedOrgIDs = finalDeleteJobResults.results.map(
            (org) => org.id,
          );

          // For validation, we try fetching them. If they're gone, they should return null or throw a not found error
          for (const orgId of deletedOrgIDs) {
            try {
              const orgDetail = await client.organizations.show(orgId);
              expect(orgDetail).toBeNull();
            } catch (error) {
              // Assuming 404 or similar status for not found entities
              expect(error.message).toContain('Item not found');
            }
          }
        },
      );
    },
    {timeout: 20_000},
  );
});
