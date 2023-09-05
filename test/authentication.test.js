import process from 'node:process';
import dotenv from 'dotenv';
import {describe, expect, it, beforeAll} from 'vitest';
import {createClient} from '../src/index.js';
const nockBack = require('nock').back
dotenv.config();

const username = process.env.ZENDESK_USERNAME;
const password = process.env.ZENDESK_PASSWORD;
const subdomain = process.env.ZENDESK_SUBDOMAIN;
const token = process.env.ZENDESK_TOKEN;
const oauthAccessToken = process.env.ZENDESK_OAUTH_ACCESS_TOKEN;
const TEST_USER = process.env.ZENDESK_FULL_NAME;

describe('Zendesk Client Authentication', () => {

  beforeAll(async() =>  {
    nockBack.setMode('record')
    nockBack.fixtures = __dirname + '/fixtures'
  })

  const setupClient = (config) => {
    return createClient({username, subdomain, ...config});
  };

  const verifyUser = async (client, expectedName) => {
    const {result: user} = await client.users.me();
    expect(user.name).toBe(expectedName);
  };

  it('should authenticate an anonymous user without any credentials(fail condition)', async () => {
    const { nockDone, context } = await nockBack('authentication_test_verifyUser_anonymous.json');
    const client = setupClient({});
    await verifyUser(client, 'Anonymous user');
    nockDone();
  });

  it('should fail authentication with an incorrect username and token combination', async () => {
    const { nockDone, context } = await nockBack('authentication_test_verifyUser_incorrect_tokens.json');
    const client = setupClient({token: 'incorrectToken'});
    await verifyUser(client, 'Anonymous user');
    nockDone();
  });

  it('should fail authentication with an incorrect username and password combination', async () => {
    const { nockDone, context } = await nockBack('authentication_test_verifyUser_anonymous_user.json');
    const client = setupClient({password: 'incorrectPassword'});
    await verifyUser(client, 'Anonymous user');
    nockDone();
  });

  it('should throw an error for an invalid subdomain', async () => {
    const { nockDone, context } = await nockBack('authentication_test_verifyUser_not_found.json');
    const client = createClient({
      username,
      token,
      subdomain: 'invalidSubdomain',
    });
    await expect(() => client.users.me()).rejects.toThrowError(
      'Item not found',
    );
    nockDone();
  });

  it('should authenticate a user using a provided username and token', async () => {
    const { nockDone, context } = await nockBack('authentication_test_verifyUser_token_auth.json');
    const client = setupClient({token});
    await verifyUser(client, TEST_USER);
    nockDone()
  });

  it('should authenticate a user using a provided username and password', async () => {
    const { nockDone, context } = await nockBack('authentication_test_verifyUser_password_auth.json');
    const client = setupClient({password});
    await verifyUser(client, TEST_USER);
    nockDone();
  });

  it('should throw an error when trying OAuth authentication without a token', async () => {
    const { nockDone, context } = await nockBack('authentication_test_verifyUser_missing_token.json');
    const client = setupClient({useOAuth: true});
    await expect(() => client.users.me()).rejects.toThrowError(
      'token is missing',
    );
    nockDone();
  });

  it('should authenticate a user using OAuth with a valid token', async () => {
    const { nockDone, context } = await nockBack('authentication_test_verifyUser_valid_oauth.json');
    const client = setupClient({
      token: oauthAccessToken,
      useOAuth: true,
    });
    await verifyUser(client, TEST_USER);
    nockDone();
  });
});
