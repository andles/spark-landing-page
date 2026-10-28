// Inventory turnover math for the public calculator page. Every input is a
// hypothetical the visitor types in; nothing here is a measured Spark result.

export interface InventoryTurnoverInput {
  /** Cost of goods sold over the period, in dollars. */
  costOfGoodsSold: number;
  /** Inventory value at cost at the start of the period. */
  beginningInventory: number;
  /** Inventory value at cost at the end of the period. */
  endingInventory: number;
  /** Length of the period in days (365 for a year). */
  periodDays: number;
  /** Optional: yearly holding cost as a percent of inventory value (24 = 24%). */
  holdingRatePct?: number;
}

export interface InventoryTurnoverResult {
  averageInventory: number;
  /** Turns in the period: COGS ÷ average inventory. */
  turnover: number;
  /** Turns scaled to a 365-day year. */
  annualTurnover: number;
  /** Days of inventory on hand: period days ÷ turnover. */
  daysInInventory: number;
  /** Present only when a holding rate was given: yearly cost of carrying the average inventory. */
  annualHoldingCost?: number;
}

const nonNegative = (value: number | undefined) =>
  typeof value === 'number' && Number.isFinite(value) && value > 0 ? value : 0;

/** Returns null when COGS, average inventory or the period is missing or zero. */
export function calculateInventoryTurnover(input: InventoryTurnoverInput): InventoryTurnoverResult | null {
  const cogs = nonNegative(input.costOfGoodsSold);
  const averageInventory = (nonNegative(input.beginningInventory) + nonNegative(input.endingInventory)) / 2;
  const periodDays = nonNegative(input.periodDays);
  if (cogs === 0 || averageInventory === 0 || periodDays === 0) return null;

  const turnover = cogs / averageInventory;
  const result: InventoryTurnoverResult = {
    averageInventory,
    turnover,
    annualTurnover: turnover * (365 / periodDays),
    daysInInventory: periodDays / turnover,
  };
  const rate = nonNegative(input.holdingRatePct);
  if (rate > 0) result.annualHoldingCost = averageInventory * (rate / 100);
  return result;
}

export const inventoryTurnoverFaqs = [
  {
    question: 'What is the inventory turnover formula?',
    answer: 'Inventory turnover = cost of goods sold ÷ average inventory, where average inventory = (beginning inventory + ending inventory) ÷ 2, both valued at cost. It tells you how many times you sold through your average stock during the period.',
  },
  {
    question: 'How do I convert turnover into days?',
    answer: 'Days in inventory = days in the period ÷ inventory turnover. A yearly turnover of 6 means stock sits about 61 days on average before it sells. This is also called days sales of inventory (DSI) or days inventory outstanding (DIO).',
  },
  {
    question: 'What is a good inventory turnover ratio?',
    answer: 'It depends on what you sell. Perishable and fast-moving consumer goods turn much faster than furniture, spare parts or luxury items. Compare against your own history and similar businesses, and look at it per product: a healthy overall ratio can hide fast sellers that keep stocking out next to slow ones tying up cash.',
  },
  {
    question: 'Should I use cost of goods sold or revenue?',
    answer: 'Use cost of goods sold, because inventory is valued at cost. Dividing revenue by inventory at cost mixes in your markup and makes turnover look higher than it is. If you only track units, units sold ÷ average units on hand gives a similar answer for a single product.',
  },
  {
    question: 'How do I improve inventory turnover?',
    answer: 'Buy closer to real demand: order smaller quantities more often where ordering costs allow, cut reorder points on slow sellers, clear dead stock, and stop seasonal buys from carrying into the off season. Raising turnover by simply holding less can cause stockouts, so check days on hand per product before cutting.',
  },
  {
    question: 'How does Spark Inventory track turnover?',
    answer: 'Spark looks forward instead of back. It shows days on hand for every SKU and warehouse from Demand ESP’s forecast, scores each item’s health on overstock, stockout risk, returns, revenue class and dead stock, and puts a monthly carrying cost on excess stock. When portfolio health drops week over week, it alerts you with the reason.',
  },
] as const;
