import {assert, describe, expect, it} from 'vitest';
import {createClient} from '../src/index.js';
import {auth} from '../examples/exampleConfig.js';

const TEST_USER = 'Farrin Reid';

describe('Zendesk Client Authentication', () => {
  const setupClient = (config) => {
    return createClient({
      username: auth.username,
      subdomain: auth.subdomain,
      ...config,
    });
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
      username: auth.username,
      token: auth.token,
      subdomain: 'invalidSubdomain',
    });
    await expect(() => client.users.me()).rejects.toThrowError(
      'Item not found',
    );
  });

  it('should authenticate a user using a provided username and token', async () => {
    const client = setupClient({token: auth.token});
    await verifyUser(client, TEST_USER);
  });

  it('should authenticate a user using a provided username and password', async () => {
    const client = setupClient({password: auth.password});
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
      token: auth.oauthAccessToken,
      useOAuth: true,
    });
    await verifyUser(client, TEST_USER);
  });
});
