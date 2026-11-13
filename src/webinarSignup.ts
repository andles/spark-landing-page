/**
 * Webinar registration creates the visitor's Spark account right here: the form posts the
 * same sign-up the app's own /sign-up page sends (POST /api/v1/authentication/registration,
 * which answers sparkinventory.com cross-origin), as a fresh Free account.
 *
 * The answer carries the new session. It is handed to the app by sending the refresh token to
 * app.sparkinventory.com/welcome in the URL fragment (never sent to a server). That page trades
 * it at /authentication/session/resume, which rotates it, so the copy in the URL is spent on
 * arrival and the visitor lands signed in to their new account.
 */
export interface WebinarRegistration {
  firstName: string;
  lastName: string;
  company: string;
  website: string;
  email: string;
  phone: string;
  password: string;
  /** Agreed to the Terms of Service and Privacy Policy, as the app's sign-up page requires. */
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

/** The consent version the server records; keep in step with DataConsentRecord.CurrentVersion. */
export const DATA_CONSENT_VERSION = '2026-08-29.v1';

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

/** Ten US digits from whatever was typed, or '' for a blank field; null when it cannot be one. */
export function usPhoneDigits(phone: string): string | null {
  let digits = phone.replace(/\D/g, '');
  if (!digits) return '';
  if (digits.length === 11 && digits.startsWith('1')) digits = digits.slice(1);
  return digits.length === 10 ? digits : null;
}

/** What the visitor still has to fix, in form order, worded to follow "Please add". */
export function missingWebinarFields(form: WebinarRegistration): string[] {
  return [
    !form.firstName.trim() && 'your first name',
    !form.lastName.trim() && 'your last name',
    !form.company.trim() && 'your company name',
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim()) && 'a valid work email',
    usPhoneDigits(form.phone) === null && 'a 10-digit US phone number (or leave it blank)',
    !form.password && 'a password',
    !form.consent && 'your agreement to the Terms of Service and Privacy Policy',
  ].filter((field): field is string => typeof field === 'string');
}

export interface RegistrationExtras {
  timezone: string;
  turnstileToken?: string;
  /** Milliseconds since the form appeared; the server refuses a submit faster than a person. */
  formElapsedMs: number;
  /** The hidden honeypot field; only a bot fills it. */
  fax?: string;
  /** Optional Super Admin onboarding campaign (no preset plan, so the account stays Free). */
  campaignToken?: string;
}

export function registrationBody(form: WebinarRegistration, extras: RegistrationExtras): Record<string, unknown> {
  const body: Record<string, unknown> = {
    name: form.company.trim(),
    email: form.email.trim(),
    password: form.password,
    firstName: form.firstName.trim(),
    lastName: form.lastName.trim(),
    country: 'US',
    currency: 'USD',
    defaultTimezone: extras.timezone,
    selectedPlan: 'free',
    consentVersion: DATA_CONSENT_VERSION,
    formElapsedMs: extras.formElapsedMs,
  };
  const phone = usPhoneDigits(form.phone);
  if (phone) body.phone = phone;
  const website = form.website.trim();
  if (website) body.website = website;
  if (extras.turnstileToken) body.turnstileToken = extras.turnstileToken;
  if (extras.fax) body.fax = extras.fax;
  const campaign = extras.campaignToken?.trim();
  if (campaign) body.campaignToken = campaign;
  return body;
}

/** A refusal worded for the visitor, and whether signing in is the way forward. */
export class WebinarSignupError extends Error {
  readonly alreadyRegistered: boolean;

  constructor(message: string, alreadyRegistered = false) {
    super(message);
    this.name = 'WebinarSignupError';
    this.alreadyRegistered = alreadyRegistered;
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
  if (res.status === 409 || body.error === 'email_already_registered') {
    return new WebinarSignupError('That email already has a Spark account. Sign in to it instead; your webinar seat is the same.', true);
  }
  if (body.error === 'signup_blocked' && body.reason && BLOCKED_MESSAGES[body.reason]) {
    return new WebinarSignupError(BLOCKED_MESSAGES[body.reason]);
  }
  if (res.status === 429) {
    return new WebinarSignupError('Too many sign-ups from this network just now. Please try again in a few minutes.');
  }
  const serverMessage = body.errorMessage || body.message;
  if (res.status < 500 && serverMessage) return new WebinarSignupError(serverMessage);
  return new WebinarSignupError('Something went wrong creating your account. Please try again.');
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
    res = await fetchImpl(`${apiBase.replace(/\/+$/, '')}/api/v1/authentication/registration`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(registrationBody(form, extras)),
    });
  } catch {
    throw new WebinarSignupError('We could not reach Spark. Check your connection and try again.');
  }
  if (!res.ok) throw await readSignupRefusal(res);
  const session = (await res.json().catch(() => null)) as { refreshToken?: string } | null;
  if (!session?.refreshToken) {
    // The account exists; only the hand-off failed, so signing in finishes the job.
    throw new WebinarSignupError('Your account is ready. Sign in with the email and password you just chose.', true);
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
