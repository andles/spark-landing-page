import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

// The edge function keeps Soro's article list in module state, so each test
// loads a fresh copy.
async function loadEdgeFunction() {
  vi.resetModules();
  return (await import('../../netlify/edge-functions/soro-blog.ts')).default;
}

const shell = `<html><head><title>Blog</title>
<meta name="robots" content="index, follow">
<link rel="canonical" href="https://sparkinventory.com/blog/">
</head><body><div id="root"><h1>Spark Inventory Blog</h1><div id="soro-blog"></div></div></body></html>`;

const soroScript = `var SORO_ARTICLES = ${JSON.stringify([
  { id: 'a1', slug: 'purchase-planning-process', title: 'Purchase Planning', excerpt: 'Plan buys.', content: '<p>Plan body.</p>', isoDate: '2026-09-23' },
])};`;

const context = (body = shell, status = 200) => ({ next: vi.fn(async () => new Response(body, { status })) });

let soroUp = true;
beforeEach(() => {
  soroUp = true;
  vi.stubGlobal(
    'fetch',
    vi.fn(async () => (soroUp ? new Response(soroScript) : new Response('down', { status: 502 }))),
  );
  vi.spyOn(console, 'error').mockImplementation(() => {});
});
afterEach(() => {
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
});

const get = (path: string) => new Request(`https://sparkinventory.com${path}`);

describe('soro-blog edge function', () => {
  it('serves each article at its own path with a self canonical', async () => {
    const edge = await loadEdgeFunction();
    const response = await edge(get('/blog/purchase-planning-process/'), context());
    const html = await response.text();
    expect(response.status).toBe(200);
    expect(html).toContain('<link rel="canonical" href="https://sparkinventory.com/blog/purchase-planning-process/">');
    expect(html).toContain('<p>Plan body.</p>');
  });

  it('permanently redirects widget ?post= links, keeping campaign parameters', async () => {
    const edge = await loadEdgeFunction();
    const ctx = context();
    const response = await edge(get('/blog/?post=purchase-planning-process&utm_source=news'), ctx);
    expect(response.status).toBe(301);
    expect(response.headers.get('location')).toBe('/blog/purchase-planning-process/?utm_source=news');
    expect(ctx.next).not.toHaveBeenCalled();
  });

  it('adds the trailing slash and sends malformed slugs to /blog/', async () => {
    const edge = await loadEdgeFunction();
    expect((await edge(get('/blog/purchase-planning-process'), context())).headers.get('location')).toBe('/blog/purchase-planning-process/');
    expect((await edge(get('/blog/?post=../x'), context())).headers.get('location')).toBe('/blog/');
    expect((await edge(get('/blog/Not_A_Slug/'), context())).headers.get('location')).toBe('/blog/');
  });

  it('answers 404 with noindex for a slug Soro does not publish', async () => {
    const edge = await loadEdgeFunction();
    const response = await edge(get('/blog/deleted-post/'), context());
    expect(response.status).toBe(404);
    expect(await response.text()).toContain('noindex');
  });

  it('keeps serving the last good article list when Soro fails', async () => {
    vi.useFakeTimers();
    try {
      const edge = await loadEdgeFunction();
      await edge(get('/blog/purchase-planning-process/'), context());
      vi.advanceTimersByTime(10 * 60 * 1000);
      soroUp = false;
      const response = await edge(get('/blog/purchase-planning-process/'), context());
      expect(response.status).toBe(200);
      expect(await response.text()).toContain('<p>Plan body.</p>');
    } finally {
      vi.useRealTimers();
    }
  });

  it('asks crawlers to retry, rather than showing /blog/, when Soro has never loaded', async () => {
    soroUp = false;
    const edge = await loadEdgeFunction();
    const response = await edge(get('/blog/purchase-planning-process/'), context());
    expect(response.status).toBe(503);
    expect(response.headers.get('retry-after')).toBe('300');
  });

  it('links /blog/ and the sitemap to the article paths', async () => {
    const edge = await loadEdgeFunction();
    const index = await (await edge(get('/blog/'), context())).text();
    expect(index).toContain('<a href="/blog/purchase-planning-process/">');
    const sitemap = await (await edge(get('/sitemap.xml'), context('<urlset>\n</urlset>'))).text();
    expect(sitemap).toContain('<loc>https://sparkinventory.com/blog/purchase-planning-process/</loc>');
  });

  it('falls back to the static /blog/ page when Soro is down', async () => {
    soroUp = false;
    const edge = await loadEdgeFunction();
    const response = await edge(get('/blog/'), context());
    expect(response.status).toBe(200);
    expect(await response.text()).toBe(shell);
  });
});
