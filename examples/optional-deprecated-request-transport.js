#!/usr/bin/env node
const process = require('node:process');
const dotenv = require('dotenv');
const request = require('request');
const zd = require('../src/index.js');

dotenv.config();

const transportConfigUsingRequest = {
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

const setupClient = (config) => {
  return zd.createClient({
    username: process.env.ZENDESK_USERNAME,
    subdomain: process.env.ZENDESK_SUBDOMAIN,
    token: process.env.ZENDESK_TOKEN,
    transportConfig: transportConfigUsingRequest,
    ...config,
  });
};

/**
 *
 */
async function foo() {
  try {
    const client = setupClient({debug: false});
    const result = await client.users.list();

    console.dir(result);
  } catch (error) {
    console.error(`Failed: ${error.message}`);
  }
}

foo();
