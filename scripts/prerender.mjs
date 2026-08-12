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
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { join, dirname, resolve } from 'node:path';
import { pathToFileURL } from 'node:url';
import { prerender } from 'react-dom/static';

const dist = process.argv[2];
if (!dist) {
  console.error('usage: node scripts/prerender.mjs <distDir>');
  process.exit(1);
}

const ssrEntry = resolve(`${dist}-ssr`, 'entry-server.js');
const { createApp, routeMeta, SITE_URL } = await import(pathToFileURL(ssrEntry).href);

const template = readFileSync(join(dist, 'index.html'), 'utf8');
if (!template.includes('<div id="root"></div>')) {
  throw new Error('template is missing an empty <div id="root"></div> mount point');
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
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;');

for (const route of routeMeta) {
  const appHtml = await renderToString(createApp(route.path));
  // Netlify serves directory indexes at the trailing-slash URL (301 from the
  // bare path), so canonicals must use the trailing-slash form.
  const canonicalPath = route.canonical ?? route.path;
  const canonical = canonicalPath === '/' ? `${SITE_URL}/` : `${SITE_URL}${canonicalPath}/`;

  const headTags = [
    `<link rel="canonical" href="${canonical}">`,
    route.noindex ? '<meta name="robots" content="noindex, nofollow">' : null,
    '<meta property="og:type" content="website">',
    '<meta property="og:site_name" content="SPARK Intelligent Inventory">',
    `<meta property="og:title" content="${esc(route.title)}">`,
    `<meta property="og:description" content="${esc(route.description)}">`,
    `<meta property="og:url" content="${canonical}">`,
    '<meta name="twitter:card" content="summary">',
  ]
    .filter(Boolean)
    .join('\n    ');

  const html = template
    .replace(/<title>.*?<\/title>/s, `<title>${esc(route.title)}</title>`)
    .replace(/(<meta name="description" content=")[^"]*(")/, `$1${esc(route.description)}$2`)
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

// sitemap.xml — indexable canonical routes only
const urls = routeMeta
  .filter((r) => !r.noindex && !r.canonical)
  .map((r) => `  <url><loc>${r.path === '/' ? `${SITE_URL}/` : `${SITE_URL}${r.path}/`}</loc></url>`)
  .join('\n');
writeFileSync(
  join(dist, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`
);
console.log(`wrote ${dist}/sitemap.xml and ${dist}/spa-shell.html`);
