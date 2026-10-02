import { useState, useCallback } from 'react';
import type { ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Sparkles, Check, Warehouse, Megaphone, Share2 } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { Container, Button } from '../components';
import { Header, Footer } from '../sections';
import { useTheme } from '../context/theme';
import { PartnerApplicationRejected, submitPartnerApplication } from '../partnerApplication';
import { PARTNER_TYPES, isPartnerTypeId, partnerTypeById } from '../partnerTypes';
import type { PartnerTypeId } from '../partnerTypes';

const TYPE_ICONS: Record<PartnerTypeId, LucideIcon> = {
  agency: Megaphone,
  three_pl: Warehouse,
  referral: Share2,
};

const FORM_ID = 'partner-application';

/** The two site themes differ only in colour; every class that changes lives here. */
interface PartnersTheme {
  page: string;
  heroSection: string;
  heroDecoration: ReactNode;
  backLink: string;
  badge: string;
  badgeIcon: string;
  badgeText: string;
  headline: ReactNode;
  subheadline: string;
  formCard: string;
  heading: string;
  body: string;
  muted: string;
  label: string;
  input: string;
  link: string;
  successIcon: string;
  successCheck: string;
  typeOption: string;
  typeOptionSelected: string;
  typeOptionIcon: string;
  typeOptionIconSelected: string;
  sectionAlt: string;
  detailCard: string;
  detailIcon: string;
  detailCheck: string;
  detailPays: string;
  detailButton: string;
  step: string;
}

const CLASSIC: PartnersTheme = {
  page: 'min-h-screen bg-white',
  heroSection: 'py-12 lg:py-20 bg-gradient-to-br from-violet-600 via-purple-600 to-violet-700 relative overflow-hidden',
  heroDecoration: (
    <div className="absolute inset-0 opacity-10">
      <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl -translate-x-1/2 translate-y-1/2" />
    </div>
  ),
  backLink: 'inline-flex items-center gap-2 text-white/70 hover:text-white mb-6 transition-colors text-sm',
  badge: 'inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 mb-6',
  badgeIcon: 'w-4 h-4 text-white',
  badgeText: 'text-white/90 text-sm font-medium',
  headline: (
    <h1 className="text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
      Grow With Spark<br />
      <span className="text-white/90">Three Ways to Partner</span>
    </h1>
  ),
  subheadline: 'text-lg lg:text-xl text-white/80 leading-relaxed mb-8',
  formCard: 'bg-white rounded-2xl shadow-2xl p-6 sm:p-8',
  heading: 'text-slate-800',
  body: 'text-slate-600',
  muted: 'text-slate-500',
  label: 'block text-sm font-medium text-slate-700 mb-1',
  input:
    'w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-violet-500 focus:border-violet-500 outline-none transition-all text-slate-800 placeholder:text-slate-400',
  link: 'text-violet-600 hover:underline',
  successIcon: 'w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4',
  successCheck: 'w-8 h-8 text-emerald-600',
  typeOption: 'border-slate-200 hover:border-violet-300 bg-white',
  typeOptionSelected: 'border-violet-600 ring-2 ring-violet-200 bg-violet-50',
  typeOptionIcon: 'bg-slate-100 text-slate-600',
  typeOptionIconSelected: 'bg-violet-600 text-white',
  sectionAlt: 'bg-slate-50',
  detailCard: 'bg-white border border-slate-200 rounded-2xl p-6 flex flex-col',
  detailIcon: 'w-12 h-12 rounded-xl bg-gradient-to-br from-violet-600 to-purple-500 flex items-center justify-center mb-4',
  detailCheck: 'w-4 h-4 text-violet-600 mt-1 flex-shrink-0',
  detailPays: 'bg-violet-50 text-violet-900 rounded-xl p-3 text-sm',
  detailButton: 'mt-5 w-full bg-orange-500 hover:bg-orange-600 text-white',
  step: 'w-12 h-12 rounded-full bg-violet-600 text-white font-bold text-xl flex items-center justify-center mx-auto mb-4',
};

const NEXTGEN: PartnersTheme = {
  page: 'min-h-screen bg-black',
  heroSection: 'py-12 lg:py-20 relative overflow-hidden',
  heroDecoration: (
    <div className="absolute inset-0">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-violet-900/40 via-black to-black" />
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-violet-500/30 rounded-full blur-[128px]" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-500/30 rounded-full blur-[128px]" />
      <div className="absolute top-1/2 right-1/4 w-64 h-64 bg-fuchsia-500/20 rounded-full blur-[100px]" />
    </div>
  ),
  backLink: 'inline-flex items-center gap-2 text-white/50 hover:text-white mb-6 transition-colors text-sm',
  badge: 'inline-flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 backdrop-blur-sm rounded-full mb-6',
  badgeIcon: 'w-4 h-4 text-violet-400',
  badgeText: 'text-white/80 text-sm font-medium',
  headline: (
    <h1 className="text-4xl lg:text-5xl font-bold mb-6 leading-tight">
      <span className="bg-gradient-to-r from-white via-white to-white/80 bg-clip-text text-transparent">Grow With Spark</span>
      <br />
      <span className="bg-gradient-to-r from-violet-400 via-fuchsia-400 to-cyan-400 bg-clip-text text-transparent">
        Three Ways to Partner
      </span>
    </h1>
  ),
  subheadline: 'text-lg lg:text-xl text-white/50 leading-relaxed mb-8',
  formCard: 'bg-white/[0.03] backdrop-blur-sm rounded-2xl border border-white/10 p-6 sm:p-8',
  heading: 'text-white',
  body: 'text-white/60',
  muted: 'text-white/40',
  label: 'block text-sm font-medium text-white/70 mb-1',
  input:
    'w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:ring-2 focus:ring-violet-500 focus:border-violet-500 outline-none transition-all text-white placeholder:text-white/30',
  link: 'text-cyan-400 hover:underline',
  successIcon: 'w-16 h-16 bg-gradient-to-br from-emerald-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4',
  successCheck: 'w-8 h-8 text-white',
  typeOption: 'border-white/10 hover:border-white/30 bg-white/[0.02]',
  typeOptionSelected: 'border-violet-400 ring-2 ring-violet-500/40 bg-violet-500/10',
  typeOptionIcon: 'bg-white/10 text-white/60',
  typeOptionIconSelected: 'bg-gradient-to-br from-violet-500 to-cyan-500 text-white',
  sectionAlt: 'bg-white/[0.02]',
  detailCard: 'bg-white/[0.02] border border-white/10 rounded-2xl p-6 flex flex-col',
  detailIcon: 'w-12 h-12 rounded-xl bg-gradient-to-br from-violet-500 to-cyan-500 flex items-center justify-center mb-4',
  detailCheck: 'w-4 h-4 text-cyan-400 mt-1 flex-shrink-0',
  detailPays: 'bg-white/5 text-white/80 rounded-xl p-3 text-sm',
  detailButton: 'mt-5 w-full bg-gradient-to-r from-violet-500 to-cyan-500 text-white',
  step: 'w-12 h-12 rounded-full bg-gradient-to-r from-violet-500 to-cyan-500 text-white font-bold text-xl flex items-center justify-center mx-auto mb-4',
};

interface FormFields {
  email: string;
  fullName: string;
  company: string;
  phone: string;
  linkedin: string;
  website: string;
}

const EMPTY_FIELDS: FormFields = { email: '', fullName: '', company: '', phone: '', linkedin: '', website: '' };

/** `?type=agency` (from a partner-type link or ad) preselects that partnership. */
function useTypeFromQuery(): PartnerTypeId | null {
  const { search } = useLocation();
  const value = new URLSearchParams(search).get('type');
  return isPartnerTypeId(value) ? value : null;
}

function PartnersPageView({ t }: { t: PartnersTheme }) {
  const [partnerType, setPartnerType] = useState<PartnerTypeId | null>(useTypeFromQuery());
  const [fields, setFields] = useState<FormFields>(EMPTY_FIELDS);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const updateField = (field: keyof FormFields, value: string) => {
    setFields((prev) => ({ ...prev, [field]: value }));
  };

  const applyAs = (id: PartnerTypeId) => {
    setPartnerType(id);
    document.getElementById(FORM_ID)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      if (!partnerType) return;
      setIsSubmitting(true);
      setSubmitError('');
      try {
        await submitPartnerApplication({ partnerType, ...fields });
        setIsSubmitted(true);
      } catch (error) {
        setSubmitError(
          error instanceof PartnerApplicationRejected && error.status === 429
            ? 'Too many applications from this network. Please try again later or email us at andy@sparkinventory.com.'
            : 'Something went wrong. Please check your details and try again, or email us at andy@sparkinventory.com.',
        );
      } finally {
        setIsSubmitting(false);
      }
    },
    [partnerType, fields],
  );

  const isFormValid =
    partnerType !== null &&
    fields.email.includes('@') &&
    fields.email.includes('.') &&
    fields.fullName.trim().length > 0 &&
    fields.company.trim().length > 0;

  const textField = (
    id: keyof FormFields,
    label: string,
    placeholder: string,
    options: { type?: string; required?: boolean } = {},
  ) => (
    <div>
      <label htmlFor={id} className={t.label}>
        {label} {options.required && <span className="text-red-500">*</span>}
      </label>
      <input
        type={options.type ?? 'text'}
        id={id}
        value={fields[id]}
        onChange={(e) => updateField(id, e.target.value)}
        placeholder={placeholder}
        className={t.input}
        required={options.required}
      />
    </div>
  );

  return (
    <div className={t.page}>
      <Header />

      <main className="pt-20">
        <section className={t.heroSection}>
          {t.heroDecoration}

          <Container className="relative z-10">
            <Link to="/" className={t.backLink}>
              <ArrowLeft className="w-4 h-4" />
              Back to home
            </Link>

            <div className="grid lg:grid-cols-2 gap-12 items-start">
              {/* Left column - Copy */}
              <div>
                <div className={t.badge}>
                  <Sparkles className={t.badgeIcon} />
                  <span className={t.badgeText}>Partner Program: Now Accepting Applications</span>
                </div>

                {t.headline}

                <p className={t.subheadline}>
                  Whether you run fulfillment for many brands, help brands plan and grow, or simply know businesses
                  that need better inventory, there is a partnership built for how you work.
                </p>

                <div className="space-y-4">
                  {PARTNER_TYPES.map((type) => {
                    const Icon = TYPE_ICONS[type.id];
                    return (
                      <div key={type.id} className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-full bg-white/15 flex items-center justify-center flex-shrink-0">
                          <Icon className="w-4 h-4 text-white" />
                        </div>
                        <div>
                          <p className="text-white font-semibold">{type.name}</p>
                          <p className="text-white/70 text-sm">{type.howItPays}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Right column - Form */}
              <div id={FORM_ID} className={`${t.formCard} scroll-mt-28`}>
                {isSubmitted ? (
                  <div className="text-center py-8">
                    <div className={t.successIcon}>
                      <Check className={t.successCheck} />
                    </div>
                    <h3 className={`text-2xl font-bold mb-2 ${t.heading}`}>Application Received!</h3>
                    <p className={`mb-4 ${t.body}`}>
                      Thanks for applying{partnerType ? ` as ${partnerTypeById(partnerType).name}` : ''}. We'll
                      review your application and get back to you within 48 hours.
                    </p>
                    <p className={`text-sm ${t.muted}`}>
                      Questions? Email{' '}
                      <a href="mailto:partners@sparkinventory.com" className={t.link}>
                        partners@sparkinventory.com
                      </a>
                    </p>
                  </div>
                ) : (
                  <>
                    <h2 className={`text-2xl font-bold mb-2 ${t.heading}`}>Apply to Become a Partner</h2>
                    <p className={`mb-6 ${t.body}`}>Pick the partnership that fits you best. It takes a minute.</p>

                    <form onSubmit={handleSubmit} className="space-y-4">
                      <fieldset>
                        <legend className={t.label}>
                          I am applying as <span className="text-red-500">*</span>
                        </legend>
                        <div className="grid gap-2 sm:grid-cols-3">
                          {PARTNER_TYPES.map((type) => {
                            const Icon = TYPE_ICONS[type.id];
                            const selected = partnerType === type.id;
                            return (
                              <label
                                key={type.id}
                                className={`flex sm:flex-col items-center sm:items-start gap-3 sm:gap-2 rounded-xl border p-3 cursor-pointer transition-all ${
                                  selected ? t.typeOptionSelected : t.typeOption
                                }`}
                              >
                                <input
                                  type="radio"
                                  name="partnerType"
                                  value={type.id}
                                  checked={selected}
                                  onChange={() => setPartnerType(type.id)}
                                  className="sr-only"
                                />
                                <span
                                  className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                                    selected ? t.typeOptionIconSelected : t.typeOptionIcon
                                  }`}
                                >
                                  <Icon className="w-4 h-4" />
                                </span>
                                <span>
                                  <span className={`block text-sm font-semibold leading-tight ${t.heading}`}>{type.name}</span>
                                  <span className={`block text-xs mt-0.5 ${t.muted}`}>{type.summary}</span>
                                </span>
                              </label>
                            );
                          })}
                        </div>
                      </fieldset>

                      <div className="grid md:grid-cols-2 gap-4">
                        {textField('fullName', 'Full Name', 'John Smith', { required: true })}
                        {textField('email', 'Email', 'john@example.com', { type: 'email', required: true })}
                      </div>

                      <div className="grid md:grid-cols-2 gap-4">
                        {textField('company', 'Company', 'Acme Consulting', { required: true })}
                        {textField('phone', 'Phone', '(555) 123-4567', { type: 'tel' })}
                      </div>

                      <div className="grid md:grid-cols-2 gap-4">
                        {textField('linkedin', 'LinkedIn Profile', 'linkedin.com/in/yourprofile')}
                        {textField('website', 'Company Website', 'example.com')}
                      </div>

                      <Button
                        type="submit"
                        size="lg"
                        className="w-full bg-orange-500 hover:bg-orange-600 text-white text-lg py-4 disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled={!isFormValid || isSubmitting}
                      >
                        {isSubmitting ? 'Submitting...' : 'Submit Application'}
                        {!isSubmitting && <ArrowRight className="w-5 h-5 ml-2" />}
                      </Button>
                      {submitError && <p className="text-red-500 text-sm text-center mt-2">{submitError}</p>}

                      <p className={`text-center text-sm ${t.muted}`}>
                        Questions? Email{' '}
                        <a href="mailto:partners@sparkinventory.com" className={t.link}>
                          partners@sparkinventory.com
                        </a>
                      </p>
                    </form>
                  </>
                )}
              </div>
            </div>
          </Container>
        </section>

        <section id="partnerships" className="py-16 lg:py-24">
          <Container>
            <div className="max-w-6xl mx-auto">
              <h2 className={`text-2xl lg:text-3xl font-bold mb-3 ${t.heading}`}>Which Partnership Fits You?</h2>
              <p className={`mb-10 max-w-3xl ${t.body}`}>
                Each partnership comes with a partner portal, sales and marketing materials, and a dedicated contact on
                our team. They differ in how you work with your clients and how you earn.
              </p>

              <div className="grid md:grid-cols-3 gap-6">
                {PARTNER_TYPES.map((type) => {
                  const Icon = TYPE_ICONS[type.id];
                  return (
                    <article key={type.id} className={t.detailCard}>
                      <div className={t.detailIcon}>
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <h3 className={`text-lg font-semibold mb-1 ${t.heading}`}>{type.name}</h3>
                      <p className={`text-sm mb-4 ${t.body}`}>{type.forWho}</p>
                      <ul className="space-y-2 mb-5 flex-1">
                        {type.whatYouDo.map((item) => (
                          <li key={item} className={`flex gap-2 text-sm ${t.body}`}>
                            <Check className={t.detailCheck} />
                            {item}
                          </li>
                        ))}
                      </ul>
                      <p className={t.detailPays}>{type.howItPays}</p>
                      <Button type="button" className={t.detailButton} onClick={() => applyAs(type.id)}>
                        {type.applyLabel}
                      </Button>
                    </article>
                  );
                })}
              </div>
            </div>
          </Container>
        </section>

        <section className={`py-16 lg:py-20 ${t.sectionAlt}`}>
          <Container>
            <div className="max-w-2xl mx-auto text-center">
              <h2 className={`text-2xl lg:text-3xl font-bold mb-4 ${t.heading}`}>How It Works</h2>
              <div className="grid md:grid-cols-3 gap-8 mt-12">
                <div className="text-center">
                  <div className={t.step}>1</div>
                  <h3 className={`font-semibold mb-2 ${t.heading}`}>Apply</h3>
                  <p className={`text-sm ${t.body}`}>Pick your partnership and tell us about your business.</p>
                </div>
                <div className="text-center">
                  <div className={t.step}>2</div>
                  <h3 className={`font-semibold mb-2 ${t.heading}`}>Get Approved</h3>
                  <p className={`text-sm ${t.body}`}>We review every application and reply within 48 hours.</p>
                </div>
                <div className="text-center">
                  <div className={t.step}>3</div>
                  <h3 className={`font-semibold mb-2 ${t.heading}`}>Start Working Together</h3>
                  <p className={`text-sm ${t.body}`}>Sign in to your partner portal and bring your first clients on.</p>
                </div>
              </div>
            </div>
          </Container>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export function PartnersPage() {
  const { theme } = useTheme();
  return <PartnersPageView t={theme === 'nextgen' ? NEXTGEN : CLASSIC} />;
}
