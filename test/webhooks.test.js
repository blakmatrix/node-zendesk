import path from 'node:path';
import dotenv from 'dotenv';
import {back as nockBack} from 'nock';
import {beforeAll, describe, expect, it} from 'vitest';
import {setupClient} from './setup.js';

dotenv.config();

describe('Zendesk Client Webhooks', () => {
  const client = setupClient();

  beforeAll(async () => {
    nockBack.setMode('record');
    nockBack.fixtures = path.join(__dirname, '/fixtures');
  });

  it('should call endpoint without .json', async () => {
    const {nockDone} = await nockBack('webhooks_endpoint.json');
    const {result} = await client.webhooks.create({
      webhook: {
        name: `Web Hulk`,
        endpoint: 'noop://noop',
        http_method: 'POST',
        request_format: 'json',
        status: 'active',
        subscriptions: ['conditional_ticket_events'],
      },
    });
    nockDone();

    expect(result.id).toBeDefined();
  });
});
