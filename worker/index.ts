interface Env {
  ASSETS: Fetcher;
}

const NOINDEX = "noindex, nofollow, noarchive";

function withResponseHeaders(response: Response, pathname: string) {
  const headers = new Headers(response.headers);

  if (
    pathname.startsWith("/r/") ||
    pathname === "/book-a-call" ||
    pathname === "/meeting-confirmed" ||
    pathname === "/spa-shell.html" ||
    pathname === "/spa-shell"
  ) {
    headers.set("X-Robots-Tag", NOINDEX);
  }

  if (pathname.startsWith("/assets/") || pathname.startsWith("/fonts/")) {
    headers.set("Cache-Control", "public, max-age=31536000, immutable");
  } else if (pathname.endsWith(".mp4") || pathname.endsWith(".webm")) {
    headers.set("Cache-Control", "public, max-age=2592000");
  } else if (pathname === "/sitemap.xml" || pathname === "/robots.txt") {
    headers.set("Cache-Control", "public, max-age=3600");
  }

  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
}

export default {
  async fetch(request: Request, env: Env) {
    const url = new URL(request.url);
    const pathname = url.pathname.replace(/\/$/, "") || "/";
    let decodedPathname = pathname;
    try {
      decodedPathname = decodeURIComponent(pathname);
    } catch {
      // Leave malformed escape sequences untouched and let the asset layer
      // return the appropriate client error or 404 response.
    }

    if (decodedPathname === "/reduce-stockouts-&-overstock") {
      url.pathname = "/reduce-stockouts-overstock/";
      return Response.redirect(url.toString(), 301);
    }

    if (pathname === "/forecasting") {
      url.pathname = "/reduce-stockouts-overstock/";
      return Response.redirect(url.toString(), 301);
    }

    if ((pathname.startsWith("/r/") || pathname === "/book-a-call") && (request.method === "GET" || request.method === "HEAD")) {
      const shellUrl = new URL("/spa-shell/", url.origin);
      const shellRequest = new Request(shellUrl, request);
      const response = await env.ASSETS.fetch(shellRequest);
      return withResponseHeaders(response, pathname);
    }

    const response = await env.ASSETS.fetch(request);
    return withResponseHeaders(response, pathname);
  },
} satisfies ExportedHandler<Env>;
