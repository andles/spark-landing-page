interface Env {
  ASSETS: Fetcher;
  RESEND_API_KEY: string;
}

const NOTIFICATION_EMAIL = "andy@sparkinventory.com";
const NOINDEX = "noindex, nofollow, noarchive";

interface PartnerApplication {
  email: string;
  fullName: string;
  company: string;
  phone?: string;
  linkedin?: string;
  website?: string;
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function buildEmailHtml(data: PartnerApplication): string {
  const rows = [
    ["Name", data.fullName],
    ["Email", data.email],
    ["Company", data.company],
    ["Phone", data.phone],
    ["LinkedIn", data.linkedin],
    ["Website", data.website],
  ];
  const tableRows = rows
    .filter(([, v]) => v)
    .map(
      ([label, value]) =>
        `<tr><td style="padding:8px 12px;font-weight:600;vertical-align:top">${label}</td><td style="padding:8px 12px">${escapeHtml(value!)}</td></tr>`
    )
    .join("");

  return `<div style="font-family:sans-serif;max-width:600px;margin:0 auto">
<h2 style="color:#1e293b">New Partner Application</h2>
<table style="width:100%;border-collapse:collapse;border:1px solid #e2e8f0">${tableRows}</table>
<p style="color:#64748b;font-size:13px;margin-top:24px">Submitted from sparkinventory.com/partners</p>
</div>`;
}

async function handlePartnerApplication(
  request: Request,
  env: Env
): Promise<Response> {
  if (request.method === "OPTIONS") {
    return new Response(null, {
      status: 204,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
      },
    });
  }

  if (request.method !== "POST") {
    return Response.json({ error: "Method not allowed" }, { status: 405 });
  }

  let data: PartnerApplication;
  try {
    data = await request.json();
  } catch {
    return Response.json({ error: "Invalid JSON" }, { status: 400 });
  }

  if (!data.email || !data.fullName || !data.company) {
    return Response.json(
      { error: "Missing required fields: email, fullName, company" },
      { status: 400 }
    );
  }

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${env.RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: "Spark Partners <partners@sparkinventory.com>",
      to: [NOTIFICATION_EMAIL],
      reply_to: data.email,
      subject: `Partner Application: ${data.fullName} — ${data.company}`,
      html: buildEmailHtml(data),
    }),
  });

  if (!res.ok) {
    const body = await res.text();
    console.error("Resend API error:", res.status, body);
    return Response.json(
      { error: "Failed to send notification" },
      { status: 502 }
    );
  }

  return Response.json(
    { success: true },
    {
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    }
  );
}

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

    if (pathname === "/api/partner-application") {
      return handlePartnerApplication(request, env);
    }
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

    if (pathname === "/fishbowl") {
      url.pathname = "/fishbowl-alternative/";
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
