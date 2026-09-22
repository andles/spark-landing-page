import { maskReplayAttribute } from './replayPrivacy';
import { getAnalyticsConsent, hasAnalyticsConsent } from './analyticsConsent';
function runAnalytics(action: () => void): void {
  try { action(); } catch { console.warn("PostHog analytics could not capture this action."); }
}

import { findRouteMeta } from './seo/routeMeta';
import posthog from 'posthog-js';

// Keep this capture contract aligned with the other Spark frontend. Only public
// route labels and deliberately selected properties may leave the browser.
const allowedProperties = new Set([
  'token', 'distinct_id', '$device_id', '$user_id', '$anon_distinct_id',
  '$session_id', '$window_id', '$lib', '$lib_version', '$browser', '$browser_version',
  '$os', '$os_version', '$device_type', '$screen_height', '$screen_width',
  '$viewport_height', '$viewport_width', '$is_identified', '$process_person_profile',
  '$groups', '$group_type', '$group_key', 'surface', 'route', 'signup_source', 'booking_source',
  'initial_referring_domain',
  // PostHog needs the user agent for bot classification and the cookieless
  // hash, and the referring domain (never the full referrer URL) for channels.
  '$raw_user_agent', '$referring_domain', '$timezone',
  // Scroll depth and time on page. $prev_pageview_pathname is rewritten to a
  // route label in before_send.
  '$prev_pageview_pathname', '$prev_pageview_duration',
  '$prev_pageview_max_scroll_percentage', '$prev_pageview_last_scroll_percentage',
  '$prev_pageview_max_content_percentage', '$prev_pageview_last_content_percentage',
  // Web vitals values only. The matching *_event attribution objects carry
  // element selectors and URLs, so they stay out.
  '$web_vitals_LCP_value', '$web_vitals_CLS_value', '$web_vitals_FCP_value', '$web_vitals_INP_value',
]);
// First-touch campaign parameters. Keep this list aligned with the app, which
// reads the same cross-subdomain cookie so signups inherit the landing click.
export const attributionParams = [
  'utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content', 'gclid', 'gbraid', 'wbraid',
] as const;
attributionParams.forEach((key) => allowedProperties.add(key));
const allowedEvents = new Set(['$pageview', '$pageleave', '$web_vitals', '$identify', '$groupidentify', 'signup_completed', 'signup_clicked', 'demo_clicked', 'meeting_booked']);
// Cookieless (rejected) capture only counts visits. PostHog hashes the request
// IP with $raw_user_agent, $host and $timezone, so those must survive or the
// event is dropped at ingestion.
const cookielessProperties = new Set(['token', 'route', 'signup_source', '$raw_user_agent', '$timezone']);
const cookielessEvents = new Set(['$pageview', 'signup_clicked', 'demo_clicked', 'meeting_booked']);
const meetingBookedKey = 'spark:meeting_booked';
const internalDeviceKey = 'spark:analytics_internal';
let initialized = false;
let appliedConsent: ReturnType<typeof getAnalyticsConsent> = 'pending';

// Team devices opt out with ?spark_internal=1 (and back in with =0) so their
// anonymous visits stop mixing with prospects. The flag stays on the device.
function suppressed(): boolean {
  try {
    const flag = new URLSearchParams(window.location.search).get('spark_internal');
    if (flag === '1') window.localStorage.setItem(internalDeviceKey, '1');
    if (flag === '0') window.localStorage.removeItem(internalDeviceKey);
    return window.localStorage.getItem(internalDeviceKey) === '1';
  } catch {
    return false;
  }
}

// Recording is opt-in and excludes account, authentication and billing routes.
function replayAllowed(): boolean {
  const path = window.location.pathname.replace(/\/+$/, '').toLowerCase();
  return !suppressed() && hasAnalyticsConsent() && !path.startsWith('/r/')
    && !['/book-a-call', '/meeting-confirmed'].includes(path);
}

// SDK-generated events ($pageleave, $web_vitals) carry no route label, so
// derive one from the URL they describe.
function eventRoute(properties: Record<string, unknown>): string {
  if (typeof properties.route === 'string') return properties.route;
  try {
    if (typeof properties.$current_url === 'string') return analyticsRoute(new URL(properties.$current_url).pathname);
  } catch {
    // Fall through to the current page.
  }
  return analyticsRoute(window.location.pathname);
}

function registerAttribution(): void {
  const campaign: Record<string, string> = {};
  const params = new URLSearchParams(window.location.search);
  attributionParams.forEach((key) => {
    const value = params.get(key);
    if (value) campaign[key] = value.slice(0, 200);
  });
  if (document.referrer) {
    try {
      const referrer = new URL(document.referrer);
      if (!['sparkinventory.com', 'www.sparkinventory.com', 'app.sparkinventory.com'].includes(referrer.hostname)) {
        campaign.initial_referring_domain = referrer.hostname;
      }
    } catch {
      // Invalid browser referrers carry no useful attribution.
    }
  }
  posthog.register_once(campaign);
}

function applyConsent(): void {
  const consent = getAnalyticsConsent();
  if (consent !== appliedConsent || posthog.get_explicit_consent_status() !== (consent === 'accepted' ? 'granted' : 'denied')) {
    posthog.stopSessionRecording();
    if (consent === 'accepted') { posthog.opt_in_capturing({ captureEventName: false }); registerAttribution(); }
    else posthog.opt_out_capturing();
    appliedConsent = consent;
  }
  if (replayAllowed()) posthog.startSessionRecording();
  else posthog.stopSessionRecording();
}

export function initializeAnalytics(): boolean {
  const consent = getAnalyticsConsent();
  if (consent === 'pending') {
    if (initialized) {
      posthog.stopSessionRecording();
      posthog.opt_out_capturing();
      appliedConsent = 'pending';
    }
    return false;
  }
  if (initialized) {
    applyConsent();
    return true;
  }
  const token = import.meta.env.VITE_POSTHOG_PROJECT_TOKEN?.trim();
  const host = import.meta.env.VITE_POSTHOG_HOST?.trim();
  if (!import.meta.env.PROD || typeof window === 'undefined' || !['sparkinventory.com', 'www.sparkinventory.com'].includes(window.location.hostname) || !token || !host) return false;
  posthog.init(token, {
    api_host: host,
    defaults: '2026-05-30',
    cookieless_mode: 'on_reject',
    persistence: 'localStorage+cookie',
    cross_subdomain_cookie: true,
    cookieWinsOnConflict: true,
    cookie_persisted_properties: [...attributionParams, 'initial_referring_domain'],
    secure_cookie: true,
    opt_out_persistence_by_default: true,
    autocapture: false,
    capture_pageview: false,
    capture_pageleave: true,
    capture_dead_clicks: false,
    capture_exceptions: false,
    capture_heatmaps: false,
    capture_performance: { web_vitals: true, network_timing: false },
    disable_session_recording: true,
    disable_surveys: true,
    advanced_disable_feature_flags: true,
    enable_recording_console_log: false,
    session_recording: {
      maskAllInputs: true,
      maskTextSelector: 'input, textarea, select, [contenteditable], [data-analytics-private], .ph-mask',
      maskAllElementAttributes: false,
      maskAttributeFn: maskReplayAttribute,
      blockSelector: 'iframe, video, canvas, object, embed, [role="dialog"], [data-analytics-private], input[type="hidden"], input[type="file"]',
      recordCrossOriginIframes: false,
      recordHeaders: false,
      recordBody: false,
      captureJsonLd: false,
      maskCapturedNetworkRequestFn: (data) => 'entryType' in data ? null : ({ entryType: 'navigation', startTime: 0, duration: 0, name: "https://sparkinventory.com/" }),
    },
    person_profiles: 'identified_only',
    save_campaign_params: false,
    save_referrer: false,
    before_send: (event) => {
      const consent = getAnalyticsConsent();
      if (!event || consent === 'pending' || suppressed()) return null;
      if (event.event === '$snapshot') {
        if (consent !== 'accepted' || !replayAllowed()) return null;
        const properties = Object.fromEntries(Object.entries(event.properties).filter(([key]) =>
          ['token', 'distinct_id', '$snapshot_data', '$snapshot_bytes', '$session_id', '$window_id'].includes(key)));
        return { ...event, properties, $set: undefined, $set_once: undefined };
      }
      if (consent === 'accepted' && event.properties.$cookieless_mode === true) return null;
      if (!allowedEvents.has(event.event)) return null;
      if (consent === 'rejected' && ['$identify', '$groupidentify'].includes(event.event)) return null;
      const properties: Record<string, unknown> = Object.fromEntries(Object.entries(event.properties).filter(([key]) => allowedProperties.has(key)));
      properties.route = eventRoute(event.properties);
      if (typeof properties.$prev_pageview_pathname === 'string') {
        properties.$prev_pageview_pathname = analyticsRoute(properties.$prev_pageview_pathname);
      }
      // The cookie keeps first-touch campaign values for app signups, but an
      // event only reports the ones in this page's URL. Otherwise every later
      // visit from the browser would repeat the first ad click and PostHog
      // would classify it as that paid channel.
      const pageParams = new URLSearchParams(window.location.search);
      attributionParams.forEach((key) => {
        const value = pageParams.get(key);
        if (value) properties[key] = value.slice(0, 200);
        else delete properties[key];
      });
      if (consent === 'rejected') {
        // Discard any event queued under a previously identified session.
        if (event.properties.$cookieless_mode !== true || !cookielessEvents.has(event.event)) return null;
        for (const key of Object.keys(properties)) {
          if (!cookielessProperties.has(key)) delete properties[key];
        }
        properties.distinct_id = '$posthog_cookieless';
        properties.$cookieless_mode = true;
      }
      properties.surface = 'landing';
      // Every captured event carries a route label. Rebuild the URL from it so
      // $current_url filters work for clicks too, without leaking the raw query.
      properties.$host = 'sparkinventory.com';
      properties.$pathname = properties.route;
      properties.$current_url = `https://sparkinventory.com${properties.route}`;
      return { ...event, properties, $set: undefined, $set_once: undefined };
    },
  });
  initialized = true;
  applyConsent();

  return true;
}

export function analyticsRoute(pathname: string): string {
  if (pathname.startsWith('/r/')) return '/r/:slug';
  if (pathname === '/book-a-call') return pathname;
  const normalized = pathname.replace(/\/+$/, '') || '/';
  return findRouteMeta(normalized) ? normalized : '/404';
}

export function capturePageview(pathname: string): void {
  runAnalytics(() => {
  if (initializeAnalytics()) posthog.capture('$pageview', { route: analyticsRoute(pathname) });

  });
}

export function captureCta(event: 'signup_clicked' | 'demo_clicked'): void {
  runAnalytics(() => {
  if (initializeAnalytics()) posthog.capture(event, { route: analyticsRoute(window.location.pathname) });

  });
}

// Calendly redirects to /meeting-confirmed after a real booking. Count it once
// per browser session so a refresh or a later consent change does not re-count.
export function captureMeetingBooked(): void {
  runAnalytics(() => {
    if (!initializeAnalytics()) return;
    try { if (window.sessionStorage.getItem(meetingBookedKey)) return; } catch { /* storage unavailable */ }
    const params = new URLSearchParams(window.location.search);
    const bookingSource = params.get('source') === 'fishbowl_lp' || params.get('utm_content') === 'fishbowl_lp' ? 'fishbowl_lp' : 'demo';
    posthog.capture('meeting_booked', { route: '/meeting-confirmed', booking_source: bookingSource });
    try { window.sessionStorage.setItem(meetingBookedKey, '1'); } catch { /* storage unavailable */ }
  });
}
