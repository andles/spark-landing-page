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
  '$groups', '$group_type', '$group_key', 'surface', 'route', 'signup_source',
  'utm_source', 'utm_medium', 'utm_campaign', 'initial_referring_domain',
]);
const allowedEvents = new Set(['$pageview', '$identify', '$groupidentify', 'signup_completed', 'signup_clicked', 'demo_clicked']);
let initialized = false;
let appliedConsent: ReturnType<typeof getAnalyticsConsent> = 'pending';
const suppressed = false;

// Recording is opt-in and excludes account, authentication and billing routes.
function replayAllowed(): boolean {
  const path = window.location.pathname.replace(/\/+$/, '').toLowerCase();
  return !suppressed && hasAnalyticsConsent() && !path.startsWith('/r/')
    && !['/book-a-call', '/meeting-confirmed'].includes(path);
}

function registerAttribution(): void {
  const campaign: Record<string, string> = {};
  const params = new URLSearchParams(window.location.search);
  ['utm_source', 'utm_medium', 'utm_campaign'].forEach((key) => {
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
    cookie_persisted_properties: ['utm_source', 'utm_medium', 'utm_campaign', 'initial_referring_domain'],
    secure_cookie: true,
    opt_out_persistence_by_default: true,
    autocapture: false,
    capture_pageview: false,
    capture_pageleave: false,
    capture_dead_clicks: false,
    capture_exceptions: false,
    capture_heatmaps: false,
    capture_performance: false,
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
      if (!event || consent === 'pending' || suppressed) return null;
      if (event.event === '$snapshot') {
        if (consent !== 'accepted' || !replayAllowed()) return null;
        const properties = Object.fromEntries(Object.entries(event.properties).filter(([key]) =>
          ['token', 'distinct_id', '$snapshot_data', '$snapshot_bytes', '$session_id', '$window_id'].includes(key)));
        return { ...event, properties, $set: undefined, $set_once: undefined };
      }
      if (consent === 'accepted' && event.properties.$cookieless_mode === true) return null;
      if (!allowedEvents.has(event.event)) return null;
      if (consent === 'rejected' && ['$identify', '$groupidentify'].includes(event.event)) return null;
      const properties = Object.fromEntries(Object.entries(event.properties).filter(([key]) => allowedProperties.has(key)));
      if (consent === 'rejected') {
        // Discard any event queued under a previously identified session.
        if (event.properties.$cookieless_mode !== true) return null;
        for (const key of Object.keys(properties)) {
          if (!['token', 'route', 'signup_source'].includes(key)) delete properties[key];
        }
        properties.distinct_id = '$posthog_cookieless';
        properties.$cookieless_mode = true;
      }
      properties.surface = 'landing';
      if (event.event === '$pageview') {
        properties.$pathname = properties.route;
        properties.$current_url = `https://sparkinventory.com${properties.route}`;
      }
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

