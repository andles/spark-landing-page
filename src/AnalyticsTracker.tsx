import { hasAnalyticsConsent, subscribeAnalyticsConsent } from './analyticsConsent';
import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { captureCta, capturePageview, initializeAnalytics } from './analytics';

export default function Analytics() {
  const { pathname } = useLocation();
  const [consentRevision, setConsentRevision] = useState(0);
  useEffect(() => subscribeAnalyticsConsent(() => setConsentRevision((value) => value + 1)), []);
  const previous = useRef<string | undefined>(undefined);
  useEffect(() => {
    if (!hasAnalyticsConsent()) { initializeAnalytics(); previous.current = undefined; return; }
    if (previous.current === pathname) return;
    previous.current = pathname;
    capturePageview(pathname);
  }, [pathname, consentRevision]);
  useEffect(() => {
    const trackLink = (event: MouseEvent) => {
      const link = event.target instanceof Element ? event.target.closest('a[href]') : null;
      if (!(link instanceof HTMLAnchorElement)) return;
      const url = new URL(link.href);
      if (url.hostname === 'calendly.com' || (url.origin === window.location.origin && url.pathname === '/book-a-call')) captureCta('demo_clicked');
      if (url.hostname === 'app.sparkinventory.com' && ['/sign-up', '/shopify-trial'].includes(url.pathname)) captureCta('signup_clicked');
    };
    document.addEventListener('click', trackLink);
    return () => document.removeEventListener('click', trackLink);
  }, []);
  return null;
}
