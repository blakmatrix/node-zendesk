import {describe, expect, it} from 'vitest';
import {EndpointChecker} from '../src/clients/endpoint-checker.js';

describe('Zendesk Client Endpoint Checker', () => {
  const checker = new EndpointChecker();

  it('should recognize a URL pattern with a locale placeholder', () => {
    const endpoint = 'help_center/en-us/articles';
    const isSupported = checker.supportsCursorPagination(endpoint);

    expect(isSupported).toBe(true);
  });

  it('should recognize a URL pattern containing the wildcard `.*`', () => {
    const endpointWithCursor = 'incremental/tickets/cursor';
    const isSupportedWithCursor =
      checker.supportsCursorPagination(endpointWithCursor);

    expect(isSupportedWithCursor).toBe(true);
  });

  it('should not recognize a URL pattern missing the wildcard segment', () => {
    const endpointWithoutCursor = 'incremental/tickets';
    const isSupportedWithoutCursor = checker.supportsCursorPagination(
      endpointWithoutCursor,
    );

    expect(isSupportedWithoutCursor).toBe(false);
  });

  it('should recognize a complex endpoint pattern containing multiple placeholders', () => {
    const complexEndpoint =
      'help_center/en-us/articles/12345/comments/67890/votes';
    const isSupportedForComplex =
      checker.supportsCursorPagination(complexEndpoint);

    expect(isSupportedForComplex).toBe(true);
  });
});
