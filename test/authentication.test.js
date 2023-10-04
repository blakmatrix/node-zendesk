import dotenv from 'dotenv';
import { back as nockBack } from 'nock';
import path from 'node:path';
import process from 'node:process';
import { beforeAll, describe, expect, it } from 'vitest';
import { Users } from '../src/clients/core/users';
import { initializeClient } from './setup.js';

dotenv.config();

const username = process.env.ZENDESK_USERNAME;
const password = process.env.ZENDESK_PASSWORD;
const token = process.env.ZENDESK_TOKEN;
const oauthAccessToken = process.env.ZENDESK_OAUTH_ACCESS_TOKEN;
const TEST_USER = process.env.ZENDESK_FULL_NAME;

describe('Zendesk Client Authentication', () => {
  beforeAll(async () => {
    nockBack.setMode('record');
    nockBack.fixtures = path.join(__dirname, '/fixtures');
  });

  const setupClient = initializeClient;

  /**
   *
   * @param client {import('../src/index.js').ZendeskClient}
   * @param expectedName {string}
   * @return {Promise<void>}
   */
  const verifyUser = async (client, expectedName) => {
    const { result: user } = await client.users.me();
    expect(user.name).toBe(expectedName);
  };

  it('should authenticate an anonymous user without any credentials(fail condition)', async () => {
    const {nockDone} = await nockBack('authentication_test_no_creds.json');
    const client = setupClient({});
    await verifyUser(client, 'Anonymous user');
    nockDone();
  });

  it('should fail authentication with an incorrect username and token combination', async () => {
    const {nockDone} = await nockBack(
      'authentication_test_incorrect_token.json',
    );
    const client = setupClient({token: 'incorrectToken'});
    await verifyUser(client, 'Anonymous user');
    nockDone();
  });

  it('should fail authentication with an incorrect username and password combination', async () => {
    const {nockDone} = await nockBack('authentication_test_incorrect_u_p.json');
    const client = setupClient({password: 'incorrectPassword'});
    await verifyUser(client, 'Anonymous user');
    nockDone();
  });

  it('should throw an error for an invalid subdomain', async () => {
    const {nockDone} = await nockBack(
      'authentication_test_incorrect_subdomain.json',
    );
    const client = initializeClient({
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
    const {nockDone} = await nockBack(
      'authentication_test_correct_u_token.json',
    );
    const client = setupClient({token});
    await verifyUser(client, TEST_USER);
    nockDone();
  });

  it('should authenticate a user using a provided username and password', async () => {
    const {nockDone} = await nockBack('authentication_test_user_pass.json');
    const client = setupClient({password});
    await verifyUser(client, TEST_USER);
    nockDone();
  });

  it('should throw an error when trying OAuth authentication without a token', async () => {
    const {nockDone} = await nockBack(
      'authentication_test_incorrect_sans_token.json',
    );
    const client = setupClient({useOAuth: true});
    await expect(() => client.users.me()).rejects.toThrowError(
      'token is missing',
    );
    nockDone();
  });

  it('should authenticate a user using OAuth with a valid token', async () => {
    const {nockDone} = await nockBack(
      'authentication_test_correct_oauthtoken.json',
    );
    const client = setupClient({
      token: oauthAccessToken,
      useOAuth: true,
    });
    await verifyUser(client, TEST_USER);
    nockDone();
  });
});
