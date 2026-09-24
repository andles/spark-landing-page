// Makes the live Soro blog visible to search engines without rebuilding the
// site when Soro publishes. See src/blog/soro.ts for what each page gains.
import {
  appendArticlesToSitemap,
  loadSoroArticleContent,
  loadSoroArticles,
  renderArticlePage,
  renderBlogIndex,
  type SoroArticle,
} from '../../src/blog/soro.ts';

// New Soro posts appear within this window; it also keeps each edge
// instance from requesting Soro's script on every page view.
const ARTICLE_LIST_TTL_MS = 5 * 60 * 1000;
let articleList: { loadedAt: number; articles: Promise<SoroArticle[]> } | null = null;

function getArticles() {
  if (!articleList || Date.now() - articleList.loadedAt > ARTICLE_LIST_TTL_MS) {
    const articles = loadSoroArticles();
    articleList = { loadedAt: Date.now(), articles };
    articles.catch(() => {
      if (articleList?.articles === articles) articleList = null;
    });
  }
  return articleList.articles;
}

function withBody(response: Response, body: string) {
  const headers = new Headers(response.headers);
  headers.delete('content-length');
  headers.delete('etag');
  return new Response(body, { status: response.status, headers });
}

export default async function soroBlog(request: Request, context: { next(): Promise<Response> }) {
  const response = await context.next();
  if (response.status !== 200) return response;

  const url = new URL(request.url);
  const original = await response.text();
  try {
    const articles = await getArticles();
    if (url.pathname === '/sitemap.xml') return withBody(response, appendArticlesToSitemap(original, articles));

    const slug = url.searchParams.get('post');
    const article = slug ? articles.find((candidate) => candidate.slug === slug) : undefined;
    if (article) {
      const content = await loadSoroArticleContent(article);
      return withBody(response, renderArticlePage(original, article, content));
    }
    return withBody(response, renderBlogIndex(original, articles));
  } catch (error) {
    // Soro being unreachable must never take the blog or sitemap down.
    console.error('soro-blog edge function fell back to the static page', error);
    return withBody(response, original);
  }
}

export const config = { path: ['/blog/', '/sitemap.xml'], onError: 'bypass' };
