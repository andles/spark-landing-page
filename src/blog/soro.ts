// Request-time SEO for the live Soro blog embed.
//
// Soro's widget renders the blog in the browser: the list at /blog/ and each
// article at /blog/?post=<slug>. Without help, crawlers get the same /blog/
// HTML for every article (with a /blog/ canonical) and no sitemap entry, so
// Google never learns the articles exist. The Netlify edge function in
// netlify/edge-functions/soro-blog.ts uses these helpers to add, on each
// request and without a rebuild, the article's head tags and text, crawlable
// links on /blog/, and sitemap entries for every published article.
//
// Everything here is plain TypeScript with no imports so it runs in both the
// Deno edge runtime and Vitest.

const SORO_API_BASE = 'https://app.trysoro.com';
const SORO_TOKEN = '8a7f0d25-8c1f-451d-81aa-277ecf3a5ae9';
const SITE_URL = 'https://sparkinventory.com';

export const SORO_EMBED_URL = `${SORO_API_BASE}/api/embed/${SORO_TOKEN}?theme=dark`;

export interface SoroArticle {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  /** Article body HTML, when the embed script ships it inline. */
  content: string;
  /** Publication date as YYYY-MM-DD, when Soro provides one. */
  publishedDate?: string;
  image?: string;
}

const SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

/** Returns the raw SORO_ARTICLES array literal from the embed script. */
export function extractSoroArticles(script: string): unknown[] {
  const declaration = /\bSORO_ARTICLES\s*=\s*\[/.exec(script);
  if (!declaration) throw new Error('Soro embed script no longer declares SORO_ARTICLES');

  const start = declaration.index + declaration[0].length - 1;
  let depth = 0;
  let inString = false;
  for (let i = start; i < script.length; i++) {
    const char = script[i];
    if (inString) {
      if (char === '\\') i++;
      else if (char === '"') inString = false;
    } else if (char === '"') {
      inString = true;
    } else if (char === '[' || char === '{') {
      depth++;
    } else if (char === ']' || char === '}') {
      depth--;
      if (depth === 0) return JSON.parse(script.slice(start, i + 1)) as unknown[];
    }
  }
  throw new Error('Soro embed script has an unterminated SORO_ARTICLES array');
}

const text = (value: unknown) => (typeof value === 'string' ? value.trim() : '');

export function normalizeSoroArticle(raw: unknown): SoroArticle | null {
  if (!raw || typeof raw !== 'object') return null;
  const record = raw as Record<string, unknown>;
  const id = text(record.id);
  const slug = text(record.slug);
  const title = text(record.title);
  if (!id || !title || !SLUG_PATTERN.test(slug)) return null;

  const isoDate = /^\d{4}-\d{2}-\d{2}/.exec(text(record.isoDate))?.[0];
  const image = text(record.image);
  return {
    id,
    slug,
    title,
    excerpt: text(record.excerpt),
    content: text(record.content),
    ...(isoDate ? { publishedDate: isoDate } : {}),
    ...(/^https:\/\//.test(image) ? { image } : {}),
  };
}

/**
 * Makes Soro's article HTML safe to inline in the page: no scripts or inline
 * handlers, and headings demoted so the page keeps its single h1.
 */
export function cleanArticleHtml(html: string): string {
  return html
    .replace(/<script\b[\s\S]*?<\/script\s*>/gi, '')
    .replace(/<script\b[^>]*\/?>/gi, '')
    .replace(/\son[a-z]+\s*=\s*("[^"]*"|'[^']*'|[^\s>]+)/gi, '')
    .replace(/(href|src)\s*=\s*(["'])\s*javascript:[^"']*\2/gi, '$1="#"')
    .replace(/<(\/?)h1(\s|>)/gi, '<$1h2$2');
}

type FetchLike = (url: string) => Promise<{ ok: boolean; status: number; text(): Promise<string>; json(): Promise<unknown> }>;

/** Every published article, newest first, read from Soro's live embed script. */
export async function loadSoroArticles(fetchImpl: FetchLike = fetch): Promise<SoroArticle[]> {
  const response = await fetchImpl(SORO_EMBED_URL);
  if (!response.ok) throw new Error(`Soro embed request failed with HTTP ${response.status}`);

  const seen = new Set<string>();
  const articles: SoroArticle[] = [];
  for (const raw of extractSoroArticles(await response.text())) {
    const article = normalizeSoroArticle(raw);
    if (!article || seen.has(article.slug)) continue;
    seen.add(article.slug);
    articles.push(article);
  }
  return articles.sort((a, b) => (b.publishedDate ?? '').localeCompare(a.publishedDate ?? ''));
}

/** The article body, cleaned, using the same endpoint as Soro's widget when it is not inline. */
export async function loadSoroArticleContent(article: SoroArticle, fetchImpl: FetchLike = fetch): Promise<string> {
  let content = article.content;
  if (!content) {
    const response = await fetchImpl(`${SORO_API_BASE}/api/embed/${SORO_TOKEN}/article/${encodeURIComponent(article.id)}`);
    if (!response.ok) throw new Error(`Soro article ${article.slug} request failed with HTTP ${response.status}`);
    content = text(((await response.json()) as { content?: unknown }).content);
  }
  return cleanArticleHtml(content);
}

export const articleUrl = (slug: string) => `${SITE_URL}/blog/?post=${slug}`;

const esc = (value: string) =>
  value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

const jsonLd = (value: unknown) => JSON.stringify(value).replace(/</g, '\\u003c');

// The prerendered /blog/ page carries exactly one of each of these tags.
function setHeadTag(html: string, pattern: RegExp, replacement: string) {
  return pattern.test(html) ? html.replace(pattern, replacement) : html;
}

const SORO_MOUNT = /<div id="soro-blog"><\/div>/;

/**
 * Turns the prerendered /blog/ page into the article's own page: title,
 * description, a self-referencing canonical (marked data-soro so the widget
 * updates it instead of adding a second one), social tags, BlogPosting
 * structured data, and the article text inside the widget's mount point.
 */
export function renderArticlePage(html: string, article: SoroArticle, content: string): string {
  const url = articleUrl(article.slug);
  const title = `${article.title} | Spark Inventory Blog`;
  const description = article.excerpt || `${article.title}, from the Spark Inventory blog.`;
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    '@id': `${url}#article`,
    headline: article.title,
    description,
    url,
    mainEntityOfPage: url,
    ...(article.publishedDate ? { datePublished: article.publishedDate } : {}),
    ...(article.image ? { image: article.image } : {}),
    author: { '@type': 'Organization', name: 'Spark Inventory', url: `${SITE_URL}/` },
    publisher: { '@id': `${SITE_URL}/#organization` },
    isPartOf: { '@type': 'Blog', '@id': `${SITE_URL}/blog/#blog`, url: `${SITE_URL}/blog/` },
  };

  let page = html;
  page = setHeadTag(page, /<title>[\s\S]*?<\/title>/, `<title>${esc(title)}</title>`);
  page = setHeadTag(page, /<meta name="description" content="[^"]*"\s*\/?>/, `<meta name="description" content="${esc(description)}">`);
  page = setHeadTag(page, /<link rel="canonical" href="[^"]*"\s*\/?>/, `<link rel="canonical" href="${esc(url)}" data-soro="true">`);
  page = setHeadTag(page, /<meta property="og:type" content="[^"]*"\s*\/?>/, '<meta property="og:type" content="article">');
  page = setHeadTag(page, /<meta property="og:title" content="[^"]*"\s*\/?>/, `<meta property="og:title" content="${esc(title)}">`);
  page = setHeadTag(page, /<meta property="og:description" content="[^"]*"\s*\/?>/, `<meta property="og:description" content="${esc(description)}">`);
  page = setHeadTag(page, /<meta property="og:url" content="[^"]*"\s*\/?>/, `<meta property="og:url" content="${esc(url)}">`);
  page = setHeadTag(page, /<meta name="twitter:title" content="[^"]*"\s*\/?>/, `<meta name="twitter:title" content="${esc(title)}">`);
  page = setHeadTag(page, /<meta name="twitter:description" content="[^"]*"\s*\/?>/, `<meta name="twitter:description" content="${esc(description)}">`);
  if (article.image) {
    page = setHeadTag(page, /<meta property="og:image" content="[^"]*"\s*\/?>/, `<meta property="og:image" content="${esc(article.image)}">`);
    page = setHeadTag(page, /<meta name="twitter:image" content="[^"]*"\s*\/?>/, `<meta name="twitter:image" content="${esc(article.image)}">`);
    page = page.replace(/\s*<meta property="og:image:(?:type|width|height)" content="[^"]*"\s*\/?>/g, '');
  }
  page = setHeadTag(
    page,
    /<script id="route-jsonld" type="application\/ld\+json">[\s\S]*?<\/script>/,
    `<script id="route-jsonld" type="application/ld+json">${jsonLd(schema)}</script>`,
  );

  const date = article.publishedDate ? `<time datetime="${article.publishedDate}">${formatArticleDate(article.publishedDate)}</time>` : '';
  return page.replace(
    SORO_MOUNT,
    `<div id="soro-blog"><article><h2>${esc(article.title)}</h2>${date}<div>${content}</div><p><a href="/blog/">All Spark Inventory Blog articles</a></p></article></div>`,
  );
}

/** Adds a plain link to every article inside the widget's mount point on /blog/. */
export function renderBlogIndex(html: string, articles: SoroArticle[]): string {
  if (!articles.length) return html;
  const items = articles
    .map((article) => `<li><a href="/blog/?post=${article.slug}">${esc(article.title)}</a>${article.excerpt ? `<p>${esc(article.excerpt)}</p>` : ''}</li>`)
    .join('');
  return html.replace(SORO_MOUNT, `<div id="soro-blog"><ul>${items}</ul></div>`);
}

/** Appends every article URL to the prerendered sitemap. */
export function appendArticlesToSitemap(xml: string, articles: SoroArticle[]): string {
  const entries = articles
    .map((article) => {
      const lastModified = article.publishedDate ? `<lastmod>${article.publishedDate}</lastmod>` : '';
      return `  <url><loc>${esc(articleUrl(article.slug))}</loc>${lastModified}</url>`;
    })
    .join('\n');
  return entries ? xml.replace('</urlset>', `${entries}\n</urlset>`) : xml;
}

/** Formats a YYYY-MM-DD date identically everywhere. */
export function formatArticleDate(date: string): string {
  const [year, month, day] = date.split('-').map(Number);
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  return `${months[month - 1]} ${day}, ${year}`;
}
