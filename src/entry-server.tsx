/* eslint-disable react-refresh/only-export-components -- server-only entry, never hot-reloaded */
// Server entry for build-time prerendering (scripts/prerender.mjs).
// Not shipped to the browser.
import { StrictMode } from 'react';
import { StaticRouter } from 'react-router';
import App from './App';

export { routeMeta, SITE_URL } from './seo/routeMeta';
export { buildSchemaGraph, canonicalUrl, robotsContent } from './seo/schemaGraph';

export function createApp(url: string) {
  return (
    <StrictMode>
      <StaticRouter location={url}>
        <App />
      </StaticRouter>
    </StrictMode>
  );
}
