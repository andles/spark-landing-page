// Build-time Content-Security-Policy for the marketing site.
//
// Usage: node scripts/security-headers.mjs <distDir>
//
// Run after prerender.mjs. It hashes every inline <script> in every built
// HTML page and writes <distDir>/_headers with the site's
// Content-Security-Policy. Netlify applies _headers together with the
// [[headers]] blocks in netlify.toml, which carry the other security
// headers (nosniff, X-Frame-Options, Referrer-Policy, Permissions-Policy).
//
// Rollout: the structural directives (frame-ancestors, object-src,
// base-uri) are enforced now. The full allowlist ships as
// Content-Security-Policy-Report-Only until a browser session on
// production, with every consent category accepted, shows no "violates the
// following Content Security Policy directive" console messages. Then set
// ENFORCE_ALLOWLIST to true so the full policy is enforced.
//
// Hashing at build time means an edit to an inline script in index.html
// (Google tag, consent-gated tags, campaign scripts) is allowed by the
// policy automatically instead of being blocked in production.
//
// To add a third-party tag, add its hosts to THIRD_PARTY below, under the
// directive the browser reports in a "Refused to load" console error.
import { readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { createHash } from 'node:crypto';
import { pathToFileURL } from 'node:url';

// Hosts each third-party tag needs, by directive.
export const THIRD_PARTY = {
  cookieYes: {
    'script-src': ['https://cdn-cookieyes.com'],
    'connect-src': ['https://cdn-cookieyes.com', 'https://log.cookieyes.com', 'https://directory.cookieyes.com'],
    'img-src': ['https://cdn-cookieyes.com'],
  },
  // Google tag (Google Ads conversions, gtag.js), per Google's CSP guide.
  googleTag: {
    'script-src': ['https://*.googletagmanager.com', 'https://www.googleadservices.com', 'https://googleads.g.doubleclick.net', 'https://www.google.com'],
    'connect-src': ['https://*.googletagmanager.com', 'https://*.google-analytics.com', 'https://*.analytics.google.com', 'https://*.g.doubleclick.net', 'https://www.google.com', 'https://google.com', 'https://www.googleadservices.com', 'https://pagead2.googlesyndication.com'],
    'img-src': ['https://*.googletagmanager.com', 'https://*.google-analytics.com', 'https://*.g.doubleclick.net', 'https://www.google.com', 'https://google.com', 'https://www.googleadservices.com', 'https://pagead2.googlesyndication.com'],
    'frame-src': ['https://*.googletagmanager.com', 'https://td.doubleclick.net', 'https://bid.g.doubleclick.net'],
  },
  linkedInInsight: {
    'script-src': ['https://snap.licdn.com'],
    'connect-src': ['https://px.ads.linkedin.com'],
    'img-src': ['https://px.ads.linkedin.com'],
  },
  openAiPixel: {
    'script-src': ['https://bzrcdn.openai.com'],
    'connect-src': ['https://bzrcdn.openai.com', 'https://bzr.openai.com'],
  },
  phas3: {
    'script-src': ['https://www.phas3.ai'],
    'connect-src': ['https://www.phas3.ai', 'https://phas3.ai'],
  },
  calendly: {
    'script-src': ['https://assets.calendly.com'],
    'style-src': ['https://assets.calendly.com'],
    'frame-src': ['https://calendly.com'],
  },
  youTube: {
    'frame-src': ['https://www.youtube-nocookie.com', 'https://www.youtube.com'],
    'img-src': ['https://i.ytimg.com'],
  },
  // Soro blog embed on /blog.
  soro: {
    'script-src': ['https://app.trysoro.com'],
    'connect-src': ['https://app.trysoro.com'],
  },
  sparkForms: {
    'connect-src': ['https://forms.sparkinventory.com'],
  },
};

const BASE = {
  'default-src': ["'self'"],
  'script-src': ["'self'"],
  // React renders style props as inline style attributes, and the consent
  // banner and Calendly widget inject styles.
  'style-src': ["'self'", "'unsafe-inline'"],
  'img-src': ["'self'", 'data:', 'blob:'],
  'font-src': ["'self'", 'data:'],
  'media-src': ["'self'"],
  'connect-src': ["'self'"],
  'frame-src': ["'self'"],
  'worker-src': ["'self'", 'blob:'],
  'object-src': ["'none'"],
  'base-uri': ["'self'"],
  'form-action': ["'self'"],
  'frame-ancestors': ["'self'"],
};

const DIRECTIVE_ORDER = Object.keys(BASE);

export const ENFORCE_ALLOWLIST = false;

// Directives that cannot break a third-party tag, enforced from day one.
export const ENFORCED_BASELINE = "frame-ancestors 'self'; object-src 'none'; base-uri 'self'; upgrade-insecure-requests";

export function htmlFiles(dir) {
  const files = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) files.push(...htmlFiles(path));
    else if (entry.name.endsWith('.html')) files.push(path);
  }
  return files;
}

// Inline scripts the browser executes. JSON-LD and other data blocks are not
// executed, so CSP does not apply to them and they need no hash.
export function inlineScriptHashes(html) {
  const hashes = [];
  for (const match of html.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/gi)) {
    const attrs = match[1];
    if (/\bsrc\s*=/i.test(attrs)) continue;
    const type = (attrs.match(/\btype\s*=\s*["']?([^"'\s>]+)/i) ?? [])[1]?.toLowerCase();
    if (type && !['text/javascript', 'application/javascript', 'module'].includes(type)) continue;
    hashes.push(`'sha256-${createHash('sha256').update(match[2], 'utf8').digest('base64')}'`);
  }
  return hashes;
}

export function buildContentSecurityPolicy(htmlDocuments) {
  const directives = Object.fromEntries(DIRECTIVE_ORDER.map((name) => [name, new Set(BASE[name])]));
  for (const tag of Object.values(THIRD_PARTY)) {
    for (const [name, sources] of Object.entries(tag)) {
      if (!directives[name]) throw new Error(`Unknown CSP directive ${name}`);
      for (const source of sources) directives[name].add(source);
    }
  }
  const hashes = new Set(htmlDocuments.flatMap(inlineScriptHashes));
  for (const hash of [...hashes].sort()) directives['script-src'].add(hash);
  return [...DIRECTIVE_ORDER.map((name) => `${name} ${[...directives[name]].join(' ')}`), 'upgrade-insecure-requests'].join('; ');
}

export function headersFile(policy, enforceAllowlist = ENFORCE_ALLOWLIST) {
  const lines = enforceAllowlist
    ? [`  Content-Security-Policy: ${policy}`]
    : [`  Content-Security-Policy: ${ENFORCED_BASELINE}`, `  Content-Security-Policy-Report-Only: ${policy}`];
  return `/*\n${lines.join('\n')}\n`;
}

function main() {
  const dist = process.argv[2];
  if (!dist) {
    console.error('usage: node scripts/security-headers.mjs <distDir>');
    process.exit(1);
  }
  const pages = htmlFiles(dist);
  const policy = buildContentSecurityPolicy(pages.map((file) => readFileSync(file, 'utf8')));
  writeFileSync(join(dist, '_headers'), headersFile(policy));
  console.log(`wrote ${join(dist, '_headers')} (CSP covering ${pages.length} pages)`);
}

if (import.meta.url === pathToFileURL(process.argv[1] ?? '').href) main();
