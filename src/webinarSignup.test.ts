import { describe, expect, it, vi } from 'vitest';
import {
  DATA_CONSENT_VERSION,
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
const extras = { timezone: 'America/Chicago', formElapsedMs: 12_000, turnstileToken: 'ts-token' };

const json = (status: number, body: unknown) =>
  new Response(JSON.stringify(body), { status, headers: { 'Content-Type': 'application/json' } });

describe('registrationBody', () => {
  it('sends the same Free sign-up the app sends', () => {
    expect(registrationBody(form, extras)).toEqual({
      name: 'Brand & Co',
      email: 'ana@brand.com',
      password: 'correct horse battery staple',
      firstName: 'Ana',
      lastName: 'Lee',
      country: 'US',
      currency: 'USD',
      defaultTimezone: 'America/Chicago',
      selectedPlan: 'free',
      consentVersion: DATA_CONSENT_VERSION,
      formElapsedMs: 12_000,
      phone: '4155551234',
      website: 'brand.com',
      turnstileToken: 'ts-token',
    });
  });

  it('leaves out blank optional fields and adds a configured campaign', () => {
    const body = registrationBody({ ...form, phone: '', website: ' ' }, { ...extras, campaignToken: ' tok ' });
    expect(body).not.toHaveProperty('phone');
    expect(body).not.toHaveProperty('website');
    expect(body.campaignToken).toBe('tok');
  });
});

describe('registerForWebinar', () => {
  it('posts to the registration endpoint and returns the refresh token', async () => {
    const fetchImpl = vi.fn().mockResolvedValue(json(201, { token: 'a', refreshToken: 'sess.secret' }));
    await expect(registerForWebinar(form, extras, 'https://api.example.com/', fetchImpl)).resolves.toBe('sess.secret');
    const [url, init] = fetchImpl.mock.calls[0];
    expect(url).toBe('https://api.example.com/api/v1/authentication/registration');
    expect(init.method).toBe('POST');
    expect(JSON.parse(init.body).selectedPlan).toBe('free');
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
  it('asks for everything the account needs; website and phone are optional', () => {
    expect(missingWebinarFields(EMPTY_WEBINAR_REGISTRATION)).toEqual([
      'your first name',
      'your last name',
      'your company name',
      'a valid work email',
      'a password',
      'your agreement to the Terms of Service and Privacy Policy',
    ]);
    expect(missingWebinarFields(form)).toEqual([]);
    expect(missingWebinarFields({ ...form, phone: '555-12' })).toEqual(['a 10-digit US phone number (or leave it blank)']);
  });

  it('normalizes US phone numbers', () => {
    expect(usPhoneDigits('')).toBe('');
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
