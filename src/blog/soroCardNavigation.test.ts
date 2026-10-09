import { afterEach, describe, expect, it, vi } from 'vitest';
import {
  articleCardFor,
  cardArticlePath,
  installSoroCardNavigation,
  rewriteSoroCardLinks,
} from './soroCardNavigation';

// The suite runs in node without a DOM, so cards and the host are small fakes
// that implement only what the module touches.

class FakeCard {
  attrs: Record<string, string>;
  constructor(attrs: Record<string, string>) {
    this.attrs = { ...attrs };
  }
  getAttribute(name: string) {
    return name in this.attrs ? this.attrs[name] : null;
  }
  setAttribute(name: string, value: string) {
    this.attrs[name] = value;
  }
  closest(selector: string) {
    return selector === 'a.soro-blog-card' ? this : null;
  }
}

const soroCard = (slug: string | null) =>
  new FakeCard(slug === null ? { href: '/blog/' } : { href: `/blog/?post=${slug}`, 'data-slug': slug });

type Listener = (event: MouseEvent) => void;

class FakeHost {
  cards: FakeCard[];
  listeners: { type: string; listener: Listener; capture: unknown }[] = [];
  constructor(cards: FakeCard[]) {
    this.cards = cards;
  }
  querySelectorAll(selector: string) {
    return selector === 'a.soro-blog-card' ? this.cards : [];
  }
  contains(node: unknown) {
    return this.cards.includes(node as FakeCard);
  }
  addEventListener(type: string, listener: Listener, capture: unknown) {
    this.listeners.push({ type, listener, capture });
  }
  removeEventListener(type: string, listener: Listener, capture: unknown) {
    this.listeners = this.listeners.filter(
      (entry) => !(entry.type === type && entry.listener === listener && entry.capture === capture),
    );
  }
}

const asHost = (host: FakeHost) => host as unknown as HTMLElement;

const clickOn = (target: unknown) => {
  const event = { target, stopPropagation: vi.fn(), preventDefault: vi.fn() };
  return { event, asMouseEvent: event as unknown as MouseEvent };
};

describe('cardArticlePath', () => {
  it('maps a card slug to the clean article path', () => {
    expect(cardArticlePath(soroCard('reorder-points-versus-forecasts'))).toBe(
      '/blog/reorder-points-versus-forecasts/',
    );
  });

  it('rejects cards without a usable slug', () => {
    expect(cardArticlePath(soroCard(null))).toBeNull();
    expect(cardArticlePath(soroCard(''))).toBeNull();
    expect(cardArticlePath(soroCard('../admin'))).toBeNull();
    expect(cardArticlePath(soroCard('Has Spaces'))).toBeNull();
  });
});

describe('rewriteSoroCardLinks', () => {
  it('points query-string card links at clean article URLs', () => {
    const cards = [soroCard('first-post'), soroCard('second-post')];
    rewriteSoroCardLinks(new FakeHost(cards) as unknown as ParentNode);
    expect(cards.map((card) => card.getAttribute('href'))).toEqual([
      '/blog/first-post/',
      '/blog/second-post/',
    ]);
    expect(cards.every((card) => !card.getAttribute('href')?.includes('?post='))).toBe(true);
  });

  it('leaves cards without a valid slug alone', () => {
    const card = soroCard('../admin');
    rewriteSoroCardLinks(new FakeHost([card]) as unknown as ParentNode);
    expect(card.getAttribute('href')).toBe('/blog/?post=../admin');
  });

  it('does not rewrite an href that is already clean', () => {
    const card = soroCard('first-post');
    card.setAttribute('href', '/blog/first-post/');
    const setAttribute = vi.spyOn(card, 'setAttribute');
    rewriteSoroCardLinks(new FakeHost([card]) as unknown as ParentNode);
    expect(setAttribute).not.toHaveBeenCalled();
  });
});

describe('articleCardFor', () => {
  it('finds the card a click landed in', () => {
    const card = soroCard('first-post');
    const host = new FakeHost([card]);
    const inner = { closest: () => card };
    expect(articleCardFor(inner as unknown as EventTarget, host as unknown as Node)).toBe(card);
  });

  it('ignores clicks outside a card, outside the host, or on a card without a slug', () => {
    const card = soroCard('first-post');
    const host = new FakeHost([card]);
    expect(articleCardFor(null, host as unknown as Node)).toBeNull();
    expect(articleCardFor({ closest: () => null } as unknown as EventTarget, host as unknown as Node)).toBeNull();
    expect(articleCardFor({} as EventTarget, host as unknown as Node)).toBeNull();
    const elsewhere = soroCard('other-post');
    expect(articleCardFor(elsewhere as unknown as EventTarget, host as unknown as Node)).toBeNull();
    const noSlug = soroCard(null);
    expect(articleCardFor(noSlug as unknown as EventTarget, new FakeHost([noSlug]) as unknown as Node)).toBeNull();
  });
});

describe('installSoroCardNavigation', () => {
  const observers: { callback: () => void; disconnect: ReturnType<typeof vi.fn>; options: unknown }[] = [];

  class FakeMutationObserver {
    disconnect = vi.fn();
    callback: () => void;
    constructor(callback: () => void) {
      this.callback = callback;
    }
    observe(_target: unknown, options: unknown) {
      observers.push({ callback: this.callback, disconnect: this.disconnect, options });
    }
  }

  afterEach(() => {
    observers.length = 0;
    vi.unstubAllGlobals();
  });

  const install = (cards: FakeCard[]) => {
    vi.stubGlobal('MutationObserver', FakeMutationObserver);
    const host = new FakeHost(cards);
    const cleanup = installSoroCardNavigation(asHost(host));
    return { host, cleanup };
  };

  it('rewrites cards present at install and cards Soro renders later', () => {
    const first = soroCard('first-post');
    const { host } = install([first]);
    expect(first.getAttribute('href')).toBe('/blog/first-post/');

    const later = soroCard('second-post');
    host.cards.push(later);
    observers[0].callback();
    expect(later.getAttribute('href')).toBe('/blog/second-post/');
    expect(observers[0].options).toMatchObject({ childList: true, subtree: true });
  });

  it('keeps card clicks away from Soro without cancelling the browser navigation', () => {
    const card = soroCard('first-post');
    const { host } = install([card]);
    const [{ type, listener, capture }] = host.listeners;
    expect(type).toBe('click');
    expect(capture).toBe(true);

    // Soro resets the href after install; the click still leaves with the clean one.
    card.setAttribute('href', '/blog/?post=first-post');
    const { event, asMouseEvent } = clickOn(card);
    listener(asMouseEvent);
    expect(event.stopPropagation).toHaveBeenCalledOnce();
    expect(event.preventDefault).not.toHaveBeenCalled();
    expect(card.getAttribute('href')).toBe('/blog/first-post/');
  });

  it('lets other clicks inside the widget through untouched', () => {
    const { host } = install([soroCard('first-post')]);
    const { event, asMouseEvent } = clickOn({ closest: () => null });
    host.listeners[0].listener(asMouseEvent);
    expect(event.stopPropagation).not.toHaveBeenCalled();
    expect(event.preventDefault).not.toHaveBeenCalled();
  });

  it('removes the listener and observer on cleanup', () => {
    const { host, cleanup } = install([soroCard('first-post')]);
    cleanup();
    expect(host.listeners).toHaveLength(0);
    expect(observers[0].disconnect).toHaveBeenCalledOnce();
  });
});
