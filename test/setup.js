// Setup.js

import process from 'node:process';
import dotenv from 'dotenv';
import request from 'request';
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

export const transportConfigUsingRequest = {
  transportFn(uri, options) {
    // Convert the options to be compatible with the request library
    const requestOptions = {
      ...options,
      uri,
      headers: options.headers,
    };

    return new Promise((resolve, reject) => {
      request(requestOptions, (error, response, body) => {
        if (error) {
          reject(error);
        } else {
          // Include the body in the response object for the adapter to handle
          response.body = body;
          resolve(response);
        }
      });
    });
  },

  responseAdapter(response) {
    return {
      json() {
        try {
          return Promise.resolve(JSON.parse(response.body));
        } catch (error) {
          return Promise.reject(
            new Error(`Failed to parse JSON: ${error.message}`),
          );
        }
      },
      status: response.statusCode,
      headers: {
        get: (headerName) => response.headers[headerName.toLowerCase()],
      },
      statusText: response.statusMessage,
    };
  },
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
    transportConfig: transportConfigUsingRequest,
    ...config,
  });
