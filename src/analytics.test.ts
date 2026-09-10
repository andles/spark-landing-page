import { beforeEach, afterEach, describe, expect, it, vi } from 'vitest';

const sdk = vi.hoisted(() => ({
  init: vi.fn(), capture: vi.fn(), identify: vi.fn(), reset: vi.fn(),
  get_property: vi.fn(), get_distinct_id: vi.fn(), getGroups: vi.fn(() => ({})),
  resetGroups: vi.fn(), group: vi.fn(), register_once: vi.fn(), opt_out_capturing: vi.fn(), has_opted_out_capturing: vi.fn(), opt_in_capturing: vi.fn(),
}));
vi.mock('posthog-js', () => ({ default: sdk }));

beforeEach(() => {
  vi.resetModules();
  vi.resetAllMocks();
  sdk.getGroups.mockReturnValue({});
  vi.stubEnv('PROD', true);
  vi.stubEnv('VITE_POSTHOG_PROJECT_TOKEN', 'phc_test');
  vi.stubEnv('VITE_POSTHOG_HOST', 'https://us.i.posthog.com');
  vi.stubGlobal('window', { location: { hostname: 'sparkinventory.com', pathname: '/', search: '?utm_source=google&email=private@example.com' } });
  vi.stubGlobal('document', { cookie: 'cookieyes-consent=consent:yes,analytics:yes', referrer: 'https://search.example/path?secret=value' });
});
afterEach(() => { vi.unstubAllEnvs(); vi.unstubAllGlobals(); vi.restoreAllMocks(); });

describe('PostHog capture boundary', () => {
  it('does not initialize on previews, localhost, or missing configuration', async () => {
    const analytics = await import('./analytics');
    window.location.hostname = 'preview.example.com';
    analytics.capturePageview('/');
    expect(sdk.init).not.toHaveBeenCalled();
    window.location.hostname = 'sparkinventory.com';
    vi.stubEnv('VITE_POSTHOG_PROJECT_TOKEN', '');
    analytics.capturePageview('/');
    expect(sdk.init).not.toHaveBeenCalled();
    vi.stubEnv('VITE_POSTHOG_PROJECT_TOKEN', 'phc_test');
    vi.stubEnv('PROD', false);
    analytics.capturePageview('/');
    expect(sdk.init).not.toHaveBeenCalled();
  });
  it('captures only chosen attribution and disables automatic collection', async () => {
    const analytics = await import('./analytics');
    analytics.capturePageview('/');
    analytics.capturePageview('/pricing');
    expect(sdk.init).toHaveBeenCalledTimes(1);
    expect(sdk.init.mock.calls[0][1]).toMatchObject({ autocapture: false, capture_pageview: false, disable_session_recording: true, capture_exceptions: false, cross_subdomain_cookie: true, cookieWinsOnConflict: true });
    expect(sdk.register_once).toHaveBeenCalledWith({ utm_source: 'google', initial_referring_domain: 'search.example' });
  });
  it('removes raw URLs, titles, record data and person properties before sending', async () => {
    const analytics = await import('./analytics');
    analytics.capturePageview('/');
    const filter = sdk.init.mock.calls[0][1].before_send;
    const result = filter({ event: '$pageview', $set_once: { $initial_current_url: 'private-reset-token' }, properties: { distinct_id: 'anonymous', route: '/', $current_url: 'https://sparkinventory.com/reset?token=secret', $title: 'Customer Name', $set: { email: 'private@example.com' }, $set_once: { $initial_current_url: 'secret' }, record: { name: 'private' } } });
    expect(result.$set_once).toBeUndefined();
    expect(result.properties).toEqual({ distinct_id: 'anonymous', route: '/', surface: 'landing', $pathname: '/', $current_url: 'https://sparkinventory.com/' });
    expect(filter({ event: '$autocapture', properties: {} })).toBeNull();
  });
  it('does not let an unavailable SDK block navigation', async () => {
    const analytics = await import('./analytics');
    vi.spyOn(console, 'warn').mockImplementation(() => {});
    sdk.init.mockImplementation(() => { throw new Error('SDK unavailable'); });
    expect(() => analytics.capturePageview('/')).not.toThrow();
    expect(console.warn).toHaveBeenCalled();
  });
});

 it('redacts unlisted prospect slugs and unknown paths', async () => {
  const { analyticsRoute } = await import('./analytics');
  expect(analyticsRoute('/r/private-prospect')).toBe('/r/:slug');
  expect(analyticsRoute('/private-customer')).toBe('/404');
  expect(analyticsRoute('/pricing/')).toBe('/pricing');
 });

it('requires affirmative consent and stops capture on revocation', async () => {
  const analytics = await import('./analytics');
  document.cookie = '';
  analytics.capturePageview('/');
  expect(sdk.init).not.toHaveBeenCalled();
  document.cookie = 'cookieyes-consent=analytics:yes';
  analytics.capturePageview('/');
  expect(sdk.capture).toHaveBeenCalledTimes(1);
  document.cookie = 'cookieyes-consent=analytics:no';
  analytics.capturePageview('/');
  expect(sdk.capture).toHaveBeenCalledTimes(1);
  expect(sdk.opt_out_capturing).toHaveBeenCalled();
  document.cookie = 'cookieyes-consent=analytics:yes';
  sdk.has_opted_out_capturing.mockReturnValue(true);
  analytics.capturePageview('/');
  expect(sdk.opt_in_capturing).toHaveBeenCalledWith({ captureEventName: false });
  expect(sdk.capture).toHaveBeenCalledTimes(2);
});

it('re-enables capture on first load after consent is granted again', async () => {
  const analytics = await import('./analytics');
  sdk.has_opted_out_capturing.mockReturnValue(true);
  analytics.capturePageview('/');
  expect(sdk.init.mock.calls[0][1].opt_out_persistence_by_default).toBe(true);
  expect(sdk.opt_in_capturing.mock.invocationCallOrder[0]).toBeLessThan(sdk.capture.mock.invocationCallOrder[0]);
});
