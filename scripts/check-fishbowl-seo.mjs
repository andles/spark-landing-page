import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import { resolve, join } from 'node:path';
import { pathToFileURL } from 'node:url';

// Usage: node scripts/check-fishbowl-seo.mjs <client-output> <ssr-output> [preview]
const [clientDir, ssrDir, mode] = process.argv.slice(2);
assert(clientDir && ssrDir, 'Provide client and SSR build directories');
const { routeMeta, buildSchemaGraph, robotsContent } = await import(
  pathToFileURL(resolve(ssrDir, 'entry-server.js')).href
);
const html = readFileSync(join(clientDir, 'fishbowl-alternative/index.html'), 'utf8');
const head = html.split('</head>')[0];
const body = html.split('</head>')[1];
const route = routeMeta.find(({ path }) => path === '/fishbowl-alternative');
const preview = mode === 'preview';
const expectedCanonical = 'https://sparkinventory.com/fishbowl-alternative/';
const decode = (text) => text.replace(/&quot;/g, '"').replace(/&#x27;|&#39;/g, "'")
  .replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>');
const bodyText = decode(body.replace(/<[^>]*>/g, ' ')).replace(/\s+/g, ' ');

assert.equal((html.match(/<h1(?:\s|>)/g) ?? []).length, 1);
assert.equal((head.match(/<title>/g) ?? []).length, 1);
assert.equal((head.match(/name="description"/g) ?? []).length, 1);
assert.equal((head.match(/name="robots"/g) ?? []).length, 1);
assert(head.includes(`<title>${route.title}</title>`));
assert(head.includes(`rel="canonical" href="${expectedCanonical}"`));
assert(head.includes(`name="robots" content="${robotsContent(route, preview)}"`));
assert(head.includes(`property="og:url" content="${expectedCanonical}"`));
assert(head.includes(`name="twitter:title" content="${route.title}"`));
assert.equal(robotsContent(route, false).startsWith('index,'), true);
assert.equal(robotsContent(route, true), 'noindex, follow');
assert.equal(robotsContent({ ...route, noindex: true }, true), 'noindex, nofollow, noarchive');

const scripts = [...head.matchAll(/<script id="route-jsonld" type="application\/ld\+json">([\s\S]*?)<\/script>/g)];
assert.equal(scripts.length, 1);
const schema = JSON.parse(scripts[0][1]);
assert.deepEqual(schema, buildSchemaGraph(route), 'Prerender and navigation schema must match');
const faq = schema['@graph'].filter((node) => node['@type'] === 'FAQPage');
assert.equal(faq.length, 1);
assert(faq[0].mainEntity.length >= 10);
for (const question of faq[0].mainEntity) {
  assert(bodyText.includes(question.name), `Missing visible question: ${question.name}`);
  assert(bodyText.includes(question.acceptedAnswer.text), `Missing visible answer: ${question.name}`);
}
const video = schema['@graph'].find((node) => node['@type'] === 'VideoObject');
assert(video && video.name && video.description && video.uploadDate);
assert(!Number.isNaN(Date.parse(video.uploadDate)));
assert.equal(video.duration, 'PT33.9S');
assert(bodyText.includes(video.transcript), 'Transcript must be available as page text');
for (const url of [video.contentUrl, ...video.thumbnailUrl]) {
  assert.equal(new URL(url).origin, 'https://sparkinventory.com');
  assert(existsSync(join(clientDir, new URL(url).pathname)), `Missing video asset: ${url}`);
}
const captionsPath = body.match(/<track[^>]*src="([^"]+)"/)?.[1];
assert(captionsPath, 'Video must include a caption source');
const captions = readFileSync(join(clientDir, captionsPath), 'utf8');
const captionText = captions.split('\n').filter((line) => line.trim() && line !== 'WEBVTT' && !line.includes('-->'))
  .join(' ').replace(/\s+/g, ' ').trim();
assert.equal(video.transcript, captionText, 'Transcript must match supplied captions');
assert(body.includes('preload="none"'), 'Video must not download on initial page load');
assert(body.includes('kind="captions"'));
assert(readFileSync(join(clientDir, 'sitemap.xml'), 'utf8').includes(`<loc>${expectedCanonical}</loc>`));
assert(readFileSync(join(clientDir, 'robots.txt'), 'utf8').includes('User-agent: OAI-SearchBot\nAllow: /'));

for (const meta of routeMeta) {
  const graph = buildSchemaGraph(meta)['@graph'];
  const ids = graph.map((node) => node['@id']).filter(Boolean);
  assert.equal(ids.length, new Set(ids).size, `Duplicate graph IDs on ${meta.path}`);
}
assert(!buildSchemaGraph(routeMeta.find(({ path }) => path === '/pricing'))['@graph']
  .some((node) => node['@id'] === video['@id']), 'Fishbowl schema must not leak to other routes');
console.log(`Fishbowl SEO checks passed (${preview ? 'review noindex' : 'production indexable'}).`);
