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
      json: true, // Automatically stringifies the body to JSON
    };

    return new Promise((resolve, reject) => {
      request(requestOptions, (error, response) => {
        if (error) {
          reject(error);
        } else {
          resolve(response);
        }
      });
    });
  },

  responseAdapter(response) {
    return {
      json: () => Promise.resolve(response.body),
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
