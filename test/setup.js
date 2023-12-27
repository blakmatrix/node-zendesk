// Setup.js

import dotenv from 'dotenv';
import process from 'node:process';
import { createClient } from '../src/index.js';

dotenv.config({
  path: '.env.test',
});

const {ZENDESK_USERNAME, ZENDESK_SUBDOMAIN, ZENDESK_PASSWORD, ZENDESK_TOKEN} = process.env;

export const generateOrganizationName = (id) => {
  return `Test Organization ${id}`;
};

export const generateMultipleOrganizations = (n) => {
  const organizations = [];
  for (let i = 0; i < n; i++) {
    organizations.push({
      name: generateOrganizationName(i),
    });
  }

  return organizations;
};

export const initializeClient = (config) => {
  return createClient({
    username: ZENDESK_USERNAME,
    subdomain: ZENDESK_SUBDOMAIN,
    ...config,
  });
};

/**
 *
 * @param {import('../src/clients/client').ClientOptions} config
 * @return {ZendeskClient}
 */
export const setupClient = (config = {}) =>
  createClient({
    username: ZENDESK_USERNAME,
    subdomain: ZENDESK_SUBDOMAIN,
    password: ZENDESK_PASSWORD,
    token: ZENDESK_TOKEN,
    ...config,
  });
