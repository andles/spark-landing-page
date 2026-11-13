import { useRef, useState, type ChangeEvent, type FormEvent, type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { captureCta } from '../analytics';
import { getTurnstileToken } from '../turnstile';
import {
  EMPTY_WEBINAR_REGISTRATION,
  missingWebinarFields,
  registerForWebinar,
  signInUrl,
  signupTimezone,
  WebinarSignupError,
  welcomeUrl,
  type WebinarRegistration,
} from '../webinarSignup';

// ─────────────────────────────────────────────────────────────────────────────
// /chew-on-this-webinar: Spark x Chew On This live webinar registration.
//
// "Register and reserve my trial" creates the visitor's Free Spark account
// from this page (POST /api/v1/authentication/registration), then opens it in
// the app, signed in, through app.sparkinventory.com/welcome. See
// src/webinarSignup.ts for the contract and the session hand-off.
// ─────────────────────────────────────────────────────────────────────────────

const ACCENT = '#22D3EE';

const TOPICS: { title: string; body: string; color: string }[] = [
  {
    title: 'Reorder timing.',
    body: 'Forecast from sales history plus outside signals (competitor stockouts, TikTok spikes, shipping delays) and let the PO draft itself.',
    color: '#22D3EE',
  },
  {
    title: 'Supplier follow-up.',
    body: 'Send the PO, chase the confirmation, log the real lead time. Without the email thread.',
    color: '#34D399',
  },
  {
    title: 'Stockout alerts that act.',
    body: "A text that tells you what's running out and what to do, approved in one word.",
    color: '#A78BFA',
  },
  {
    title: 'Slow-mover pricing.',
    body: "Catch what's been sitting too long and push a markdown before it eats your cash.",
    color: '#FBBF24',
  },
  {
    title: 'Multi-location balancing.',
    body: 'Transfers between your 3PL, FBA and store, triggered by where demand actually is.',
    color: '#22D3EE',
  },
];

type TextField = Exclude<keyof WebinarRegistration, 'consent'>;

const FIELDS: {
  key: TextField;
  label: string;
  type: string;
  autoComplete: string;
  placeholder?: string;
  required?: boolean;
}[] = [
  { key: 'company', label: 'Company name', type: 'text', autoComplete: 'organization', required: true },
  { key: 'website', label: 'Website', type: 'text', autoComplete: 'url', placeholder: 'yourstore.com' },
  { key: 'email', label: 'Work email', type: 'email', autoComplete: 'email', required: true },
  { key: 'phone', label: 'Phone number', type: 'tel', autoComplete: 'tel' },
  { key: 'password', label: 'Create a password', type: 'password', autoComplete: 'new-password', required: true },
];

const inputClass =
  'min-h-[50px] w-full rounded-xl border border-white/[0.12] bg-[#0C1019] px-4 text-base text-[#F0F2F5] placeholder:text-[#8B95A8] focus:border-[#22D3EE] focus:outline-2 focus:outline-offset-2 focus:outline-[#22D3EE]';
const labelClass = 'mb-2 block text-sm font-semibold text-[#F0F2F5]';

function Pill({ icon, children }: { icon: ReactNode; children: ReactNode }) {
  return (
    <span className="inline-flex min-h-[34px] items-center gap-2 rounded-full border border-white/10 bg-[rgba(17,22,34,0.6)] px-3 text-[13px] font-medium text-[#F0F2F5] sm:min-h-9 sm:px-3.5 sm:text-sm">
      <svg aria-hidden="true" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={ACCENT} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        {icon}
      </svg>
      {children}
    </span>
  );
}

function RegistrationForm() {
  const [fields, setFields] = useState<WebinarRegistration>(EMPTY_WEBINAR_REGISTRATION);
  const [missing, setMissing] = useState<string[]>([]);
  const [failure, setFailure] = useState<WebinarSignupError | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  // Taken once: the server refuses a submit faster than a person could fill the form.
  const [renderedAt] = useState(() => Date.now());
  const honeypotRef = useRef<HTMLInputElement>(null);
  const turnstileRef = useRef<HTMLDivElement>(null);

  const update = (next: WebinarRegistration) => {
    setFields(next);
    if (missing.length) setMissing(missingWebinarFields(next));
  };
  const updateText = (key: TextField) => (event: ChangeEvent<HTMLInputElement>) => update({ ...fields, [key]: event.target.value });

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isSubmitting) return;
    const stillMissing = missingWebinarFields(fields);
    setMissing(stillMissing);
    setFailure(null);
    if (stillMissing.length) return;

    setIsSubmitting(true);
    captureCta('signup_clicked');
    try {
      const turnstileToken = turnstileRef.current ? await getTurnstileToken(turnstileRef.current) : undefined;
      const refreshToken = await registerForWebinar(fields, {
        timezone: signupTimezone(Intl.DateTimeFormat().resolvedOptions().timeZone),
        turnstileToken,
        formElapsedMs: Date.now() - renderedAt,
        fax: honeypotRef.current?.value || undefined,
        campaignToken: import.meta.env.VITE_CHEW_WEBINAR_CAMPAIGN_TOKEN,
      });
      // Replace, so Back does not return to a form whose account already exists.
      window.location.replace(welcomeUrl(refreshToken));
    } catch (error) {
      setFailure(error instanceof WebinarSignupError ? error : new WebinarSignupError('Something went wrong creating your account. Please try again.'));
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      aria-busy={isSubmitting}
      className="flex flex-col gap-[18px] rounded-3xl border border-white/[0.06] bg-[rgba(12,16,25,0.95)] p-[22px] shadow-[0_40px_80px_rgba(0,0,0,0.5)] sm:p-8"
    >
      <div className="flex flex-col gap-1.5">
        <h2 className="m-0 text-2xl font-bold tracking-[-0.025em] text-[#F0F2F5]">Save your seat</h2>
        <p className="m-0 text-sm text-[#8B95A8]">
          Registering saves your webinar seat and creates your free Spark account, ready for your 30-day Operate trial. Can't make it live on Dec 1? We'll send the recording.
        </p>
      </div>
      <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2">
        <div>
          <label className={labelClass} htmlFor="webinar-first-name">First name</label>
          <input className={inputClass} id="webinar-first-name" name="firstName" type="text" autoComplete="given-name" required value={fields.firstName} onChange={updateText('firstName')} />
        </div>
        <div>
          <label className={labelClass} htmlFor="webinar-last-name">Last name</label>
          <input className={inputClass} id="webinar-last-name" name="lastName" type="text" autoComplete="family-name" required value={fields.lastName} onChange={updateText('lastName')} />
        </div>
      </div>
      {FIELDS.map((field) => (
        <div key={field.key}>
          <label className={labelClass} htmlFor={`webinar-${field.key}`}>
            {field.label}
            {!field.required && <span className="font-normal text-[#8B95A8]"> (optional)</span>}
          </label>
          <input
            className={inputClass}
            id={`webinar-${field.key}`}
            name={field.key}
            type={field.type}
            autoComplete={field.autoComplete}
            placeholder={field.placeholder}
            required={field.required}
            value={fields[field.key]}
            onChange={updateText(field.key)}
          />
          {field.key === 'password' && (
            <span className="mt-1.5 block text-xs text-[#8B95A8]">This is your Spark login, so your account is ready the moment you register.</span>
          )}
        </div>
      ))}
      {/* Honeypot: hidden from people and assistive tech; only a bot fills it in. */}
      <div aria-hidden="true" className="absolute -left-[10000px] h-px w-px overflow-hidden">
        <label htmlFor="webinar-fax">Fax</label>
        <input ref={honeypotRef} id="webinar-fax" name="fax" type="text" tabIndex={-1} autoComplete="off" />
      </div>
      <label htmlFor="webinar-consent" className="flex cursor-pointer items-start gap-3 text-sm leading-5 text-[#B8BFCC]">
        <input
          id="webinar-consent"
          type="checkbox"
          checked={fields.consent}
          onChange={(event) => update({ ...fields, consent: event.target.checked })}
          className="mt-0.5 h-5 w-5 flex-none accent-[#22D3EE]"
        />
        <span>
          I agree to the{' '}
          <Link to="/terms-of-service/" target="_blank" className="font-semibold text-[#A2F4FD] underline underline-offset-2 hover:text-[#53EAFD]">Terms of Service</Link>{' '}
          and{' '}
          <Link to="/privacy-policy/" target="_blank" className="font-semibold text-[#A2F4FD] underline underline-offset-2 hover:text-[#53EAFD]">Privacy Policy</Link>.
        </span>
      </label>
      <div ref={turnstileRef} />
      {missing.length > 0 && (
        <p role="alert" className="m-0 rounded-xl border border-amber-400/30 bg-amber-400/10 px-4 py-3 text-sm text-amber-200">
          Please add {missing.join(', ')}.
        </p>
      )}
      {failure && (
        <p role="alert" className="m-0 rounded-xl border border-rose-400/30 bg-rose-400/10 px-4 py-3 text-sm text-rose-200">
          {failure.message}
          {failure.alreadyRegistered && (
            <>
              {' '}
              <a href={signInUrl()} className="font-semibold text-[#A2F4FD] underline underline-offset-2">Sign in to Spark</a>
            </>
          )}
        </p>
      )}
      <button
        type="submit"
        disabled={isSubmitting}
        className="mt-1 inline-flex min-h-[50px] w-full cursor-pointer items-center justify-center rounded-full border border-[#53EAFD] bg-[#22D3EE] px-7 text-[15px] font-semibold text-[#06080D] hover:bg-[#53EAFD] disabled:cursor-wait disabled:opacity-70 sm:min-h-[52px] sm:text-base"
      >
        {isSubmitting ? 'Creating your account…' : 'Register and reserve my trial'}
      </button>
      <p className="m-0 text-center text-xs text-[#8B95A8]">No credit card. We'll only use this for your webinar link, recording and trial.</p>
    </form>
  );
}

export default function ChewOnThisWebinarPage() {
  return (
    <div className="flex min-h-screen flex-col bg-[#06080D] text-[#F0F2F5] antialiased">
      <header className="border-b border-white/[0.06] bg-[rgba(10,14,23,0.9)]">
        <div className="mx-auto flex min-h-[72px] max-w-[1140px] flex-wrap items-center justify-between gap-6 px-[18px] sm:px-6">
          <div className="flex items-center gap-3.5">
            <Link to="/" className="inline-flex items-center">
              <img src="/spark-logo-light.png" alt="Spark Inventory" width={191} height={26} className="block h-[26px] w-auto" />
            </Link>
            <span aria-hidden="true" className="inline-block h-[26px] w-px flex-none bg-white/15" />
            <img src="/webinars/chew-on-this/chew-on-this-logo.png" alt="Chew On This" width={99} height={32} className="block h-8 w-auto" />
          </div>
          <span className="hidden text-sm text-[#8B95A8] lg:inline">Free live webinar</span>
        </div>
      </header>

      <main>
        <section className="bg-[#06080D] bg-[radial-gradient(rgba(255,255,255,0.045)_1px,transparent_1px)] bg-[length:28px_28px] py-12 lg:pt-20 lg:pb-[88px]">
          <div className="mx-auto grid max-w-[1140px] grid-cols-1 items-start gap-10 px-[18px] sm:px-6 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:gap-16">
            <div className="flex min-w-0 flex-col gap-[22px]">
              <p className="m-0 flex items-center gap-2.5 text-xs font-semibold uppercase tracking-[0.14em] text-[#22D3EE]">
                <span aria-hidden="true" className="inline-block h-1.5 w-1.5 rounded-full bg-[#22D3EE]" />
                A Spark Inventory and Chew On This live webinar
              </p>
              <h1 className="m-0 text-[clamp(34px,5.2vw,56px)] leading-[1.08] font-bold tracking-[-0.025em] text-[#F0F2F5]">
                The inventory ops you should have <span className="text-[#22D3EE]">automated by now.</span>
              </h1>
              <p className="m-0 max-w-[560px] text-[clamp(16px,1.6vw,19px)] leading-[1.55] text-[#B8BFCC]">
                Five workflows most Shopify brands still run by hand, from reorder timing to slow-mover markdowns, and how to hand each one off. 45 minutes, live demo included.
              </p>
              <div className="mt-1 flex flex-wrap gap-2.5">
                <Pill icon={<><rect x="3" y="4" width="18" height="18" rx="2" /><path d="M16 2v4M8 2v4M3 10h18" /></>}>Monday, December 1, 2026</Pill>
                <Pill icon={<><circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" /></>}>2:00 PM CST</Pill>
                <Pill icon={<><path d="M23 7l-7 5 7 5V7z" /><rect x="1" y="5" width="15" height="14" rx="2" /></>}>Live on Zoom, recording sent to all registrants</Pill>
              </div>

              <div className="mt-[18px] flex flex-col gap-3.5 border-t border-white/[0.08] pt-6">
                <h2 className="m-0 text-xs font-semibold uppercase tracking-[0.12em] text-[#8B95A8]">What we'll cover</h2>
                <ol className="m-0 flex list-none flex-col gap-3.5 p-0">
                  {TOPICS.map((topic, index) => (
                    <li key={topic.title} className="flex items-start gap-3.5">
                      <span
                        aria-hidden="true"
                        className="inline-flex h-[30px] w-[30px] flex-none items-center justify-center rounded-lg text-[13px] font-bold sm:h-9 sm:w-9 sm:rounded-[10px] sm:text-[15px]"
                        style={{ background: `${topic.color}1F`, color: topic.color }}
                      >
                        {index + 1}
                      </span>
                      <span className="pt-1 text-[15px] leading-[1.55] text-[#B8BFCC] sm:pt-[7px]">
                        <strong className="text-[#F0F2F5]">{topic.title}</strong> {topic.body}
                      </span>
                    </li>
                  ))}
                </ol>
              </div>
            </div>

            <RegistrationForm />
          </div>
        </section>

        <section className="border-t border-white/[0.06] bg-[#0C1019] py-14 lg:py-[72px]">
          <div className="mx-auto grid max-w-[1140px] grid-cols-1 items-center gap-10 px-[18px] sm:px-6 lg:grid-cols-2 lg:gap-12">
            <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:gap-5">
              <img
                src="/webinars/chew-on-this/jason-watts.jpg"
                alt="Jason Watts"
                width={112}
                height={112}
                loading="lazy"
                className="block h-[88px] w-[88px] flex-none rounded-full border-2 border-white/10 object-cover sm:h-28 sm:w-28"
              />
              <div className="flex flex-col gap-1.5">
                <span className="text-xs font-semibold uppercase tracking-[0.14em] text-[#22D3EE]">Your host</span>
                <span className="text-[22px] font-bold tracking-[-0.025em] text-[#F0F2F5]">Jason Watts</span>
                <span className="text-sm text-[#8B95A8]">Co-Founder and CRO, Spark Inventory</span>
                <span className="mt-1 text-sm leading-normal text-[#B8BFCC]">
                  Brought to you with <strong className="text-[#F0F2F5]">Chew On This</strong>. Live demo of Sparki, Spark's text-based inventory assistant, in the last 10 minutes.
                </span>
              </div>
            </div>
            <div className="flex flex-col gap-2.5 rounded-[20px] border border-white/[0.06] bg-[rgba(17,22,34,0.6)] p-7">
              <span className="text-xs font-semibold uppercase tracking-[0.14em] text-[#22D3EE]">For everyone who attends</span>
              <span className="text-[22px] leading-[1.2] font-bold tracking-[-0.025em] text-[#F0F2F5]">30 days of Spark Operate free, then 20% off.</span>
              <p className="m-0 text-sm leading-[1.55] text-[#B8BFCC]">
                Operate is Spark's full purchasing, receiving and fulfillment tier, normally $349 a month. Chew On This attendees get 30 days free starting right after the webinar, a 1:1 onboarding call with Jason, and <strong className="text-[#F0F2F5]">$279 a month</strong> if you stay. No card to start, cancel anytime.
              </p>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-white/[0.06] bg-[#06080D] py-8">
        <div className="mx-auto flex max-w-[1140px] flex-wrap items-center justify-between gap-x-4 gap-y-3 px-[18px] text-sm text-[#8B95A8] sm:px-6">
          <span>Spark Inventory</span>
          <div className="flex flex-wrap gap-5">
            <Link to="/" className="text-[#A2F4FD] hover:text-[#53EAFD]">sparkinventory.com</Link>
            <a href="https://www.linkedin.com/in/jasonwatts12/" className="text-[#A2F4FD] hover:text-[#53EAFD]">Jason on LinkedIn</a>
            <Link to="/privacy-policy/" className="text-[#A2F4FD] hover:text-[#53EAFD]">Privacy</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
