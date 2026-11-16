import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { rememberFirstReferrer, withSignupReferrer } from './signupReferrer';

describe('signup referrer forwarding', () => {
  beforeEach(() => {
    const store = new Map<string, string>();
    vi.stubGlobal('sessionStorage', {
      getItem: (key: string) => store.get(key) ?? null,
      setItem: (key: string, value: string) => store.set(key, value),
    });
  });
  afterEach(() => vi.unstubAllGlobals());

  it('adds the first outside referrer host to an app sign-up link', () => {
    rememberFirstReferrer('https://www.google.com/search?q=private+words');
    rememberFirstReferrer('https://www.bing.com/'); // a later outside referrer does not replace it
    const href = withSignupReferrer('https://app.sparkinventory.com/sign-up?source=blog-x&utm_content=blog-x');
    const url = new URL(href);
    expect(url.searchParams.get('ref')).toBe('www.google.com');
    expect(url.searchParams.get('source')).toBe('blog-x');
    expect(href).not.toContain('private');
  });

  it("ignores Spark's own pages as referrers", () => {
    rememberFirstReferrer('https://www.sparkinventory.com/pricing/');
    expect(withSignupReferrer('https://app.sparkinventory.com/sign-up')).toBe('https://app.sparkinventory.com/sign-up');
  });

  it('leaves other links, and a link that already names a referrer, unchanged', () => {
    rememberFirstReferrer('https://chatgpt.com/');
    expect(withSignupReferrer('https://calendly.com/spark/demo')).toBe('https://calendly.com/spark/demo');
    expect(withSignupReferrer('https://app.sparkinventory.com/sign-in')).toBe('https://app.sparkinventory.com/sign-in');
    expect(withSignupReferrer('https://app.sparkinventory.com/sign-up?ref=claude.ai')).toBe('https://app.sparkinventory.com/sign-up?ref=claude.ai');
    expect(new URL(withSignupReferrer('https://app.sparkinventory.com/shopify-trial')).searchParams.get('ref')).toBe('chatgpt.com');
  });

  it('does nothing when there was no outside referrer or storage is blocked', () => {
    rememberFirstReferrer('');
    expect(withSignupReferrer('https://app.sparkinventory.com/sign-up')).toBe('https://app.sparkinventory.com/sign-up');
    vi.stubGlobal('sessionStorage', {
      getItem: () => {
        throw new Error('blocked');
      },
      setItem: () => {
        throw new Error('blocked');
      },
    });
    expect(() => rememberFirstReferrer('https://www.google.com/')).not.toThrow();
    expect(withSignupReferrer('https://app.sparkinventory.com/sign-up')).toBe('https://app.sparkinventory.com/sign-up');
  });
});
