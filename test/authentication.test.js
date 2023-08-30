import process from 'node:process';
import dotenv from 'dotenv';
import {describe, expect, it} from 'vitest';
import {createClient} from '../src/index.js';

dotenv.config();

const username = process.env.ZENDESK_USERNAME;
const password = process.env.ZENDESK_PASSWORD;
const subdomain = process.env.ZENDESK_SUBDOMAIN;
const token = process.env.ZENDESK_TOKEN;
const oauthAccessToken = process.env.ZENDESK_OAUTH_ACCESS_TOKEN;
const TEST_USER = process.env.ZENDESK_FULL_NAME;

describe('Zendesk Client Authentication', () => {
  const setupClient = (config) => {
    return createClient({username, subdomain, ...config});
  };

  const verifyUser = async (client, expectedName) => {
    const {result: user} = await client.users.me();
    expect(user.name).toBe(expectedName);
  };

  it('should authenticate an anonymous user without any credentials(fail condition)', async () => {
    const client = setupClient({});
    await verifyUser(client, 'Anonymous user');
  });

  it('should fail authentication with an incorrect username and token combination', async () => {
    const client = setupClient({token: 'incorrectToken'});
    await verifyUser(client, 'Anonymous user');
  });

  it('should fail authentication with an incorrect username and password combination', async () => {
    const client = setupClient({password: 'incorrectPassword'});
    await verifyUser(client, 'Anonymous user');
  });

  it('should throw an error for an invalid subdomain', async () => {
    const client = createClient({
      username,
      token,
      subdomain: 'invalidSubdomain',
    });
    await expect(() => client.users.me()).rejects.toThrowError(
      'Item not found',
    );
  });

  it('should authenticate a user using a provided username and token', async () => {
    const client = setupClient({token});
    await verifyUser(client, TEST_USER);
  });

  it('should authenticate a user using a provided username and password', async () => {
    const client = setupClient({password});
    await verifyUser(client, TEST_USER);
  });

  it('should throw an error when trying OAuth authentication without a token', async () => {
    const client = setupClient({useOAuth: true});
    await expect(() => client.users.me()).rejects.toThrowError(
      'token is missing',
    );
  });

  it('should authenticate a user using OAuth with a valid token', async () => {
    const client = setupClient({
      token: oauthAccessToken,
      useOAuth: true,
    });
    await verifyUser(client, TEST_USER);
  });
});
