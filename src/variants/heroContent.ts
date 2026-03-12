import type { LandingVariant } from '../context/VariantContext';

/**
 * Hero copy per landing variant.
 *
 * To add a new variant:
 * 1. Add the slug to `LandingVariant` in VariantContext.tsx
 * 2. Add an entry here with the hero copy
 * 3. That's it — Hero.tsx reads from this map automatically
 */

export interface HeroContent {
  /** Badge / pill text (NextGen only) */
  badge: string;
  /** Lines of the headline. Classic renders them inline; NextGen renders [0] white and [1] gradient. */
  headline: [string, string];
  /** Subheadline paragraph */
  subheadline: string;
  /** When true, show the demo booking form inline in the hero and hide free trial CTA */
  heroDemoForm?: boolean;
}

const heroContent: Record<LandingVariant, HeroContent> = {
  default: {
    badge: 'AI Inventory Software',
    headline: ['Inventory', 'Reimagined'],
    subheadline:
      'The AI-native inventory platform that thinks ahead. Real-time visibility, predictive insights, and autonomous optimization — all in one seamless experience.',
  },

  forecasting: {
    badge: 'AI Inventory Software',
    headline: ['AI Inventory Forecasting That', 'Improves Planning in 14 Days'],
    subheadline:
      'Spark uses AI to predict demand, prevent stockouts, and automate reordering — so you can run leaner inventory with confidence.',
  },

  'demo-hero': {
    badge: 'AI Inventory Software',
    headline: ['AI Inventory Forecasting That', 'Improves Planning in 14 Days'],
    subheadline:
      'Spark uses AI to predict demand, prevent stockouts, and automate reordering — so you can run leaner inventory with confidence.',
    heroDemoForm: true,
  },

  // ── Forecasting 14-day: CTA buttons ─────────────────────
  'forecasting-14d-cta': {
    badge: 'AI Inventory Software',
    headline: ['AI Forecasting That Reduces', 'Stockouts & Overstock in 14 Days'],
    subheadline:
      'Spark uses AI to predict demand, prevent stockouts, and automate reordering — so you can run leaner inventory with confidence.',
  },

  // ── Forecasting 14-day: inline demo form ───────────────
  'forecasting-14d-form': {
    badge: 'AI Inventory Software',
    headline: ['AI Forecasting That Reduces', 'Stockouts & Overstock in 14 Days'],
    subheadline:
      'Spark uses AI to predict demand, prevent stockouts, and automate reordering — so you can run leaner inventory with confidence.',
    heroDemoForm: true,
  },

  // ── Margin 14-day: CTA buttons ─────────────────────────
  'margin-14d-cta': {
    badge: 'AI Inventory Software',
    headline: ['Stop Losing Margin to Bad Forecasts —', 'Fix It in 14 Days'],
    subheadline:
      'Spark uses AI to predict demand, prevent stockouts, and automate reordering — so you can run leaner inventory with confidence.',
  },

  // ── Margin 14-day: inline demo form ────────────────────
  'margin-14d-form': {
    badge: 'AI Inventory Software',
    headline: ['Stop Losing Margin to Bad Forecasts —', 'Fix It in 14 Days'],
    subheadline:
      'Spark uses AI to predict demand, prevent stockouts, and automate reordering — so you can run leaner inventory with confidence.',
    heroDemoForm: true,
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
