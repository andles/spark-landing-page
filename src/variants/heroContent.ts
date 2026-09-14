import type { LandingVariant } from '../context/variant';

/**
 * Hero copy per landing variant.
 *
 * To add a new variant:
 * 1. Add the slug to `LandingVariant` in VariantContext.tsx
 * 2. Add an entry here with the hero copy
 * 3. That's it. Hero.tsx reads from this map automatically
 */

export interface HeroContent {
  /** Badge / pill text (NextGen only) */
  badge: string;
  /** Lines of the headline. Classic renders them inline; NextGen renders [0] white and [1] gradient. */
  headline: [string, string];
  /** Subheadline paragraph */
  subheadline: string;
  /** When true, show the demo booking form inline in the hero and hide the self-serve signup CTA */
  heroDemoForm?: boolean;
}

const heroContent: Record<LandingVariant, HeroContent> = {
  default: {
    badge: 'AI Inventory Software',
    headline: ['Inventory', 'Reimagined'],
    subheadline:
      'See your stock, explore demand forecasts, and turn buying decisions into draft purchase orders with Sparki.',
  },

  forecasting: {
    badge: 'AI Inventory Software',
    headline: ['AI Inventory Forecasting That', 'Turns Demand Into a Buying Plan'],
    subheadline:
      'Explore demand forecasts alongside stock and incoming supply. Review suggested quantities and prepare your next purchase order with Sparki.',
  },

  'demo-hero': {
    badge: 'AI Inventory Software',
    headline: ['AI Inventory Forecasting That', 'Turns Demand Into a Buying Plan'],
    subheadline:
      'Explore demand forecasts alongside stock and incoming supply. Review suggested quantities and prepare your next purchase order with Sparki.',
    heroDemoForm: true,
  },

  // ── Forecasting 14-day: CTA buttons ─────────────────────
  'forecasting-14d-cta': {
    badge: 'AI Inventory Software',
    headline: ['See Demand Before', 'You Commit to More Stock'],
    subheadline:
      'Explore demand forecasts alongside stock and incoming supply. Review suggested quantities and prepare your next purchase order with Sparki.',
  },

  // ── Forecasting 14-day: inline demo form ───────────────
  'forecasting-14d-form': {
    badge: 'AI Inventory Software',
    headline: ['See Demand Before', 'You Commit to More Stock'],
    subheadline:
      'Explore demand forecasts alongside stock and incoming supply. Review suggested quantities and prepare your next purchase order with Sparki.',
    heroDemoForm: true,
  },

  // ── Margin 14-day: CTA buttons ─────────────────────────
  'margin-14d-cta': {
    badge: 'AI Inventory Software',
    headline: ['Put Your Next Purchase Order', 'in Perspective'],
    subheadline:
      'Explore demand forecasts alongside stock and incoming supply. Review suggested quantities and prepare your next purchase order with Sparki.',
  },

  // ── Margin 14-day: inline demo form ────────────────────
  'margin-14d-form': {
    badge: 'AI Inventory Software',
    headline: ['Put Your Next Purchase Order', 'in Perspective'],
    subheadline:
      'Explore demand forecasts alongside stock and incoming supply. Review suggested quantities and prepare your next purchase order with Sparki.',
    heroDemoForm: true,
  },

  // ── Video variant: demo video below KPI strip ─────────────
  video: {
    badge: 'AI Inventory Software',
    headline: ['Inventory', 'Reimagined'],
    subheadline:
      'See your stock, explore demand forecasts, and turn buying decisions into draft purchase orders with Sparki.',
  },

  // ── Agency redesign variant (full page replacement) ────────
  agency: {
    badge: 'Bring Your Inventory Data Into Spark',
    headline: ['Understand Your Inventory.', 'Plan Your Next Move.'],
    subheadline:
      "Bring your sales and inventory data into Spark. Explore the forecast, review reorder recommendations, and ask Sparki to prepare a draft purchase order.",
  },

  // ── Future variants ──────────────────────────────────────
  // fba: {
  //   badge: 'Built for Amazon Sellers',
  //   headline: ['Smarter FBA Inventory', 'Powered by AI'],
  //   subheadline: '...',
  // },
  // shopify: { ... },
  // wholesale: { ... },
};

export function getHeroContent(variant: LandingVariant): HeroContent {
  return heroContent[variant] ?? heroContent.default;
}
