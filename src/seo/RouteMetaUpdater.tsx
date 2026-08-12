import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { findRouteMeta } from './routeMeta';

// Keeps document.title and the meta description in sync on client-side
// navigation. Initial-load values come from the prerendered HTML; this only
// matters once the visitor navigates within the SPA.
export default function RouteMetaUpdater() {
  const { pathname } = useLocation();

  useEffect(() => {
    const meta = findRouteMeta(pathname);
    if (!meta) return;
    document.title = meta.title;
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute('content', meta.description);
  }, [pathname]);

  return null;
}
