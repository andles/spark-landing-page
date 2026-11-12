import { describe, expect, it } from 'vitest';
import {
  addNoticeOkButton,
  closeButtonSelector,
  noticeButtonsSelector,
  okClass,
  optOutSelector,
  type NoticeEnvironment,
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

type NoticeOptions = { close?: boolean; gpc?: boolean; cookieYesReady?: boolean };

function notice(law: 'ccpa' | 'gdpr', { close = true, gpc = false, cookieYesReady = true }: NoticeOptions = {}) {
  const buttons = new FakeElement([noticeButtonsSelector]);
  if (law === 'ccpa') buttons.append(new FakeElement([optOutSelector]));
  else buttons.append(new FakeElement(['.cky-btn-accept']));
  const closeButton = close ? new FakeElement([closeButtonSelector]) : null;
  const root = {
    querySelector: (selector: string) =>
      selector === noticeButtonsSelector ? buttons : selector === closeButtonSelector ? closeButton : null,
    createElement: () => new FakeElement(),
  } as unknown as Document;
  const actions: string[] = [];
  const environment: NoticeEnvironment = {
    root,
    performBannerAction: cookieYesReady ? (action) => actions.push(action) : undefined,
    globalPrivacyControl: () => gpc,
  };
  const pressOk = () => buttons.children.find((child) => child.className.includes(okClass))!.click();
  return { environment, buttons, closeButton, actions, pressOk };
}

describe('the US notice OK button', () => {
  it('is added once, after the opt-out link', () => {
    const { environment, buttons } = notice('ccpa');

    expect(addNoticeOkButton(environment)).toBe(true);
    expect(addNoticeOkButton(environment)).toBe(true);

    const ok = buttons.children.filter((child) => child.className.includes(okClass));
    expect(ok).toHaveLength(1);
    expect(ok[0].textContent).toBe('OK');
    expect(ok[0].type).toBe('button');
    expect(buttons.children.at(-1)).toBe(ok[0]);
  });

  // A bare close would keep a pre-choice analytics:no and, with action:yes,
  // read as an opt-out (analyticsConsent.ts).
  it('records accept_all, keeping collection on as the notice says', () => {
    const { environment, closeButton, actions, pressOk } = notice('ccpa');
    addNoticeOkButton(environment);

    pressOk();

    expect(actions).toEqual(['accept_all']);
    expect(closeButton!.clicks).toBe(0);
  });

  it('only closes the notice for a browser sending Global Privacy Control', () => {
    const { environment, closeButton, actions, pressOk } = notice('ccpa', { gpc: true });
    addNoticeOkButton(environment);

    pressOk();

    expect(actions).toEqual([]);
    expect(closeButton!.clicks).toBe(1);
  });

  it('is not added when CookieYes exposes no accept_all action', () => {
    const { environment, buttons } = notice('ccpa', { cookieYesReady: false });

    expect(addNoticeOkButton(environment)).toBe(false);
    expect(buttons.children).toHaveLength(1);
  });

  it('is not added to the opt-in banner, where Accept and Reject stay equal', () => {
    const { environment, buttons } = notice('gdpr');

    expect(addNoticeOkButton(environment)).toBe(false);
    expect(buttons.children.some((child) => child.className.includes(okClass))).toBe(false);
  });

  it('is not added when CookieYes renders no close button', () => {
    const { environment, buttons } = notice('ccpa', { close: false });

    expect(addNoticeOkButton(environment)).toBe(false);
    expect(buttons.children).toHaveLength(1);
  });
});
