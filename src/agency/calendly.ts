// ─────────────────────────────────────────────────────────────────────────────
// Calendly popup helpers.
//
// Opens the Calendly scheduler in a modal overlay on top of the page (instead of
// navigating away), and fires the Google Ads "Book a Call" conversion. Shared so
// the URL + conversion label live in exactly one place.
// ─────────────────────────────────────────────────────────────────────────────

// The scheduling link prospects book through.
export const CALENDLY_URL = "https://calendly.com/jason-sparkinventory/30min";

// Google Ads conversion "send_to" for the "Sign-up" conversion action. The
// account tag (AW-17962279599) is loaded in index.html. The conversion itself
// is fired by the event snippet baked into /meeting-confirmed's <head> at build
// time (src/seo/routeMeta.ts); this constant is kept in sync for reference and
// for fireBookACallConversion below.
export const GADS_CONVERSION_SEND_TO = "AW-17962279599/4ZHsCJbXouQcEK_FivVC";

const WIDGET_CSS = "https://assets.calendly.com/assets/external/widget.css";
const WIDGET_JS = "https://assets.calendly.com/assets/external/widget.js";

type CalendlyGlobal = { initPopupWidget: (opts: { url: string }) => void };
type Gtag = (...args: unknown[]) => void;

let assetsRequested = false;

/**
 * Inject Calendly's widget CSS + JS once. Call this on mount of any page that
 * has a popup CTA so the modal is ready to open instantly on click.
 */
export function ensureCalendlyAssets(): void {
  if (assetsRequested || typeof document === "undefined") return;
  assetsRequested = true;

  if (!document.querySelector(`link[href="${WIDGET_CSS}"]`)) {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = WIDGET_CSS;
    document.head.appendChild(link);
  }

  if (!document.querySelector(`script[src="${WIDGET_JS}"]`)) {
    const script = document.createElement("script");
    script.src = WIDGET_JS;
    script.async = true;
    document.body.appendChild(script);
  }
}

// NOTE: not currently wired anywhere. The conversion fires from the event
// snippet in /meeting-confirmed's prerendered <head>. Do NOT also call this on
// that page, or bookings will be counted twice.
/** Fire the Google Ads "Book a Call" conversion (no-op if gtag isn't present). */
export function fireBookACallConversion(): void {
  const gtag = (window as unknown as { gtag?: Gtag }).gtag;
  if (typeof gtag === "function") {
    gtag("event", "conversion", { send_to: GADS_CONVERSION_SEND_TO });
  }
}

/**
 * Open the Calendly scheduler as a modal popup. Falls back to opening the
 * Calendly page in a new tab if the widget script hasn't loaded (e.g. blocked).
 */
export function openCalendlyPopup(url: string = CALENDLY_URL): void {
  const cal = (window as unknown as { Calendly?: CalendlyGlobal }).Calendly;
  if (cal && typeof cal.initPopupWidget === "function") {
    cal.initPopupWidget({ url });
  } else {
    window.open(url, "_blank", "noopener,noreferrer");
  }
}
