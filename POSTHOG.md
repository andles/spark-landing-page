# PostHog

Production uses the same US project as the Spark web app. The browser ingestion
token in `.env.production` is public. Hosting environment variables can override
`VITE_POSTHOG_PROJECT_TOKEN`.

The SDK sends to `/spk-r/` on our own domain, and the Netlify edge function
`netlify/edge-functions/posthog-relay.ts` forwards it to PostHog US (events to
`us.i.posthog.com`, SDK files to `us-assets.i.posthog.com`). Ad blockers drop
requests to PostHog's domains, so this recovers those visits. The relay passes
the visitor IP as `X-Forwarded-For` (needed for geolocation and the cookieless
hash), never forwards site cookies, and strips any `Set-Cookie`.

Capture requires a production build on sparkinventory.com or
www.sparkinventory.com. Preview, local and Sites domains are excluded. Under an opt-in
law (the GDPR banner for Europe), until the visitor answers the CookieYes
banner, visits are counted cookieless (see below), the same as after a
rejection, and nothing is written to the browser. Under the US notice (CookieYes
law `ccpa`, used outside Europe) analytics is on until the visitor opts out,
as the privacy policy says. CookieYes writes `analytics:no` there before any
choice (its ccpa default for the category is off), so only an explicit choice
(`action:yes`) or Global Privacy Control switches a US visitor to cookieless. Accepting
analytics switches to normal cookie capture; rejecting keeps it cookieless. A
visit is counted once even when the choice is made on that page.
The app uses the same CookieYes configuration; keep consent shared across the
marketing and app subdomains in CookieYes settings.

Events: public-route `$pageview`, `$pageleave` (scroll depth and time on page
via the `$prev_pageview_*` properties, with the previous path reduced to a route
label), `$web_vitals` (the `_value` numbers only), `signup_clicked`, `demo_clicked`, and
`meeting_booked` (once per session on `/meeting-confirmed`, the Calendly
redirect, with `booking_source` of `fishbowl_lp` or `demo`), and `page_not_found`
(sent by the 404 page and by a `/blog/<slug>/` address with no Soro article,
with `missing_path` set to the requested path without its query string; use it
to find broken inbound links). Every event carries
`route`, `surface=landing`, and a `$current_url` rebuilt from the route, so filter
marketing traffic on `surface = 'landing'`.
Prospect slugs and unknown paths are redacted. Soro articles are reported as
`/blog/<slug>` (before Nov 2026 they were all counted as `/404`). The app identifies signup users
and records `signup_completed`; both SDKs share cookie identity and the same
explicit attribution-cookie properties: first-touch `utm_source`, `utm_medium`,
`utm_campaign`, `utm_term`, `utm_content`, the Google click ids `gclid`,
`gbraid`, `wbraid`, and `initial_referring_domain`. Keep this contract aligned with
`web-app/src/helpers/posthogAnalytics.ts` in spark-monorepo.

Events also keep `$raw_user_agent` (PostHog bot classification and the
cookieless hash), `$timezone`, and a fixed `$host` of `sparkinventory.com`.
`$referrer` and `$referring_domain` are set in `before_send` from
`document.referrer`, reduced to its origin (`https://www.google.com/`), or
`$direct` for both when there is none. The SDK's `save_referrer` stays off
because it would store the full referrer URL in the shared cookie, and with it
off the SDK adds no referrer to events. Until Nov 2026 events had no referrer at
all, so PostHog put about 90% of sessions in the Unknown channel.

Campaign values: the cookie keeps first-touch values for the app, but an event
only reports a UTM or click id that is in the current page's URL. Otherwise every
later visit from the browser would repeat the first ad click and PostHog would
put the session in that paid channel. `initial_referring_domain` stays on every
event as the first-touch record.

Before a choice and after a rejection, events are cookieless and keep only
`route`, `signup_source`, the UTM tags and Google click ids in that page's URL,
the origin-only `$referrer` and `$referring_domain`, `missing_path` on
`page_not_found`, `$raw_user_agent`, `$timezone` and `$host`, which PostHog needs with the request
IP to compute its daily hash. Without the user agent and host those events were
dropped at ingestion. `$pageleave` and `$web_vitals` are not sent in cookieless
mode.

Team devices: open any page with `?spark_internal=1` to stop all capture and
replay on that device (stored in localStorage), and `?spark_internal=0` to undo.

Replay, autocapture, surveys, flags, automatic person properties and raw URL
queries are disabled or stripped. Existing Google Ads tracking is preserved.
Run `npm test` and `npm run build:nextgen` before deploying through the existing
Netlify production pipeline.
