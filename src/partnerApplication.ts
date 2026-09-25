/**
 * Sends the partner application form.
 *
 * With VITE_SPARK_API_URL set, applications go to the Spark API, which stores them in the
 * partner approval queue and emails the team. Without it, or if the API is unreachable or
 * erroring, they go to the forms worker, which only emails the team. A lead is never lost to
 * an outage or to the order the two sites deploy in.
 */
export interface PartnerApplicationForm {
  email: string;
  fullName: string;
  company: string;
  phone: string;
  linkedin: string;
  website: string;
}

export const PARTNER_APPLICATION_WORKER_URL = 'https://forms.sparkinventory.com/api/partner-application';

export function partnerApplicationApiUrl(apiBase: string | undefined): string | null {
  const base = apiBase?.trim().replace(/\/+$/, '');
  return base ? `${base}/api/v1/partner-program/applications` : null;
}

type Fetch = (input: string, init: RequestInit) => Promise<Response>;

export async function submitPartnerApplication(
  form: PartnerApplicationForm,
  apiBase: string | undefined = import.meta.env.VITE_SPARK_API_URL,
  fetchImpl: Fetch = (input, init) => fetch(input, init),
): Promise<void> {
  const init: RequestInit = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(form),
  };

  const apiUrl = partnerApplicationApiUrl(apiBase);
  if (apiUrl) {
    try {
      const res = await fetchImpl(apiUrl, init);
      if (res.ok) return;
      // A 4xx is the applicant's input or the rate limit; the worker would not fix it.
      if (res.status < 500) throw new PartnerApplicationRejected(res.status);
    } catch (error) {
      if (error instanceof PartnerApplicationRejected) throw error;
      // Network failure: fall through to the worker.
    }
  }

  const res = await fetchImpl(PARTNER_APPLICATION_WORKER_URL, init);
  if (!res.ok) throw new Error('Submission failed');
}

export class PartnerApplicationRejected extends Error {
  readonly status: number;

  constructor(status: number) {
    super(`Partner application rejected (${status})`);
    this.status = status;
  }
}
