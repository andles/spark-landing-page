// Makes the cards in Soro's /blog/ widget open each article's own page.
//
// Soro renders every card as <a href="/blog/?post=<slug>" class="soro-blog-card"
// data-slug="<slug>"> and attaches a click listener to each card that cancels
// the navigation, pushes /blog/?post=<slug> and draws the article inside the
// list page. That in-page article keeps the page's own h1 and canonical next
// to the ones the widget adds, so every card click lands on a page with two
// h1s and two canonical tags, and the address bar shows the query URL that
// /blog/<slug>/ replaced (see soro.ts). It also swallows Ctrl/Cmd-click.
//
// The fix leaves Soro's script untouched: card hrefs point at /blog/<slug>/,
// and a capture-phase listener on the widget's host stops a card click from
// reaching Soro's listener without cancelling it, so the browser follows the
// link itself (same tab, new tab, keyboard, Back) and the edge function serves
// the article page.

import { articlePath, isArticleSlug } from './soro';

const CARD_SELECTOR = 'a.soro-blog-card';

interface CardLink {
  getAttribute(name: string): string | null;
  setAttribute(name: string, value: string): void;
}

/** The clean article path for a Soro card, or null when the card has no valid slug. */
export function cardArticlePath(card: Pick<CardLink, 'getAttribute'>): string | null {
  const slug = card.getAttribute('data-slug');
  return slug && isArticleSlug(slug) ? articlePath(slug) : null;
}

/** Points every Soro card under root at its article page. */
export function rewriteSoroCardLinks(root: ParentNode): void {
  root.querySelectorAll<HTMLAnchorElement>(CARD_SELECTOR).forEach((card) => {
    const path = cardArticlePath(card);
    if (path && card.getAttribute('href') !== path) card.setAttribute('href', path);
  });
}

/** The Soro card a click landed in, if its link can go to an article page. */
export function articleCardFor(target: EventTarget | null, host: Node): HTMLAnchorElement | null {
  if (!target || typeof (target as Element).closest !== 'function') return null;
  const card = (target as Element).closest<HTMLAnchorElement>(CARD_SELECTOR);
  return card && host.contains(card) && cardArticlePath(card) ? card : null;
}

/**
 * Keeps Soro's cards as plain links to /blog/<slug>/ for as long as the widget
 * renders inside host. Returns a cleanup function.
 */
export function installSoroCardNavigation(host: HTMLElement): () => void {
  rewriteSoroCardLinks(host);
  // Soro rewrites the list on every render, so new cards get their hrefs fixed
  // as they appear.
  const observer = new MutationObserver(() => rewriteSoroCardLinks(host));
  observer.observe(host, { childList: true, subtree: true, attributes: true, attributeFilter: ['href'] });

  // Capture runs on host before the card's own listener. Stopping propagation
  // (but not the default action) leaves the click to the browser.
  const onClick = (event: MouseEvent) => {
    const card = articleCardFor(event.target, host);
    if (!card) return;
    rewriteSoroCardLinks(host);
    event.stopPropagation();
  };
  host.addEventListener('click', onClick, true);

  return () => {
    observer.disconnect();
    host.removeEventListener('click', onClick, true);
  };
}
