import { describe, expect, it, vi } from 'vitest';
import {
  appendArticlesToSitemap,
  cleanArticleHtml,
  extractSoroArticles,
  loadSoroArticleContent,
  loadSoroArticles,
  renderArticlePage,
  renderBlogIndex,
  SORO_EMBED_URL,
  type SoroArticle,
} from './soro';

const embedScript = (articles: unknown[]) =>
  `(function(){var SORO_API_BASE = 'https://app.trysoro.com';\nvar SORO_ARTICLES = ${JSON.stringify(articles)};\nvar other = [1];})();`;

const response = (body: string | object, ok = true) => ({
  ok,
  status: ok ? 200 : 500,
  text: async () => (typeof body === 'string' ? body : JSON.stringify(body)),
  json: async () => body,
});

// Shape of the prerendered dist/blog/index.html head and mount point.
const blogHtml = `<html><head><title>Inventory Management Blog | Spark Inventory</title>
<meta name="description" content="Blog description" />
<link rel="canonical" href="https://sparkinventory.com/blog/">
<meta property="og:type" content="website">
<meta property="og:title" content="Blog">
<meta property="og:description" content="Blog">
<meta property="og:url" content="https://sparkinventory.com/blog/">
<meta property="og:image" content="https://sparkinventory.com/social.jpg">
<meta property="og:image:type" content="image/jpeg">
<meta property="og:image:width" content="1200">
<meta name="twitter:title" content="Blog">
<meta name="twitter:description" content="Blog">
<meta name="twitter:image" content="https://sparkinventory.com/social.jpg">
<script id="route-jsonld" type="application/ld+json">{"@type":"CollectionPage"}</script>
</head><body><div id="root"><h1>Spark Inventory Blog</h1><div id="soro-blog"></div></div></body></html>`;

const article: SoroArticle = {
  id: 'a1',
  slug: 'seasonal-demand-forecasting',
  title: 'Seasonal Demand & "Curves"',
  excerpt: 'How seasonal curves shape reorders.',
  content: '',
  publishedDate: '2026-09-01',
  image: 'https://cdn.example/s.jpg',
};

describe('extractSoroArticles', () => {
  it('reads the inline article array, including brackets inside strings', () => {
    const articles = [{ id: 'a', title: 'Arrays [and] {braces} "quoted"', slug: 'a' }];
    expect(extractSoroArticles(embedScript(articles))).toEqual(articles);
  });

  it('fails loudly when Soro changes the script shape', () => {
    expect(() => extractSoroArticles('var somethingElse = [];')).toThrow(/SORO_ARTICLES/);
  });
});

describe('cleanArticleHtml', () => {
  it('strips scripts and inline handlers and demotes h1 headings', () => {
    const html = '<h1 class="x">Title</h1><p onclick="steal()">Body</p><script>alert(1)</script><a href="javascript:alert(1)">x</a>';
    expect(cleanArticleHtml(html)).toBe('<h2 class="x">Title</h2><p>Body</p><a href="#">x</a>');
  });
});

describe('loading from Soro', () => {
  it('lists articles newest first and drops invalid or duplicate slugs', async () => {
    const fetchImpl = vi.fn(async () =>
      response(embedScript([
        { id: '1', title: 'Older', slug: 'older-post', isoDate: '2026-08-01T10:00:00Z' },
        { id: '2', title: 'Newer', slug: 'newer-post', isoDate: '2026-09-01' },
        { id: '3', title: 'Duplicate', slug: 'older-post' },
        { id: '4', title: 'Bad slug', slug: '../escape' },
      ])),
    );
    const articles = await loadSoroArticles(fetchImpl);
    expect(fetchImpl).toHaveBeenCalledWith(SORO_EMBED_URL);
    expect(articles.map((a) => [a.slug, a.publishedDate])).toEqual([['newer-post', '2026-09-01'], ['older-post', '2026-08-01']]);
  });

  it('fetches a body from the article endpoint only when it is not inline', async () => {
    const fetchImpl = vi.fn(async () => response({ content: '<h1>Fetched</h1>' }));
    expect(await loadSoroArticleContent(article, fetchImpl)).toBe('<h2>Fetched</h2>');
    expect(fetchImpl).toHaveBeenCalledWith(expect.stringMatching(/\/article\/a1$/));
    expect(await loadSoroArticleContent({ ...article, content: '<p>Inline</p>' }, fetchImpl)).toBe('<p>Inline</p>');
    expect(fetchImpl).toHaveBeenCalledTimes(1);
  });

  it('rejects when Soro is unreachable so the edge function serves the static page', async () => {
    await expect(loadSoroArticles(async () => response('', false))).rejects.toThrow(/HTTP 500/);
  });
});

describe('renderArticlePage', () => {
  const page = renderArticlePage(blogHtml, article, '<p>Seasonal body.</p>');

  it('gives the article URL its own title, description, canonical and social tags', () => {
    const url = 'https://sparkinventory.com/blog/?post=seasonal-demand-forecasting';
    expect(page).toContain('<title>Seasonal Demand &amp; &quot;Curves&quot; | Spark Inventory Blog</title>');
    expect(page).toContain('<meta name="description" content="How seasonal curves shape reorders.">');
    expect(page.match(/rel="canonical"/g)).toHaveLength(1);
    expect(page).toContain(`<link rel="canonical" href="${url}" data-soro="true">`);
    expect(page).toContain(`<meta property="og:url" content="${url}">`);
    expect(page).toContain('<meta property="og:type" content="article">');
    expect(page).toContain('<meta property="og:image" content="https://cdn.example/s.jpg">');
    expect(page).not.toContain('og:image:width');
    expect(page).toContain('"@type":"BlogPosting"');
    expect(page).not.toContain('CollectionPage');
  });

  it('puts the article text in the widget mount point for crawlers', () => {
    expect(page).toContain('<div id="soro-blog"><article><h2>Seasonal Demand &amp; &quot;Curves&quot;</h2>');
    expect(page).toContain('<time datetime="2026-09-01">September 1, 2026</time><div><p>Seasonal body.</p></div>');
    expect(page.match(/<h1/g)).toHaveLength(1);
  });
});

it('renderBlogIndex links every article from /blog/', () => {
  const page = renderBlogIndex(blogHtml, [article]);
  expect(page).toContain('<div id="soro-blog"><ul><li><a href="/blog/?post=seasonal-demand-forecasting">');
  expect(renderBlogIndex(blogHtml, [])).toBe(blogHtml);
});

it('appendArticlesToSitemap lists every article URL', () => {
  const xml = '<?xml version="1.0"?>\n<urlset>\n  <url><loc>https://sparkinventory.com/blog/</loc></url>\n</urlset>\n';
  expect(appendArticlesToSitemap(xml, [article])).toContain(
    '  <url><loc>https://sparkinventory.com/blog/?post=seasonal-demand-forecasting</loc><lastmod>2026-09-01</lastmod></url>\n</urlset>',
  );
});
