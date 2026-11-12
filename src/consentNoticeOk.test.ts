import { describe, expect, it } from 'vitest';
import {
  addNoticeOkButton,
  closeButtonSelector,
  noticeButtonsSelector,
  okClass,
  optOutSelector,
} from './consentNoticeOk';

// A stand-in for the few DOM calls the module makes, matching CookieYes's
// selectors exactly (the test environment has no DOM).
class FakeElement {
  type = '';
  className = '';
  textContent = '';
  children: FakeElement[] = [];
  clicks = 0;
  private listeners: Array<() => void> = [];
  private readonly matches: string[];
  constructor(matches: string[] = []) {
    this.matches = matches;
  }
  addEventListener(_: string, listener: () => void) {
    this.listeners.push(listener);
  }
  click() {
    this.clicks += 1;
    this.listeners.forEach((listener) => listener());
  }
  append(child: FakeElement) {
    this.children.push(child);
  }
  is(selector: string) {
    return this.matches.includes(selector) || selector === `.${this.className.split(' ').pop()}`;
  }
  querySelector(selector: string) {
    return this.children.find((child) => child.is(selector)) ?? null;
  }
}

function notice({ law }: { law: 'ccpa' | 'gdpr' }, { close = true } = {}) {
  const buttons = new FakeElement([noticeButtonsSelector]);
  if (law === 'ccpa') buttons.append(new FakeElement([optOutSelector]));
  else buttons.append(new FakeElement(['.cky-btn-accept']));
  const closeButton = close ? new FakeElement([closeButtonSelector]) : null;
  const root = {
    querySelector: (selector: string) =>
      selector === noticeButtonsSelector ? buttons : selector === closeButtonSelector ? closeButton : null,
    createElement: () => new FakeElement(),
  } as unknown as Document;
  return { root, buttons, closeButton };
}

describe('the US notice OK button', () => {
  it('is added once beside the opt-out link and closes the notice', () => {
    const { root, buttons, closeButton } = notice({ law: 'ccpa' });

    expect(addNoticeOkButton(root)).toBe(true);
    expect(addNoticeOkButton(root)).toBe(true);

    const ok = buttons.children.filter((child) => child.className.includes(okClass));
    expect(ok).toHaveLength(1);
    expect(ok[0].textContent).toBe('OK');
    expect(ok[0].type).toBe('button');
    ok[0].click();
    expect(closeButton!.clicks).toBe(1);
  });

  it('is not added to the opt-in banner, where Accept and Reject stay equal', () => {
    const { root, buttons } = notice({ law: 'gdpr' });

    expect(addNoticeOkButton(root)).toBe(false);
    expect(buttons.children.some((child) => child.className.includes(okClass))).toBe(false);
  });

  it('is not added when CookieYes renders no close button for it to press', () => {
    const { root, buttons } = notice({ law: 'ccpa' }, { close: false });

    expect(addNoticeOkButton(root)).toBe(false);
    expect(buttons.children).toHaveLength(1);
  });
});
