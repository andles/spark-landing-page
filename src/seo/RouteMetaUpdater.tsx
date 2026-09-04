import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { findRouteMeta } from './routeMeta';
import { buildSchemaGraph, canonicalUrl, robotsContent } from './schemaGraph';

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

    const canonical = canonicalUrl(meta);
    const robots = robotsContent(meta, import.meta.env.VITE_SITE_NOINDEX === 'true');

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

    let structuredData = document.head.querySelector<HTMLScriptElement>('#route-jsonld');
    if (!structuredData) {
      structuredData = document.createElement('script');
      structuredData.id = 'route-jsonld';
      structuredData.type = 'application/ld+json';
      document.head.appendChild(structuredData);
    }
    structuredData.textContent = JSON.stringify(buildSchemaGraph(meta)).replace(/</g, '\\u003c');
  }, [pathname]);

  return null;
}
