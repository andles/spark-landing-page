import { subscribeAnalyticsConsent } from './analyticsConsent';
import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { analyticsRoute, captureCta, captureMeetingBooked, capturePageview, initializeAnalytics } from './analytics';
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
      const url = new URL(link.href);
      if (url.hostname === 'calendly.com' || (url.origin === window.location.origin && url.pathname === '/book-a-call')) captureCta('demo_clicked');
      if (url.hostname === 'app.sparkinventory.com' && ['/sign-up', '/shopify-trial'].includes(url.pathname)) captureCta('signup_clicked');
      // The Spark Inventory listing in ChatGPT's plugin directory: an install, not a sign-up yet.
      if (url.hostname === 'chatgpt.com' && url.pathname.startsWith('/plugins/')) captureCta('assistant_install_clicked');
    };
    document.addEventListener('click', trackLink);
    return () => document.removeEventListener('click', trackLink);
  }, []);
  return null;
}
