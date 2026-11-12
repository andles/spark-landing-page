// The US notice (CookieYes's opt-out template) offers only the opt-out link
// and a close (×) button, with no acknowledge button of its own. Spark adds an
// OK button and styles the opt-out as a link (consent.css). Under the opt-in
// banner (EU and UK) nothing is added: Accept and Reject stay equally
// prominent there.
//
// OK keeps what the notice describes, collection on until the visitor opts
// out, so it records CookieYes's accept_all. A bare close is not enough: it
// records action:yes over whatever categories CookieYes wrote before any
// choice, and CookieYes has written analytics:no there (see analyticsConsent.ts),
// which reads as an opt-out once action:yes is set. A browser sending Global
// Privacy Control has opted out already, so OK only closes the notice there
// and never turns its categories on.
// Keep this file aligned with web-app/src/helpers/consentNoticeOk.ts in the
// monorepo.
import { hasGlobalPrivacyControl } from './analyticsConsent';

declare global {
  interface Window {
    performBannerAction?: (action: 'accept_all' | 'accept_partial' | 'reject') => void;
  }
}

export const noticeButtonsSelector = '.cky-consent-container [data-cky-tag="notice-buttons"]';
export const closeButtonSelector = '.cky-consent-container [data-cky-tag="close-button"]';
export const optOutSelector = '.cky-btn-do-not-sell';
export const okClass = 'spark-notice-ok';

type Root = Pick<Document, 'querySelector' | 'createElement'>;

export type NoticeEnvironment = {
  root: Root;
  performBannerAction?: Window['performBannerAction'];
  globalPrivacyControl: () => boolean;
};

function browserEnvironment(): NoticeEnvironment {
  return {
    root: document,
    performBannerAction: window.performBannerAction,
    globalPrivacyControl: hasGlobalPrivacyControl,
  };
}

// Adds the OK button to the US notice once. Returns whether the notice now
// has one. None is added unless CookieYes exposes both its close button (for
// Global Privacy Control) and its accept_all action: a fallback to the bare
// close would bring back the opt-out described above.
export function addNoticeOkButton(environment: NoticeEnvironment = browserEnvironment()): boolean {
  const { root } = environment;
  const buttons = root.querySelector(noticeButtonsSelector);
  const close = root.querySelector<HTMLElement>(closeButtonSelector);
  const accept = environment.performBannerAction;
  if (!buttons || !close || !accept || !buttons.querySelector(optOutSelector)) return false;
  if (buttons.querySelector(`.${okClass}`)) return true;

  const ok = root.createElement('button');
  ok.type = 'button';
  ok.className = `cky-btn ${okClass}`;
  ok.textContent = 'OK';
  ok.addEventListener('click', () => {
    if (environment.globalPrivacyControl()) close.click();
    else accept('accept_all');
  });
  buttons.append(ok);
  return true;
}

export function installNoticeOkButton(): void {
  if (typeof document === 'undefined') return;
  const add = () => {
    addNoticeOkButton();
  };
  // CookieYes renders the notice after its script loads and announces it.
  document.addEventListener('cookieyes_banner_load', add);
  add();
}
