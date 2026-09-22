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
    // The page URL in this suite carries ?utm_source=google, so the landing hit reports it.
    expect(result.properties).toEqual({ distinct_id: 'anonymous', route: '/', surface: 'landing', utm_source: 'google', $host: 'sparkinventory.com', $pathname: '/', $current_url: 'https://sparkinventory.com/' });
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
    expect(config.session_recording).toMatchObject({maskAllInputs:true,maskTextSelector:'input, textarea, select, [contenteditable], [data-analytics-private], .ph-mask',maskAllElementAttributes:false,recordBody:false,recordHeaders:false});
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

it.each(['/meeting-confirmed/', '/MEETING-CONFIRMED', '/book-a-call/', '/r/prospect', '/R/PROSPECT/'])('excludes replay on equivalent booking route %s', async (pathname) => {
  const analytics = await import('./analytics');
  window.location.pathname = pathname;
  analytics.capturePageview(pathname);
  expect(sdk.startSessionRecording).not.toHaveBeenCalled();
});

it('keeps Google click ids and full UTM attribution for first-touch analysis', async () => {
  const analytics = await import('./analytics');
  window.location.search = '?gclid=Cj0abc&gbraid=gb1&wbraid=wb1&utm_source=google&utm_medium=cpc&utm_campaign=brand&utm_term=fishbowl&utm_content=ad1&email=private@example.com';
  analytics.capturePageview('/pricing');
  expect(sdk.register_once).toHaveBeenCalledWith({ gclid: 'Cj0abc', gbraid: 'gb1', wbraid: 'wb1', utm_source: 'google', utm_medium: 'cpc', utm_campaign: 'brand', utm_term: 'fishbowl', utm_content: 'ad1', initial_referring_domain: 'search.example' });
  const config = sdk.init.mock.calls[0][1];
  expect(config.cookie_persisted_properties).toEqual(expect.arrayContaining(['gclid', 'gbraid', 'wbraid', 'utm_term', 'utm_content']));
  const result = config.before_send({ event: '$pageview', properties: { route: '/pricing', gclid: 'Cj0abc', utm_term: 'fishbowl', email: 'private@example.com' } });
  expect(result.properties).toMatchObject({ gclid: 'Cj0abc', utm_term: 'fishbowl' });
  expect(result.properties.email).toBeUndefined();
});

it('gives click events the same route-derived page URL as pageviews', async () => {
  const analytics = await import('./analytics');
  window.location.pathname = '/fishbowl-alternative';
  analytics.captureCta('demo_clicked');
  expect(sdk.capture).toHaveBeenCalledWith('demo_clicked', { route: '/fishbowl-alternative' });
  const filter = sdk.init.mock.calls[0][1].before_send;
  const result = filter({ event: 'demo_clicked', properties: { route: '/fishbowl-alternative', $current_url: 'https://sparkinventory.com/fishbowl-alternative?secret=1' } });
  expect(result.properties).toMatchObject({ $current_url: 'https://sparkinventory.com/fishbowl-alternative', $pathname: '/fishbowl-alternative' });
});

describe('meeting_booked', () => {
  beforeEach(() => {
    const store = new Map<string, string>();
    window.location.pathname = '/meeting-confirmed';
    window.location.search = '?source=fishbowl_lp&invitee_full_name=Private%20Person';
    vi.stubGlobal('sessionStorage', { getItem: (k: string) => store.get(k) ?? null, setItem: (k: string, v: string) => { store.set(k, v); } });
    (window as unknown as { sessionStorage: Storage }).sessionStorage = globalThis.sessionStorage;
  });
  it('captures one booking per session without invitee details', async () => {
    const analytics = await import('./analytics');
    analytics.captureMeetingBooked();
    analytics.captureMeetingBooked();
    const bookings = sdk.capture.mock.calls.filter(([name]) => name === 'meeting_booked');
    expect(bookings).toEqual([['meeting_booked', { route: '/meeting-confirmed', booking_source: 'fishbowl_lp' }]]);
    expect(sdk.init.mock.calls[0][1].before_send({ event: 'meeting_booked', properties: { route: '/meeting-confirmed', booking_source: 'demo' } })).not.toBeNull();
  });
  it('waits for a consent choice before counting', async () => {
    const analytics = await import('./analytics');
    document.cookie = '';
    analytics.captureMeetingBooked();
    expect(sdk.capture).not.toHaveBeenCalled();
    document.cookie = 'cookieyes-consent=action:yes,consent:yes,analytics:yes';
    analytics.captureMeetingBooked();
    expect(sdk.capture).toHaveBeenCalledWith('meeting_booked', expect.objectContaining({ booking_source: 'fishbowl_lp' }));
  });
});

describe('coverage for bot filtering, channels, scroll depth and web vitals', () => {
  it('keeps the user agent, referring domain and timezone but never the full referrer', async () => {
    const analytics = await import('./analytics');
    analytics.capturePageview('/');
    const filter = sdk.init.mock.calls[0][1].before_send;
    const result = filter({ event: '$pageview', properties: { route: '/', $raw_user_agent: 'Mozilla/5.0', $referring_domain: 'www.google.com', $referrer: 'https://www.google.com/search?q=private', $timezone: 'America/Denver' } });
    expect(result.properties).toMatchObject({ $raw_user_agent: 'Mozilla/5.0', $referring_domain: 'www.google.com', $timezone: 'America/Denver', $host: 'sparkinventory.com' });
    expect(result.properties.$referrer).toBeUndefined();
  });
  it('enables page leave and web vitals without network timing', async () => {
    const analytics = await import('./analytics');
    analytics.capturePageview('/');
    expect(sdk.init.mock.calls[0][1]).toMatchObject({ capture_pageleave: true, capture_performance: { web_vitals: true, network_timing: false } });
  });
  it('labels page leave with a route and redacts the previous path', async () => {
    const analytics = await import('./analytics');
    analytics.capturePageview('/');
    const filter = sdk.init.mock.calls[0][1].before_send;
    const result = filter({ event: '$pageleave', properties: { $current_url: 'https://sparkinventory.com/r/private-prospect?x=1', $prev_pageview_pathname: '/r/private-prospect', $prev_pageview_max_scroll_percentage: 0.8, $prev_pageview_duration: 12 } });
    expect(result.properties).toMatchObject({ route: '/r/:slug', $prev_pageview_pathname: '/r/:slug', $prev_pageview_max_scroll_percentage: 0.8, $prev_pageview_duration: 12, $current_url: 'https://sparkinventory.com/r/:slug' });
  });
  it('keeps web vitals values but not their attribution objects', async () => {
    const analytics = await import('./analytics');
    analytics.capturePageview('/');
    const filter = sdk.init.mock.calls[0][1].before_send;
    const result = filter({ event: '$web_vitals', properties: { $current_url: 'https://sparkinventory.com/pricing?gclid=x', $web_vitals_LCP_value: 2100, $web_vitals_LCP_event: { attribution: { element: 'div.private' } } } });
    expect(result.properties).toMatchObject({ route: '/pricing', $web_vitals_LCP_value: 2100 });
    expect(result.properties.$web_vitals_LCP_event).toBeUndefined();
  });
  it('reports campaign values only on the page whose URL carries them', async () => {
    const analytics = await import('./analytics');
    window.location.search = '';
    analytics.capturePageview('/pricing');
    const filter = sdk.init.mock.calls[0][1].before_send;
    const result = filter({ event: '$pageview', properties: { route: '/pricing', gclid: 'old-click', utm_source: 'google', initial_referring_domain: 'www.google.com' } });
    expect(result.properties.gclid).toBeUndefined();
    expect(result.properties.utm_source).toBeUndefined();
    expect(result.properties.initial_referring_domain).toBe('www.google.com');
  });
  it('reports a new ad click instead of the stored first-touch one', async () => {
    const analytics = await import('./analytics');
    window.location.search = '?gclid=second-click';
    analytics.capturePageview('/pricing');
    const filter = sdk.init.mock.calls[0][1].before_send;
    const result = filter({ event: '$pageview', properties: { route: '/pricing', gclid: 'first-click', utm_source: 'google' } });
    expect(result.properties.gclid).toBe('second-click');
    expect(result.properties.utm_source).toBeUndefined();
  });
  it('keeps what the cookieless hash needs and drops engagement events after rejection', async () => {
    const analytics = await import('./analytics');
    document.cookie = 'cookieyes-consent=action:yes,consent:no,analytics:no';
    analytics.capturePageview('/');
    const filter = sdk.init.mock.calls[0][1].before_send;
    const result = filter({ event: '$pageview', properties: { route: '/', $cookieless_mode: true, $raw_user_agent: 'Mozilla/5.0', $timezone: 'Europe/Berlin', $referring_domain: 'www.google.com', $browser: 'Chrome' } });
    expect(result.properties).toMatchObject({ distinct_id: '$posthog_cookieless', $cookieless_mode: true, $raw_user_agent: 'Mozilla/5.0', $timezone: 'Europe/Berlin', $host: 'sparkinventory.com' });
    expect(result.properties.$referring_domain).toBeUndefined();
    expect(result.properties.$browser).toBeUndefined();
    expect(filter({ event: '$pageleave', properties: { $cookieless_mode: true } })).toBeNull();
    expect(filter({ event: '$web_vitals', properties: { $cookieless_mode: true } })).toBeNull();
  });
  it('lets a team device opt out with spark_internal and back in', async () => {
    const store = new Map<string, string>();
    (window as unknown as { localStorage: Pick<Storage, 'getItem' | 'setItem' | 'removeItem'> }).localStorage = { getItem: (k) => store.get(k) ?? null, setItem: (k, v) => { store.set(k, v); }, removeItem: (k) => { store.delete(k); } };
    const analytics = await import('./analytics');
    window.location.search = '?spark_internal=1';
    analytics.capturePageview('/');
    const filter = sdk.init.mock.calls[0][1].before_send;
    expect(filter({ event: '$pageview', properties: { route: '/' } })).toBeNull();
    expect(sdk.startSessionRecording).not.toHaveBeenCalled();
    window.location.search = '';
    expect(filter({ event: '$pageview', properties: { route: '/' } })).toBeNull();
    window.location.search = '?spark_internal=0';
    expect(filter({ event: '$pageview', properties: { route: '/' } })).not.toBeNull();
  });
});
