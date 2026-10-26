// Reorder point and safety stock math for the public calculator page.
// Every input is a hypothetical the visitor types in; nothing here is a
// measured Spark result.

export type SafetyStockMethod = 'service-level' | 'max-average' | 'days-of-cover';

export const serviceLevels = [
  { value: 0.9, label: '90%', z: 1.2816 },
  { value: 0.95, label: '95%', z: 1.6449 },
  { value: 0.975, label: '97.5%', z: 1.96 },
  { value: 0.99, label: '99%', z: 2.3263 },
] as const;

export interface ReorderPointInput {
  method: SafetyStockMethod;
  /** Average units sold per day. */
  averageDailyDemand: number;
  /** Average supplier lead time in days. */
  averageLeadTimeDays: number;
  /** service-level: standard deviation of daily demand, in units. */
  dailyDemandStdDev?: number;
  /** service-level: standard deviation of the lead time, in days. */
  leadTimeStdDevDays?: number;
  /** service-level: target probability of not stocking out during a lead time. */
  serviceLevel?: number;
  /** max-average: highest units sold in a day. */
  maxDailyDemand?: number;
  /** max-average: longest lead time seen, in days. */
  maxLeadTimeDays?: number;
  /** days-of-cover: extra days of average demand to hold as a buffer. */
  safetyDays?: number;
  /** Optional: available plus on-order units, to say whether to reorder now. */
  inventoryPosition?: number;
}

export interface ReorderPointResult {
  leadTimeDemand: number;
  safetyStock: number;
  reorderPoint: number;
  /** Present only when an inventory position was given. */
  reorderNow?: boolean;
}

const nonNegative = (value: number | undefined) =>
  typeof value === 'number' && Number.isFinite(value) && value > 0 ? value : 0;

export function zForServiceLevel(serviceLevel: number | undefined): number {
  return serviceLevels.find((level) => level.value === serviceLevel)?.z ?? serviceLevels[1].z;
}

export function calculateSafetyStock(input: ReorderPointInput): number {
  const demand = nonNegative(input.averageDailyDemand);
  const leadTime = nonNegative(input.averageLeadTimeDays);

  switch (input.method) {
    case 'service-level': {
      // z x sqrt(LT x sigma_d^2 + d^2 x sigma_LT^2): demand and lead time variability combined.
      const demandSd = nonNegative(input.dailyDemandStdDev);
      const leadTimeSd = nonNegative(input.leadTimeStdDevDays);
      const z = zForServiceLevel(input.serviceLevel);
      return z * Math.sqrt(leadTime * demandSd ** 2 + demand ** 2 * leadTimeSd ** 2);
    }
    case 'max-average': {
      const worstCase = nonNegative(input.maxDailyDemand) * nonNegative(input.maxLeadTimeDays);
      return Math.max(0, worstCase - demand * leadTime);
    }
    case 'days-of-cover':
      return demand * nonNegative(input.safetyDays);
  }
}

export function calculateReorderPoint(input: ReorderPointInput): ReorderPointResult {
  const leadTimeDemand = nonNegative(input.averageDailyDemand) * nonNegative(input.averageLeadTimeDays);
  // Round up: a fractional unit of buffer still has to be a whole unit on the shelf.
  // The small epsilon keeps float noise (37.0000000001) from adding a unit.
  const roundUp = (value: number) => Math.ceil(Math.max(0, value - 1e-9));
  const safetyStock = roundUp(calculateSafetyStock(input));
  const reorderPoint = roundUp(leadTimeDemand) + safetyStock;
  const result: ReorderPointResult = { leadTimeDemand, safetyStock, reorderPoint };
  if (typeof input.inventoryPosition === 'number' && Number.isFinite(input.inventoryPosition)) {
    result.reorderNow = input.inventoryPosition <= reorderPoint;
  }
  return result;
}

export const reorderPointFaqs = [
  {
    question: 'What is the reorder point formula?',
    answer: 'Reorder point = (average daily demand × average lead time in days) + safety stock. The first part covers what you expect to sell while you wait for the order to arrive. Safety stock covers demand or delays above that average.',
  },
  {
    question: 'How do I calculate safety stock?',
    answer: 'Three common methods: max and average ((max daily demand × max lead time) − (average daily demand × average lead time)), service level (Z score × the combined variability of demand and lead time), and days of cover (average daily demand × the number of buffer days you want to hold). The service level method is the most precise when you have enough sales history to measure variability.',
  },
  {
    question: 'What is a good service level?',
    answer: 'Many businesses start at 95%, which means a 5% chance of running out during a given lead time. Fast movers and items that lose a sale when out of stock often justify 97.5% or 99%. Slow, costly or easily substituted items can sit lower. Higher service levels need disproportionately more safety stock.',
  },
  {
    question: 'Should I compare the reorder point to on-hand stock?',
    answer: 'Compare it to your inventory position: available stock plus units already on order, minus anything committed to open orders. Using on-hand alone can trigger a second order for stock that is already on the way.',
  },
  {
    question: 'Why does a fixed reorder point stop working?',
    answer: 'Demand and lead times change with seasons, promotions and suppliers, so a reorder point set once drifts out of date. Spark Inventory recalculates it per SKU and per warehouse with Demand ESP: a forecast chosen by backtesting each SKU’s own history, safety stock sized from that forecast’s past misses and real supplier lead times, and an order quantity that respects minimum order quantities. It then drafts the purchase order for a person to review.',
  },
] as const;
