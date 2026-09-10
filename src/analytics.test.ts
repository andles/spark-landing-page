import { beforeEach, afterEach, describe, expect, it, vi } from 'vitest';

const sdk = vi.hoisted(() => ({
  init: vi.fn(),
  get_explicit_consent_status: vi.fn(),
  startSessionRecording: vi.fn(),
  stopSessionRecording: vi.fn(), capture: vi.fn(), identify: vi.fn(), reset: vi.fn(),
  get_property: vi.fn(), get_distinct_id: vi.fn(), getGroups: vi.fn(() => ({})),
  resetGroups: vi.fn(), group: vi.fn(), register_once: vi.fn(), opt_out_capturing: vi.fn(), has_opted_out_capturing: vi.fn(), opt_in_capturing: vi.fn(),
}));
vi.mock('posthog-js', () => ({ default: sdk }));

beforeEach(() => {
  vi.resetModules();
  vi.resetAllMocks();
  let consent = 'pending';
  sdk.get_explicit_consent_status.mockImplementation(() => consent);
  sdk.opt_in_capturing.mockImplementation(() => { consent = 'granted'; });
  sdk.opt_out_capturing.mockImplementation(() => { consent = 'denied'; });
  sdk.getGroups.mockReturnValue({});
  vi.stubEnv('PROD', true);
  vi.stubEnv('VITE_POSTHOG_PROJECT_TOKEN', 'phc_test');
  vi.stubEnv('VITE_POSTHOG_HOST', 'https://us.i.posthog.com');
  vi.stubGlobal('window', { location: { hostname: 'sparkinventory.com', pathname: '/', search: '?utm_source=google&email=private@example.com' } });
  vi.stubGlobal('document', { cookie: 'cookieyes-consent=action:yes,consent:yes,analytics:yes', referrer: 'https://search.example/path?secret=value' });
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

it('waits for a choice and switches to cookieless capture on rejection', async () => {
  const analytics = await import('./analytics');
  document.cookie = '';
  analytics.capturePageview('/');
  expect(sdk.init).not.toHaveBeenCalled();
  document.cookie = 'cookieyes-consent=action:yes,consent:yes,analytics:yes';
  analytics.capturePageview('/');
  expect(sdk.capture).toHaveBeenCalledTimes(1);
  document.cookie = 'cookieyes-consent=action:yes,consent:no,analytics:no';
  analytics.capturePageview('/');
  expect(sdk.capture).toHaveBeenCalledTimes(2);
  expect(sdk.opt_out_capturing).toHaveBeenCalled();
  document.cookie = 'cookieyes-consent=action:yes,consent:yes,analytics:yes';
  sdk.has_opted_out_capturing.mockReturnValue(true);
  analytics.capturePageview('/');
  expect(sdk.opt_in_capturing).toHaveBeenCalledWith({ captureEventName: false });
  expect(sdk.capture).toHaveBeenCalledTimes(3);
});

it('re-enables capture on first load after consent is granted again', async () => {
  const analytics = await import('./analytics');
  sdk.has_opted_out_capturing.mockReturnValue(true);
  analytics.capturePageview('/');
  expect(sdk.init.mock.calls[0][1].opt_out_persistence_by_default).toBe(true);
  expect(sdk.opt_in_capturing.mock.invocationCallOrder[0]).toBeLessThan(sdk.capture.mock.invocationCallOrder[0]);
});


describe('hybrid consent privacy boundary', () => {
  it('does not interpret a first-visit default as rejection', async () => {
    const analytics = await import('./analytics');
    document.cookie = 'cookieyes-consent=action:no,consent:no,analytics:no';
    analytics.capturePageview('/');
    expect(sdk.init).not.toHaveBeenCalled();
    expect(sdk.capture).not.toHaveBeenCalled();
  });
  it('sends only cookieless measurements after rejection', async () => {
    const analytics = await import('./analytics');
    document.cookie = 'cookieyes-consent=action:yes,consent:no,analytics:no';
    analytics.capturePageview('/');
    expect(sdk.init.mock.calls[0][1].cookieless_mode).toBe('on_reject');
    expect(sdk.opt_out_capturing).toHaveBeenCalled();
    expect(sdk.startSessionRecording).not.toHaveBeenCalled();
    expect(sdk.register_once).not.toHaveBeenCalled();
    const filter = sdk.init.mock.calls[0][1].before_send;
    const properties = { token:'phc_test', route:'/', distinct_id:'old-user', $user_id:'old-user', $groups:{tenant:'tenant-1'}, utm_campaign:'campaign', $session_id:'session', $cookieless_mode:true };
    expect(filter({event:'$pageview',properties}).properties).toMatchObject({distinct_id:'$posthog_cookieless',$cookieless_mode:true});
    for (const key of ['$user_id','$groups','$session_id','utm_campaign']) expect(filter({event:'$pageview',properties}).properties[key]).toBeUndefined();
    expect(filter({event:'$identify',properties})).toBeNull();
    expect(filter({event:'$snapshot',properties})).toBeNull();
    expect(filter({event:'$pageview',properties:{route:'/',distinct_id:'old-user'}})).toBeNull();
  });
  it('masks replay, drops networks, and blocks payment subtrees', async () => {
    const analytics = await import('./analytics');
    window.location.pathname = '/dashboard';
    analytics.capturePageview('/dashboard');
    expect(sdk.startSessionRecording).toHaveBeenCalled();
    const config = sdk.init.mock.calls[0][1];
    expect(config.session_recording).toMatchObject({maskAllInputs:true,maskTextSelector:'*',maskAllElementAttributes:true,recordBody:false,recordHeaders:false});
    expect(config.session_recording.blockSelector).toContain('[role="dialog"]');
    expect(config.session_recording.blockSelector).toContain('iframe');
    expect(config.session_recording.maskCapturedNetworkRequestFn({entryType:'resource',name:'https://private-url'})).toBeNull();
    expect(config.session_recording.maskCapturedNetworkRequestFn({name:'https://private-url?token=secret'}).name).not.toContain('secret');
    const snapshot={event:'$snapshot',properties:{$snapshot_data:[{masked:true}],$snapshot_bytes:30,distinct_id:'user'}};
    expect(config.before_send(snapshot)).not.toBeNull();
    document.cookie = 'cookieyes-consent=action:yes,consent:no,analytics:no';
    analytics.capturePageview('/');
    expect(sdk.stopSessionRecording).toHaveBeenCalled();
    expect(config.before_send(snapshot)).toBeNull();
  });
});

it('preserves attribution when rejection changes to acceptance', async () => {
  const analytics = await import('./analytics');
  document.cookie = 'cookieyes-consent=action:yes,consent:no,analytics:no';
  analytics.capturePageview('/');
  expect(sdk.register_once).not.toHaveBeenCalled();
  document.cookie = 'cookieyes-consent=action:yes,consent:yes,analytics:yes';
  analytics.capturePageview('/');
  expect(sdk.register_once).toHaveBeenCalledWith({ utm_source: 'google', initial_referring_domain: 'search.example' });
});

it.each(['/meeting-confirmed/', '/MEETING-CONFIRMED', '/book-a-call/'])('excludes replay on equivalent booking route %s', async (pathname) => {
  const analytics = await import('./analytics');
  window.location.pathname = pathname;
  analytics.capturePageview(pathname);
  expect(sdk.startSessionRecording).not.toHaveBeenCalled();
});
