// First-party route for PostHog. Ad blockers drop requests to PostHog's own
// domains, so the SDK sends to /spk-r/ on our domain and this function
// forwards them. Keep the path in sync with posthogRelayPath in
// src/analytics.ts. The path avoids words blockers look for (analytics,
// tracking, posthog, ingest).
const relayPath = '/spk-r';
const ingestHost = 'https://us.i.posthog.com';
const assetHost = 'https://us-assets.i.posthog.com';

// Site cookies (CookieYes, the app session) never leave for PostHog, and
// PostHog sets no cookies on our domain.
const droppedRequestHeaders = ['cookie', 'host', 'x-forwarded-for', 'x-real-ip', 'x-nf-client-connection-ip'];

interface RelayContext {
  ip?: string;
}

export function relayTarget(url: URL): string | null {
  if (url.pathname !== relayPath && !url.pathname.startsWith(`${relayPath}/`)) return null;
  const rest = url.pathname.slice(relayPath.length) || '/';
  const host = rest.startsWith('/static/') || rest.startsWith('/array/') ? assetHost : ingestHost;
  return `${host}${rest}${url.search}`;
}

export default async function posthogRelay(request: Request, context: RelayContext): Promise<Response> {
  const target = relayTarget(new URL(request.url));
  if (!target) return new Response('Not found', { status: 404 });
  const headers = new Headers(request.headers);
  droppedRequestHeaders.forEach((name) => headers.delete(name));
  // PostHog geolocates and computes the cookieless visitor hash from the
  // client IP. Without this every visit would appear to come from Netlify.
  if (context.ip) headers.set('x-forwarded-for', context.ip);
  const hasBody = !['GET', 'HEAD'].includes(request.method);
  const upstream = await fetch(target, {
    method: request.method,
    headers,
    body: hasBody ? await request.arrayBuffer() : undefined,
    redirect: 'manual',
  });
  const responseHeaders = new Headers(upstream.headers);
  // fetch already decompressed the body, so the original encoding and
  // length no longer describe it.
  ['set-cookie', 'content-encoding', 'content-length'].forEach((name) => responseHeaders.delete(name));
  return new Response(upstream.body, { status: upstream.status, statusText: upstream.statusText, headers: responseHeaders });
}

export const config = { path: ['/spk-r', '/spk-r/*'] };
