import {describe, expect, it} from 'vitest';
import {EndpointChecker} from '../src/client/endpoint-checker.js';

describe('Zendesk Client Endpoint Checker', () => {
  it('should properly validates URL pattern with a `.+` pattern', () => {
    const checker = new EndpointChecker();

    const isSupported = checker.supportsCursorPagination('help_center/en-us/articles');

    expect(isSupported).toBe(true);
  });
});
