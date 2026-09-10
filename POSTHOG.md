# PostHog

Production uses the same US project as the Spark web app. The browser ingestion
token in `.env.production` is public. Hosting environment variables can override
`VITE_POSTHOG_PROJECT_TOKEN` and `VITE_POSTHOG_HOST`.

Capture requires a production build on sparkinventory.com or
www.sparkinventory.com and affirmative CookieYes analytics consent. Preview,
local and Sites domains are excluded. Consent changes stop or resume capture.
The app uses the same CookieYes configuration; keep consent shared across the
marketing and app subdomains in CookieYes settings.

Events: public-route `$pageview`, `signup_clicked`, and `demo_clicked`.
Prospect slugs and unknown paths are redacted. The app identifies signup users
and records `signup_completed`; both SDKs share cookie identity and the same
explicit attribution-cookie properties. Keep this contract aligned with
`web-app/src/helpers/posthogAnalytics.ts` in spark-monorepo.

Replay, autocapture, surveys, flags, automatic person properties and raw URL
queries are disabled or stripped. Existing Google Ads tracking is preserved.
Run `npm test` and `npm run build:nextgen` before deploying through the existing
Netlify production pipeline.
