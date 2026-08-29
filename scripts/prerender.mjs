// ─────────────────────────────────────────────────────────────────────────────
// Build-time prerendering (self-hosted SSG).
//
// Usage: node scripts/prerender.mjs <distDir>
// Expects: a client build in <distDir> and an SSR build in <distDir>-ssr
// (see the build scripts in package.json).
//
// For every route in src/seo/routeMeta.ts this renders the app to HTML with
// react-dom/static (which waits for React.lazy chunks), injects per-route
// title / description / canonical / Open Graph tags into the built
// index.html template, and writes <distDir>/<route>/index.html. Netlify
// serves real files before applying redirects, so these are picked up
// automatically; client-only routes (/r/:slug, ?variant=…) fall through to
// the untouched template saved as spa-shell.html.
//
// Also emits sitemap.xml (prerendered, indexable routes only).
// ─────────────────────────────────────────────────────────────────────────────
import { copyFileSync, readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { join, dirname, resolve } from 'node:path';
import { pathToFileURL } from 'node:url';
import { prerender } from 'react-dom/static';

const dist = process.argv[2];
if (!dist) {
  console.error('usage: node scripts/prerender.mjs <distDir>');
  process.exit(1);
}

const ssrDir = process.argv[3] ?? `${dist}-ssr`;
const ssrEntry = resolve(ssrDir, 'entry-server.js');
const { createApp, routeMeta, SITE_URL } = await import(pathToFileURL(ssrEntry).href);

const template = readFileSync(join(dist, 'index.html'), 'utf8');
if (!template.includes('<div id="root"></div>')) {
  throw new Error('template is missing an empty <div id="root"></div> mount point');
}
if (!template.includes('rel="canonical"')) {
  throw new Error('template is missing the canonical link placeholder');
}

// Keep the route registry, router, and canonical targets from silently drifting
// apart. A failed build is much easier to notice than an orphaned search page.
const appSource = readFileSync(resolve('src/App.tsx'), 'utf8');
const registeredPaths = [...appSource.matchAll(/<Route\s+path="([^"]+)"/g)].map((match) => match[1]);
const staticPaths = registeredPaths.filter(
  (path) => path !== '*' && path !== '/book-a-call' && !path.includes(':'),
);
const metaPaths = routeMeta.map(({ path }) => path);
const duplicatePaths = metaPaths.filter((path, index) => metaPaths.indexOf(path) !== index);
const missingMeta = staticPaths.filter((path) => !metaPaths.includes(path));
const missingRoute = metaPaths.filter((path) => !staticPaths.includes(path));
if (duplicatePaths.length || missingMeta.length || missingRoute.length) {
  throw new Error(
    `SEO route registry mismatch:\n` +
      `duplicate metadata: ${duplicatePaths.join(', ') || 'none'}\n` +
      `routes missing metadata: ${missingMeta.join(', ') || 'none'}\n` +
      `metadata missing routes: ${missingRoute.join(', ') || 'none'}`,
  );
}
for (const route of routeMeta) {
  if (route.lastModified && !/^\d{4}-\d{2}-\d{2}$/.test(route.lastModified)) {
    throw new Error(`${route.path} has an invalid lastModified date: ${route.lastModified}`);
  }
  if (route.canonical && !metaPaths.includes(route.canonical)) {
    throw new Error(`${route.path} points to a canonical route that does not exist: ${route.canonical}`);
  }
}

// Untouched shell for routes that are not prerendered (SPA fallback target)
writeFileSync(join(dist, 'spa-shell.html'), template);

async function renderToString(node) {
  const { prelude } = await prerender(node);
  const reader = prelude.getReader();
  const decoder = new TextDecoder();
  let html = '';
  for (;;) {
    const { done, value } = await reader.read();
    if (done) break;
    html += decoder.decode(value, { stream: true });
  }
  return html;
}

const esc = (s) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

const jsonLd = (value) => JSON.stringify(value).replace(/</g, '\\u003c');

for (const route of routeMeta) {
  const appHtml = await renderToString(createApp(route.path));
  const h1Count = (appHtml.match(/<h1(?:\s|>)/g) ?? []).length;
  if (!route.noindex && h1Count !== 1) {
    throw new Error(`${route.path} rendered ${h1Count} h1 elements; indexable pages must render exactly one`);
  }
  // Netlify serves directory indexes at the trailing-slash URL (301 from the
  // bare path), so canonicals must use the trailing-slash form.
  const canonicalPath = route.canonical ?? route.path;
  const canonical = canonicalPath === '/' ? `${SITE_URL}/` : `${SITE_URL}${canonicalPath}/`;
  const socialImage = `${SITE_URL}/hero-video-poster.jpg`;
  const breadcrumb = route.path === '/'
    ? []
    : [{
        '@type': 'BreadcrumbList',
        '@id': `${canonical}#breadcrumb`,
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Spark Inventory',
            item: `${SITE_URL}/`,
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: route.title.replace(/\s[-|]\sSPARK(?: Inventory)?$/i, ''),
            item: canonical,
          },
        ],
      }];
  const schemaGraph = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': `${SITE_URL}/#organization`,
        name: 'Spark Inventory',
        url: `${SITE_URL}/`,
        description: 'AI inventory management software for multichannel product businesses.',
        email: 'info@sparkinventory.com',
        logo: {
          '@type': 'ImageObject',
          url: `${SITE_URL}/spark_icon.png`,
          contentUrl: `${SITE_URL}/spark_icon.png`,
          width: 293,
          height: 284,
        },
        contactPoint: [
          {
            '@type': 'ContactPoint',
            contactType: 'sales',
            email: 'info@sparkinventory.com',
          },
          {
            '@type': 'ContactPoint',
            contactType: 'customer support',
            email: 'support@sparkinventory.com',
          },
        ],
      },
      {
        '@type': 'WebSite',
        '@id': `${SITE_URL}/#website`,
        name: 'Spark Inventory',
        alternateName: 'SPARK Intelligent Inventory',
        url: `${SITE_URL}/`,
        inLanguage: 'en-US',
        publisher: { '@id': `${SITE_URL}/#organization` },
      },
      {
        '@type': route.webPageType ?? 'WebPage',
        '@id': `${canonical}#webpage`,
        url: canonical,
        name: route.title,
        description: route.description,
        inLanguage: 'en-US',
        isPartOf: { '@id': `${SITE_URL}/#website` },
        about: { '@id': `${SITE_URL}/#organization` },
        primaryImageOfPage: { '@id': `${SITE_URL}/#primaryimage` },
        ...(route.lastModified ? { dateModified: route.lastModified } : {}),
        ...(route.path === '/' ? {} : { breadcrumb: { '@id': `${canonical}#breadcrumb` } }),
      },
      {
        '@type': 'ImageObject',
        '@id': `${SITE_URL}/#primaryimage`,
        url: socialImage,
        contentUrl: socialImage,
        caption: 'Spark Inventory AI inventory management dashboard',
        width: 1280,
        height: 720,
      },
      ...breadcrumb,
      ...(route.schema ?? []),
    ],
  };

  const headTags = [
    route.noindex
      ? '<meta name="robots" content="noindex, nofollow, noarchive">'
      : '<meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1">',
    '<meta property="og:type" content="website">',
    '<meta property="og:site_name" content="SPARK Intelligent Inventory">',
    '<meta property="og:locale" content="en_US">',
    `<meta property="og:title" content="${esc(route.title)}">`,
    `<meta property="og:description" content="${esc(route.description)}">`,
    `<meta property="og:url" content="${canonical}">`,
    `<meta property="og:image" content="${socialImage}">`,
    '<meta property="og:image:type" content="image/jpeg">',
    '<meta property="og:image:width" content="1280">',
    '<meta property="og:image:height" content="720">',
    '<meta property="og:image:alt" content="Spark Inventory AI inventory management dashboard">',
    '<meta name="twitter:card" content="summary_large_image">',
    `<meta name="twitter:title" content="${esc(route.title)}">`,
    `<meta name="twitter:description" content="${esc(route.description)}">`,
    `<meta name="twitter:image" content="${socialImage}">`,
    '<meta name="twitter:image:alt" content="Spark Inventory AI inventory management dashboard">',
    `<script id="route-jsonld" type="application/ld+json">${jsonLd(schemaGraph)}</script>`,
    // Per-route raw head HTML (e.g. a Google Ads event snippet). Injected
    // verbatim, last, so it runs after the global gtag base tag.
    route.headHtml ?? null,
  ]
    .filter(Boolean)
    .join('\n    ');

  const html = template
    .replace(/<title>.*?<\/title>/s, `<title>${esc(route.title)}</title>`)
    .replace(/(<meta name="description" content=")[^"]*(")/, `$1${esc(route.description)}$2`)
    .replace(/<link rel="canonical" href="[^"]*"\s*\/?>/, `<link rel="canonical" href="${canonical}">`)
    .replace('</head>', `    ${headTags}\n  </head>`)
    .replace('<div id="root"></div>', `<div id="root">${appHtml}</div>`);

  const outPath =
    route.path === '/'
      ? join(dist, 'index.html')
      : join(dist, route.path.slice(1), 'index.html');
  mkdirSync(dirname(outPath), { recursive: true });
  writeFileSync(outPath, html);
  console.log(`prerendered ${route.path} (${Math.round(appHtml.length / 1024)} kB) → ${outPath}`);
}

// Netlify's final fallback serves this document with a true 404 status, while
// /404/ remains a directly reviewable route during local development.
copyFileSync(join(dist, '404', 'index.html'), join(dist, '404.html'));

// sitemap.xml — indexable canonical routes only
const urls = routeMeta
  .filter((r) => !r.noindex && !r.canonical)
  .map((r) => {
    const loc = r.path === '/' ? `${SITE_URL}/` : `${SITE_URL}${r.path}/`;
    const lastModified = r.lastModified ? `<lastmod>${r.lastModified}</lastmod>` : '';
    return `  <url><loc>${esc(loc)}</loc>${lastModified}</url>`;
  })
  .join('\n');
writeFileSync(
  join(dist, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`
);
console.log(`wrote ${urls ? routeMeta.filter((r) => !r.noindex && !r.canonical).length : 0} sitemap URLs, ${dist}/404.html, and ${dist}/spa-shell.html`);
