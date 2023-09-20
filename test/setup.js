// Setup.js

import process from 'node:process';
import crypto from 'node:crypto';
import dotenv from 'dotenv';
import {createClient} from '../src/index.js';

dotenv.config();

const username = process.env.ZENDESK_USERNAME;
const subdomain = process.env.ZENDESK_SUBDOMAIN;
const token = process.env.ZENDESK_TOKEN;

export const initializeClient = (config) => {
  return createClient({username, subdomain, ...config});
};

export const setupClient = (config = {}) => {
  return initializeClient({token, ...config});
};

export const generateOrganizationName = () => {
  const id = crypto.randomBytes(16).toString('hex');
  return `Test Organization ${id}`;
};

export const generateMultipleOrganizations = (n) => {
  const organizations = [];
  for (let i = 0; i < n; i++) {
    organizations.push({
      name: generateOrganizationName(),
    });
  }

  return organizations;
};
