// Economic order quantity (Wilson EOQ) math for the public calculator page.
// Every input is a hypothetical the visitor types in; nothing here is a
// measured Spark result.

export type HoldingCostMode = 'percent' | 'per-unit';

export interface EoqInput {
  /** Units expected to sell in a year (D). */
  annualDemand: number;
  /** Fixed cost to place, receive and process one order (S). */
  orderingCost: number;
  /** percent: holding cost is a yearly rate of the unit cost. per-unit: a dollar amount per unit per year. */
  holdingCostMode: HoldingCostMode;
  /** Purchase cost per unit. Required for the percent mode. */
  unitCost?: number;
  /** percent mode: yearly holding cost as a percent of unit cost (24 = 24%). */
  holdingRatePct?: number;
  /** per-unit mode: holding cost per unit per year (H). */
  holdingCostPerUnit?: number;
  /** Optional supplier minimum order quantity. */
  minimumOrderQuantity?: number;
}

export interface EoqResult {
  /** Holding cost per unit per year actually used (H). */
  holdingCostPerUnit: number;
  /** Unrounded Wilson EOQ, sqrt(2DS/H). */
  rawEoq: number;
  /** Whole-unit EOQ before any MOQ. */
  eoq: number;
  /** What to order: the EOQ raised to the MOQ when the MOQ is larger. */
  orderQuantity: number;
  /** True when the MOQ pushed the order above the EOQ. */
  raisedToMoq: boolean;
  ordersPerYear: number;
  daysBetweenOrders: number;
  annualOrderingCost: number;
  annualHoldingCost: number;
  totalAnnualCost: number;
}

const nonNegative = (value: number | undefined) =>
  typeof value === 'number' && Number.isFinite(value) && value > 0 ? value : 0;

export function holdingCostPerUnit(input: EoqInput): number {
  return input.holdingCostMode === 'percent'
    ? nonNegative(input.unitCost) * (nonNegative(input.holdingRatePct) / 100)
    : nonNegative(input.holdingCostPerUnit);
}

/** Returns null when demand, ordering cost or holding cost is missing or zero. */
export function calculateEoq(input: EoqInput): EoqResult | null {
  const demand = nonNegative(input.annualDemand);
  const orderingCost = nonNegative(input.orderingCost);
  const holding = holdingCostPerUnit(input);
  if (demand === 0 || orderingCost === 0 || holding === 0) return null;

  const rawEoq = Math.sqrt((2 * demand * orderingCost) / holding);
  // Round to the nearest whole unit, at least 1. The cost curve is flat near
  // the optimum, so rounding moves total cost by a fraction of a percent.
  const eoq = Math.max(1, Math.round(rawEoq));
  const moq = Math.ceil(nonNegative(input.minimumOrderQuantity) - 1e-9);
  const orderQuantity = Math.max(eoq, moq);

  const ordersPerYear = demand / orderQuantity;
  const annualOrderingCost = ordersPerYear * orderingCost;
  const annualHoldingCost = (orderQuantity / 2) * holding;
  return {
    holdingCostPerUnit: holding,
    rawEoq,
    eoq,
    orderQuantity,
    raisedToMoq: orderQuantity > eoq,
    ordersPerYear,
    daysBetweenOrders: 365 / ordersPerYear,
    annualOrderingCost,
    annualHoldingCost,
    totalAnnualCost: annualOrderingCost + annualHoldingCost,
  };
}

export const eoqFaqs = [
  {
    question: 'What is the EOQ formula?',
    answer: 'EOQ = √(2 × D × S ÷ H), where D is annual demand in units, S is the cost of placing one order and H is the cost of holding one unit for a year. It finds the order size where yearly ordering cost and yearly holding cost are equal, which is where their total is lowest.',
  },
  {
    question: 'What counts as ordering cost?',
    answer: 'Everything that happens once per order regardless of its size: the time to build and send the purchase order, supplier follow-up, receiving and put-away, invoice matching and any flat shipping or handling fee. Many small businesses land between $15 and $150 per order. If you are unsure, $50 is a common starting point.',
  },
  {
    question: 'How do I estimate holding cost?',
    answer: 'Holding cost is usually expressed as a yearly percentage of unit cost. It covers the cash tied up in stock, storage space, insurance, shrinkage and the risk of the item going obsolete. 20% to 30% a year is a typical range, and 24% is a common default.',
  },
  {
    question: 'What if my supplier has a minimum order quantity?',
    answer: 'Order the larger of the EOQ and the MOQ. When the MOQ is far above the EOQ you will carry more stock than ideal, so compare the extra holding cost with switching suppliers or negotiating a lower minimum. This calculator shows the cost at the quantity you would actually order.',
  },
  {
    question: 'When does EOQ give the wrong answer?',
    answer: 'EOQ assumes steady demand, a fixed price and fixed costs. Seasonal items, quantity price breaks, shelf life, cash limits and stock already on order all change the right answer. EOQ tells you how much to order, not when, so pair it with a reorder point.',
  },
  {
    question: 'How does Spark Inventory use EOQ?',
    answer: 'Spark calculates EOQ per SKU and warehouse from Demand ESP’s forecast instead of a flat yearly average. Demand ESP picks the best forecasting model for each SKU by backtesting its own history, accounts for seasonality, stockouts and planned promotions, and updates as sales come in. Ordering cost ($50 by default) and holding rate (24% a year by default) are workspace settings you can change. The reorder quantity is netted against stock already available and on order and raised to the supplier’s minimum, and the result becomes a drafted purchase order for a person to approve.',
  },
] as const;
