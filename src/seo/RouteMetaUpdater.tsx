import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { findRouteMeta, SITE_URL } from './routeMeta';

function upsertMeta(selector: string, attribute: 'name' | 'property', key: string, content: string) {
  let element = document.head.querySelector<HTMLMetaElement>(selector);
  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(attribute, key);
    document.head.appendChild(element);
  }
  element.content = content;
}

// Keeps the search and social metadata coherent after client-side navigation.
// Initial-load values come from the prerendered HTML.
export default function RouteMetaUpdater() {
  const { pathname } = useLocation();

  useEffect(() => {
    const isDynamicUtilityRoute = pathname === '/book-a-call' || pathname.startsWith('/r/');
    const meta = findRouteMeta(pathname) ?? (!isDynamicUtilityRoute ? findRouteMeta('/404') : undefined);
    if (!meta) return;

    const canonicalPath = meta.canonical ?? meta.path;
    const canonical = canonicalPath === '/' ? `${SITE_URL}/` : `${SITE_URL}${canonicalPath}/`;
    const robots = meta.noindex
      ? 'noindex, nofollow, noarchive'
      : 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1';

    document.title = meta.title;
    upsertMeta('meta[name="description"]', 'name', 'description', meta.description);
    upsertMeta('meta[name="robots"]', 'name', 'robots', robots);
    upsertMeta('meta[property="og:title"]', 'property', 'og:title', meta.title);
    upsertMeta('meta[property="og:description"]', 'property', 'og:description', meta.description);
    upsertMeta('meta[property="og:url"]', 'property', 'og:url', canonical);
    upsertMeta('meta[name="twitter:title"]', 'name', 'twitter:title', meta.title);
    upsertMeta('meta[name="twitter:description"]', 'name', 'twitter:description', meta.description);

    let canonicalLink = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.rel = 'canonical';
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.href = canonical;
  }, [pathname]);

  return null;
}
