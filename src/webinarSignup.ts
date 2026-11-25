/**
 * Webinar registration creates the visitor's Spark account right here, through the webinar's
 * onboarding campaign: the form posts the campaign quick start the app's own campaign link uses
 * (POST /api/v1/authentication/shopify-trial-registration, which answers sparkinventory.com
 * cross-origin). The campaign, not this page, decides the offer: today a 30-day Operate trial
 * that starts at sign-up, with no card, then the campaign discount.
 *
 * The answer carries the new session. It is handed to the app by sending the refresh token to
 * app.sparkinventory.com/welcome in the URL fragment (never sent to a server). That page trades
 * it at /authentication/session/resume, which rotates it, so the copy in the URL is spent on
 * arrival and the visitor lands signed in to their new account (or on Shopify's connect step,
 * when their website is a Shopify store).
 */
export interface WebinarRegistration {
  firstName: string;
  lastName: string;
  company: string;
  website: string;
  email: string;
  phone: string;
  password: string;
  /** Agreed to the Terms of Service and Privacy Policy. */
  consent: boolean;
}

export const EMPTY_WEBINAR_REGISTRATION: WebinarRegistration = {
  firstName: '',
  lastName: '',
  company: '',
  website: '',
  email: '',
  phone: '',
  password: '',
  consent: false,
};

/**
 * The Chew On This webinar's onboarding campaign (Super Admin, Foundations quick start). Its key
 * is public: it is the `campaign` parameter of the campaign's own sign-up link.
 */
export const CHEW_WEBINAR_CAMPAIGN_KEY = 'ae6050d9319cfefd7580b93164054e8fb66df6c8557e14d69f16c3b12c68d984';

export const DEFAULT_API_BASE = 'https://api.sparkinventory.com';
export const DEFAULT_APP_URL = 'https://app.sparkinventory.com';

/** The US timezones the app's sign-up offers; anything else falls back to the webinar's own. */
const US_TIMEZONES = new Set([
  'America/Adak', 'America/Anchorage', 'America/Boise', 'America/Chicago', 'America/Denver',
  'America/Detroit', 'America/Indiana/Indianapolis', 'America/Indiana/Knox', 'America/Indiana/Marengo',
  'America/Indiana/Petersburg', 'America/Indiana/Tell_City', 'America/Indiana/Vevay',
  'America/Indiana/Vincennes', 'America/Indiana/Winamac', 'America/Kentucky/Louisville',
  'America/Kentucky/Monticello', 'America/Los_Angeles', 'America/Menominee', 'America/New_York',
  'America/North_Dakota/Beulah', 'America/North_Dakota/Center', 'America/North_Dakota/New_Salem',
  'America/Phoenix', 'America/Puerto_Rico', 'Pacific/Honolulu',
]);
const FALLBACK_TIMEZONE = 'America/Chicago';

export function signupTimezone(browserTimezone: string | undefined): string {
  return browserTimezone && US_TIMEZONES.has(browserTimezone) ? browserTimezone : FALLBACK_TIMEZONE;
}

/** Ten US digits from whatever was typed, or null when it cannot be one. */
export function usPhoneDigits(phone: string): string | null {
  let digits = phone.replace(/\D/g, '');
  if (digits.length === 11 && digits.startsWith('1')) digits = digits.slice(1);
  return digits.length === 10 ? digits : null;
}

/** What the visitor still has to fix, in form order, worded to follow "Please add". */
export function missingWebinarFields(form: WebinarRegistration): string[] {
  return [
    !form.firstName.trim() && 'your first name',
    !form.lastName.trim() && 'your last name',
    !form.company.trim() && 'your company name',
    !/^[^\s.]+\.[^\s]+$/.test(form.website.trim()) && 'your company website',
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim()) && 'a valid work email',
    usPhoneDigits(form.phone) === null && 'a 10-digit US phone number',
    !form.password && 'a password',
    !form.consent && 'your agreement to the Terms of Service and Privacy Policy',
  ].filter((field): field is string => typeof field === 'string');
}

export interface RegistrationExtras {
  timezone: string;
  /** The onboarding campaign whose offer the account gets. */
  campaignKey: string;
}

/** The campaign quick start's request, the same contract the app's campaign sign-up page sends. */
export function registrationBody(form: WebinarRegistration, extras: RegistrationExtras): Record<string, string> {
  return {
    campaignKey: extras.campaignKey.trim(),
    fullName: `${form.firstName.trim()} ${form.lastName.trim()}`,
    companyName: form.company.trim(),
    companyWebsite: form.website.trim(),
    email: form.email.trim(),
    phone: usPhoneDigits(form.phone) ?? form.phone.trim(),
    password: form.password,
    passwordConfirmation: form.password,
    defaultTimezone: extras.timezone,
  };
}

/**
 * Why a registration failed, for analytics: the server's block reason (disposable_email,
 * undeliverable_email, verification_failed, rejected) or one of the outcomes below.
 */
export type WebinarFailureReason =
  | 'already_registered'
  | 'rate_limited'
  | 'invalid'
  | 'server_error'
  | 'network'
  | 'handoff_failed'
  | string;

export interface WebinarFailureDetails {
  reason: WebinarFailureReason;
  /** HTTP status, when the server answered. */
  status?: number;
  /** The server's own error code, such as password_rejected. */
  serverCode?: string;
  /** The server's message for a 4xx refusal, which is what the visitor read. */
  serverMessage?: string;
}

/** A refusal worded for the visitor, whether signing in is the way forward, and why it happened. */
export class WebinarSignupError extends Error {
  readonly alreadyRegistered: boolean;
  readonly details: WebinarFailureDetails;

  constructor(message: string, alreadyRegistered = false, details: WebinarFailureDetails = { reason: 'server_error' }) {
    super(message);
    this.name = 'WebinarSignupError';
    this.alreadyRegistered = alreadyRegistered;
    this.details = details;
  }
}

const BLOCKED_MESSAGES: Record<string, string> = {
  disposable_email: 'Please use your work email. Temporary email addresses cannot sign up.',
  undeliverable_email: 'That email address cannot receive mail. Please check it and try again.',
  verification_failed: 'We could not confirm you are a person. Please try again.',
  rejected: 'We could not create this account. Please email support@sparkinventory.com and we will set you up.',
};

export async function readSignupRefusal(res: Response): Promise<WebinarSignupError> {
  let body: { error?: string; reason?: string; errorMessage?: string; message?: string } = {};
  try {
    body = await res.json();
  } catch {
    // Not JSON: the generic message below.
  }
  const status = res.status;
  const serverCode = typeof body.error === 'string' ? body.error : undefined;
  if (status === 409 || body.error === 'email_already_registered') {
    return new WebinarSignupError('That email already has a Spark account. Sign in to it instead; your webinar seat is the same.', true, { reason: 'already_registered', status, serverCode });
  }
  if (body.error === 'signup_blocked' && body.reason && BLOCKED_MESSAGES[body.reason]) {
    return new WebinarSignupError(BLOCKED_MESSAGES[body.reason], false, { reason: body.reason, status, serverCode });
  }
  if (status === 429) {
    return new WebinarSignupError('Too many sign-ups from this network just now. Please try again in a few minutes.', false, { reason: 'rate_limited', status, serverCode });
  }
  const serverMessage = body.errorMessage || body.message;
  if (status < 500 && serverMessage) {
    return new WebinarSignupError(serverMessage, false, { reason: 'invalid', status, serverCode, serverMessage });
  }
  return new WebinarSignupError('Something went wrong creating your account. Please try again.', false, { reason: status < 500 ? 'invalid' : 'server_error', status, serverCode });
}

type Fetch = (input: string, init: RequestInit) => Promise<Response>;

/** Creates the account and resolves with the new session's refresh token. */
export async function registerForWebinar(
  form: WebinarRegistration,
  extras: RegistrationExtras,
  apiBase: string = import.meta.env.VITE_SPARK_API_URL?.trim() || DEFAULT_API_BASE,
  fetchImpl: Fetch = (input, init) => fetch(input, init),
): Promise<string> {
  let res: Response;
  try {
    res = await fetchImpl(`${apiBase.replace(/\/+$/, '')}/api/v1/authentication/shopify-trial-registration`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(registrationBody(form, extras)),
    });
  } catch {
    throw new WebinarSignupError('We could not reach Spark. Check your connection and try again.', false, { reason: 'network' });
  }
  if (!res.ok) throw await readSignupRefusal(res);
  const session = (await res.json().catch(() => null)) as { refreshToken?: string } | null;
  if (!session?.refreshToken) {
    // The account exists; only the hand-off failed, so signing in finishes the job.
    throw new WebinarSignupError('Your account is ready. Sign in with the email and password you just chose.', true, { reason: 'handoff_failed', status: res.status });
  }
  return session.refreshToken;
}

/** Where the new account opens, signed in. */
export function welcomeUrl(refreshToken: string, appUrl: string = import.meta.env.VITE_APP_URL?.trim() || DEFAULT_APP_URL): string {
  return `${appUrl.replace(/\/+$/, '')}/welcome#${new URLSearchParams({ session: refreshToken }).toString()}`;
}

export function signInUrl(appUrl: string = import.meta.env.VITE_APP_URL?.trim() || DEFAULT_APP_URL): string {
  return `${appUrl.replace(/\/+$/, '')}/sign-in`;
}
