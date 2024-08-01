import process from 'node:process';
import dotenv from 'dotenv';
import {describe, expect, it} from 'vitest';
import {initializeClient} from './setup.js';

dotenv.config();

const username = process.env.ZENDESK_USERNAME;
const token = process.env.ZENDESK_TOKEN;

describe('Zendesk Exceptions Handling', () => {
  it('should throw an error for an invalid subdomain', async () => {
    const error = new Error('My Custom Error');
    error.details = 'Custom Details';

    const client = initializeClient({
      username,
      token,
      subdomain: 'any',
      throwOriginalException: true,
      transportConfig: {
        transportFn() {
          throw error;
        },
      },
    });

    await expect(() => client.users.me()).rejects.toThrowError(error);
  });
});
