import { describe, expect, it, vi } from 'vitest';
import {
  PARTNER_APPLICATION_WORKER_URL,
  PartnerApplicationRejected,
  partnerApplicationApiUrl,
  submitPartnerApplication,
} from './partnerApplication';

const form = {
  email: 'jo@agency.com',
  fullName: 'Jo Doe',
  company: 'Agency',
  phone: '',
  linkedin: '',
  website: '',
};
const API = 'https://api.example.com/';
const API_URL = 'https://api.example.com/api/v1/partner-program/applications';

const respond = (...statuses: (number | Error)[]) => {
  const fn = vi.fn();
  for (const s of statuses) {
    if (s instanceof Error) fn.mockRejectedValueOnce(s);
    else fn.mockResolvedValueOnce(new Response(null, { status: s }));
  }
  return fn;
};

describe('partnerApplicationApiUrl', () => {
  it('builds the endpoint from the API base and ignores a blank base', () => {
    expect(partnerApplicationApiUrl(API)).toBe(API_URL);
    expect(partnerApplicationApiUrl('  ')).toBeNull();
    expect(partnerApplicationApiUrl(undefined)).toBeNull();
  });
});

describe('submitPartnerApplication', () => {
  it('sends to the worker when no API is configured', async () => {
    const fetchImpl = respond(200);
    await submitPartnerApplication(form, undefined, fetchImpl);
    expect(fetchImpl).toHaveBeenCalledTimes(1);
    expect(fetchImpl.mock.calls[0][0]).toBe(PARTNER_APPLICATION_WORKER_URL);
  });

  it('sends only to the API when it accepts the application', async () => {
    const fetchImpl = respond(202);
    await submitPartnerApplication(form, API, fetchImpl);
    expect(fetchImpl).toHaveBeenCalledTimes(1);
    expect(fetchImpl.mock.calls[0][0]).toBe(API_URL);
    expect(JSON.parse(fetchImpl.mock.calls[0][1].body)).toEqual(form);
  });

  it.each([500, 503, new TypeError('Failed to fetch')])('falls back to the worker when the API answers %s', async (outcome) => {
    const fetchImpl = respond(outcome, 200);
    await submitPartnerApplication(form, API, fetchImpl);
    expect(fetchImpl.mock.calls.map((c) => c[0])).toEqual([API_URL, PARTNER_APPLICATION_WORKER_URL]);
  });

  it.each([400, 429])('reports a %s from the API without resending to the worker', async (status) => {
    const fetchImpl = respond(status);
    await expect(submitPartnerApplication(form, API, fetchImpl)).rejects.toBeInstanceOf(PartnerApplicationRejected);
    expect(fetchImpl).toHaveBeenCalledTimes(1);
  });

  it('fails when the worker fallback fails too', async () => {
    const fetchImpl = respond(500, 500);
    await expect(submitPartnerApplication(form, API, fetchImpl)).rejects.toThrow('Submission failed');
  });
});
