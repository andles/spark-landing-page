import { afterEach, describe, expect, it, vi } from 'vitest';
import posthogRelay, { config, relayTarget } from '../netlify/edge-functions/posthog-relay.ts';
import { posthogRelayPath } from './analytics';

afterEach(() => { vi.unstubAllGlobals(); });

describe('PostHog first-party relay', () => {
  it('matches the path the SDK sends to', () => {
    expect(config.path).toEqual([posthogRelayPath, `${posthogRelayPath}/*`]);
  });
  it('sends events to ingestion and SDK files to the asset host', () => {
    expect(relayTarget(new URL('https://sparkinventory.com/spk-r/i/v0/e/?ip=0&_=1'))).toBe('https://us.i.posthog.com/i/v0/e/?ip=0&_=1');
    expect(relayTarget(new URL('https://sparkinventory.com/spk-r/flags/?v=2'))).toBe('https://us.i.posthog.com/flags/?v=2');
    expect(relayTarget(new URL('https://sparkinventory.com/spk-r/static/web-vitals.js'))).toBe('https://us-assets.i.posthog.com/static/web-vitals.js');
    expect(relayTarget(new URL('https://sparkinventory.com/spk-r/array/phc_x/config.js'))).toBe('https://us-assets.i.posthog.com/array/phc_x/config.js');
    expect(relayTarget(new URL('https://sparkinventory.com/spk-rx/e/'))).toBeNull();
  });
  it('forwards the visitor IP but not site cookies, and sets no cookies back', async () => {
    const upstream = vi.fn<(url: string, init: RequestInit) => Promise<Response>>(async () => new Response('{"status":1}', {
      status: 200,
      headers: { 'set-cookie': 'x=1', 'content-encoding': 'gzip', 'content-type': 'application/json' },
    }));
    vi.stubGlobal('fetch', upstream);
    const request = new Request('https://sparkinventory.com/spk-r/i/v0/e/', {
      method: 'POST',
      body: 'payload',
      headers: { cookie: 'cookieyes-consent=action:yes', 'x-forwarded-for': '10.0.0.1', 'user-agent': 'Mozilla/5.0', 'content-type': 'text/plain' },
    });
    const response = await posthogRelay(request, { ip: '203.0.113.7' });
    const [url, init] = upstream.mock.calls[0];
    const headers = new Headers(init.headers);
    expect(url).toBe('https://us.i.posthog.com/i/v0/e/');
    expect(init.method).toBe('POST');
    expect(new TextDecoder().decode(init.body as ArrayBuffer)).toBe('payload');
    expect(headers.get('x-forwarded-for')).toBe('203.0.113.7');
    expect(headers.get('cookie')).toBeNull();
    expect(headers.get('user-agent')).toBe('Mozilla/5.0');
    expect(response.headers.get('set-cookie')).toBeNull();
    expect(response.headers.get('content-encoding')).toBeNull();
    expect(await response.text()).toBe('{"status":1}');
  });
});
