import { describe, expect, it, vi } from 'vitest';
import {
  CHEW_WEBINAR_CAMPAIGN_KEY,
  EMPTY_WEBINAR_REGISTRATION,
  missingWebinarFields,
  registerForWebinar,
  registrationBody,
  signupTimezone,
  usPhoneDigits,
  WebinarSignupError,
  welcomeUrl,
} from './webinarSignup';

const form = {
  firstName: ' Ana ',
  lastName: 'Lee',
  company: 'Brand & Co',
  website: 'brand.com',
  email: 'ana@brand.com ',
  phone: '+1 (415) 555-1234',
  password: 'correct horse battery staple',
  consent: true,
};
const extras = { timezone: 'America/Chicago', campaignKey: ` ${CHEW_WEBINAR_CAMPAIGN_KEY} ` };

const json = (status: number, body: unknown) =>
  new Response(JSON.stringify(body), { status, headers: { 'Content-Type': 'application/json' } });

describe('registrationBody', () => {
  it("sends the campaign quick start the app's own campaign page sends", () => {
    expect(registrationBody(form, extras)).toEqual({
      campaignKey: CHEW_WEBINAR_CAMPAIGN_KEY,
      fullName: 'Ana Lee',
      companyName: 'Brand & Co',
      companyWebsite: 'brand.com',
      email: 'ana@brand.com',
      phone: '4155551234',
      password: 'correct horse battery staple',
      passwordConfirmation: 'correct horse battery staple',
      defaultTimezone: 'America/Chicago',
    });
  });
});

describe('registerForWebinar', () => {
  it('posts to the registration endpoint and returns the refresh token', async () => {
    const fetchImpl = vi.fn().mockResolvedValue(json(201, { token: 'a', refreshToken: 'sess.secret' }));
    await expect(registerForWebinar(form, extras, 'https://api.example.com/', fetchImpl)).resolves.toBe('sess.secret');
    const [url, init] = fetchImpl.mock.calls[0];
    expect(url).toBe('https://api.example.com/api/v1/authentication/shopify-trial-registration');
    expect(init.method).toBe('POST');
    expect(JSON.parse(init.body).campaignKey).toBe(CHEW_WEBINAR_CAMPAIGN_KEY);
  });

  it('points an existing account at sign-in', async () => {
    const fetchImpl = vi.fn().mockResolvedValue(json(409, { error: 'email_already_registered' }));
    const error = await registerForWebinar(form, extras, 'https://api.example.com', fetchImpl).catch((e) => e);
    expect(error).toBeInstanceOf(WebinarSignupError);
    expect(error.alreadyRegistered).toBe(true);
  });

  it('words a blocked email for the visitor', async () => {
    const fetchImpl = vi.fn().mockResolvedValue(json(400, { error: 'signup_blocked', reason: 'disposable_email' }));
    await expect(registerForWebinar(form, extras, 'https://api.example.com', fetchImpl)).rejects.toThrow(/work email/);
  });

  it("shows the server's own reason for a rejected password", async () => {
    const fetchImpl = vi.fn().mockResolvedValue(json(400, { error: 'password_rejected', errorMessage: 'Use at least 12 characters.' }));
    await expect(registerForWebinar(form, extras, 'https://api.example.com', fetchImpl)).rejects.toThrow('Use at least 12 characters.');
  });

  it('does not show a server error body to the visitor', async () => {
    const fetchImpl = vi.fn().mockResolvedValue(json(500, { errorMessage: 'NullReferenceException' }));
    await expect(registerForWebinar(form, extras, 'https://api.example.com', fetchImpl)).rejects.toThrow(/Something went wrong/);
  });

  it('reports a network failure', async () => {
    const fetchImpl = vi.fn().mockRejectedValue(new TypeError('Failed to fetch'));
    await expect(registerForWebinar(form, extras, 'https://api.example.com', fetchImpl)).rejects.toThrow(/could not reach Spark/);
  });
});

describe('welcomeUrl', () => {
  it('carries the session in the fragment only', () => {
    const url = new URL(welcomeUrl('sess.se/cret+', 'https://app.example.com/'));
    expect(url.origin + url.pathname).toBe('https://app.example.com/welcome');
    expect(url.search).toBe('');
    expect(new URLSearchParams(url.hash.slice(1)).get('session')).toBe('sess.se/cret+');
  });
});

describe('form rules', () => {
  it('asks for everything the campaign sign-up needs', () => {
    expect(missingWebinarFields(EMPTY_WEBINAR_REGISTRATION)).toEqual([
      'your first name',
      'your last name',
      'your company name',
      'your company website',
      'a valid work email',
      'a 10-digit US phone number',
      'a password',
      'your agreement to the Terms of Service and Privacy Policy',
    ]);
    expect(missingWebinarFields(form)).toEqual([]);
    expect(missingWebinarFields({ ...form, phone: '555-12' })).toEqual(['a 10-digit US phone number']);
    expect(missingWebinarFields({ ...form, website: 'brand' })).toEqual(['your company website']);
    expect(missingWebinarFields({ ...form, website: 'https://www.brand.com/shop' })).toEqual([]);
  });

  it('normalizes US phone numbers', () => {
    expect(usPhoneDigits('')).toBeNull();
    expect(usPhoneDigits('(415) 555-1234')).toBe('4155551234');
    expect(usPhoneDigits('14155551234')).toBe('4155551234');
    expect(usPhoneDigits('555-1234')).toBeNull();
  });

  it("uses the browser's US timezone, else the webinar's", () => {
    expect(signupTimezone('America/Los_Angeles')).toBe('America/Los_Angeles');
    expect(signupTimezone('Europe/Paris')).toBe('America/Chicago');
    expect(signupTimezone(undefined)).toBe('America/Chicago');
  });
});
