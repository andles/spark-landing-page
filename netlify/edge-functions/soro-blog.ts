// Serves the live Soro blog to search engines without rebuilding the site
// when Soro publishes. See src/blog/soro.ts for why articles live at
// /blog/<slug>/ and what each page gains.
import {
  appendArticlesToSitemap,
  articlePath,
  isArticleSlug,
  loadSoroArticleContent,
  loadSoroArticles,
  renderArticlePage,
  renderBlogIndex,
  renderMissingArticle,
  type SoroArticle,
} from '../../src/blog/soro.ts';

// New Soro posts appear within this window; it also keeps each edge
// instance from requesting Soro's script on every page view.
const SORO_TTL_MS = 5 * 60 * 1000;

interface Cached<T> {
  loadedAt: number;
  value: Promise<T>;
  /** The last value that loaded, served when a refresh fails. */
  lastGood?: T;
}

let articleList: Cached<SoroArticle[]> | null = null;
const articleContent = new Map<string, Cached<string>>();

// Refreshes after the TTL, but keeps answering with the last good value when
// Soro fails, so a Soro outage never turns an article into an error or a
// duplicate of /blog/ for a crawler.
function cached<T>(entry: Cached<T> | null | undefined, load: () => Promise<T>, store: (next: Cached<T>) => void): Promise<T> {
  if (entry && Date.now() - entry.loadedAt <= SORO_TTL_MS) return entry.value;
  const lastGood = entry?.lastGood;
  const next: Cached<T> = { loadedAt: Date.now(), value: Promise.resolve(undefined as T), lastGood };
  next.value = load().then(
    (value) => {
      next.lastGood = value;
      return value;
    },
    (error) => {
      // Retry on the next request instead of caching the failure.
      next.loadedAt = 0;
      if (lastGood !== undefined) return lastGood;
      throw error;
    },
  );
  store(next);
  return next.value;
}

const getArticles = () =>
  cached(articleList, () => loadSoroArticles(), (next) => {
    articleList = next;
  });

const getArticleContent = (article: SoroArticle) =>
  cached(articleContent.get(article.id), () => loadSoroArticleContent(article), (next) => {
    articleContent.set(article.id, next);
  });

function withBody(response: Response, body: string, status = response.status) {
  const headers = new Headers(response.headers);
  headers.delete('content-length');
  headers.delete('etag');
  return new Response(body, { status, headers });
}

function redirect(request: Request, pathname: string, keepQuery = true) {
  const target = new URL(pathname, request.url);
  if (keepQuery) {
    // Campaign parameters survive the move; the article's canonical stays clean.
    new URL(request.url).searchParams.forEach((value, key) => {
      if (key !== 'post') target.searchParams.append(key, value);
    });
  }
  return new Response(null, { status: 301, headers: { location: target.pathname + target.search, 'cache-control': 'public, max-age=3600' } });
}

// Soro unreachable with nothing cached: tell crawlers to come back rather than
// letting them record an empty page or a copy of /blog/.
const unavailable = () =>
  new Response('The Spark Inventory blog is briefly unavailable. Please try again in a few minutes.', {
    status: 503,
    headers: { 'retry-after': '300', 'content-type': 'text/plain; charset=utf-8', 'cache-control': 'no-store' },
  });

export default async function soroBlog(request: Request, context: { next(): Promise<Response> }) {
  const url = new URL(request.url);
  const { pathname } = url;

  // Old widget-style links (/blog/?post=<slug>) move permanently to the article's own URL.
  const postParam = url.searchParams.get('post');
  if (pathname === '/blog/' && postParam !== null) {
    return redirect(request, isArticleSlug(postParam) ? articlePath(postParam) : '/blog/');
  }

  const articleRoute = /^\/blog\/([^/]+)(\/?)$/.exec(pathname);
  if (articleRoute) {
    const [, slug, trailingSlash] = articleRoute;
    if (!isArticleSlug(slug)) return redirect(request, '/blog/', false);
    if (!trailingSlash) return redirect(request, articlePath(slug));

    // netlify.toml rewrites /blog/* to the prerendered /blog/ page, which is the shell.
    const response = await context.next();
    if (response.status !== 200) return response;
    const shell = await response.text();
    try {
      const articles = await getArticles();
      const article = articles.find((candidate) => candidate.slug === slug);
      if (!article) return withBody(response, renderMissingArticle(shell, articles), 404);
      return withBody(response, renderArticlePage(shell, article, await getArticleContent(article)));
    } catch (error) {
      console.error('soro-blog edge function could not load Soro for an article', error);
      return unavailable();
    }
  }

  const response = await context.next();
  if (response.status !== 200) return response;
  const original = await response.text();
  try {
    const articles = await getArticles();
    if (pathname === '/sitemap.xml') return withBody(response, appendArticlesToSitemap(original, articles));
    return withBody(response, renderBlogIndex(original, articles));
  } catch (error) {
    // Soro being unreachable must never take /blog/ or the sitemap down.
    console.error('soro-blog edge function fell back to the static page', error);
    return withBody(response, original);
  }
}

export const config = { path: ['/blog/', '/blog/*', '/sitemap.xml'], onError: 'bypass' };
