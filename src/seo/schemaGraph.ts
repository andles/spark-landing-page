import { SITE_URL, type RouteMeta } from './routeMeta';

export function canonicalUrl(route: RouteMeta) {
  const path = route.canonical ?? route.path;
  return path === '/' ? `${SITE_URL}/` : `${SITE_URL}${path}/`;
}

export function robotsContent(route: RouteMeta, preview = false) {
  if (route.noindex) return 'noindex, nofollow, noarchive';
  if (preview) return 'noindex, follow';
  return 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1';
}

// Shared by prerendering and client navigation so page identities never drift.
export function buildSchemaGraph(route: RouteMeta) {
  const canonical = canonicalUrl(route);
  const breadcrumb = route.path === '/' ? [] : [{
    '@type': 'BreadcrumbList',
    '@id': `${canonical}#breadcrumb`,
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Spark Inventory', item: `${SITE_URL}/` },
      {
        '@type': 'ListItem', position: 2,
        name: route.title.replace(/\s[-|]\sSPARK(?: Inventory)?$/i, ''),
        item: canonical,
      },
    ],
  }];
  const video = route.schema?.find((node) => node['@type'] === 'VideoObject');
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization', '@id': `${SITE_URL}/#organization`,
        name: 'Spark Inventory', url: `${SITE_URL}/`,
        description: 'AI inventory management software for multichannel product businesses.',
        email: 'info@sparkinventory.com',
        logo: {
          '@type': 'ImageObject', url: `${SITE_URL}/spark_icon.png`,
          contentUrl: `${SITE_URL}/spark_icon.png`, width: 293, height: 284,
        },
        contactPoint: [
          { '@type': 'ContactPoint', contactType: 'sales', email: 'info@sparkinventory.com' },
          { '@type': 'ContactPoint', contactType: 'customer support', email: 'support@sparkinventory.com' },
        ],
      },
      {
        '@type': 'WebSite', '@id': `${SITE_URL}/#website`, name: 'Spark Inventory',
        alternateName: 'SPARK Intelligent Inventory', url: `${SITE_URL}/`,
        inLanguage: 'en-US', publisher: { '@id': `${SITE_URL}/#organization` },
      },
      {
        '@type': route.webPageType ?? 'WebPage', '@id': `${canonical}#webpage`,
        url: canonical, name: route.title, description: route.description,
        inLanguage: 'en-US', isPartOf: { '@id': `${SITE_URL}/#website` },
        about: { '@id': `${SITE_URL}/#organization` },
        primaryImageOfPage: { '@id': `${SITE_URL}/#primaryimage` },
        ...(route.lastModified ? { dateModified: route.lastModified } : {}),
        ...(route.path === '/' ? {} : { breadcrumb: { '@id': `${canonical}#breadcrumb` } }),
        ...(video ? { video: { '@id': video['@id'] } } : {}),
      },
      {
        '@type': 'ImageObject', '@id': `${SITE_URL}/#primaryimage`,
        url: `${SITE_URL}/hero-video-poster.jpg`, contentUrl: `${SITE_URL}/hero-video-poster.jpg`,
        caption: 'Spark Inventory AI inventory management dashboard', width: 1280, height: 720,
      },
      ...breadcrumb,
      ...(route.schema ?? []),
    ],
  };
}
