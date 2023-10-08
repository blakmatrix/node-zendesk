#!/usr/bin/env node
const process = require('node:process');
const dotenv = require('dotenv');
const zd = require('../src/index.js');

dotenv.config();

const setupClient = (config) => {
  return zd.createClient({
    username: process.env.ZENDESK_USERNAME,
    endpointUri: process.env.ZENDESK_ENDPOINT_URI,
    token: process.env.ZENDESK_TOKEN,
    ...config,
  });
};

/**
 *
 */
async function usersList() {
  try {
    const client = setupClient({debug: false});
    const result = await client.users.list();
    console.log(
      JSON.stringify(
        result.map(function (user) {
          return user.name;
        }),
        null,
        2,
        true,
      ),
    ); // Gets the first page
    console.log('Total Users: ' + result.length);
  } catch (error) {
    console.error(`Failed to get list of users: ${error.message}`);
  }
}

usersList();
