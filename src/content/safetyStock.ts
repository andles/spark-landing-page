// Safety stock math for the public calculator page. Every input is a
// hypothetical the visitor types in; nothing here is a measured Spark result.

import { calculateSafetyStock as calculateFixedMethodSafetyStock } from './reorderPoint';

export type SafetyStockCalculatorMethod = 'service-level' | 'max-average' | 'days-of-cover';

export const MIN_SERVICE_LEVEL_PCT = 50;
export const MAX_SERVICE_LEVEL_PCT = 99.99;

/** Service levels shown in the "what a higher service level costs" table. */
export const comparisonServiceLevels = [90, 95, 97.5, 99, 99.9] as const;

const nonNegative = (value: number | undefined) =>
  typeof value === 'number' && Number.isFinite(value) && value > 0 ? value : 0;

// Round up: a fractional unit of buffer still has to be a whole unit on the shelf.
// The small epsilon keeps float noise (37.0000000001) from adding a unit.
const roundUp = (value: number) => Math.ceil(Math.max(0, value - 1e-9));

/**
 * Inverse of the standard normal CDF (Acklam's rational approximation,
 * relative error below 1.2e-9). Input is clamped to the calculator's range.
 */
export function zForServiceLevelPct(serviceLevelPct: number): number {
  const pct = Number.isFinite(serviceLevelPct) ? serviceLevelPct : 95;
  const p = Math.min(MAX_SERVICE_LEVEL_PCT, Math.max(MIN_SERVICE_LEVEL_PCT, pct)) / 100;
  const a = [-3.969683028665376e1, 2.209460984245205e2, -2.759285104469687e2, 1.38357751867269e2, -3.066479806614716e1, 2.506628277459239];
  const b = [-5.447609879822406e1, 1.615858368580409e2, -1.556989798598866e2, 6.680131188771972e1, -1.328068155288572e1];
  const c = [-7.784894002430293e-3, -3.223964580411365e-1, -2.400758277161838, -2.549732539343734, 4.374664141464968, 2.938163982698783];
  const d = [7.784695709041462e-3, 3.224671290700398e-1, 2.445134137142996, 3.754408661907416];
  const pHigh = 1 - 0.02425;
  if (p <= pHigh) {
    const q = p - 0.5;
    const r = q * q;
    return ((((((a[0] * r + a[1]) * r + a[2]) * r + a[3]) * r + a[4]) * r + a[5]) * q) /
      (((((b[0] * r + b[1]) * r + b[2]) * r + b[3]) * r + b[4]) * r + 1);
  }
  const q = Math.sqrt(-2 * Math.log(1 - p));
  return -(((((c[0] * q + c[1]) * q + c[2]) * q + c[3]) * q + c[4]) * q + c[5]) /
    ((((d[0] * q + d[1]) * q + d[2]) * q + d[3]) * q + 1);
}

export interface SafetyStockInput {
  method: SafetyStockCalculatorMethod;
  /** Average units sold per day. */
  averageDailyDemand: number;
  /** Average supplier lead time in days. */
  averageLeadTimeDays: number;
  /** service-level: standard deviation of daily demand, in units. */
  dailyDemandStdDev?: number;
  /** service-level: standard deviation of the lead time, in days. */
  leadTimeStdDevDays?: number;
  /** service-level: target chance of not stocking out during a lead time, in percent. */
  serviceLevelPct?: number;
  /** max-average: highest units sold in a day. */
  maxDailyDemand?: number;
  /** max-average: longest lead time seen, in days. */
  maxLeadTimeDays?: number;
  /** days-of-cover: extra days of average demand to hold. */
  safetyDays?: number;
  /** Optional: unit cost, to put a dollar value on the buffer. */
  unitCost?: number;
  /** Optional: yearly holding cost as a percent of unit cost (24 = 24%). */
  holdingRatePct?: number;
}

export interface SafetyStockResult {
  /** Whole units of safety stock. */
  safetyStock: number;
  /** Safety stock expressed as days of average demand; null when demand is zero. */
  safetyDays: number | null;
  /** Reorder point: lead time demand plus safety stock, in whole units. */
  reorderPoint: number;
  /** service-level method only. */
  z?: number;
  /** Present when a unit cost was given. */
  inventoryValue?: number;
  /** Present when a unit cost and holding rate were given. */
  annualHoldingCost?: number;
}

export function serviceLevelSafetyStock(input: Pick<SafetyStockInput, 'averageDailyDemand' | 'averageLeadTimeDays' | 'dailyDemandStdDev' | 'leadTimeStdDevDays'>, serviceLevelPct: number): number {
  // z x sqrt(LT x sigma_d^2 + d^2 x sigma_LT^2): demand and lead time variability combined.
  const demand = nonNegative(input.averageDailyDemand);
  const leadTime = nonNegative(input.averageLeadTimeDays);
  const demandSd = nonNegative(input.dailyDemandStdDev);
  const leadTimeSd = nonNegative(input.leadTimeStdDevDays);
  return roundUp(zForServiceLevelPct(serviceLevelPct) * Math.sqrt(leadTime * demandSd ** 2 + demand ** 2 * leadTimeSd ** 2));
}

export function calculateSafetyStockDetails(input: SafetyStockInput): SafetyStockResult {
  const demand = nonNegative(input.averageDailyDemand);
  const leadTime = nonNegative(input.averageLeadTimeDays);
  const serviceLevelPct = input.serviceLevelPct ?? 95;

  const safetyStock = input.method === 'service-level'
    ? serviceLevelSafetyStock(input, serviceLevelPct)
    : roundUp(calculateFixedMethodSafetyStock({ ...input, method: input.method }));

  const result: SafetyStockResult = {
    safetyStock,
    safetyDays: demand > 0 ? safetyStock / demand : null,
    reorderPoint: roundUp(demand * leadTime) + safetyStock,
  };
  if (input.method === 'service-level') result.z = zForServiceLevelPct(serviceLevelPct);
  const unitCost = nonNegative(input.unitCost);
  if (unitCost > 0) {
    result.inventoryValue = safetyStock * unitCost;
    const rate = nonNegative(input.holdingRatePct);
    if (rate > 0) result.annualHoldingCost = result.inventoryValue * (rate / 100);
  }
  return result;
}

export const safetyStockFaqs = [
  {
    question: 'What is the safety stock formula?',
    answer: 'The most complete version is safety stock = Z × √(average lead time × σ_demand² + average daily demand² × σ_lead time²), where Z comes from your target service level, σ_demand is the standard deviation of daily demand and σ_lead time is the standard deviation of the lead time in days. If your lead time never varies, it simplifies to Z × σ_demand × √(lead time).',
  },
  {
    question: 'What Z score should I use?',
    answer: 'Z depends on the service level you want: about 1.28 for 90%, 1.645 for 95%, 1.96 for 97.5%, 2.33 for 99% and 3.09 for 99.9%. Many businesses start at 95% and go higher for fast movers and items where a stockout loses the sale.',
  },
  {
    question: 'Is service level the same as fill rate?',
    answer: 'No. The service level in this formula is the cycle service level: the chance of not running out at all before the next order arrives. Fill rate is the share of units ordered that you ship from stock. A 95% cycle service level usually means a fill rate well above 95%, because most stockouts are short.',
  },
  {
    question: 'Which safety stock method should I use?',
    answer: 'Use the service level method when you have enough sales history to measure how much demand varies. The max and average method is quick but often oversizes the buffer, because it assumes the worst day and the worst lead time happen together. Days of cover is the simplest to explain but ignores how predictable each item is.',
  },
  {
    question: 'Why does safety stock grow so fast at high service levels?',
    answer: 'Z rises steeply near 100%. Going from 95% to 99% raises Z from about 1.645 to 2.33, roughly 40% more safety stock, and 99.9% needs nearly twice the 95% buffer. That is why it pays to set a high service level only where a stockout really costs you.',
  },
  {
    question: 'How does Spark Inventory calculate safety stock?',
    answer: 'Spark uses the same statistical formula, but measures variability from Demand ESP’s own forecast misses instead of raw demand swings. Once an item has three scored months of forecasts, its buffer is sized from how far the forecast actually missed over the last year at the horizon a new order lands; before that it uses the forecast’s confidence band. Lead time variability comes from completed purchase orders, and the target service level is a setting, 95% by default.',
  },
] as const;
