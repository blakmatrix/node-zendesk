#!/usr/bin/env node
const process = require('node:process');
const dotenv = require('dotenv');
const axios = require('axios');
const zd = require('../src/index.js');

dotenv.config();

const transportConfigUsingAxios = {
  async transportFn(uri, options) {
    // Convert the options to be compatible with axios
    const requestOptions = {
      ...options,
      url: uri,
      method: options.method || 'GET', // Axios uses 'method', not just 'GET' or 'POST' as direct options
      data: options.body, // Axios uses 'data' instead of 'body'
    };

    try {
      const response = await axios(requestOptions);
      return response;
    } catch (error) {
      // If axios throws an error, it usually encapsulates the actual server response within error.response.
      // This is to ensure that even for error HTTP statuses, the response can be adapted consistently.
      if (error.response) {
        return error.response;
      }

      throw error; // If there's no error.response, then throw the error as is.
    }
  },

  responseAdapter(response) {
    return {
      json: () => Promise.resolve(response.data),
      status: response.status,
      headers: {
        get: (headerName) => response.headers[headerName.toLowerCase()],
      },
      statusText: response.statusText,
    };
  },
};

const setupClient = (config) => {
  return zd.createClient({
    username: process.env.ZENDESK_USERNAME,
    subdomain: process.env.ZENDESK_SUBDOMAIN,
    token: process.env.ZENDESK_TOKEN,
    transportConfig: transportConfigUsingAxios,
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
