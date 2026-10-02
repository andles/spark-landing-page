/**
 * The partnerships offered on /partners. `id` is the value the Spark API stores on the
 * application (PartnerType on the server), so it must stay in step with it.
 */
export type PartnerTypeId = 'three_pl' | 'agency' | 'referral';

export interface PartnerTypeOption {
  id: PartnerTypeId;
  name: string;
  /** One line under the name on the picker. */
  summary: string;
  /** Who the partnership is for, in the applicant's words. */
  forWho: string;
  /** What working with Spark looks like for this partner. */
  whatYouDo: string[];
  /** How the partnership works commercially. */
  howItPays: string;
  /** Call to action on the partnership's card. */
  applyLabel: string;
}

export const PARTNER_TYPES: PartnerTypeOption[] = [
  {
    id: 'agency',
    name: 'Agency or consultant',
    summary: 'You manage brands and help them plan',
    forWho: 'Marketing agencies, fractional operators and consultants who look after brands that use Spark.',
    whatYouDo: [
      'Help your clients set up and run Spark',
      'Add campaign plans and other data that sharpen their forecast',
      'Work across all your clients from one login',
    ],
    howItPays: 'Your clients are billed by Spark. You earn 20% of every month they pay, for as long as they stay.',
    applyLabel: 'Apply as an agency or consultant',
  },
  {
    id: 'three_pl',
    name: '3PL or fulfillment provider',
    summary: 'You store and ship for many clients',
    forWho: 'Warehouses and fulfillment providers running inventory for several client brands.',
    whatYouDo: [
      'Run every client from one Spark account, each in its own workspace',
      'Forecast and plan replenishment per client',
      'Offer clients their own view of their stock',
    ],
    howItPays: 'Partner pricing for your account, so you can bundle Spark into your services.',
    applyLabel: 'Apply as a 3PL',
  },
  {
    id: 'referral',
    name: 'Referral partner',
    summary: 'You introduce businesses to Spark',
    forWho: 'Advisors, communities and anyone who regularly meets businesses that hold inventory.',
    whatYouDo: [
      'Share your personal referral link',
      'Your referrals get a special offer when they sign up',
      'Track signups and earnings in your partner portal',
    ],
    howItPays: 'A one-time bounty for every referral that becomes a paying customer.',
    applyLabel: 'Apply as a referral partner',
  },
];

export function isPartnerTypeId(value: string | null | undefined): value is PartnerTypeId {
  return PARTNER_TYPES.some((t) => t.id === value);
}

export function partnerTypeById(id: PartnerTypeId): PartnerTypeOption {
  return PARTNER_TYPES.find((t) => t.id === id) ?? PARTNER_TYPES[0];
}
