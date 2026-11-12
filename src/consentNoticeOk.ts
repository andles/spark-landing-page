// The US notice (CookieYes's opt-out template) offers only the opt-out link
// and a close (×) button. Closing records action:yes and leaves every
// category as it is, which is what "OK" means under an opt-out law. The
// template has no acknowledge button of its own, so Spark adds one that
// performs that close, and styles the opt-out link as a link (consent.css).
// Under the opt-in banner (EU and UK) nothing is added: Accept and Reject
// stay equally prominent there.
// Keep this file aligned with web-app/src/helpers/consentNoticeOk.ts in the
// monorepo.

export const noticeButtonsSelector = '.cky-consent-container [data-cky-tag="notice-buttons"]';
export const closeButtonSelector = '.cky-consent-container [data-cky-tag="close-button"]';
export const optOutSelector = '.cky-btn-do-not-sell';
export const okClass = 'spark-notice-ok';

type Root = Pick<Document, 'querySelector' | 'createElement'>;

// Adds the OK button to the US notice once. Returns whether the notice now
// has one. Without CookieYes's close button there is nothing for OK to do,
// so none is added.
export function addNoticeOkButton(root: Root = document): boolean {
  const buttons = root.querySelector(noticeButtonsSelector);
  const close = root.querySelector<HTMLElement>(closeButtonSelector);
  if (!buttons || !close || !buttons.querySelector(optOutSelector)) return false;
  if (buttons.querySelector(`.${okClass}`)) return true;

  const ok = root.createElement('button');
  ok.type = 'button';
  ok.className = `cky-btn ${okClass}`;
  ok.textContent = 'OK';
  ok.addEventListener('click', () => close.click());
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
