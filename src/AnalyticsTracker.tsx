import { subscribeAnalyticsConsent } from './analyticsConsent';
import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { analyticsRoute, captureCta, captureMeetingBooked, capturePageview, ctaForLink, initializeAnalytics } from './analytics';
import { SPARK_MCP_URL } from './content/aiAssistants';
import { rememberFirstReferrer, withSignupReferrer } from './signupReferrer';

export default function Analytics() {
  const { pathname } = useLocation();
  const [consentRevision, setConsentRevision] = useState(0);
  useEffect(() => subscribeAnalyticsConsent(() => setConsentRevision((value) => value + 1)), []);
  const previous = useRef<string | undefined>(undefined);
  useEffect(() => {
    if (!initializeAnalytics()) { previous.current = undefined; return; }
    // Count each page once. A banner choice on the same page switches the
    // mode for later events but does not count the visit a second time.
    if (previous.current === pathname) return;
    previous.current = pathname;
    capturePageview(pathname);
    if (analyticsRoute(pathname) === '/meeting-confirmed') captureMeetingBooked();
  }, [pathname, consentRevision]);
  useEffect(() => {
    rememberFirstReferrer();
    const trackLink = (event: MouseEvent) => {
      const link = event.target instanceof Element ? event.target.closest('a[href]') : null;
      if (!(link instanceof HTMLAnchorElement)) return;
      // Runs before the browser follows the link, so the sign-up page receives ref=.
      const forwarded = withSignupReferrer(link.href);
      if (forwarded !== link.href) link.href = forwarded;
      const cta = ctaForLink(new URL(link.href), window.location.origin);
      if (cta) captureCta(cta.event, cta.assistant);
    };
    // Connecting Claude means copying the MCP server URL into Claude's
    // connector settings, so a copy of that URL is the Claude install signal.
    const trackCopy = () => {
      if (document.getSelection()?.toString().includes(SPARK_MCP_URL)) captureCta('mcp_url_copied', 'claude');
    };
    document.addEventListener('click', trackLink);
    document.addEventListener('copy', trackCopy);
    return () => {
      document.removeEventListener('click', trackLink);
      document.removeEventListener('copy', trackCopy);
    };
  }, []);
  return null;
}
