#!/usr/bin/env node
const process = require('node:process');
const dotenv = require('dotenv');
const zd = require('../src/index.js');

// Load environment variables from .env file
dotenv.config();

/**
 * Set up and return a Zendesk client with the given configuration.
 * @param {object} config - Additional configuration for the Zendesk client.
 * @returns {object} Zendesk client instance.
 */
const setupClient = (config) => {
  return zd.createClient({
    username: process.env.ZENDESK_USERNAME,
    subdomain: process.env.ZENDESK_SUBDOMAIN,
    token: process.env.ZENDESK_TOKEN,
    ...config,
  });
};

/**
 * Retrieves the numeric ID of an OAuth client based on its unique identifier.
 * @param {string} identifier - The unique identifier of the OAuth client.
 * @returns {Promise<number|null>} The numeric ID of the OAuth client or null if not found.
 * @async
 * @throws {Error} If there's an error in retrieving the OAuth client list.
 */
async function getClientId(identifier) {
  try {
    const client = setupClient({debug: false});
    const result = await client.oauthclients.list();
    const oauthClient = result.find((c) => c.identifier === identifier);
    return oauthClient ? oauthClient.id : null;
  } catch (error) {
    console.error('Error retrieving OAuth client ID:', error.message);
    return null;
  }
}

/**
 * Creates a read-only OAuth token for accessing users and tickets.
 * This function first retrieves the OAuth client ID using its unique identifier,
 * and then uses this ID to create a token with the specified scopes.
 * @async
 * @throws {Error} If the OAuth client ID is not found or if there's an error in creating the OAuth token.
 */
async function createReadOnlyOAuthToken() {
  try {
    const oauthClientId = await getClientId(
      process.env.ZENDESK_OAUTH_CLIENT_UNIQUE_IDENTIFIER,
    );
    if (!oauthClientId) {
      throw new Error('OAuth client ID not found for the given identifier.');
    }

    const client = setupClient({debug: false});

    // Create an OAuth token with read-only access to users and tickets
    const {result} = await client.oauthtokens.create({
      token: {
        client_id: oauthClientId, // Numeric OAuth client ID
        scopes: ['users:read', 'tickets:read'], // Scopes for read-only access
      },
    });

    console.log('OAuth Token Created:', result);
  } catch (error) {
    console.error('Error creating OAuth token:', error.message);
  }
}

createReadOnlyOAuthToken();
