import { useCallback } from "react";
import {
  ensureCalendlyAssets,
  isCalendlyReady,
  openCalendlyPopup,
} from "./calendly";
import { useCtaLinks } from "./ctaLinks";

// "Book a Call" CTA — opens the Calendly scheduler in a popup overlay instead of
// navigating away. The href stays the Calendly URL as a no-JS fallback. Shared
// across every landing page; pass the caller's own className to keep each
// button's styling. The Google Ads conversion is NOT fired here: it fires on
// the /meeting-confirmed page that Calendly redirects to after an actual
// booking, so we count booked demos instead of clicks.
//
// `url` lets a campaign page pass its own tagged scheduling link. When omitted,
// the button forwards the current page's utm_* / gclid params into the Calendly
// link (see ctaLinks.ts), so ad attribution reaches the booking on every page.
export default function BookACallButton({
  className,
  children = "Book a Call",
  url,
}: {
  className?: string;
  children?: React.ReactNode;
  url?: string;
}) {
  const { bookUrl } = useCtaLinks();
  const href = url ?? bookUrl;

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>) => {
      // Hover/focus normally has the popup ready by click time. If it is not
      // ready (for example, a quick mobile tap), keep the anchor's native
      // new-tab navigation instead of making the visitor wait on a script.
      if (isCalendlyReady()) {
        e.preventDefault();
        openCalendlyPopup(href);
      }
    },
    [href]
  );

  return (
    <a
      href={href}
      onClick={handleClick}
      onPointerEnter={ensureCalendlyAssets}
      onFocus={ensureCalendlyAssets}
      onTouchStart={ensureCalendlyAssets}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
    >
      {children}
    </a>
  );
}
