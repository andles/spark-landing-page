import { describe, expect, it } from 'vitest';
import html from '../index.html?raw';

// Runs the inline consent-gated tags script from index.html against a stubbed
// CookieYes, the way the browser does.
const script = /<script id="consent-gated-tags">([\s\S]*?)<\/script>/.exec(html)?.[1];

type Categories = { analytics?: boolean; advertisement?: boolean };

function runTags({ gpc = false }: { gpc?: boolean } = {}) {
  if (!script) throw new Error('index.html has no consent-gated-tags script');
  const listeners = new Map<string, () => void>();
  const loaded: string[] = [];
  const googleConsent: Array<Record<string, string>> = [];
  let ckyConsent: { activeLaw: string; categories: Categories } | undefined;
  const element = () => ({ async: false, type: '', src: '' });
  const window: Record<string, unknown> = {
    getCkyConsent: () => ckyConsent ?? { activeLaw: '', categories: {} },
  };
  new Function('window', 'navigator', 'document', 'gtag', script)(
    window,
    { globalPrivacyControl: gpc },
    {
      addEventListener: (type: string, listener: () => void) => listeners.set(type, listener),
      createElement: element,
      head: { appendChild: (node: { src: string }) => loaded.push(new URL(node.src).hostname) },
    },
    (command: string, action: string, values: Record<string, string>) => {
      if (command === 'consent' && action === 'update') googleConsent.push(values);
    },
  );
  const fire = (event: 'cookieyes_banner_load' | 'cookieyes_consent_update', activeLaw: string, categories: Categories) => {
    ckyConsent = { activeLaw, categories };
    listeners.get(event)?.();
  };
  return { fire, loaded, googleConsent };
}

describe('consent-gated tags', () => {
  it('loads nothing before a banner law is known', () => {
    const tags = runTags();
    tags.fire('cookieyes_consent_update', '', { analytics: true, advertisement: true });
    expect(tags.loaded).toEqual([]);
    expect(tags.googleConsent).toEqual([]);
  });

  it('keeps the EU and UK opt-in banner opted out until the visitor accepts', () => {
    const tags = runTags();
    tags.fire('cookieyes_banner_load', 'gdpr', { analytics: false, advertisement: false });
    expect(tags.loaded).toEqual([]);
    expect(tags.googleConsent).toEqual([{ ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied', analytics_storage: 'denied' }]);
    tags.fire('cookieyes_consent_update', 'gdpr', { analytics: true, advertisement: true });
    expect(tags.loaded).toEqual(['www.phas3.ai', 'snap.licdn.com']);
    expect(tags.googleConsent.at(-1)).toEqual({ ad_storage: 'granted', ad_user_data: 'granted', ad_personalization: 'granted', analytics_storage: 'granted' });
  });

  it('runs the US notice defaults without a click', () => {
    const tags = runTags();
    tags.fire('cookieyes_consent_update', 'ccpa', { analytics: true, advertisement: true });
    tags.fire('cookieyes_banner_load', 'ccpa', { analytics: true, advertisement: true });
    expect(tags.loaded).toEqual(['www.phas3.ai', 'snap.licdn.com']);
    expect(tags.googleConsent).toHaveLength(1);
  });

  it('honors a US opt-out of selling and sharing', () => {
    const tags = runTags();
    tags.fire('cookieyes_banner_load', 'ccpa', { analytics: true, advertisement: false });
    expect(tags.loaded).toEqual(['www.phas3.ai']);
    expect(tags.googleConsent).toEqual([{ ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied', analytics_storage: 'granted' }]);
  });

  it('never loads advertising or attribution tags under Global Privacy Control', () => {
    const tags = runTags({ gpc: true });
    tags.fire('cookieyes_banner_load', 'ccpa', { analytics: true, advertisement: true });
    tags.fire('cookieyes_consent_update', 'gdpr', { analytics: true, advertisement: true });
    expect(tags.loaded).toEqual([]);
    expect(tags.googleConsent.every((values) => values.ad_storage === 'denied' && values.ad_user_data === 'denied')).toBe(true);
  });

  it('keeps the Google tag from loading under Global Privacy Control', () => {
    expect(html).toMatch(/if \(navigator\.globalPrivacyControl === true\) return;\s*var loaded = false;/);
  });
});
