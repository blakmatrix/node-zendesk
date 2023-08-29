import {assert, describe, expect, it} from 'vitest';
import {createClient} from '../src/index.js';
import {auth} from '../examples/exampleConfig.js';

describe('Authentication', () => {
  it('accepts unauthenticated(anonymous)', async () => {
    const client = createClient({
      username: auth.username,
      subdomain: auth.subdomain,
    });
    const {result: user} = await client.users.me();
    expect(user.name).toBe('Anonymous user');
  });

  it('accepts username & token', async () => {
    const client = createClient({
      username: auth.username,
      token: auth.token,
      subdomain: auth.subdomain,
    });
    const {result: user} = await client.users.me();
    expect(user.name).toBe('Farrin Reid');
  });
  it('accepts username & password', async () => {
    const client = createClient({
      username: auth.username,
      password: auth.password,
      subdomain: auth.subdomain,
    });
    const {result: user} = await client.users.me();
    expect(user.name).toBe('Farrin Reid');
  });
  it('oauth throws error if no token given', async () => {
    const client = createClient({
      subdomain: auth.subdomain,
      useOAuth: true,
    });
    await expect(() => client.users.me()).rejects.toThrowError(
      'token is missing',
    );
  });
  it('accepts oauth', async () => {
    const client = createClient({
      token: auth.oauthAccessToken,
      subdomain: auth.subdomain,
      useOAuth: true,
    });
    const {result: user} = await client.users.me();
    expect(user.name).toBe('Farrin Reid');
  });
});
