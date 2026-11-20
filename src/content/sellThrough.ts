// Sell-through rate math for the public calculator page. Every input is a
// hypothetical the visitor types in; nothing here is a measured Spark result.

export interface SellThroughInput {
  /** Units on hand at the start of the period. */
  beginningUnits: number;
  /** Units received during the period (0 if none). */
  receivedUnits: number;
  /** Units sold during the period. */
  unitsSold: number;
  /** Length of the period in weeks. */
  periodWeeks: number;
}

export interface SellThroughResult {
  /** Units available to sell: beginning units + units received. */
  availableUnits: number;
  /** Sell-through rate as a percent: units sold ÷ units available × 100. */
  sellThroughPct: number;
  /** Units left at the end of the period (never below zero). */
  unitsLeft: number;
  /** Average units sold per week in the period. */
  weeklySales: number;
  /** Sell-through per week, in percentage points. */
  weeklySellThroughPct: number;
  /** Weeks to sell the remaining units at the same pace; null when nothing sold. */
  weeksToSellOut: number | null;
}

const positive = (value: number | undefined) =>
  typeof value === 'number' && Number.isFinite(value) && value > 0 ? value : 0;

/**
 * Returns null when there are no units available or the period is missing.
 * Units sold above units available (a data error, or sales from stock that
 * was never counted) cap the rate at 100% rather than reporting more.
 */
export function calculateSellThrough(input: SellThroughInput): SellThroughResult | null {
  const availableUnits = positive(input.beginningUnits) + positive(input.receivedUnits);
  const periodWeeks = positive(input.periodWeeks);
  if (availableUnits === 0 || periodWeeks === 0) return null;

  const unitsSold = Math.min(positive(input.unitsSold), availableUnits);
  const sellThroughPct = (unitsSold / availableUnits) * 100;
  const unitsLeft = availableUnits - unitsSold;
  const weeklySales = unitsSold / periodWeeks;
  return {
    availableUnits,
    sellThroughPct,
    unitsLeft,
    weeklySales,
    weeklySellThroughPct: sellThroughPct / periodWeeks,
    weeksToSellOut: weeklySales > 0 ? unitsLeft / weeklySales : null,
  };
}

export const sellThroughFaqs = [
  {
    question: 'What is the sell-through rate formula?',
    answer: 'Sell-through rate = units sold ÷ units available × 100, where units available = units on hand at the start of the period + units received during it. If you sold 300 of the 500 units you had available this month, your sell-through rate is 60%.',
  },
  {
    question: 'How do you calculate sell-through rate?',
    answer: 'Pick a period (a week, a month or a season) and one product or category. Count the units on hand on the first day, add every unit received during the period, and divide the units sold by that total. Multiply by 100 for a percent. Use units, not dollars, so price changes and markdowns do not distort it.',
  },
  {
    question: 'What is a good sell-through rate?',
    answer: 'It depends on the product and the period. Many retailers treat about 80% over a season as healthy for seasonal or fashion goods, while staple items that are restocked all the time naturally sit lower each month. Compare a product against its own history and similar items, and watch the trend: a rate that keeps falling week after week points to overstock or a price problem.',
  },
  {
    question: 'Should I divide by units received or by beginning inventory?',
    answer: 'Both are in use. Dividing by units received alone answers how much of a new delivery sold, which suits a single purchase or season. Dividing by beginning inventory plus receipts, as this calculator does, counts everything that was available to sell, which suits ongoing products. Pick one method and keep it, or the numbers will not compare.',
  },
  {
    question: 'How is sell-through different from inventory turnover?',
    answer: 'Sell-through measures units sold against units available in one period, as a percent. Inventory turnover measures cost of goods sold against average inventory value, as a number of turns, usually over a year. Sell-through is quicker to read for one product or one delivery; turnover is better for the whole business. Try the inventory turnover calculator for the second.',
  },
  {
    question: 'How do I improve a low sell-through rate?',
    answer: 'Buy closer to demand on the next order, move stock to the channel or location where it sells, bundle a slow item with one customers already buy, or mark it down before it ages further. Check weeks of supply first: a low rate on an item with only a few weeks of stock left may need nothing at all.',
  },
  {
    question: 'How does Spark Inventory help with sell-through?',
    answer: 'Spark forecasts every SKU with Demand ESP and shows days on hand for each SKU and warehouse, flags overstock and dead stock in each item’s health score, and puts a monthly carrying cost on the excess. Through the Spark connector, Claude or ChatGPT can compare how long an item’s stock would take to clear if you hold the price, mark it down 15% or bundle it, with the margin each option keeps.',
  },
] as const;
