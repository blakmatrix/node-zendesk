// Setup.js

import process from 'node:process';
import dotenv from 'dotenv';
import {createClient} from '../src/index.js';

dotenv.config({
  path: '.env.test',
});

const {ZENDESK_USERNAME, ZENDESK_SUBDOMAIN, ZENDESK_TOKEN} = process.env;

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

export const setupClient = (config = {}) =>
  createClient({
    username: ZENDESK_USERNAME,
    subdomain: ZENDESK_SUBDOMAIN,
    token: ZENDESK_TOKEN,
    ...config,
  });
