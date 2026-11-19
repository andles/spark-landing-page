import { describe, expect, it, vi } from 'vitest';
import {
  appendArticlesToSitemap,
  ARTICLE_GUIDES,
  guidesForFeature,
  articlePageTitle,
  cleanArticleHtml,
  extractSoroArticles,
  loadSoroArticleContent,
  loadSoroArticles,
  articleSignupUrl,
  renderArticlePage,
  renderBlogIndex,
  renderMissingArticle,
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
<meta name="robots" content="index, follow, max-snippet:-1">
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
    const url = 'https://sparkinventory.com/blog/seasonal-demand-forecasting/';
    expect(page).toContain('<title>Seasonal Demand &amp; &quot;Curves&quot; | Spark Inventory Blog</title>');
    expect(page).toContain('<meta name="description" content="How seasonal curves shape reorders.">');
    expect(page.match(/rel="canonical"/g)).toHaveLength(1);
    expect(page).toContain(`<link rel="canonical" href="${url}">`);
    expect(page).toContain(`<meta property="og:url" content="${url}">`);
    expect(page).toContain('<meta property="og:type" content="article">');
    expect(page).toContain('<meta property="og:image" content="https://cdn.example/s.jpg">');
    expect(page).not.toContain('og:image:width');
    expect(page).toContain('"@type":"BlogPosting"');
    expect(page).not.toContain('CollectionPage');
  });

  it('publishes the article and its breadcrumb as structured data', () => {
    const json = /<script id="route-jsonld" type="application\/ld\+json">([\s\S]*?)<\/script>/.exec(page)?.[1] ?? '';
    const graph = JSON.parse(json)['@graph'];
    const url = 'https://sparkinventory.com/blog/seasonal-demand-forecasting/';
    const posting = graph.find((node: { '@type': string }) => node['@type'] === 'BlogPosting');
    expect(posting.datePublished).toBe(article.publishedDate);
    expect(posting.dateModified).toBe(article.publishedDate);
    expect(posting.breadcrumb).toEqual({ '@id': `${url}#breadcrumb` });
    const crumbs = graph.find((node: { '@type': string }) => node['@type'] === 'BreadcrumbList');
    expect(crumbs['@id']).toBe(`${url}#breadcrumb`);
    expect(crumbs.itemListElement.map((item: { name: string; item: string }) => [item.name, item.item])).toEqual([
      ['Spark Inventory', 'https://sparkinventory.com/'],
      ['Blog', 'https://sparkinventory.com/blog/'],
      [article.title, url],
    ]);
  });

  it('makes the article title the page heading', () => {
    expect(page.match(/<h1/g)).toHaveLength(1);
    expect(page).toContain('<h1>Seasonal Demand &amp; &quot;Curves&quot;</h1>');
    expect(page).not.toContain('<h1>Spark Inventory Blog</h1>');
  });

  it('offers a free sign-up under the date and after the article, tagged with the article', () => {
    const signup = 'https://app.sparkinventory.com/sign-up?source=blog-seasonal-demand-forecasting&amp;utm_content=blog-seasonal-demand-forecasting';
    expect(page.match(new RegExp(signup.replace(/[?]/g, '\\?'), 'g'))).toHaveLength(2);
    expect(page).toMatch(/<\/time><aside class="soro-cta-intro"[^>]*>[^<]*<a href="[^"]+">Start free<\/a><\/aside><div><p>Seasonal body\.<\/p><\/div><aside class="soro-cta-end"/);
    // The link back to the blog stays last, after the offer.
    expect(page).toMatch(/<\/aside><p><a href="\/blog\/">All Spark Inventory Blog articles<\/a><\/p><\/article>/);
  });

  it('puts the article text in the widget mount point for crawlers', () => {
    expect(page).toContain('<div id="soro-blog"><article class="soro-article"><time datetime="2026-09-01">September 1, 2026</time>');
    expect(page).toContain('<div><p>Seasonal body.</p></div>');
    expect(page).not.toContain('<h2>Seasonal Demand');
  });
});

it('articlePageTitle keeps article titles first and within 60 characters', () => {
  expect(articlePageTitle('Seasonal Demand Forecasting')).toBe('Seasonal Demand Forecasting | Spark Inventory Blog');
  expect(articlePageTitle('How to Set Reorder Points for Seasonality')).toBe('How to Set Reorder Points for Seasonality | Spark Inventory');
  expect(articlePageTitle('How to Set Reorder Points for Seasonal SKUs in Q4')).toBe('How to Set Reorder Points for Seasonal SKUs in Q4 | Spark');
  const long = 'Safety Stock Formulas Every Multichannel Seller Should Know Now';
  expect(articlePageTitle(long)).toBe(long);
});

it('renderBlogIndex links every article from /blog/', () => {
  const page = renderBlogIndex(blogHtml, [article]);
  expect(page).toContain('<h1>Spark Inventory Blog</h1>');
  expect(page).toContain('<div id="soro-blog"><ul><li><a href="/blog/seasonal-demand-forecasting/">');
  expect(renderBlogIndex(blogHtml, [])).toBe(blogHtml);
});

it('appendArticlesToSitemap lists every article URL', () => {
  const xml = '<?xml version="1.0"?>\n<urlset>\n  <url><loc>https://sparkinventory.com/blog/</loc></url>\n</urlset>\n';
  expect(appendArticlesToSitemap(xml, [article])).toContain(
    '  <url><loc>https://sparkinventory.com/blog/seasonal-demand-forecasting/</loc><lastmod>2026-09-01</lastmod></url>\n</urlset>',
  );
});

it('renderMissingArticle keeps the article links but asks search engines not to index', () => {
  const page = renderMissingArticle(blogHtml, [article]);
  expect(page).toContain('<meta name="robots" content="noindex, follow">');
  expect(page).toContain('<a href="/blog/seasonal-demand-forecasting/">');
});

it('articleSignupUrl opens the app sign-up with the article as its source', () => {
  const url = new URL(articleSignupUrl('set-supplier-lead-times'));
  expect(url.origin + url.pathname).toBe('https://app.sparkinventory.com/sign-up');
  expect(url.searchParams.get('source')).toBe('blog-set-supplier-lead-times');
  expect(url.searchParams.get('utm_content')).toBe('blog-set-supplier-lead-times');
});

describe('related guides', () => {
  const guidePage = renderArticlePage(blogHtml, { ...article, slug: 'set-supplier-lead-times', title: 'Supplier Lead Time' }, '<p>Body.</p>');

  it('links a guide to its related guides between the text and the end offer', () => {
    expect(guidePage).toMatch(/<div><p>Body\.<\/p><\/div><nav class="soro-related"[^>]*><h2 id="soro-related-heading">Related guides<\/h2><ul>/);
    expect(guidePage).toContain('<a href="/blog/ecommerce-demand-forecasting-software/">Ecommerce demand forecasting</a>');
    expect(guidePage).toContain('<a href="/blog/what-is-inventory-aging/">What is inventory aging?</a>');
    expect(guidePage).not.toContain('href="/blog/set-supplier-lead-times/"');
  });

  it("points the end offer's secondary link at the guide's feature page", () => {
    expect(guidePage).toContain('<a class="soro-cta-secondary" href="/features/purchasing/">Purchasing and reorder planning in Spark</a>');
  });

  it('leaves other articles without a related block and with the default secondary link', () => {
    const page = renderArticlePage(blogHtml, article, '<p>Seasonal body.</p>');
    expect(page).not.toContain('soro-related');
    expect(page).toContain('<a class="soro-cta-secondary" href="/demand-forecasting-software/">How Spark forecasts demand</a>');
  });

  it('only relates guides that exist, never the guide itself', () => {
    const slugs = new Set(ARTICLE_GUIDES.map((guide) => guide.slug));
    expect(slugs.size).toBe(ARTICLE_GUIDES.length);
    for (const guide of ARTICLE_GUIDES) {
      expect(guide.related.length).toBeGreaterThan(0);
      for (const slug of guide.related) {
        expect(slugs.has(slug)).toBe(true);
        expect(slug).not.toBe(guide.slug);
      }
    }
  });

  it('gives every guide at least one feature page that links to it', () => {
    for (const guide of ARTICLE_GUIDES) {
      expect(guide.featurePages.length).toBeGreaterThan(0);
      for (const path of guide.featurePages) expect(path).toMatch(/^\/[a-z0-9/-]+\/$/);
    }
    expect(guidesForFeature('/features/inventory/').map((guide) => guide.slug)).toEqual([
      'ecommerce-demand-forecasting-software',
      'what-is-inventory-aging',
      'cloud-based-inventory-management',
    ]);
    expect(guidesForFeature('/features/mobile/')).toEqual([]);
  });
});
