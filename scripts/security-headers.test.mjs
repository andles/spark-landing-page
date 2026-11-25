import { readFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { describe, expect, it } from 'vitest';
import {
  ENFORCED_BASELINE,
  THIRD_PARTY,
  apiOverrideOrigin,
  buildContentSecurityPolicy,
  headersFile,
  inlineScriptHashes,
} from './security-headers.mjs';
import { DEFAULT_API_BASE } from '../src/webinarSignup';

const indexHtml = readFileSync(new URL('../index.html', import.meta.url), 'utf8');
const sha = (text) => `'sha256-${createHash('sha256').update(text, 'utf8').digest('base64')}'`;
const directive = (policy, name) => policy.split('; ').find((part) => part.startsWith(`${name} `)) ?? '';

describe('security headers', () => {
  it('allows every inline script in index.html by hash', () => {
    const policy = buildContentSecurityPolicy([indexHtml]);
    const inline = [...indexHtml.matchAll(/<script(?![^>]*\bsrc=)(?![^>]*ld\+json)[^>]*>([\s\S]*?)<\/script>/g)];
    expect(inline.length).toBeGreaterThan(0);
    for (const [, body] of inline) expect(directive(policy, 'script-src')).toContain(sha(body));
  });

  it('skips external scripts and JSON-LD data blocks', () => {
    const html = '<script src="/a.js"></script><script type="application/ld+json">{"a":1}</script><script>run()</script>';
    expect(inlineScriptHashes(html)).toEqual([sha('run()')]);
  });

  it('allows every external script host index.html loads', () => {
    const scriptSrc = directive(buildContentSecurityPolicy([indexHtml]), 'script-src');
    const hosts = [...indexHtml.matchAll(/src\s*=\s*["'](https:\/\/[^/"']+)/g)].map((match) => match[1]);
    expect(hosts.length).toBeGreaterThan(0);
    for (const host of hosts) {
      const wildcard = host.replace(/^https:\/\/[^.]+\./, 'https://*.');
      expect(scriptSrc.includes(host) || scriptSrc.includes(wildcard), host).toBe(true);
    }
  });

  it('never allows unsafe script sources or framing by other sites', () => {
    const policy = buildContentSecurityPolicy([indexHtml]);
    expect(directive(policy, 'script-src')).not.toMatch(/unsafe-inline|unsafe-eval|\*(?!\.)|https:(?!\/\/)/);
    expect(directive(policy, 'frame-ancestors')).toBe("frame-ancestors 'self'");
    expect(directive(policy, 'object-src')).toBe("object-src 'none'");
    expect(ENFORCED_BASELINE).toContain("frame-ancestors 'self'");
  });

  it('enforces the baseline and reports the allowlist until the allowlist is enforced', () => {
    expect(headersFile('POLICY', false)).toBe(`/*\n  Content-Security-Policy: ${ENFORCED_BASELINE}\n  Content-Security-Policy-Report-Only: POLICY\n`);
    expect(headersFile('POLICY', true)).toBe('/*\n  Content-Security-Policy: POLICY\n');
  });

  it('only uses https sources for third-party tags', () => {
    for (const tag of Object.values(THIRD_PARTY)) {
      for (const sources of Object.values(tag)) for (const source of sources) expect(source).toMatch(/^https:\/\/[a-z0-9*.-]+$/);
    }
  });

  it('allows the Spark API the webinar and partner forms post to', () => {
    const connectSrc = directive(buildContentSecurityPolicy([indexHtml]), 'connect-src');
    expect(connectSrc.split(' ')).toContain(new URL(DEFAULT_API_BASE).origin);
  });

  it('allows an https API override and ignores anything else', () => {
    expect(apiOverrideOrigin('https://api.staging.example.com/v1/')).toBe('https://api.staging.example.com');
    expect(apiOverrideOrigin('http://localhost:5000')).toBeNull();
    expect(apiOverrideOrigin('not a url')).toBeNull();
    expect(apiOverrideOrigin('  ')).toBeNull();
  });
});
